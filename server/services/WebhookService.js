import logger from '../utils/Logger.js';
import database from '../db/Database.js';
import { WebhookError } from '../errors/AppError.js';

/**
 * Webhook Service
 */
class WebhookService {
  constructor() {
    this.webhooks = new Map(); // In-memory webhook handlers
    this.retryConfig = {
      maxRetries: 3,
      retryDelayMs: 5000,
      backoffMultiplier: 2,
    };
  }

  /**
   * Register webhook handler
   */
  registerHandler(eventType, handler) {
    if (!this.webhooks.has(eventType)) {
      this.webhooks.set(eventType, []);
    }
    this.webhooks.get(eventType).push(handler);
    logger.info(`Webhook handler registered`, { eventType });
  }

  /**
   * Process webhook
   */
  async processWebhook(eventType, payload) {
    const webhookId = Math.random().toString(36).substr(2, 9);

    try {
      logger.info(`[${webhookId}] Processing webhook`, {
        eventType,
        payloadSize: JSON.stringify(payload).length,
      });

      // Store webhook in database
      const webhookRecord = await database.insert('webhook_events', {
        webhook_id: webhookId,
        event_type: eventType,
        payload: JSON.stringify(payload),
        status: 'processing',
        created_at: new Date(),
      });

      // Get handlers for this event
      const handlers = this.webhooks.get(eventType) || [];

      if (handlers.length === 0) {
        logger.warn(`[${webhookId}] No handlers registered for event`, {
          eventType,
        });
      }

      // Process all handlers
      const results = await Promise.allSettled(
        handlers.map(handler => this.executeHandler(handler, payload, webhookId))
      );

      // Check if any handlers failed
      const failed = results.filter(r => r.status === 'rejected');

      if (failed.length > 0) {
        logger.warn(`[${webhookId}] Some handlers failed`, {
          eventType,
          failedCount: failed.length,
          totalCount: results.length,
        });

        await database.update('webhook_events', webhookRecord.id, {
          status: 'failed',
          error_message: `${failed.length} handler(s) failed`,
        });

        throw new WebhookError(`Failed to process all webhook handlers`);
      }

      // Update webhook status to completed
      await database.update('webhook_events', webhookRecord.id, {
        status: 'completed',
      });

      logger.info(`[${webhookId}] Webhook processed successfully`, {
        eventType,
        handlers: handlers.length,
      });

      return {
        webhookId,
        eventType,
        handlerCount: handlers.length,
        success: true,
      };
    } catch (error) {
      logger.error(`[${webhookId}] Webhook processing failed`, {
        eventType,
        error: error.message,
      });

      try {
        await database.update('webhook_events', webhookRecord.id, {
          status: 'error',
          error_message: error.message,
        });
      } catch (dbError) {
        logger.error('Failed to update webhook status', { error: dbError.message });
      }

      throw error;
    }
  }

  /**
   * Execute single handler with retry
   */
  async executeHandler(handler, payload, webhookId, retryCount = 0) {
    try {
      logger.debug(`[${webhookId}] Executing handler`, {
        handlerName: handler.name,
        retryCount,
      });

      await handler(payload);

      logger.debug(`[${webhookId}] Handler executed successfully`, {
        handlerName: handler.name,
      });
    } catch (error) {
      logger.warn(`[${webhookId}] Handler execution failed`, {
        handlerName: handler.name,
        error: error.message,
        retryCount,
      });

      if (retryCount < this.retryConfig.maxRetries) {
        const delay = this.retryConfig.retryDelayMs * Math.pow(this.retryConfig.backoffMultiplier, retryCount);
        logger.info(`[${webhookId}] Retrying handler in ${delay}ms`, {
          handlerName: handler.name,
          nextRetry: retryCount + 1,
        });

        await new Promise(resolve => setTimeout(resolve, delay));
        return this.executeHandler(handler, payload, webhookId, retryCount + 1);
      }

      throw error;
    }
  }

  /**
   * Get webhook history
   */
  async getWebhookHistory(eventType = null, limit = 100) {
    try {
      let query = `
        SELECT * FROM webhook_events
      `;
      const params = [];

      if (eventType) {
        query += ` WHERE event_type = $1`;
        params.push(eventType);
      }

      query += ` ORDER BY created_at DESC LIMIT $${params.length + 1}`;
      params.push(limit);

      const webhooks = await database.queryMany(query, params);
      return webhooks;
    } catch (error) {
      logger.error('Failed to retrieve webhook history', {
        error: error.message,
      });
      throw error;
    }
  }

  /**
   * Get webhook statistics
   */
  async getStatistics(startDate = null, endDate = null) {
    try {
      let query = `
        SELECT
          event_type,
          COUNT(*) as total_events,
          SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as successful_events,
          SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed_events,
          SUM(CASE WHEN status = 'error' THEN 1 ELSE 0 END) as error_events,
          AVG(EXTRACT(EPOCH FROM (updated_at - created_at))) as avg_duration_seconds
        FROM webhook_events
      `;

      const params = [];

      if (startDate && endDate) {
        query += ` WHERE created_at BETWEEN $1 AND $2`;
        params.push(startDate, endDate);
      }

      query += ` GROUP BY event_type`;

      const stats = await database.queryMany(query, params);
      return stats;
    } catch (error) {
      logger.error('Failed to retrieve webhook statistics', {
        error: error.message,
      });
      throw error;
    }
  }

  /**
   * Retry failed webhook
   */
  async retryWebhook(webhookId) {
    try {
      const webhook = await database.queryOne(
        `SELECT * FROM webhook_events WHERE webhook_id = $1`,
        [webhookId]
      );

      if (!webhook) {
        throw new Error(`Webhook not found: ${webhookId}`);
      }

      const payload = JSON.parse(webhook.payload);
      await this.processWebhook(webhook.event_type, payload);

      logger.info('Webhook retried successfully', { webhookId });
      return { success: true };
    } catch (error) {
      logger.error('Failed to retry webhook', {
        error: error.message,
        webhookId,
      });
      throw error;
    }
  }

  /**
   * Register webhook endpoint
   */
  async registerEndpoint(name, url, events, secret = null) {
    try {
      const endpoint = await database.insert('webhook_endpoints', {
        name,
        url,
        events: JSON.stringify(events),
        secret,
        is_active: true,
        created_at: new Date(),
      });

      logger.info('Webhook endpoint registered', {
        endpointId: endpoint.id,
        name,
        events: events.length,
      });

      return endpoint;
    } catch (error) {
      logger.error('Failed to register webhook endpoint', {
        error: error.message,
      });
      throw error;
    }
  }

  /**
   * Get registered endpoints
   */
  async getEndpoints(active = true) {
    try {
      const query = active
        ? `SELECT * FROM webhook_endpoints WHERE is_active = true`
        : `SELECT * FROM webhook_endpoints`;

      const endpoints = await database.queryMany(query, []);
      return endpoints;
    } catch (error) {
      logger.error('Failed to retrieve webhook endpoints', {
        error: error.message,
      });
      throw error;
    }
  }

  /**
   * Delete endpoint
   */
  async deleteEndpoint(endpointId) {
    try {
      await database.update('webhook_endpoints', endpointId, {
        is_active: false,
        deleted_at: new Date(),
      });

      logger.info('Webhook endpoint deleted', { endpointId });
    } catch (error) {
      logger.error('Failed to delete webhook endpoint', {
        error: error.message,
        endpointId,
      });
      throw error;
    }
  }
}

export default new WebhookService();
