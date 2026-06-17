# API Documentation

## Base URL
```
https://api.alazab.com/api/v1
```

## Authentication
All API requests require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

## Response Format
All responses follow a standardized JSON format:

### Success Response (200)
```json
{
  "status": "success",
  "statusCode": 200,
  "message": "Success",
  "data": { ... },
  "timestamp": "2026-06-17T10:30:00Z"
}
```

### Paginated Response (200)
```json
{
  "status": "success",
  "statusCode": 200,
  "message": "Success",
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  },
  "timestamp": "2026-06-17T10:30:00Z"
}
```

### Error Response (400+)
```json
{
  "status": "error",
  "statusCode": 400,
  "message": "Validation failed",
  "details": { ... },
  "timestamp": "2026-06-17T10:30:00Z"
}
```

## Status Codes
- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not Found
- **409**: Conflict
- **500**: Internal Server Error

## Rate Limiting
- **Limit**: 200 requests per 15 minutes
- **Header**: `Retry-After` (in seconds)

---

## Authentication Endpoints

### POST /auth/login
Login with email and password

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user"
    }
  }
}
```

### POST /auth/logout
Logout current user

**Response (200):**
```json
{
  "status": "success",
  "message": "Logged out successfully"
}
```

### POST /auth/refresh
Refresh authentication token

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

---

## WhatsApp Endpoints

### GET /whatsapp/accounts
Get all connected WhatsApp accounts (Admin only)

**Query Parameters:**
- `active`: boolean (default: true)
- `limit`: number (default: 20)
- `page`: number (default: 1)

**Response (200):**
```json
{
  "status": "success",
  "data": [ ... ],
  "pagination": { ... }
}
```

### POST /whatsapp/accounts
Create a new WhatsApp account (Admin only)

**Request:**
```json
{
  "accountName": "Main Account",
  "phoneNumber": "+201001234567",
  "businessAccountId": "123456789",
  "accessToken": "token_here"
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": { ... }
}
```

### GET /whatsapp/messages/:phoneNumber
Get message history for a contact

**Query Parameters:**
- `limit`: number (default: 50)

**Response (200):**
```json
{
  "status": "success",
  "data": [ ... ]
}
```

### POST /whatsapp/send
Send WhatsApp message

**Request:**
```json
{
  "phoneNumber": "+201001234567",
  "message": "Hello World"
}
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Message sent successfully",
  "data": {
    "status": "sent"
  }
}
```

### GET /whatsapp/statistics
Get WhatsApp statistics

**Query Parameters:**
- `startDate`: ISO date string
- `endDate`: ISO date string

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "total_messages": 1500,
    "inbound_messages": 750,
    "outbound_messages": 750,
    "successful_messages": 1450,
    "failed_messages": 50,
    "unique_contacts": 280
  }
}
```

---

## Webhook Endpoints

### GET /webhooks/events
Get webhook event history (Admin only)

**Query Parameters:**
- `eventType`: string
- `status`: string (completed, failed, error)
- `limit`: number (default: 100)
- `page`: number (default: 1)

**Response (200):**
```json
{
  "status": "success",
  "data": [ ... ],
  "pagination": { ... }
}
```

### POST /webhooks/events/:webhookId/retry
Retry a failed webhook event (Admin only)

**Response (200):**
```json
{
  "status": "success",
  "message": "Webhook retried successfully"
}
```

### GET /webhooks/statistics
Get webhook statistics (Admin only)

**Query Parameters:**
- `startDate`: ISO date string
- `endDate`: ISO date string

**Response (200):**
```json
{
  "status": "success",
  "data": [
    {
      "event_type": "whatsapp.message",
      "total_events": 100,
      "successful_events": 95,
      "failed_events": 5,
      "avg_duration_seconds": 0.25
    }
  ]
}
```

### GET /webhooks/endpoints
Get registered webhook endpoints (Admin only)

**Response (200):**
```json
{
  "status": "success",
  "data": [ ... ]
}
```

### POST /webhooks/endpoints
Register a new webhook endpoint (Admin only)

**Request:**
```json
{
  "name": "My Webhook",
  "url": "https://example.com/webhook",
  "events": ["whatsapp.message", "meta.post"],
  "secret": "secret_key"
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": { ... }
}
```

---

## Database Endpoints

### GET /database/stats
Get database statistics (Admin only)

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "activeConnections": 5,
    "totalConnections": 20,
    "idleConnections": 15,
    "waitingRequests": 0,
    "version": "PostgreSQL 15.0"
  }
}
```

### GET /database/backups
Get list of database backups (Admin only)

**Response (200):**
```json
{
  "status": "success",
  "data": [ ... ]
}
```

### POST /database/backups
Create a new database backup (Admin only)

**Response (201):**
```json
{
  "status": "success",
  "data": { ... }
}
```

---

## Audit Log Endpoints

### GET /audit-logs
Get audit logs (Admin only)

**Query Parameters:**
- `userId`: number
- `action`: string
- `resource`: string
- `limit`: number (default: 50)
- `page`: number (default: 1)

**Response (200):**
```json
{
  "status": "success",
  "data": [ ... ],
  "pagination": { ... }
}
```

### GET /audit-logs/statistics
Get audit log statistics (Admin only)

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "total_actions": 5000,
    "actions_today": 150,
    "most_active_user": "admin@example.com"
  }
}
```

---

## Error Handling

### Common Error Responses

**Unauthorized (401):**
```json
{
  "status": "error",
  "statusCode": 401,
  "message": "Invalid or expired token"
}
```

**Forbidden (403):**
```json
{
  "status": "error",
  "statusCode": 403,
  "message": "You do not have permission to access this resource"
}
```

**Validation Error (400):**
```json
{
  "status": "error",
  "statusCode": 400,
  "message": "Validation failed",
  "details": {
    "email": "Invalid email format",
    "password": "Password must be at least 8 characters"
  }
}
```

---

## Best Practices

1. **Always include proper error handling** in client code
2. **Implement exponential backoff** for retries
3. **Use pagination** for large datasets
4. **Cache responses** where appropriate
5. **Monitor rate limits** and adjust accordingly
6. **Keep tokens secure** - never expose in logs
7. **Validate input** on the client side first
8. **Test in staging** before production deployments
