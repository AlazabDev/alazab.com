/**
 * Performance and caching utilities for the backend
 */

/**
 * In-memory cache with TTL support
 */
class CacheManager {
  constructor(maxSize = 1000, defaultTTL = 3600000) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.defaultTTL = defaultTTL;
    this.timers = new Map();
  }

  /**
   * Get cached value
   */
  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // Check if expired
    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      this.delete(key);
      return null;
    }

    return entry.value;
  }

  /**
   * Set cached value
   */
  set(key, value, ttl = this.defaultTTL) {
    // Evict if cache is full (simple LRU-like behavior)
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.delete(firstKey);
    }

    const entry = {
      value,
      expiresAt: ttl ? Date.now() + ttl : null,
      createdAt: Date.now(),
    };

    this.cache.set(key, entry);

    // Clear existing timer
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
    }

    // Set auto-expiry timer
    if (ttl) {
      const timer = setTimeout(() => this.delete(key), ttl);
      this.timers.set(key, timer);
    }
  }

  /**
   * Delete cached value
   */
  delete(key) {
    this.cache.delete(key);
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
      this.timers.delete(key);
    }
  }

  /**
   * Clear all cache
   */
  clear() {
    this.timers.forEach((timer) => clearTimeout(timer));
    this.cache.clear();
    this.timers.clear();
  }

  /**
   * Get cache stats
   */
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      entries: Array.from(this.cache.entries()).map(([key, entry]) => ({
        key,
        createdAt: entry.createdAt,
        expiresAt: entry.expiresAt,
        ttl: entry.expiresAt ? entry.expiresAt - Date.now() : null,
      })),
    };
  }
}

/**
 * Cache middleware for Express
 */
const cacheMiddleware = (cacheDuration = 300000) => (req, res, next) => {
  if (req.method !== 'GET') {
    return next();
  }

  const cacheKey = `${req.method}:${req.originalUrl}`;
  const cached = global.cache?.get(cacheKey);

  if (cached) {
    res.set('X-Cache', 'HIT');
    return res.json(cached);
  }

  // Override res.json to cache the response
  const originalJson = res.json.bind(res);
  res.json = function (data) {
    if (res.statusCode === 200) {
      global.cache?.set(cacheKey, data, cacheDuration);
    }
    res.set('X-Cache', 'MISS');
    return originalJson(data);
  };

  next();
};

/**
 * Query optimization utilities
 */
class QueryOptimizer {
  /**
   * Paginate query results
   */
  static paginate(query, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    return {
      skip,
      limit: Math.min(limit, 100), // Max 100 per request
      page,
    };
  }

  /**
   * Build select fields for query
   */
  static buildSelect(fields) {
    if (!fields || !Array.isArray(fields)) return {};
    
    const select = {};
    fields.forEach((field) => {
      if (field && typeof field === 'string') {
        select[field] = 1;
      }
    });
    return select;
  }

  /**
   * Build filter from query params
   */
  static buildFilter(queryParams, allowedFields = []) {
    const filter = {};

    Object.entries(queryParams).forEach(([key, value]) => {
      if (allowedFields.length > 0 && !allowedFields.includes(key)) {
        return; // Skip if not in allowed fields
      }

      if (key.startsWith('$')) return; // Skip operators

      if (value === 'true') {
        filter[key] = true;
      } else if (value === 'false') {
        filter[key] = false;
      } else if (!isNaN(value)) {
        filter[key] = Number(value);
      } else if (value === 'null') {
        filter[key] = null;
      } else {
        filter[key] = { $regex: value, $options: 'i' }; // Case-insensitive search
      }
    });

    return filter;
  }

  /**
   * Build sort from query params
   */
  static buildSort(sortParam) {
    if (!sortParam) return {};

    const sort = {};
    const fields = sortParam.split(',');

    fields.forEach((field) => {
      field = field.trim();
      if (field.startsWith('-')) {
        sort[field.slice(1)] = -1;
      } else {
        sort[field] = 1;
      }
    });

    return sort;
  }
}

/**
 * Response compression and formatting
 */
class ResponseFormatter {
  /**
   * Format successful response
   */
  static success(data, message = 'Success', statusCode = 200) {
    return {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
      statusCode,
    };
  }

  /**
   * Format error response
   */
  static error(message, code = 'ERROR', statusCode = 400, errors = null) {
    return {
      success: false,
      error: {
        message,
        code,
        statusCode,
        errors,
      },
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Format paginated response
   */
  static paginated(data, page, limit, total) {
    return {
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
      timestamp: new Date().toISOString(),
    };
  }
}

// Initialize global cache
if (!global.cache) {
  global.cache = new CacheManager();
}

module.exports = {
  CacheManager,
  cacheMiddleware,
  QueryOptimizer,
  ResponseFormatter,
};
