import pkg from 'pg';
import logger from '../utils/Logger.js';
import { DATABASE_TIMEOUTS, ERROR_MESSAGES } from '../constants/index.js';
import { DatabaseError } from '../errors/AppError.js';

const { Pool } = pkg;

/**
 * Database connection pool
 */
class Database {
  constructor(options = {}) {
    this.pool = new Pool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME,
      max: options.maxConnections || 20,
      idleTimeoutMillis: DATABASE_TIMEOUTS.POOL_IDLE,
      connectionTimeoutMillis: DATABASE_TIMEOUTS.CONNECTION,
      ...options,
    });

    this.pool.on('error', (err) => {
      logger.error('Unexpected error on idle client', { error: err.message });
    });

    this.pool.on('connect', () => {
      logger.debug('New database connection established');
    });

    this.isConnected = false;
  }

  /**
   * Initialize database connection
   */
  async initialize() {
    try {
      const client = await this.pool.connect();
      await client.query('SELECT NOW()');
      client.release();
      this.isConnected = true;
      logger.info('Database connected successfully');
      return true;
    } catch (error) {
      logger.error('Failed to connect to database', { error: error.message });
      this.isConnected = false;
      throw new DatabaseError('Database connection failed');
    }
  }

  /**
   * Execute query
   */
  async query(sql, params = [], options = {}) {
    const startTime = Date.now();
    const queryId = Math.random().toString(36).substr(2, 9);

    try {
      logger.debug(`[${queryId}] Executing query`, { sql: sql.substring(0, 100) });

      const result = await this.pool.query(sql, params);
      const duration = Date.now() - startTime;

      logger.debug(`[${queryId}] Query executed`, { duration: `${duration}ms`, rows: result.rowCount });

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      logger.error(`[${queryId}] Query failed`, {
        error: error.message,
        sql: sql.substring(0, 100),
        params: Array.isArray(params) ? params.length : 0,
        duration: `${duration}ms`,
      });

      throw new DatabaseError(ERROR_MESSAGES.DATABASE_ERROR, { originalError: error.message });
    }
  }

  /**
   * Execute single row query
   */
  async queryOne(sql, params = []) {
    const result = await this.query(sql, params);
    return result.rows[0] || null;
  }

  /**
   * Execute multiple rows query
   */
  async queryMany(sql, params = []) {
    const result = await this.query(sql, params);
    return result.rows;
  }

  /**
   * Transaction handler
   */
  async transaction(callback) {
    const client = await this.pool.connect();

    try {
      await client.query('BEGIN');
      logger.debug('Transaction started');

      // Create transaction-specific query method
      const transactionQuery = async (sql, params = []) => {
        return client.query(sql, params);
      };

      const result = await callback(transactionQuery);

      await client.query('COMMIT');
      logger.debug('Transaction committed');

      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      logger.error('Transaction rolled back', { error: error.message });
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Insert record
   */
  async insert(table, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');

    const sql = `
      INSERT INTO ${table} (${keys.join(', ')})
      VALUES (${placeholders})
      RETURNING *
    `;

    return this.queryOne(sql, values);
  }

  /**
   * Update record
   */
  async update(table, id, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');

    const sql = `
      UPDATE ${table}
      SET ${setClause}, updated_at = NOW()
      WHERE id = $${keys.length + 1}
      RETURNING *
    `;

    return this.queryOne(sql, [...values, id]);
  }

  /**
   * Delete record
   */
  async delete(table, id) {
    const sql = `DELETE FROM ${table} WHERE id = $1`;
    await this.query(sql, [id]);
    logger.info(`Record deleted from ${table}`, { id });
  }

  /**
   * Find by ID
   */
  async findById(table, id) {
    const sql = `SELECT * FROM ${table} WHERE id = $1`;
    return this.queryOne(sql, [id]);
  }

  /**
   * Find all with pagination
   */
  async findAll(table, page = 1, limit = 20, where = '') {
    const offset = (page - 1) * limit;
    const whereClause = where ? `WHERE ${where}` : '';

    const countSql = `SELECT COUNT(*) FROM ${table} ${whereClause}`;
    const dataSql = `
      SELECT * FROM ${table}
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;

    const countResult = await this.query(countSql);
    const dataResult = await this.query(dataSql, [limit, offset]);

    return {
      data: dataResult.rows,
      pagination: {
        page,
        limit,
        total: parseInt(countResult.rows[0].count),
      },
    };
  }

  /**
   * Get database stats
   */
  async getStats() {
    try {
      const clientCountResult = await this.pool.query(
        'SELECT COUNT(*) FROM pg_stat_activity'
      );
      const versionResult = await this.pool.query('SELECT version()');

      return {
        activeConnections: parseInt(clientCountResult.rows[0].count),
        totalConnections: this.pool.totalCount,
        idleConnections: this.pool.idleCount,
        waitingRequests: this.pool.waitingCount,
        version: versionResult.rows[0].version,
      };
    } catch (error) {
      logger.error('Failed to get database stats', { error: error.message });
      return null;
    }
  }

  /**
   * Close connection pool
   */
  async close() {
    try {
      await this.pool.end();
      this.isConnected = false;
      logger.info('Database connection pool closed');
    } catch (error) {
      logger.error('Error closing database connection', { error: error.message });
    }
  }
}

// Create singleton instance
const database = new Database();

export default database;
