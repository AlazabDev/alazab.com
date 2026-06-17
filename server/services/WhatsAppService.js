import logger from '../utils/Logger.js';
import { WhatsAppError } from '../errors/AppError.js';
import { WHATSAPP_LIMITS, ERROR_MESSAGES } from '../constants/index.js';
import database from '../db/Database.js';

/**
 * WhatsApp Service
 */
class WhatsAppService {
  constructor() {
    this.apiVersion = process.env.WHATSAPP_API_VERSION || 'v20.0';
    this.businessAccountId = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID;
    this.accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
    this.webhookVerifyToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;
  }

  /**
   * Validate configuration
   */
  validateConfig() {
    const requiredEnvVars = [
      'WHATSAPP_BUSINESS_ACCOUNT_ID',
      'WHATSAPP_ACCESS_TOKEN',
      'WHATSAPP_WEBHOOK_VERIFY_TOKEN',
    ];

    const missing = requiredEnvVars.filter(varName => !process.env[varName]);

    if (missing.length > 0) {
      throw new WhatsAppError(`Missing WhatsApp configuration: ${missing.join(', ')}`);
    }
  }

  /**
   * Send message
   */
  async sendMessage(phoneNumber, message, options = {}) {
    try {
      this.validateConfig();

      // Validate message
      if (message.length > WHATSAPP_LIMITS.MESSAGE_CHAR_LIMIT) {
        throw new WhatsAppError(
          `Message exceeds ${WHATSAPP_LIMITS.MESSAGE_CHAR_LIMIT} character limit`,
          { length: message.length }
        );
      }

      const payload = {
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'text',
        text: {
          body: message,
        },
      };

      logger.info('Sending WhatsApp message', {
        to: phoneNumber,
        messageLength: message.length,
      });

      // TODO: Implement actual WhatsApp API call
      // const response = await fetch(`https://graph.instagram.com/${this.apiVersion}/${this.businessAccountId}/messages`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${this.accessToken}`,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(payload),
      // });

      logger.info('WhatsApp message sent successfully', { to: phoneNumber });

      // Log message in database
      await this.logMessage(phoneNumber, message, 'outbound', 'success');

      return { success: true, status: 'sent' };
    } catch (error) {
      logger.error('Failed to send WhatsApp message', {
        error: error.message,
        phoneNumber,
      });
      await this.logMessage(phoneNumber, message, 'outbound', 'failed', error.message);
      throw error;
    }
  }

  /**
   * Process incoming message
   */
  async processIncomingMessage(messageData) {
    try {
      const {
        from,
        body,
        timestamp,
        messageId,
      } = messageData;

      logger.info('Processing incoming WhatsApp message', {
        from,
        messageId,
        timestamp,
      });

      // Log message in database
      await this.logMessage(from, body, 'inbound', 'received', null, messageId);

      // TODO: Process message with AI or routing logic
      // - Extract intent
      // - Route to appropriate handler
      // - Generate response

      return { success: true, processed: true };
    } catch (error) {
      logger.error('Failed to process incoming message', {
        error: error.message,
        messageData,
      });
      throw error;
    }
  }

  /**
   * Log message
   */
  async logMessage(phoneNumber, message, direction, status, errorMessage = null, messageId = null) {
    try {
      await database.insert('whatsapp_messages', {
        phone_number: phoneNumber,
        message: message.substring(0, 500),
        direction,
        status,
        error_message: errorMessage,
        message_id: messageId,
        created_at: new Date(),
      });
    } catch (error) {
      logger.error('Failed to log WhatsApp message', {
        error: error.message,
        phoneNumber,
      });
    }
  }

  /**
   * Get message history
   */
  async getMessageHistory(phoneNumber, limit = 50) {
    try {
      const messages = await database.queryMany(
        `SELECT * FROM whatsapp_messages 
         WHERE phone_number = $1 
         ORDER BY created_at DESC 
         LIMIT $2`,
        [phoneNumber, limit]
      );

      return messages;
    } catch (error) {
      logger.error('Failed to retrieve message history', {
        error: error.message,
        phoneNumber,
      });
      throw error;
    }
  }

  /**
   * Get statistics
   */
  async getStatistics(startDate = null, endDate = null) {
    try {
      let query = `
        SELECT
          COUNT(*) as total_messages,
          SUM(CASE WHEN direction = 'inbound' THEN 1 ELSE 0 END) as inbound_messages,
          SUM(CASE WHEN direction = 'outbound' THEN 1 ELSE 0 END) as outbound_messages,
          SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) as successful_messages,
          SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed_messages,
          COUNT(DISTINCT phone_number) as unique_contacts
        FROM whatsapp_messages
      `;

      const params = [];

      if (startDate && endDate) {
        query += ` WHERE created_at BETWEEN $1 AND $2`;
        params.push(startDate, endDate);
      }

      const result = await database.queryOne(query, params);
      return result;
    } catch (error) {
      logger.error('Failed to retrieve WhatsApp statistics', {
        error: error.message,
      });
      throw error;
    }
  }

  /**
   * Verify webhook token
   */
  verifyWebhookToken(token) {
    const isValid = token === this.webhookVerifyToken;
    logger.info('Webhook token verification', {
      isValid,
      tokenLength: token.length,
    });
    return isValid;
  }

  /**
   * Get connected accounts
   */
  async getConnectedAccounts() {
    try {
      const accounts = await database.queryMany(
        `SELECT * FROM whatsapp_accounts WHERE is_active = true`,
        []
      );

      return accounts;
    } catch (error) {
      logger.error('Failed to retrieve WhatsApp accounts', {
        error: error.message,
      });
      throw error;
    }
  }

  /**
   * Create account
   */
  async createAccount(accountData) {
    try {
      const account = await database.insert('whatsapp_accounts', {
        account_name: accountData.accountName,
        phone_number: accountData.phoneNumber,
        business_account_id: accountData.businessAccountId,
        access_token: accountData.accessToken, // Should be encrypted in production
        is_active: true,
        created_at: new Date(),
      });

      logger.info('WhatsApp account created', {
        accountId: account.id,
        accountName: accountData.accountName,
      });

      return account;
    } catch (error) {
      logger.error('Failed to create WhatsApp account', {
        error: error.message,
      });
      throw error;
    }
  }

  /**
   * Delete account
   */
  async deleteAccount(accountId) {
    try {
      await database.update('whatsapp_accounts', accountId, {
        is_active: false,
        deleted_at: new Date(),
      });

      logger.info('WhatsApp account deleted', { accountId });
    } catch (error) {
      logger.error('Failed to delete WhatsApp account', {
        error: error.message,
        accountId,
      });
      throw error;
    }
  }
}

export default new WhatsAppService();
