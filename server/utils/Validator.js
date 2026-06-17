import { ValidationError } from '../errors/AppError.js';

/**
 * Validation utilities
 */
export class Validator {
  /**
   * Validate required fields
   */
  static required(fields, data) {
    const errors = {};

    fields.forEach(field => {
      if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
        errors[field] = `${field} is required`;
      }
    });

    if (Object.keys(errors).length > 0) {
      throw new ValidationError('Validation failed', errors);
    }
  }

  /**
   * Validate email format
   */
  static email(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ValidationError('Invalid email format', { email });
    }
  }

  /**
   * Validate phone number
   */
  static phone(phone) {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      throw new ValidationError('Invalid phone number', { phone });
    }
  }

  /**
   * Validate URL
   */
  static url(urlString) {
    try {
      new URL(urlString);
    } catch (e) {
      throw new ValidationError('Invalid URL', { url: urlString });
    }
  }

  /**
   * Validate string length
   */
  static stringLength(str, min, max) {
    if (str.length < min || str.length > max) {
      throw new ValidationError(
        `String length must be between ${min} and ${max}`,
        { length: str.length, min, max }
      );
    }
  }

  /**
   * Validate number range
   */
  static numberRange(num, min, max) {
    if (num < min || num > max) {
      throw new ValidationError(
        `Number must be between ${min} and ${max}`,
        { value: num, min, max }
      );
    }
  }

  /**
   * Validate array not empty
   */
  static arrayNotEmpty(arr, fieldName = 'Array') {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new ValidationError(`${fieldName} cannot be empty`, { field: fieldName });
    }
  }

  /**
   * Validate enum value
   */
  static enum(value, allowedValues, fieldName) {
    if (!allowedValues.includes(value)) {
      throw new ValidationError(
        `Invalid ${fieldName}. Must be one of: ${allowedValues.join(', ')}`,
        { field: fieldName, value, allowedValues }
      );
    }
  }

  /**
   * Validate object shape
   */
  static objectShape(obj, schema) {
    const errors = {};

    Object.entries(schema).forEach(([field, rules]) => {
      const value = obj[field];

      if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
        errors[field] = `${field} is required`;
      }

      if (value && rules.type && typeof value !== rules.type) {
        errors[field] = `${field} must be of type ${rules.type}`;
      }

      if (value && rules.minLength && value.length < rules.minLength) {
        errors[field] = `${field} must be at least ${rules.minLength} characters`;
      }

      if (value && rules.maxLength && value.length > rules.maxLength) {
        errors[field] = `${field} must not exceed ${rules.maxLength} characters`;
      }

      if (value && rules.pattern && !rules.pattern.test(value)) {
        errors[field] = `${field} format is invalid`;
      }

      if (value && rules.enum && !rules.enum.includes(value)) {
        errors[field] = `${field} must be one of: ${rules.enum.join(', ')}`;
      }

      if (value && rules.custom) {
        const customError = rules.custom(value);
        if (customError) {
          errors[field] = customError;
        }
      }
    });

    if (Object.keys(errors).length > 0) {
      throw new ValidationError('Validation failed', errors);
    }

    return obj;
  }

  /**
   * Sanitize object - remove null/undefined
   */
  static sanitize(obj) {
    const sanitized = {};
    
    Object.entries(obj).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        sanitized[key] = value;
      }
    });

    return sanitized;
  }

  /**
   * Extract safe fields from object
   */
  static pick(obj, fields) {
    const picked = {};
    
    fields.forEach(field => {
      if (field in obj) {
        picked[field] = obj[field];
      }
    });

    return picked;
  }

  /**
   * Exclude sensitive fields
   */
  static omit(obj, fields) {
    const result = { ...obj };
    
    fields.forEach(field => {
      delete result[field];
    });

    return result;
  }
}

export default Validator;
