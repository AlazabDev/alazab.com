// Admin Dashboard types

export interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'user';
  permissions: string[];
  lastLogin: string;
  createdAt: string;
}

export interface Dashboard {
  totalUsers: number;
  totalMessages: number;
  totalWebhooks: number;
  activeConnections: number;
  todayMessages: number;
  failedMessages: number;
  lastUpdated: string;
}

export interface WhatsAppAccount {
  id: number;
  accountName: string;
  phoneNumber: string;
  businessAccountId: string;
  isActive: boolean;
  connectedAt: string;
  lastActivityAt: string;
  messageCount: number;
}

export interface WhatsAppMessage {
  id: number;
  phoneNumber: string;
  message: string;
  direction: 'inbound' | 'outbound';
  status: 'success' | 'failed' | 'pending';
  messageId?: string;
  errorMessage?: string;
  createdAt: string;
}

export interface WebhookEvent {
  id: number;
  webhookId: string;
  eventType: string;
  status: 'processing' | 'completed' | 'failed' | 'error';
  payload: Record<string, any>;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WebhookEndpoint {
  id: number;
  name: string;
  url: string;
  events: string[];
  secret?: string;
  isActive: boolean;
  createdAt: string;
}

export interface AuditLog {
  id: number;
  userId: number;
  action: string;
  resource: string;
  resourceId?: number;
  changes?: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
}

export interface DatabaseStats {
  activeConnections: number;
  totalConnections: number;
  idleConnections: number;
  waitingRequests: number;
  version: string;
}

export interface DatabaseBackup {
  id: number;
  filename: string;
  size: number;
  status: 'completed' | 'failed' | 'pending';
  createdAt: string;
  downloadUrl?: string;
}

export interface Statistics {
  startDate: string;
  endDate: string;
  totalMessages: number;
  inboundMessages: number;
  outboundMessages: number;
  successfulMessages: number;
  failedMessages: number;
  uniqueContacts: number;
  averageResponseTime: number;
}

export interface WebhookStatistic {
  eventType: string;
  totalEvents: number;
  successfulEvents: number;
  failedEvents: number;
  errorEvents: number;
  avgDurationSeconds: number;
}

export interface PaginatedResponse<T> {
  status: string;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  timestamp: string;
}

export interface ApiResponse<T> {
  status: string;
  statusCode: number;
  message: string;
  data?: T;
  details?: Record<string, any>;
  timestamp: string;
}

export interface MenuLink {
  label: string;
  path: string;
  icon: string;
  badge?: number;
  children?: MenuLink[];
}

export interface NotificationAlert {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}
