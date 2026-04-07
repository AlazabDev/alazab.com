const express = require('express');
const { pool } = require('../db');
const router = express.Router();

// Get messages for account
router.get('/:accountId', async (req, res) => {
  const { accountId } = req.params;
  const { limit = 50, offset = 0, phone, direction } = req.query;

  try {
    let query = 'SELECT * FROM meta_messages WHERE account_id = $1';
    const params = [accountId];
    let idx = 2;

    if (phone) { query += ` AND phone_number = $${idx++}`; params.push(phone); }
    if (direction) { query += ` AND direction = $${idx++}`; params.push(direction); }

    query += ` ORDER BY created_at DESC LIMIT $${idx++} OFFSET $${idx}`;
    params.push(parseInt(limit), parseInt(offset));

    const { rows } = await pool.query(query, params);
    const { rows: countRows } = await pool.query('SELECT COUNT(*) FROM meta_messages WHERE account_id = $1', [accountId]);

    res.json({ success: true, data: rows, total: parseInt(countRows[0].count) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Send message via WhatsApp Cloud API
router.post('/:accountId/send', async (req, res) => {
  const { accountId } = req.params;
  const { to, type = 'text', text, template, media } = req.body;

  if (!to) return res.status(400).json({ success: false, error: 'to is required' });

  try {
    const { rows } = await pool.query('SELECT access_token, phone_number_id FROM meta_accounts WHERE id = $1', [accountId]);
    if (!rows.length) return res.status(404).json({ success: false, error: 'Account not found' });

    const { access_token, phone_number_id } = rows[0];
    if (!access_token || !phone_number_id) {
      return res.status(400).json({ success: false, error: 'Account missing token or phone_number_id' });
    }

    // Build message payload
    let payload = { messaging_product: 'whatsapp', to };

    if (type === 'template' && template) {
      payload.type = 'template';
      payload.template = template;
    } else if (type === 'text') {
      payload.type = 'text';
      payload.text = { body: text || '' };
    } else if (['image', 'document', 'audio', 'video'].includes(type) && media) {
      payload.type = type;
      payload[type] = media;
    } else {
      return res.status(400).json({ success: false, error: 'Invalid message type or missing content' });
    }

    // Send via WhatsApp Cloud API
    const response = await fetch(`https://graph.facebook.com/v21.0/${phone_number_id}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('WhatsApp API error:', result);
      return res.status(response.status).json({ success: false, error: result.error || result });
    }

    // Store sent message
    const waMessageId = result.messages?.[0]?.id;
    await pool.query(
      `INSERT INTO meta_messages (account_id, wa_message_id, phone_number, direction, message_type, content, status)
       VALUES ($1, $2, $3, 'outbound', $4, $5, 'sent')`,
      [accountId, waMessageId, to, type, type === 'text' ? text : `[${type}]`]
    );

    res.json({ success: true, data: { wa_message_id: waMessageId } });
  } catch (err) {
    console.error('Send error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get conversations (grouped by phone)
router.get('/:accountId/conversations', async (req, res) => {
  const { accountId } = req.params;
  try {
    const { rows } = await pool.query(`
      SELECT phone_number, customer_name,
        MAX(created_at) as last_message_at,
        COUNT(*) as message_count,
        COUNT(*) FILTER (WHERE direction = 'inbound' AND status = 'received') as unread
      FROM meta_messages WHERE account_id = $1
      GROUP BY phone_number, customer_name
      ORDER BY MAX(created_at) DESC
    `, [accountId]);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
