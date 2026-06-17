# Server Architecture Documentation

## Table of Contents
1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Core Components](#core-components)
4. [Data Flow](#data-flow)
5. [Security](#security)
6. [Deployment](#deployment)

---

## Overview

The server is built with **Node.js + Express** using a modular, scalable architecture following MVC and service-oriented design patterns.

### Key Features
- Modular middleware system
- Centralized error handling
- Role-based access control (RBAC)
- Comprehensive logging
- Database connection pooling
- Webhook event processing
- WhatsApp and Meta integration
- Audit trail tracking

---

## Directory Structure

```
server/
├── config/                 # Configuration files
│   ├── database.js        # Database setup
│   └── environment.js     # Environment variables
├── middleware/             # Express middleware
│   ├── index.js           # Core middleware
│   └── auth.js            # Authentication & authorization
├── controllers/            # Business logic handlers
│   ├── authController.js
│   ├── whatsappController.js
│   ├── webhookController.js
│   └── adminController.js
├── services/               # Business logic services
│   ├── WhatsAppService.js
│   ├── MetaService.js
│   ├── WebhookService.js
│   └── EmailService.js
├── routes/                 # API routes
│   ├── auth.js
│   ├── whatsapp.js
│   ├── webhooks.js
│   └── admin.js
├── db/                     # Database layer
│   ├── Database.js         # Connection pool & queries
│   └── migrations/         # Schema migrations
├── models/                 # Data models & schemas
│   ├── User.js
│   ├── WhatsAppAccount.js
│   └── WebhookEvent.js
├── utils/                  # Utility functions
│   ├── Logger.js           # Logging system
│   ├── ResponseHandler.js  # Standardized responses
│   ├── Validator.js        # Input validation
│   └── helpers.js          # Helper functions
├── errors/                 # Custom error classes
│   └── AppError.js
├── constants/              # Application constants
│   └── index.js
├── validators/             # Request validators
│   ├── authValidator.js
│   └── whatsappValidator.js
├── docs/                   # Documentation
│   ├── API_DOCUMENTATION.md
│   └── ARCHITECTURE.md
├── logs/                   # Application logs
│   ├── error-YYYY-MM-DD.log
│   └── info-YYYY-MM-DD.log
├── index.js               # Application entry point
├── package.json
└── .env.example           # Environment variables template
```

---

## Core Components

### 1. Logger (`utils/Logger.js`)
Centralized logging system with file persistence.

**Features:**
- Multiple log levels (error, warn, info, debug, trace)
- File and console output
- Daily log file rotation
- Request/webhook logging utilities

**Usage:**
```javascript
import logger from './utils/Logger.js';

logger.info('User login', { userId: 123, email: 'user@example.com' });
logger.error('Database error', { query: 'SELECT...' });
logger.debug('Webhook received', { eventType: 'whatsapp.message' });
```

### 2. Database (`db/Database.js`)
PostgreSQL connection pool with query helpers.

**Features:**
- Connection pooling (max 20 connections)
- Transaction support
- Query logging
- CRUD helpers (insert, update, delete, findById)
- Pagination support
- Statistics tracking

**Usage:**
```javascript
import database from './db/Database.js';

// Execute query
const result = await database.query('SELECT * FROM users WHERE id = $1', [1]);

// Insert
const user = await database.insert('users', {
  email: 'user@example.com',
  name: 'John Doe'
});

// Transaction
await database.transaction(async (query) => {
  await query('UPDATE users SET balance = balance - 100 WHERE id = $1', [1]);
  await query('INSERT INTO transactions (user_id, amount) VALUES ($1, $2)', [1, 100]);
});
```

### 3. Response Handler (`utils/ResponseHandler.js`)
Standardized API response formatting.

**Usage:**
```javascript
import { ResponseHandler } from './utils/ResponseHandler.js';

// Success
ResponseHandler.success(res, { id: 1, name: 'John' }, 'User created', 201);

// Error
ResponseHandler.error(res, 'Invalid input', 400, { field: 'email' });

// Paginated
ResponseHandler.paginated(res, users, {
  page: 1,
  limit: 20,
  total: 150
});
```

### 4. Validator (`utils/Validator.js`)
Input validation and sanitization utilities.

**Usage:**
```javascript
import { Validator } from './utils/Validator.js';

// Validate required fields
Validator.required(['email', 'password'], req.body);

// Validate email
Validator.email(req.body.email);

// Validate object shape
Validator.objectShape(req.body, {
  email: { required: true, type: 'string' },
  password: { required: true, minLength: 8 }
});

// Sanitize
const safe = Validator.sanitize(req.body);
```

### 5. Authentication (`middleware/auth.js`)
JWT-based authentication and authorization.

**Features:**
- Token verification
- Role-based access control (RBAC)
- Permission-based authorization
- Ownership verification
- Rate limiting per user

**Usage:**
```javascript
import { authenticate, authorize, adminOnly } from './middleware/auth.js';

// Protect route
app.get('/users/:id', authenticate, verifyOwnership, (req, res) => {
  // User is authenticated and owns this resource
});

// Admin only
app.delete('/users/:id', authenticate, adminOnly, (req, res) => {
  // Only admins can delete users
});

// By role
app.post('/reports', authenticate, authorize(['admin', 'manager']), (req, res) => {
  // Only admins and managers can create reports
});
```

### 6. WhatsApp Service (`services/WhatsAppService.js`)
WhatsApp Business API integration.

**Features:**
- Send and receive messages
- Message logging and history
- Statistics and analytics
- Multiple account management
- Webhook integration

**Usage:**
```javascript
import whatsappService from './services/WhatsAppService.js';

// Send message
await whatsappService.sendMessage('+201001234567', 'Hello World');

// Get history
const messages = await whatsappService.getMessageHistory('+201001234567', 50);

// Get statistics
const stats = await whatsappService.getStatistics();
```

### 7. Webhook Service (`services/WebhookService.js`)
Event-driven webhook processing system.

**Features:**
- Event handler registration
- Retry logic with exponential backoff
- Event history tracking
- Statistics aggregation
- Webhook endpoint management

**Usage:**
```javascript
import webhookService from './services/WebhookService.js';

// Register handler
webhookService.registerHandler('whatsapp.message', async (payload) => {
  console.log('New message:', payload);
});

// Process webhook
await webhookService.processWebhook('whatsapp.message', {
  from: '+201001234567',
  body: 'Hello',
  timestamp: Date.now()
});

// Get statistics
const stats = await webhookService.getStatistics();
```

---

## Data Flow

### Authentication Flow
```
Request with Token
    ↓
[authenticate middleware]
    ↓
Verify JWT token
    ↓
Extract user info (id, role, permissions)
    ↓
Attach to req.user
    ↓
Pass to next middleware/controller
```

### WhatsApp Message Flow
```
Incoming WhatsApp Message
    ↓
[Webhook verification]
    ↓
Process via WhatsAppService
    ↓
Log to database
    ↓
Trigger registered webhooks
    ↓
Send confirmation response
```

### Error Handling Flow
```
Error occurs in controller/service
    ↓
Throw AppError (or subclass)
    ↓
asyncHandler catches it
    ↓
Error middleware processes it
    ↓
Log error with context
    ↓
Return standardized error response
```

---

## Security

### Headers Protection
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

### Rate Limiting
- Global: 200 requests per 15 minutes per IP
- Per-user: Configurable limits
- Retry-After header for rate limited responses

### Authentication
- JWT tokens with expiration
- Secure cookie handling
- Token refresh mechanism
- Permission-based access control

### Input Validation
- Schema validation
- Type checking
- Length restrictions
- Format validation (email, phone, URL)

### Database Security
- Connection pooling with timeout
- Parameterized queries
- Transaction support
- Connection encryption (in production)

---

## Deployment

### Environment Variables
Create `.env` file with:
```
NODE_ENV=production
PORT=3000
LOG_LEVEL=info

# Database
DB_USER=postgres
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=alazab

# JWT
JWT_SECRET=your-secret-key

# WhatsApp
WHATSAPP_BUSINESS_ACCOUNT_ID=123456789
WHATSAPP_ACCESS_TOKEN=token_here
WHATSAPP_WEBHOOK_VERIFY_TOKEN=verify_token

# Meta
META_API_VERSION=v20.0
META_ACCESS_TOKEN=token_here
META_BUSINESS_ACCOUNT_ID=123456789

# CORS
ALLOWED_ORIGINS=https://alazab.com,https://admin.alazab.com
```

### Docker Setup
```dockerfile
FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Health Check
```javascript
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    database: database.isConnected,
    timestamp: new Date().toISOString()
  });
});
```

---

## Performance Tips

1. **Use connection pooling** - Already configured
2. **Enable query logging** - Monitor slow queries
3. **Index frequently queried fields** - Phone numbers, user IDs
4. **Implement caching** - For frequently accessed data
5. **Use pagination** - For large datasets
6. **Monitor logs** - Regular log analysis
7. **Load test** - Before deployment

---

## Troubleshooting

### Database Connection Issues
```bash
# Check PostgreSQL is running
psql -U postgres -h localhost

# View connection stats
SELECT * FROM pg_stat_activity;
```

### High Memory Usage
```javascript
// Clear old logs
logger.clearOldLogs(30); // Keep 30 days

// Monitor database connections
const stats = await database.getStats();
console.log(stats);
```

### Slow API Responses
```javascript
// Enable debug logging
process.env.LOG_LEVEL = 'debug';

// Check query performance
logger.debug messages in logs
```

---

## Support
For issues or questions, please refer to API_DOCUMENTATION.md or contact the development team.
