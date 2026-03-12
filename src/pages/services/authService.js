import axios from 'axios';

// التحقق من وجود متغيرات البيئة
const requiredEnvVars = [
  'VITE_API_URL',
  'VITE_GOOGLE_CLIENT_ID',
  'VITE_GOOGLE_REDIRECT_URI',
  'VITE_FACEBOOK_APP_ID',
  'VITE_FACEBOOK_REDIRECT_URI'
];

requiredEnvVars.forEach(varName => {
  if (!import.meta.env[varName]) {
    console.error(`Missing environment variable: ${varName}`);
  }
});

const API_URL = import.meta.env.VITE_API_URL;

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      timeout: 30000 // 30 seconds timeout
    });

    this.setupInterceptors();
  }

  setupInterceptors() {
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Add CSRF token if available
        const csrfToken = this.getCsrfToken();
        if (csrfToken) {
          config.headers['X-CSRF-Token'] = csrfToken;
        }
        
        return config;
      },
      (error) => Promise.reject(this.handleError(error))
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Handle token refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          return this.handleTokenRefresh(originalRequest);
        }

        // Handle rate limiting
        if (error.response?.status === 429) {
          return this.handleRateLimit(error);
        }

        return Promise.reject(this.handleError(error));
      }
    );
  }

  async handleTokenRefresh(originalRequest) {
    originalRequest._retry = true;

    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await this.refreshToken(refreshToken);
      
      this.setTokens(response.tokens);
      
      originalRequest.headers.Authorization = `Bearer ${response.tokens.access}`;
      return this.api(originalRequest);
    } catch (refreshError) {
      await this.logout(false); // false = don't redirect yet
      window.location.href = '/login?session=expired';
      return Promise.reject(this.handleError(refreshError));
    }
  }

  handleRateLimit(error) {
    const retryAfter = error.response?.headers['retry-after'] || 60;
    console.warn(`Rate limited. Retry after ${retryAfter} seconds`);
    
    // يمكن إضافة إشعار للمستخدم هنا
    return Promise.reject({
      ...error,
      message: `تم تجاوز الحد المسموح. الرجاء المحاولة بعد ${retryAfter} ثانية`
    });
  }

  handleError(error) {
    if (error.response) {
      // خطأ من السيرفر
      return {
        status: error.response.status,
        message: error.response.data?.message || 'حدث خطأ في السيرفر',
        data: error.response.data
      };
    } else if (error.request) {
      // لا يوجد استجابة من السيرفر
      return {
        status: 503,
        message: 'لا يمكن الاتصال بالخادم. تحقق من اتصالك بالإنترنت'
      };
    } else {
      // خطأ في الإعداد
      return {
        status: 500,
        message: error.message || 'حدث خطأ غير متوقع'
      };
    }
  }

  // ==================== OAuth Methods ====================

  initiateGoogleLogin() {
    const state = this.generateState();
    const codeVerifier = this.generateCodeVerifier();
    
    localStorage.setItem('oauth_state', state);
    localStorage.setItem('code_verifier', codeVerifier);

    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
      response_type: 'code',
      scope: 'openid email profile',
      state: state,
      prompt: 'consent',
      access_type: 'offline',
      code_challenge: codeVerifier, // PKCE
      code_challenge_method: 'plain'
    });

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  initiateFacebookLogin() {
    const state = this.generateState();
    localStorage.setItem('oauth_state', state);

    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_FACEBOOK_APP_ID,
      redirect_uri: import.meta.env.VITE_FACEBOOK_REDIRECT_URI,
      response_type: 'code',
      scope: 'email,public_profile',
      state: state,
      auth_type: 'rerequest' // لإعادة طلب الأذونات المرفوضة
    });

    window.location.href = `https://www.facebook.com/v18.0/dialog/oauth?${params.toString()}`;
  }

  async handleOAuthCallback(provider, code, state) {
    try {
      // Verify state for CSRF protection
      const savedState = localStorage.getItem('oauth_state');
      if (state && state !== savedState) {
        throw new Error('Invalid state parameter - possible CSRF attack');
      }
      
      // Clean up
      localStorage.removeItem('oauth_state');
      
      // Get code verifier for PKCE (if using Google)
      const codeVerifier = provider === 'google' 
        ? localStorage.getItem('code_verifier') 
        : null;
      
      if (provider === 'google') {
        localStorage.removeItem('code_verifier');
      }

      const response = await this.api.post(`/auth/callback/${provider}`, { 
        code,
        code_verifier: codeVerifier 
      });
      
      if (response.data.success) {
        this.setSession(response.data);
        
        // Store user permissions
        if (response.data.permissions) {
          localStorage.setItem('permissions', JSON.stringify(response.data.permissions));
        }
      }
      
      return response.data;
    } catch (error) {
      console.error(`${provider} callback error:`, error);
      throw this.handleError(error);
    }
  }

  // ==================== Local Auth Methods ====================

  async register(userData) {
    try {
      const response = await this.api.post('/auth/register', userData);
      if (response.data.success) {
        this.setSession(response.data);
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async login(credentials) {
    try {
      const response = await this.api.post('/auth/login', credentials);
      if (response.data.success) {
        this.setSession(response.data);
        
        // Check if 2FA is required
        if (response.data.requiresTwoFactor) {
          return { ...response.data, requiresTwoFactor: true };
        }
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async verifyTwoFactor(userId, token) {
    try {
      const response = await this.api.post('/auth/2fa/verify', { userId, token });
      if (response.data.success) {
        this.setSession(response.data);
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async refreshToken(refreshToken) {
    try {
      const response = await this.api.post('/auth/refresh', { refreshToken });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ==================== Phone Verification ====================

  async requestPhoneVerification(phoneNumber) {
    try {
      const response = await this.api.post('/auth/request-verification', { phoneNumber });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async verifyPhone(code) {
    try {
      const response = await this.api.post('/auth/verify-phone', { code });
      if (response.data.success) {
        // تحديث حالة المستخدم في local storage
        const user = this.getCurrentUser();
        if (user) {
          user.isPhoneVerified = true;
          localStorage.setItem('user', JSON.stringify(user));
        }
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ==================== 2FA Methods ====================

  async setupTwoFactor() {
    try {
      const response = await this.api.post('/auth/2fa/setup');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async enableTwoFactor(token) {
    try {
      const response = await this.api.post('/auth/2fa/enable', { token });
      if (response.data.success) {
        const user = this.getCurrentUser();
        if (user) {
          user.isTwoFactorEnabled = true;
          localStorage.setItem('user', JSON.stringify(user));
        }
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async disableTwoFactor(token) {
    try {
      const response = await this.api.post('/auth/2fa/disable', { token });
      if (response.data.success) {
        const user = this.getCurrentUser();
        if (user) {
          user.isTwoFactorEnabled = false;
          localStorage.setItem('user', JSON.stringify(user));
        }
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ==================== Password Management ====================

  async forgotPassword(email) {
    try {
      const response = await this.api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async resetPassword(token, password) {
    try {
      const response = await this.api.post(`/auth/reset-password/${token}`, { password });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async changePassword(currentPassword, newPassword) {
    try {
      const response = await this.api.post('/auth/change-password', {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ==================== Email Verification ====================

  async verifyEmail(token) {
    try {
      const response = await this.api.get(`/auth/verify-email/${token}`);
      if (response.data.success) {
        const user = this.getCurrentUser();
        if (user) {
          user.isEmailVerified = true;
          localStorage.setItem('user', JSON.stringify(user));
        }
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async resendVerificationEmail() {
    try {
      const response = await this.api.post('/auth/resend-verification');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ==================== Session Management ====================

  async logout(redirect = true) {
    const refreshToken = this.getRefreshToken();
    const accessToken = this.getAccessToken();

    if (refreshToken && accessToken) {
      try {
        await this.api.post('/auth/logout', { refreshToken });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }

    this.clearSession();

    if (redirect) {
      window.location.href = '/login';
    }
  }

  async logoutAll(redirect = true) {
    try {
      await this.api.post('/auth/logout-all');
    } catch (error) {
      console.error('Logout all error:', error);
    }

    this.clearSession();

    if (redirect) {
      window.location.href = '/login';
    }
  }

  // ==================== Token Management ====================

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  setTokens(tokens) {
    if (tokens.access) {
      localStorage.setItem('accessToken', tokens.access);
    }
    if (tokens.refresh) {
      localStorage.setItem('refreshToken', tokens.refresh);
    }
  }

  getCsrfToken() {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  }

  // ==================== Session Management ====================

  setSession(authResult) {
    this.setTokens(authResult.tokens);
    
    if (authResult.user) {
      localStorage.setItem('user', JSON.stringify(authResult.user));
    }
    
    if (authResult.permissions) {
      localStorage.setItem('permissions', JSON.stringify(authResult.permissions));
    }

    // Set session expiry
    if (authResult.tokens.expiresIn) {
      const expiryTime = Date.now() + (authResult.tokens.expiresIn * 1000);
      localStorage.setItem('session_expiry', expiryTime.toString());
    }
  }

  clearSession() {
    const keysToRemove = [
      'accessToken',
      'refreshToken',
      'user',
      'permissions',
      'session_expiry',
      'oauth_state',
      'code_verifier'
    ];
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
  }

  // ==================== User Info ====================

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated() {
    const token = this.getAccessToken();
    const sessionExpiry = localStorage.getItem('session_expiry');
    
    if (!token) return false;
    
    // Check if session expired
    if (sessionExpiry && Date.now() > parseInt(sessionExpiry)) {
      this.clearSession();
      return false;
    }
    
    return true;
  }

  hasPermission(permission) {
    const permissions = localStorage.getItem('permissions');
    if (!permissions) return false;
    
    const userPermissions = JSON.parse(permissions);
    return userPermissions.includes(permission);
  }

  // ==================== Security Utilities ====================

  generateState() {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  generateCodeVerifier() {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(36).padStart(2, '0'))
      .join('')
      .substring(0, 128);
  }

  // ==================== Token Decoding ====================

  decodeToken(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Token decode error:', error);
      return null;
    }
  }

  getTokenExpiry(token) {
    const decoded = this.decodeToken(token);
    return decoded?.exp ? decoded.exp * 1000 : null; // Convert to milliseconds
  }

  isTokenExpired(token) {
    const expiry = this.getTokenExpiry(token);
    return expiry ? Date.now() >= expiry : true;
  }
}

// Create and export a single instance
const authService = new AuthService();
export default authService;

// Export utility functions that use the service
export const initiateGoogleLogin = () => authService.initiateGoogleLogin();
export const initiateFacebookLogin = () => authService.initiateFacebookLogin();
export const handleAuthCallback = (provider, code, state) => 
  authService.handleOAuthCallback(provider, code, state);
export const logout = (redirect = true) => authService.logout(redirect);
