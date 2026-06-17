import { useState, useCallback } from 'react';
import { AppError, ErrorType } from '@/lib/errors/AppError';
import { ErrorHandler } from '@/lib/errors/ErrorHandler';

interface UseErrorHandlerReturn {
  error: AppError | null;
  setError: (error: AppError | Error | null) => void;
  clearError: () => void;
  handleError: (error: unknown, context?: Record<string, unknown>) => void;
  isError: boolean;
  errorMessage: string;
}

/**
 * Hook for centralized error handling in components
 */
export function useErrorHandler(): UseErrorHandlerReturn {
  const [error, setError] = useState<AppError | null>(null);

  const handleError = useCallback((
    errorInput: unknown,
    context?: Record<string, unknown>
  ) => {
    const appError = ErrorHandler.handle(errorInput, context);
    setError(appError);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const updateError = useCallback((newError: AppError | Error | null) => {
    if (newError === null) {
      setError(null);
    } else if (newError instanceof AppError) {
      setError(newError);
    } else if (newError instanceof Error) {
      const appError = ErrorHandler.handle(newError);
      setError(appError);
    }
  }, []);

  return {
    error,
    setError: updateError,
    clearError,
    handleError,
    isError: error !== null,
    errorMessage: error?.userMessage || '',
  };
}

interface UseAsyncReturn<T> {
  data: T | null;
  loading: boolean;
  error: AppError | null;
  execute: () => Promise<void>;
}

/**
 * Hook for handling async operations with error handling
 */
export function useAsync<T>(
  asyncFn: () => Promise<T>,
  onSuccess?: (data: T) => void
): UseAsyncReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);

    const [result, err] = await ErrorHandler.safeAsync(asyncFn);

    if (err) {
      setError(err);
    } else if (result) {
      setData(result);
      onSuccess?.(result);
    }

    setLoading(false);
  }, [asyncFn, onSuccess]);

  return { data, loading, error, execute };
}

interface UseFormErrorsReturn {
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
  clearErrors: () => void;
  clearFieldError: (field: string) => void;
  setFieldError: (field: string, error: string) => void;
}

/**
 * Hook for managing form validation errors
 */
export function useFormErrors(): UseFormErrorsReturn {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearFieldError = useCallback((field: string) => {
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  }, []);

  const setFieldError = useCallback((field: string, error: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  }, []);

  return {
    errors,
    setErrors,
    clearErrors,
    clearFieldError,
    setFieldError,
  };
}
