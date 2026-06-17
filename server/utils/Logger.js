import fs from 'fs';
import path from 'path';
import { LOG_LEVELS } from '../constants/index.js';

class Logger {
  constructor(options = {}) {
    this.logDir = options.logDir || path.join(process.cwd(), 'logs');
    this.level = options.level || LOG_LEVELS.INFO;
    this.enableConsole = options.enableConsole !== false;
    this.enableFile = options.enableFile !== false;

    // Create logs directory if it doesn't exist
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }

    this.levels = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3,
      trace: 4,
    };
  }

  /**
   * Format log message
   */
  formatLog(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const levelUpper = level.toUpperCase();
    
    const logEntry = {
      timestamp,
      level: levelUpper,
      message,
      ...(data && { data }),
      pid: process.pid,
    };

    return {
      jsonString: JSON.stringify(logEntry),
      consoleString: `[${timestamp}] [${levelUpper}] ${message} ${data ? JSON.stringify(data) : ''}`,
    };
  }

  /**
   * Write to file
   */
  writeToFile(level, formatted) {
    try {
      const fileName = `${level}-${new Date().toISOString().split('T')[0]}.log`;
      const filePath = path.join(this.logDir, fileName);
      
      fs.appendFileSync(filePath, formatted.jsonString + '\n', 'utf8');
    } catch (err) {
      console.error('Failed to write log file:', err);
    }
  }

  /**
   * Log message
   */
  log(level, message, data = null) {
    if (this.levels[level] > this.levels[this.level]) {
      return;
    }

    const formatted = this.formatLog(level, message, data);

    if (this.enableConsole) {
      console[level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log'](
        formatted.consoleString
      );
    }

    if (this.enableFile) {
      this.writeToFile(level, formatted);
    }
  }

  error(message, data = null) {
    this.log(LOG_LEVELS.ERROR, message, data);
  }

  warn(message, data = null) {
    this.log(LOG_LEVELS.WARN, message, data);
  }

  info(message, data = null) {
    this.log(LOG_LEVELS.INFO, message, data);
  }

  debug(message, data = null) {
    this.log(LOG_LEVELS.DEBUG, message, data);
  }

  trace(message, data = null) {
    this.log(LOG_LEVELS.TRACE, message, data);
  }

  /**
   * Log API request
   */
  logRequest(method, path, statusCode, duration) {
    this.info(`${method} ${path} - ${statusCode}`, { duration: `${duration}ms` });
  }

  /**
   * Log webhook event
   */
  logWebhook(type, event, success = true) {
    const level = success ? LOG_LEVELS.INFO : LOG_LEVELS.WARN;
    this.log(level, `Webhook: ${type}`, { event, success });
  }

  /**
   * Get recent logs
   */
  getRecentLogs(level = 'info', lines = 100) {
    try {
      const date = new Date().toISOString().split('T')[0];
      const fileName = `${level}-${date}.log`;
      const filePath = path.join(this.logDir, fileName);

      if (!fs.existsSync(filePath)) {
        return [];
      }

      const content = fs.readFileSync(filePath, 'utf8');
      return content
        .split('\n')
        .filter(line => line.trim())
        .slice(-lines)
        .map(line => {
          try {
            return JSON.parse(line);
          } catch (e) {
            return { raw: line };
          }
        });
    } catch (err) {
      this.error('Failed to read logs:', err.message);
      return [];
    }
  }

  /**
   * Clear old logs
   */
  clearOldLogs(daysOld = 30) {
    try {
      const files = fs.readdirSync(this.logDir);
      const now = Date.now();
      const maxAge = daysOld * 24 * 60 * 60 * 1000;

      files.forEach(file => {
        const filePath = path.join(this.logDir, file);
        const stat = fs.statSync(filePath);

        if (now - stat.mtime.getTime() > maxAge) {
          fs.unlinkSync(filePath);
          this.info(`Deleted old log file: ${file}`);
        }
      });
    } catch (err) {
      this.error('Failed to clear old logs:', err.message);
    }
  }
}

// Create global logger instance
const logger = new Logger({
  level: process.env.LOG_LEVEL || LOG_LEVELS.INFO,
  enableConsole: process.env.NODE_ENV !== 'production',
  enableFile: true,
});

export default logger;
