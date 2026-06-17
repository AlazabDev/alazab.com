import { AuthenticationError } from '@/lib/errors/AppError';

/**
 * Security utilities for token management and validation
 */
export class TokenManager {
  private static readonly TOKEN_KEY = 'auth_token';
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private static readonly TOKEN_EXPIRY_KEY = 'token_expiry';

  /**
   * Set authentication tokens securely
   */
  static setTokens(
    accessToken: string,
    refreshToken: string,
    expiresIn: number
  ): void {
    if (!this.isValidToken(accessToken)) {
      throw new AuthenticationError('رمز المصادقة غير صالح');
    }

    try {
      sessionStorage.setItem(this.TOKEN_KEY, accessToken);
      // Store refresh token in httpOnly cookie ideally, but for now use localStorage
      localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
      localStorage.setItem(
        this.TOKEN_EXPIRY_KEY,
        (Date.now() + expiresIn * 1000).toString()
      );
    } catch (error) {
      throw new Error('فشل في حفظ بيانات المصادقة');
    }
  }

  /**
   * Get access token from storage
   */
  static getAccessToken(): string | null {
    try {
      return sessionStorage.getItem(this.TOKEN_KEY);
    } catch {
      return null;
    }
  }

  /**
   * Get refresh token from storage
   */
  static getRefreshToken(): string | null {
    try {
      return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    } catch {
      return null;
    }
  }

  /**
   * Clear all tokens
   */
  static clearTokens(): void {
    try {
      sessionStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
      localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
    } catch {
      // Silently fail
    }
  }

  /**
   * Check if token is expired
   */
  static isTokenExpired(): boolean {
    try {
      const expiry = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
      if (!expiry) return true;
      return Date.now() > parseInt(expiry, 10);
    } catch {
      return true;
    }
  }

  /**
   * Validate token format (basic JWT validation)
   */
  static isValidToken(token: string): boolean {
    try {
      // Basic JWT structure check: xxxxx.yyyyy.zzzzz
      const parts = token.split('.');
      if (parts.length !== 3) return false;

      // Check if parts are valid base64
      for (const part of parts) {
        if (!part || !/^[A-Za-z0-9_-]+$/.test(part)) return false;
      }

      return true;
    } catch {
      return false;
    }
  }

  /**
   * Decode JWT payload (without verification - for client-side only)
   */
  static decodeToken(token: string): Record<string, unknown> | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const payload = parts[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }

  /**
   * Get token expiration time
   */
  static getTokenExpiresIn(): number | null {
    try {
      const expiry = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
      if (!expiry) return null;
      const expiryTime = parseInt(expiry, 10);
      const remaining = expiryTime - Date.now();
      return remaining > 0 ? remaining : null;
    } catch {
      return null;
    }
  }
}

/**
 * CSRF token management
 */
export class CSRFTokenManager {
  private static readonly CSRF_TOKEN_KEY = 'csrf_token';
  private static readonly CSRF_HEADER = 'X-CSRF-Token';

  static setToken(token: string): void {
    try {
      sessionStorage.setItem(this.CSRF_TOKEN_KEY, token);
    } catch {
      // Silently fail
    }
  }

  static getToken(): string | null {
    try {
      return sessionStorage.getItem(this.CSRF_TOKEN_KEY);
    } catch {
      return null;
    }
  }

  static getHeader(): Record<string, string> {
    const token = this.getToken();
    return token ? { [this.CSRF_HEADER]: token } : {};
  }
}

/**
 * Password validation utilities
 */
export class PasswordValidator {
  static validate(password: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('كلمة المرور يجب أن تحتوي على حرف صغير واحد على الأقل');
    }

    if (!/\d/.test(password)) {
      errors.push('كلمة المرور يجب أن تحتوي على رقم واحد على الأقل');
    }

    if (!/[!@#$%^&*]/.test(password)) {
      errors.push('كلمة المرور يجب أن تحتوي على رمز خاص واحد (!@#$%^&*)');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  static getStrength(password: string): 'weak' | 'medium' | 'strong' {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;

    if (strength <= 2) return 'weak';
    if (strength <= 4) return 'medium';
    return 'strong';
  }
}
