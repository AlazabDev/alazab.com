/**
 * Base API Error Class
 */
export class AppError extends Error {
  constructor(message, statusCode = 500, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.timestamp = new Date().toISOString();

    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      status: 'error',
      statusCode: this.statusCode,
      message: this.message,
      details: this.details,
      timestamp: this.timestamp,
    };
  }
}

/**
 * Validation Error
 */
export class ValidationError extends AppError {
  constructor(message, details = null) {
    super(message, 400, details);
    this.name = 'ValidationError';
  }
}

/**
 * Authentication Error
 */
export class AuthenticationError extends AppError {
  constructor(message = 'Invalid credentials', details = null) {
    super(message, 401, details);
    this.name = 'AuthenticationError';
  }
}

/**
 * Authorization Error
 */
export class AuthorizationError extends AppError {
  constructor(message = 'Insufficient permissions', details = null) {
    super(message, 403, details);
    this.name = 'AuthorizationError';
  }
}

/**
 * Not Found Error
 */
export class NotFoundError extends AppError {
  constructor(resource = 'Resource', details = null) {
    super(`${resource} not found`, 404, details);
    this.name = 'NotFoundError';
  }
}

/**
 * Conflict Error
 */
export class ConflictError extends AppError {
  constructor(message, details = null) {
    super(message, 409, details);
    this.name = 'ConflictError';
  }
}

/**
 * Database Error
 */
export class DatabaseError extends AppError {
  constructor(message = 'Database operation failed', details = null) {
    super(message, 500, details);
    this.name = 'DatabaseError';
  }
}

/**
 * WhatsApp Service Error
 */
export class WhatsAppError extends AppError {
  constructor(message = 'WhatsApp service error', details = null) {
    super(message, 500, details);
    this.name = 'WhatsAppError';
  }
}

/**
 * Webhook Error
 */
export class WebhookError extends AppError {
  constructor(message = 'Webhook processing failed', details = null) {
    super(message, 400, details);
    this.name = 'WebhookError';
  }
}

/**
 * Rate Limit Error
 */
export class RateLimitError extends AppError {
  constructor(message = 'Too many requests', retryAfter = 60) {
    super(message, 429, { retryAfter });
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
}

/**
 * Configuration Error
 */
export class ConfigurationError extends AppError {
  constructor(message, details = null) {
    super(message, 500, details);
    this.name = 'ConfigurationError';
  }
}

export default {
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  DatabaseError,
  WhatsAppError,
  WebhookError,
  RateLimitError,
  ConfigurationError,
};
