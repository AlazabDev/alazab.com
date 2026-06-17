import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ErrorHandler } from '@/lib/errors/ErrorHandler';
import { AppError, ValidationError, AuthenticationError } from '@/lib/errors/AppError';

describe('Error Handling System', () => {
  describe('ErrorHandler', () => {
    it('should handle AppError instances', () => {
      const error = new ValidationError('Test error', { field: 'test' });
      const result = ErrorHandler.handle(error);

      expect(result).toBeInstanceOf(AppError);
      expect(result.message).toBe('Test error');
    });

    it('should convert standard Error to AppError', () => {
      const error = new Error('Standard error');
      const result = ErrorHandler.handle(error);

      expect(result).toBeInstanceOf(AppError);
      expect(result.message).toBe('Standard error');
    });

    it('should handle API errors correctly', () => {
      const error = new Error('Network error');
      const result = ErrorHandler.handleApiError(error, 'Default message');

      expect(result).toBeInstanceOf(AppError);
      expect(result.message).toBe('Network error');
    });

    it('should check if error is recoverable', () => {
      const validationError = new ValidationError('Test');
      expect(ErrorHandler.isRecoverable(validationError)).toBe(true);

      const authError = new AuthenticationError();
      expect(ErrorHandler.isRecoverable(authError)).toBe(true);
    });

    it('should get user-friendly message', () => {
      const error = new ValidationError('Invalid input');
      const message = ErrorHandler.getUserMessage(error);

      expect(message).toBeTruthy();
      expect(typeof message).toBe('string');
    });
  });

  describe('SafeAsync wrapper', () => {
    it('should return data on success', async () => {
      const [data, error] = await ErrorHandler.safeAsync(async () => ({
        result: 'success',
      }));

      expect(data).toEqual({ result: 'success' });
      expect(error).toBeNull();
    });

    it('should return error on failure', async () => {
      const [data, error] = await ErrorHandler.safeAsync(async () => {
        throw new Error('Test error');
      });

      expect(data).toBeNull();
      expect(error).toBeInstanceOf(AppError);
    });
  });

  describe('Safe sync wrapper', () => {
    it('should return data on success', () => {
      const [data, error] = ErrorHandler.safe(() => ({ result: 'success' }));

      expect(data).toEqual({ result: 'success' });
      expect(error).toBeNull();
    });

    it('should return error on failure', () => {
      const [data, error] = ErrorHandler.safe(() => {
        throw new Error('Test error');
      });

      expect(data).toBeNull();
      expect(error).toBeInstanceOf(AppError);
    });
  });

  describe('Error Types', () => {
    it('should create ValidationError with correct properties', () => {
      const error = new ValidationError('Invalid data', { field: 'email' });

      expect(error.type).toBe('validation');
      expect(error.severity).toBe('medium');
      expect(error.context.field).toBe('email');
    });

    it('should create AuthenticationError with correct properties', () => {
      const error = new AuthenticationError();

      expect(error.type).toBe('authentication');
      expect(error.statusCode).toBe(401);
    });

    it('should convert error to object', () => {
      const error = new ValidationError('Test error');
      const obj = error.toObject();

      expect(obj).toHaveProperty('type');
      expect(obj).toHaveProperty('message');
      expect(obj).toHaveProperty('severity');
      expect(obj).toHaveProperty('timestamp');
    });
  });
});
