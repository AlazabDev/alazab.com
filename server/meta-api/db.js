const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.PG_PORT || '5432'),
  database: process.env.PG_DATABASE || 'alazab_meta',
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || '',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL pool error:', err.message);
});

// Initialize tables
async function initDB() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS meta_accounts (
        id SERIAL PRIMARY KEY,
        account_type VARCHAR(20) NOT NULL DEFAULT 'whatsapp',
        waba_id VARCHAR(100),
        phone_number_id VARCHAR(100),
        phone_number VARCHAR(50),
        display_name VARCHAR(255),
        access_token TEXT,
        app_secret VARCHAR(255),
        verify_token VARCHAR(255),
        business_name VARCHAR(255),
        status VARCHAR(20) DEFAULT 'active',
        config JSONB DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS meta_messages (
        id SERIAL PRIMARY KEY,
        account_id INTEGER REFERENCES meta_accounts(id),
        wa_message_id VARCHAR(255) UNIQUE,
        phone_number VARCHAR(50) NOT NULL,
        customer_name VARCHAR(255),
        direction VARCHAR(10) DEFAULT 'inbound',
        message_type VARCHAR(30) DEFAULT 'text',
        content TEXT,
        media_url TEXT,
        media_mime_type VARCHAR(100),
        status VARCHAR(30) DEFAULT 'received',
        metadata JSONB DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS meta_webhook_events (
        id SERIAL PRIMARY KEY,
        account_id INTEGER,
        source VARCHAR(30) NOT NULL,
        event_type VARCHAR(50),
        payload JSONB NOT NULL,
        event_hash VARCHAR(64),
        processed BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS meta_templates (
        id SERIAL PRIMARY KEY,
        account_id INTEGER REFERENCES meta_accounts(id),
        wa_template_id VARCHAR(100),
        name VARCHAR(255) NOT NULL,
        language VARCHAR(10) DEFAULT 'ar',
        category VARCHAR(50),
        status VARCHAR(30),
        components JSONB DEFAULT '[]',
        synced_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_meta_messages_phone ON meta_messages(phone_number);
      CREATE INDEX IF NOT EXISTS idx_meta_messages_account ON meta_messages(account_id);
      CREATE INDEX IF NOT EXISTS idx_meta_messages_created ON meta_messages(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_meta_webhook_events_created ON meta_webhook_events(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_meta_accounts_status ON meta_accounts(status);
    `);
    console.log('✅ Database tables initialized');
  } catch (err) {
    console.error('❌ DB init error:', err.message);
    throw err;
  } finally {
    client.release();
  }
}

module.exports = { pool, initDB };
