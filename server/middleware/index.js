import logger from '../utils/Logger.js';
import { HTTP_STATUS } from '../constants/index.js';
import { ResponseHandler } from '../utils/ResponseHandler.js';
import { AppError } from '../errors/AppError.js';

/**
 * Request logging middleware
 */
export const requestLoggingMiddleware = (req, res, next) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    logger.logRequest(req.method, req.path, res.statusCode, duration);
  });

  next();
};

/**
 * Error handling middleware
 */
export const errorHandlingMiddleware = (err, req, res, next) => {
  logger.error('Error occurred', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Handle AppError instances
  if (err instanceof AppError) {
    return ResponseHandler.error(res, err.message, err.statusCode, err.details);
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return ResponseHandler.validationError(res, err.errors || {});
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return ResponseHandler.unauthorized(res, 'Invalid token');
  }

  // Handle default server error
  return ResponseHandler.serverError(res, process.env.NODE_ENV === 'development' ? err.message : 'Internal server error');
};

/**
 * Not found middleware
 */
export const notFoundMiddleware = (req, res) => {
  logger.warn(`Route not found: ${req.method} ${req.path}`);
  return ResponseHandler.error(
    res,
    'Route not found',
    HTTP_STATUS.NOT_FOUND
  );
};

/**
 * CORS headers middleware
 */
export const corsMiddleware = (req, res, next) => {
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'];

  if (allowedOrigins.includes(req.get('origin'))) {
    res.setHeader('Access-Control-Allow-Origin', req.get('origin'));
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
};

/**
 * Security headers middleware
 */
export const securityHeadersMiddleware = (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

  next();
};

/**
 * Request timeout middleware
 */
export const requestTimeoutMiddleware = (timeout = 30000) => {
  return (req, res, next) => {
    const timeoutId = setTimeout(() => {
      if (!res.headersSent) {
        logger.warn(`Request timeout: ${req.method} ${req.path}`);
        return ResponseHandler.error(
          res,
          'Request timeout',
          HTTP_STATUS.INTERNAL_ERROR
        );
      }
    }, timeout);

    res.on('finish', () => clearTimeout(timeoutId));
    res.on('close', () => clearTimeout(timeoutId));

    next();
  };
};

/**
 * Body size limit middleware
 */
export const bodySizeLimitMiddleware = (limit = '10mb') => {
  return (req, res, next) => {
    if (req.get('content-length') > parseInt(limit)) {
      logger.warn(`Payload too large: ${req.get('content-length')} bytes`);
      return ResponseHandler.error(
        res,
        `Payload exceeds ${limit} limit`,
        HTTP_STATUS.BAD_REQUEST
      );
    }
    next();
  };
};

/**
 * Async wrapper to catch errors
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default {
  requestLoggingMiddleware,
  errorHandlingMiddleware,
  notFoundMiddleware,
  corsMiddleware,
  securityHeadersMiddleware,
  requestTimeoutMiddleware,
  bodySizeLimitMiddleware,
  asyncHandler,
};
