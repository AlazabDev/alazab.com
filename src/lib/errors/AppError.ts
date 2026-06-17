// Centralized Error Management System

export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum ErrorType {
  VALIDATION = 'validation',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  NOT_FOUND = 'not_found',
  CONFLICT = 'conflict',
  SERVER_ERROR = 'server_error',
  NETWORK = 'network',
  TIMEOUT = 'timeout',
  UNKNOWN = 'unknown',
}

export interface AppErrorObject {
  type: ErrorType;
  message: string;
  severity: ErrorSeverity;
  code?: string;
  statusCode?: number;
  context?: Record<string, unknown>;
  timestamp: Date;
  userId?: string;
  path?: string;
  userMessage?: string;
  recoverable: boolean;
}

/**
 * Application-wide error class that standardizes error handling
 */
export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly severity: ErrorSeverity;
  public readonly code?: string;
  public readonly statusCode: number;
  public readonly context: Record<string, unknown>;
  public readonly timestamp: Date;
  public readonly userId?: string;
  public readonly userMessage: string;
  public readonly recoverable: boolean;

  constructor(
    message: string,
    type: ErrorType = ErrorType.UNKNOWN,
    options: {
      severity?: ErrorSeverity;
      code?: string;
      statusCode?: number;
      context?: Record<string, unknown>;
      userId?: string;
      userMessage?: string;
      recoverable?: boolean;
    } = {}
  ) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.severity = options.severity ?? ErrorSeverity.HIGH;
    this.code = options.code;
    this.statusCode = options.statusCode ?? 500;
    this.context = options.context ?? {};
    this.timestamp = new Date();
    this.userId = options.userId;
    this.userMessage = options.userMessage ?? this.getDefaultUserMessage(type);
    this.recoverable = options.recoverable ?? true;

    Object.setPrototypeOf(this, AppError.prototype);
  }

  private getDefaultUserMessage(type: ErrorType): string {
    const messages: Record<ErrorType, string> = {
      [ErrorType.VALIDATION]: 'البيانات المدخلة غير صحيحة',
      [ErrorType.AUTHENTICATION]: 'فشل المصادقة. الرجاء تسجيل الدخول مجددا',
      [ErrorType.AUTHORIZATION]: 'ليس لديك صلاحية للوصول إلى هذا المورد',
      [ErrorType.NOT_FOUND]: 'المورد المطلوب غير موجود',
      [ErrorType.CONFLICT]: 'تعارض في البيانات. الرجاء إعادة المحاولة',
      [ErrorType.SERVER_ERROR]: 'حدث خطأ في الخادم. الرجاء المحاولة لاحقا',
      [ErrorType.NETWORK]: 'خطأ في الاتصال. تحقق من اتصالك بالإنترنت',
      [ErrorType.TIMEOUT]: 'انتهت مهلة الانتظار. الرجاء المحاولة مجددا',
      [ErrorType.UNKNOWN]: 'حدث خطأ غير متوقع',
    };
    return messages[type] || 'حدث خطأ ما';
  }

  toObject(): AppErrorObject {
    return {
      type: this.type,
      message: this.message,
      severity: this.severity,
      code: this.code,
      statusCode: this.statusCode,
      context: this.context,
      timestamp: this.timestamp,
      userId: this.userId,
      userMessage: this.userMessage,
      recoverable: this.recoverable,
    };
  }
}

export class ValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, ErrorType.VALIDATION, {
      severity: ErrorSeverity.MEDIUM,
      context,
      recoverable: true,
      userMessage: 'البيانات المدخلة غير صحيحة',
    });
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'فشل التحقق من الهوية') {
    super(message, ErrorType.AUTHENTICATION, {
      severity: ErrorSeverity.MEDIUM,
      statusCode: 401,
      recoverable: true,
    });
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'ليس لديك صلاحية') {
    super(message, ErrorType.AUTHORIZATION, {
      severity: ErrorSeverity.MEDIUM,
      statusCode: 403,
      recoverable: false,
    });
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} غير موجود`, ErrorType.NOT_FOUND, {
      severity: ErrorSeverity.LOW,
      statusCode: 404,
      recoverable: false,
    });
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, ErrorType.CONFLICT, {
      severity: ErrorSeverity.MEDIUM,
      statusCode: 409,
      recoverable: true,
    });
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'خطأ في الاتصال بالشبكة') {
    super(message, ErrorType.NETWORK, {
      severity: ErrorSeverity.HIGH,
      recoverable: true,
    });
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

export class TimeoutError extends AppError {
  constructor(message: string = 'انتهت مهلة الانتظار') {
    super(message, ErrorType.TIMEOUT, {
      severity: ErrorSeverity.MEDIUM,
      recoverable: true,
    });
    Object.setPrototypeOf(this, TimeoutError.prototype);
  }
}
