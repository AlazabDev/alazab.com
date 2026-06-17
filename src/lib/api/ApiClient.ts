import { ErrorHandler } from '@/lib/errors/ErrorHandler';
import { AppError, AuthenticationError, NetworkError } from '@/lib/errors/AppError';
import { TokenManager, CSRFTokenManager } from '@/lib/security/TokenManager';

export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
  retries?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: AppError;
  status: number;
}

/**
 * Centralized API client with security, error handling, and automatic retries
 */
class ApiClient {
  private baseURL: string;
  private timeout: number = 30000;
  private maxRetries: number = 3;

  constructor(baseURL: string = '') {
    this.baseURL = baseURL || import.meta.env.VITE_API_BASE_URL || '/api';
  }

  /**
   * Set base URL
   */
  setBaseURL(url: string): void {
    this.baseURL = url;
  }

  /**
   * GET request
   */
  async get<T>(
    endpoint: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  /**
   * POST request
   */
  async post<T>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'POST', body });
  }

  /**
   * PUT request
   */
  async put<T>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'PUT', body });
  }

  /**
   * DELETE request
   */
  async delete<T>(
    endpoint: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }

  /**
   * Main request method with retry logic
   */
  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = this.timeout,
      retries = this.maxRetries,
    } = config;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await this.makeRequest<T>(
          endpoint,
          method,
          headers,
          body,
          timeout
        );

        if (!response.ok) {
          const error = await this.handleErrorResponse(response);
          return { success: false, error, status: response.status };
        }

        const data = await response.json();
        return { success: true, data, status: response.status };
      } catch (error) {
        // Retry on network errors or 5xx errors
        if (attempt < retries && (error instanceof NetworkError || 
            (error instanceof AppError && error.statusCode >= 500))) {
          await this.delay(Math.pow(2, attempt) * 1000); // Exponential backoff
          continue;
        }

        const appError = ErrorHandler.handle(error);
        return { success: false, error: appError, status: 0 };
      }
    }

    return {
      success: false,
      error: new NetworkError('فشل الاتصال بعد عدة محاولات'),
      status: 0,
    };
  }

  /**
   * Make the actual HTTP request
   */
  private async makeRequest<T>(
    endpoint: string,
    method: string,
    headers: Record<string, string>,
    body: unknown,
    timeout: number
  ): Promise<Response> {
    const url = this.buildUrl(endpoint);
    const options: RequestInit = {
      method,
      headers: this.prepareHeaders(headers),
      signal: AbortSignal.timeout(timeout),
    };

    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      options.body = JSON.stringify(body);
    }

    return fetch(url, options);
  }

  /**
   * Prepare headers with security tokens
   */
  private prepareHeaders(customHeaders: Record<string, string>): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    // Add authentication token
    const token = TokenManager.getAccessToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Add CSRF token
    const csrfHeaders = CSRFTokenManager.getHeader();
    Object.assign(headers, csrfHeaders);

    return headers;
  }

  /**
   * Build full URL from endpoint
   */
  private buildUrl(endpoint: string): string {
    if (endpoint.startsWith('http')) {
      return endpoint;
    }
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${this.baseURL}${normalizedEndpoint}`;
  }

  /**
   * Handle error responses from server
   */
  private async handleErrorResponse(response: Response): Promise<AppError> {
    try {
      const data = await response.json();

      // Handle specific error responses from server
      if (data.error) {
        return new AppError(
          data.error.message || 'حدث خطأ',
          data.error.type || 'server_error',
          {
            statusCode: response.status,
            context: data.error.context,
          }
        );
      }
    } catch {
      // If response is not JSON, create generic error
    }

    // Handle common HTTP error codes
    switch (response.status) {
      case 401:
        TokenManager.clearTokens();
        return new AuthenticationError('انتهت جلستك. الرجاء تسجيل الدخول مجددا');
      case 403:
        return new AppError('ليس لديك صلاحية للقيام بهذه العملية', 'authorization', {
          statusCode: 403,
        });
      case 404:
        return new AppError('المورد المطلوب غير موجود', 'not_found', {
          statusCode: 404,
        });
      case 409:
        return new AppError('تعارض في البيانات', 'conflict', { statusCode: 409 });
      case 429:
        return new AppError('الكثير من الطلبات. حاول لاحقا', 'network', {
          statusCode: 429,
        });
      case 500:
      case 502:
      case 503:
      case 504:
        return new AppError('خطأ في الخادم. حاول لاحقا', 'server_error', {
          statusCode: response.status,
        });
      default:
        return new AppError(
          `الخطأ: ${response.statusText || 'خطأ غير معروف'}`,
          'server_error',
          { statusCode: response.status }
        );
    }
  }

  /**
   * Delay utility for retries
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
