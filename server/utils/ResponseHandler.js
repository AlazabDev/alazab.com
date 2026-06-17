import { HTTP_STATUS, SUCCESS_MESSAGES } from '../constants/index.js';

/**
 * API Response Handler
 */
export class ResponseHandler {
  /**
   * Send success response
   */
  static success(res, data, message = 'Success', statusCode = HTTP_STATUS.OK) {
    return res.status(statusCode).json({
      status: 'success',
      statusCode,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Send error response
   */
  static error(res, message, statusCode = HTTP_STATUS.INTERNAL_ERROR, details = null) {
    return res.status(statusCode).json({
      status: 'error',
      statusCode,
      message,
      ...(details && { details }),
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Send paginated response
   */
  static paginated(res, data, pagination, message = 'Success') {
    return res.status(HTTP_STATUS.OK).json({
      status: 'success',
      statusCode: HTTP_STATUS.OK,
      message,
      data,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total: pagination.total,
        pages: Math.ceil(pagination.total / pagination.limit),
      },
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Send created response
   */
  static created(res, data, message = SUCCESS_MESSAGES.CREATED) {
    return this.success(res, data, message, HTTP_STATUS.CREATED);
  }

  /**
   * Send updated response
   */
  static updated(res, data, message = SUCCESS_MESSAGES.UPDATED) {
    return this.success(res, data, message, HTTP_STATUS.OK);
  }

  /**
   * Send deleted response
   */
  static deleted(res, message = SUCCESS_MESSAGES.DELETED) {
    return this.success(res, null, message, HTTP_STATUS.OK);
  }

  /**
   * Send not found response
   */
  static notFound(res, resource = 'Resource') {
    return this.error(res, `${resource} not found`, HTTP_STATUS.NOT_FOUND);
  }

  /**
   * Send unauthorized response
   */
  static unauthorized(res, message = 'Unauthorized access') {
    return this.error(res, message, HTTP_STATUS.UNAUTHORIZED);
  }

  /**
   * Send forbidden response
   */
  static forbidden(res, message = 'Access denied') {
    return this.error(res, message, HTTP_STATUS.FORBIDDEN);
  }

  /**
   * Send validation error response
   */
  static validationError(res, errors) {
    return this.error(
      res,
      'Validation failed',
      HTTP_STATUS.BAD_REQUEST,
      { errors }
    );
  }

  /**
   * Send conflict response
   */
  static conflict(res, message) {
    return this.error(res, message, HTTP_STATUS.CONFLICT);
  }

  /**
   * Send server error response
   */
  static serverError(res, message = 'Internal server error') {
    return this.error(res, message, HTTP_STATUS.INTERNAL_ERROR);
  }
}

export default ResponseHandler;
