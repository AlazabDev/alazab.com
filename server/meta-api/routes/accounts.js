const express = require('express');
const { pool } = require('../db');
const router = express.Router();

// List all accounts
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, account_type, waba_id, phone_number_id, phone_number, display_name, business_name, status, config, created_at, updated_at FROM meta_accounts ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get single account
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, account_type, waba_id, phone_number_id, phone_number, display_name, business_name, status, config, created_at, updated_at FROM meta_accounts WHERE id = $1', [req.params.id]);
    if (!rows.length) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Create account
router.post('/', async (req, res) => {
  const { account_type, waba_id, phone_number_id, phone_number, display_name, access_token, app_secret, verify_token, business_name, config } = req.body;
  
  if (!display_name) return res.status(400).json({ success: false, error: 'display_name is required' });

  try {
    const { rows } = await pool.query(
      `INSERT INTO meta_accounts (account_type, waba_id, phone_number_id, phone_number, display_name, access_token, app_secret, verify_token, business_name, config)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id, display_name, status, created_at`,
      [account_type || 'whatsapp', waba_id, phone_number_id, phone_number, display_name, access_token, app_secret, verify_token || crypto.randomUUID(), business_name, JSON.stringify(config || {})]
    );
    res.status(201).json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update account
router.put('/:id', async (req, res) => {
  const { account_type, waba_id, phone_number_id, phone_number, display_name, access_token, app_secret, verify_token, business_name, status, config } = req.body;

  try {
    const { rows } = await pool.query(
      `UPDATE meta_accounts SET 
        account_type = COALESCE($1, account_type),
        waba_id = COALESCE($2, waba_id),
        phone_number_id = COALESCE($3, phone_number_id),
        phone_number = COALESCE($4, phone_number),
        display_name = COALESCE($5, display_name),
        access_token = COALESCE($6, access_token),
        app_secret = COALESCE($7, app_secret),
        verify_token = COALESCE($8, verify_token),
        business_name = COALESCE($9, business_name),
        status = COALESCE($10, status),
        config = COALESCE($11, config),
        updated_at = NOW()
       WHERE id = $12 RETURNING id, display_name, status, updated_at`,
      [account_type, waba_id, phone_number_id, phone_number, display_name, access_token, app_secret, verify_token, business_name, status, config ? JSON.stringify(config) : null, req.params.id]
    );
    if (!rows.length) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete account
router.delete('/:id', async (req, res) => {
  try {
    const { rowCount } = await pool.query('DELETE FROM meta_accounts WHERE id = $1', [req.params.id]);
    if (!rowCount) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get account stats
router.get('/:id/stats', async (req, res) => {
  try {
    const [msgs, events] = await Promise.all([
      pool.query(`SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE direction = 'inbound') as inbound,
        COUNT(*) FILTER (WHERE direction = 'outbound') as outbound,
        COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '24 hours') as last_24h,
        COUNT(*) FILTER (WHERE status = 'failed') as failed
       FROM meta_messages WHERE account_id = $1`, [req.params.id]),
      pool.query('SELECT COUNT(*) as total FROM meta_webhook_events WHERE account_id = $1', [req.params.id])
    ]);
    res.json({
      success: true,
      data: {
        messages: msgs.rows[0],
        webhookEvents: parseInt(events.rows[0].total)
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
