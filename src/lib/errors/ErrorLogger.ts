import { AppError, AppErrorObject, ErrorSeverity } from './AppError';

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: Record<string, unknown>;
  error?: AppErrorObject;
  userId?: string;
}

class ErrorLogger {
  private logs: LogEntry[] = [];
  private maxLogs = 1000;

  /**
   * Log an application error
   */
  logError(error: AppError | Error, context?: Record<string, unknown>): void {
    const isAppError = error instanceof AppError;
    const severity = isAppError ? error.severity : ErrorSeverity.HIGH;

    const entry: LogEntry = {
      level: this.severityToLogLevel(severity),
      message: error.message,
      timestamp: new Date(),
      context,
      error: isAppError ? error.toObject() : undefined,
    };

    this.logs.push(entry);
    this.trimLogs();
    this.sendToServer(entry);
    this.logToConsole(entry);
  }

  /**
   * Log a message
   */
  log(level: LogLevel, message: string, context?: Record<string, unknown>): void {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      context,
    };

    this.logs.push(entry);
    this.trimLogs();
    this.logToConsole(entry);
  }

  /**
   * Get recent logs
   */
  getLogs(limit = 50): LogEntry[] {
    return this.logs.slice(-limit);
  }

  /**
   * Clear logs
   */
  clearLogs(): void {
    this.logs = [];
  }

  private severityToLogLevel(severity: ErrorSeverity): LogLevel {
    switch (severity) {
      case ErrorSeverity.CRITICAL:
        return LogLevel.ERROR;
      case ErrorSeverity.HIGH:
        return LogLevel.ERROR;
      case ErrorSeverity.MEDIUM:
        return LogLevel.WARN;
      case ErrorSeverity.LOW:
        return LogLevel.INFO;
      default:
        return LogLevel.ERROR;
    }
  }

  private trimLogs(): void {
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
  }

  private logToConsole(entry: LogEntry): void {
    const timestamp = entry.timestamp.toISOString();
    const prefix = `[${timestamp}] [${entry.level.toUpperCase()}]`;

    switch (entry.level) {
      case LogLevel.DEBUG:
        console.debug(prefix, entry.message, entry.context);
        break;
      case LogLevel.INFO:
        console.info(prefix, entry.message, entry.context);
        break;
      case LogLevel.WARN:
        console.warn(prefix, entry.message, entry.context);
        if (entry.error) console.warn('Error:', entry.error);
        break;
      case LogLevel.ERROR:
        console.error(prefix, entry.message, entry.context);
        if (entry.error) console.error('Error:', entry.error);
        break;
    }
  }

  private async sendToServer(entry: LogEntry): Promise<void> {
    // Only send errors to server in production
    if (import.meta.env.MODE !== 'production') return;

    try {
      await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });
    } catch (err) {
      // Silently fail to avoid infinite loops
      console.error('Failed to send log to server:', err);
    }
  }
}

export const errorLogger = new ErrorLogger();
