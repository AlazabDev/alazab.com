import { useState, useCallback, useEffect } from 'react';
import { 
  WhatsAppMessage, 
  WhatsAppAccount, 
  WebhookEvent,
  Statistics,
  DatabaseStats,
  AuditLog,
  PaginatedResponse,
  ApiResponse
} from '../types/index';

/**
 * Fetch WhatsApp messages
 */
export const useWhatsAppMessages = (phoneNumber?: string) => {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async (phone?: string) => {
    setLoading(true);
    setError(null);
    try {
      const url = new URL('/api/v1/whatsapp/messages', window.location.origin);
      if (phone) url.searchParams.append('phone', phone);
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch messages');
      
      const data: PaginatedResponse<WhatsAppMessage> = await response.json();
      setMessages(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (phoneNumber) {
      fetchMessages(phoneNumber);
    }
  }, [phoneNumber, fetchMessages]);

  return { messages, loading, error, refetch: fetchMessages };
};

/**
 * Fetch WhatsApp accounts
 */
export const useWhatsAppAccounts = () => {
  const [accounts, setAccounts] = useState<WhatsAppAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAccounts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/v1/whatsapp/accounts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch accounts');
      
      const data: PaginatedResponse<WhatsAppAccount> = await response.json();
      setAccounts(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  return { accounts, loading, error, refetch: fetchAccounts };
};

/**
 * Fetch webhook events
 */
export const useWebhookEvents = (eventType?: string, limit = 50) => {
  const [events, setEvents] = useState<WebhookEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchEvents = useCallback(async (type?: string) => {
    setLoading(true);
    setError(null);
    try {
      const url = new URL('/api/v1/webhooks/events', window.location.origin);
      if (type) url.searchParams.append('eventType', type);
      url.searchParams.append('limit', limit.toString());

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch webhook events');
      
      const data: PaginatedResponse<WebhookEvent> = await response.json();
      setEvents(data.data);
      setTotal(data.pagination.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchEvents(eventType);
  }, [eventType, fetchEvents]);

  return { events, loading, error, total, refetch: fetchEvents };
};

/**
 * Fetch WhatsApp statistics
 */
export const useWhatsAppStatistics = (startDate?: string, endDate?: string) => {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStatistics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = new URL('/api/v1/whatsapp/statistics', window.location.origin);
      if (startDate) url.searchParams.append('startDate', startDate);
      if (endDate) url.searchParams.append('endDate', endDate);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch statistics');
      
      const data: ApiResponse<Statistics> = await response.json();
      setStats(data.data || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  return { stats, loading, error, refetch: fetchStatistics };
};

/**
 * Fetch database statistics
 */
export const useDatabaseStats = () => {
  const [stats, setStats] = useState<DatabaseStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/v1/admin/database/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch database stats');
      
      const data: ApiResponse<DatabaseStats> = await response.json();
      setStats(data.data || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    // Refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
};

/**
 * Fetch audit logs
 */
export const useAuditLogs = (limit = 50, page = 1) => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = new URL('/api/v1/admin/audit-logs', window.location.origin);
      url.searchParams.append('limit', limit.toString());
      url.searchParams.append('page', page.toString());

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch audit logs');
      
      const data: PaginatedResponse<AuditLog> = await response.json();
      setLogs(data.data);
      setTotal(data.pagination.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [limit, page]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return { logs, loading, error, total, refetch: fetchLogs };
};

/**
 * Send WhatsApp message
 */
export const useSendWhatsAppMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = useCallback(async (phoneNumber: string, message: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/v1/whatsapp/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ phoneNumber, message }),
      });

      if (!response.ok) throw new Error('Failed to send message');
      
      const data = await response.json();
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { send, loading, error };
};
