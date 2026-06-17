import jwt from 'jsonwebtoken';
import { AuthenticationError, AuthorizationError } from '../errors/AppError.js';
import { USER_ROLES, PERMISSIONS } from '../constants/index.js';
import logger from '../utils/Logger.js';

/**
 * Verify JWT token
 */
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    return decoded;
  } catch (error) {
    logger.error('Token verification failed', { error: error.message });
    throw new AuthenticationError('Invalid or expired token');
  }
};

/**
 * Authenticate middleware - verify token from headers
 */
export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('Missing or invalid Authorization header');
    }

    const token = authHeader.slice(7);
    const decoded = verifyToken(token);

    req.user = decoded;
    req.userId = decoded.id;
    req.userRole = decoded.role;

    logger.debug('User authenticated', { userId: decoded.id, role: decoded.role });
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Optional authentication middleware
 */
export const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      const decoded = verifyToken(token);
      req.user = decoded;
      req.userId = decoded.id;
      req.userRole = decoded.role;
    }
  } catch (error) {
    logger.debug('Optional authentication failed', { error: error.message });
    // Don't throw error, just continue without user
  }

  next();
};

/**
 * Authorize by role
 */
export const authorize = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new AuthenticationError('User not authenticated');
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(req.userRole)) {
      logger.warn('Unauthorized access attempt', {
        userId: req.userId,
        requiredRoles: allowedRoles,
        userRole: req.userRole,
      });
      throw new AuthorizationError('You do not have permission to access this resource');
    }

    next();
  };
};

/**
 * Authorize by permission
 */
export const authorizePermission = (requiredPermissions = []) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new AuthenticationError('User not authenticated');
    }

    const userPermissions = req.user.permissions || [];
    const hasPermission = requiredPermissions.every(perm => userPermissions.includes(perm));

    if (!hasPermission) {
      logger.warn('Permission denied', {
        userId: req.userId,
        requiredPermissions,
        userPermissions,
      });
      throw new AuthorizationError('Insufficient permissions');
    }

    next();
  };
};

/**
 * Admin only middleware
 */
export const adminOnly = (req, res, next) => {
  return authorize([USER_ROLES.ADMIN])(req, res, next);
};

/**
 * Manager or Admin middleware
 */
export const managerOrAdmin = (req, res, next) => {
  return authorize([USER_ROLES.ADMIN, USER_ROLES.MANAGER])(req, res, next);
};

/**
 * Verify ownership - user can only access their own data
 */
export const verifyOwnership = (req, res, next) => {
  const targetUserId = req.params.userId || req.body.userId;
  const isAdmin = req.userRole === USER_ROLES.ADMIN;

  if (!isAdmin && req.userId !== parseInt(targetUserId)) {
    logger.warn('Ownership verification failed', {
      userId: req.userId,
      targetUserId,
    });
    throw new AuthorizationError('You can only access your own data');
  }

  next();
};

/**
 * Rate limit by user
 */
export const userRateLimitMiddleware = (options = {}) => {
  const { windowMs = 60000, maxRequests = 100 } = options;
  const store = new Map();

  return (req, res, next) => {
    const key = req.userId || req.ip;
    const now = Date.now();
    const userRequests = store.get(key) || [];

    // Remove old requests outside the window
    const validRequests = userRequests.filter(time => now - time < windowMs);

    if (validRequests.length >= maxRequests) {
      logger.warn('Rate limit exceeded', {
        userId: req.userId,
        ip: req.ip,
        requests: validRequests.length,
      });
      const retryAfter = Math.ceil((validRequests[0] + windowMs - now) / 1000);
      res.setHeader('Retry-After', retryAfter);
      throw new Error('Too many requests');
    }

    validRequests.push(now);
    store.set(key, validRequests);

    // Cleanup old entries periodically
    if (store.size > 1000) {
      const keys = Array.from(store.keys());
      keys.slice(0, 100).forEach(k => store.delete(k));
    }

    next();
  };
};

export default {
  verifyToken,
  authenticate,
  optionalAuth,
  authorize,
  authorizePermission,
  adminOnly,
  managerOrAdmin,
  verifyOwnership,
  userRateLimitMiddleware,
};
