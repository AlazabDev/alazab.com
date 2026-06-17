import { AppError, ErrorType } from './AppError';
import { errorLogger } from './ErrorLogger';

/**
 * Global error handler that processes all types of errors
 */
export class ErrorHandler {
  /**
   * Handle an error and return a standardized response
   */
  static handle(error: unknown, context?: Record<string, unknown>): AppError {
    let appError: AppError;

    if (error instanceof AppError) {
      appError = error;
    } else if (error instanceof Error) {
      appError = this.convertError(error);
    } else {
      appError = new AppError(
        'حدث خطأ غير متوقع',
        ErrorType.UNKNOWN,
        { context }
      );
    }

    // Log the error
    errorLogger.logError(appError, context);

    return appError;
  }

  /**
   * Convert standard Error to AppError
   */
  private static convertError(error: Error): AppError {
    const message = error.message || 'خطأ غير محدد';

    // Handle network errors
    if (error.name === 'NetworkError' || error.message.includes('network')) {
      return new AppError(message, ErrorType.NETWORK);
    }

    // Handle timeout errors
    if (error.message.includes('timeout')) {
      return new AppError(message, ErrorType.TIMEOUT);
    }

    // Default to server error
    return new AppError(message, ErrorType.SERVER_ERROR);
  }

  /**
   * Handle API errors
   */
  static handleApiError(
    error: unknown,
    defaultMessage = 'حدث خطأ في الطلب'
  ): AppError {
    if (error instanceof AppError) {
      return error;
    }

    if (error instanceof Error) {
      return new AppError(error.message || defaultMessage, ErrorType.NETWORK);
    }

    return new AppError(defaultMessage, ErrorType.SERVER_ERROR);
  }

  /**
   * Handle form validation errors
   */
  static handleValidationError(
    errors: Record<string, string | string[]>
  ): AppError {
    const messages = Object.entries(errors)
      .map(([field, error]) => {
        const message = Array.isArray(error) ? error.join(', ') : error;
        return `${field}: ${message}`;
      })
      .join('\n');

    return new AppError(messages, ErrorType.VALIDATION, {
      context: { fieldErrors: errors },
    });
  }

  /**
   * Safe async wrapper
   */
  static async safeAsync<T>(
    fn: () => Promise<T>,
    errorMessage = 'فشل تنفيذ العملية'
  ): Promise<[null, AppError] | [T, null]> {
    try {
      const result = await fn();
      return [result, null];
    } catch (error) {
      const appError = this.handle(error, { originalMessage: errorMessage });
      return [null, appError];
    }
  }

  /**
   * Safe sync wrapper
   */
  static safe<T>(
    fn: () => T,
    errorMessage = 'فشل تنفيذ العملية'
  ): [null, AppError] | [T, null] {
    try {
      const result = fn();
      return [result, null];
    } catch (error) {
      const appError = this.handle(error, { originalMessage: errorMessage });
      return [null, appError];
    }
  }

  /**
   * Check if error is recoverable
   */
  static isRecoverable(error: unknown): boolean {
    if (error instanceof AppError) {
      return error.recoverable;
    }
    return true; // Assume most errors are recoverable
  }

  /**
   * Get user-friendly error message
   */
  static getUserMessage(error: unknown): string {
    if (error instanceof AppError) {
      return error.userMessage;
    }
    if (error instanceof Error) {
      return 'حدث خطأ ما. يرجى المحاولة لاحقا';
    }
    return 'حدث خطأ غير متوقع';
  }
}
