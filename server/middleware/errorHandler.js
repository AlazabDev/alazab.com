/**
 * Server-side error handler middleware
 * Standardizes error responses across all API endpoints
 */

const { errorLogger } = require('../utils/Logger');

class ServerError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.timestamp = new Date().toISOString();
  }
}

// Common error types
class ValidationError extends ServerError {
  constructor(message, errors = {}) {
    super(message, 400, 'VALIDATION_ERROR');
    this.errors = errors;
  }
}

class AuthenticationError extends ServerError {
  constructor(message = 'Authentication failed') {
    super(message, 401, 'AUTHENTICATION_ERROR');
  }
}

class AuthorizationError extends ServerError {
  constructor(message = 'Insufficient permissions') {
    super(message, 403, 'AUTHORIZATION_ERROR');
  }
}

class NotFoundError extends ServerError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

class ConflictError extends ServerError {
  constructor(message) {
    super(message, 409, 'CONFLICT');
  }
}

class RateLimitError extends ServerError {
  constructor(retryAfter = 60) {
    super('Too many requests. Please try again later.', 429, 'RATE_LIMIT');
    this.retryAfter = retryAfter;
  }
}

/**
 * Error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  // Log error
  console.error(`[${new Date().toISOString()}] Error:`, {
    message: err.message,
    code: err.code || 'UNKNOWN',
    path: req.path,
    method: req.method,
    ip: req.ip,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });

  // Handle specific error types
  if (err instanceof ServerError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        code: err.code,
        errors: err.errors || undefined,
        timestamp: err.timestamp,
      },
    });
  }

  // Handle validation errors from libraries
  if (err.name === 'ValidationError' || err.name === 'SyntaxError') {
    return res.status(400).json({
      error: {
        message: 'Invalid request data',
        code: 'VALIDATION_ERROR',
        timestamp: new Date().toISOString(),
      },
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: {
        message: 'Invalid token',
        code: 'INVALID_TOKEN',
        timestamp: new Date().toISOString(),
      },
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: {
        message: 'Token expired',
        code: 'TOKEN_EXPIRED',
        timestamp: new Date().toISOString(),
      },
    });
  }

  // Default error response
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : err.message;

  res.status(statusCode).json({
    error: {
      message,
      code: err.code || 'INTERNAL_ERROR',
      timestamp: new Date().toISOString(),
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};

/**
 * Async handler wrapper
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  ServerError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  errorHandler,
  asyncHandler,
};
