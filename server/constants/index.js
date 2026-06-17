// API Status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
  GUEST: 'guest',
};

// Permission levels
export const PERMISSIONS = {
  READ: 'read',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  MANAGE_USERS: 'manage_users',
  VIEW_ANALYTICS: 'view_analytics',
  MANAGE_WEBHOOKS: 'manage_webhooks',
  MANAGE_DATABASE: 'manage_database',
};

// API Routes prefixes
export const API_PREFIX = '/api/v1';
export const ADMIN_PREFIX = '/admin';
export const AUTH_PREFIX = '/auth';
export const WEBHOOK_PREFIX = '/webhooks';

// Rate limiting
export const RATE_LIMIT = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS: 200,
  MESSAGE: 'Too many requests from this IP, please try again later.',
};

// Session
export const SESSION_CONFIG = {
  COOKIE_MAX_AGE: 7 * 24 * 60 * 60 * 1000, // 7 days
  COOKIE_SECURE: process.env.NODE_ENV === 'production',
  COOKIE_HTTP_ONLY: true,
  COOKIE_SAME_SITE: 'strict',
};

// WhatsApp limits
export const WHATSAPP_LIMITS = {
  MESSAGE_CHAR_LIMIT: 4096,
  MEDIA_SIZE_LIMIT: 100 * 1024 * 1024, // 100MB
  BATCH_SIZE: 100,
};

// Database
export const DATABASE_TIMEOUTS = {
  CONNECTION: 10000,
  QUERY: 30000,
  POOL_IDLE: 10000,
};

// Log levels
export const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
  TRACE: 'trace',
};

// Error messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'غير مصرح لك بالوصول إلى هذا المورد',
  FORBIDDEN: 'الوصول مرفوع',
  NOT_FOUND: 'المورد غير موجود',
  INVALID_INPUT: 'بيانات المدخل غير صحيحة',
  SERVER_ERROR: 'حدث خطأ في الخادم',
  WEBHOOK_FAILED: 'فشل معالجة الـ Webhook',
  DATABASE_ERROR: 'خطأ في قاعدة البيانات',
  WHATSAPP_ERROR: 'خطأ في إرسال رسالة WhatsApp',
};

// Success messages
export const SUCCESS_MESSAGES = {
  CREATED: 'تم الإنشاء بنجاح',
  UPDATED: 'تم التحديث بنجاح',
  DELETED: 'تم الحذف بنجاح',
  AUTHENTICATED: 'تم التحقق بنجاح',
  WEBHOOK_RECEIVED: 'تم استقبال الـ Webhook بنجاح',
};

export default {
  HTTP_STATUS,
  USER_ROLES,
  PERMISSIONS,
  API_PREFIX,
  ADMIN_PREFIX,
  AUTH_PREFIX,
  WEBHOOK_PREFIX,
  RATE_LIMIT,
  SESSION_CONFIG,
  WHATSAPP_LIMITS,
  DATABASE_TIMEOUTS,
  LOG_LEVELS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};
