import { describe, it, expect, beforeEach, vi } from 'vitest';
import { apiClient, ApiResponse } from '@/lib/api/ApiClient';
import { TokenManager } from '@/lib/security/TokenManager';

describe('API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  describe('Request Methods', () => {
    it('should make GET requests', async () => {
      const mockData = { id: 1, name: 'Test' };
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockData,
      });

      const result = await apiClient.get<typeof mockData>('/test');

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockData);
      expect(result.status).toBe(200);
    });

    it('should make POST requests', async () => {
      const mockData = { id: 1, name: 'Created' };
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => mockData,
      });

      const result = await apiClient.post<typeof mockData>('/test', {
        name: 'Created',
      });

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockData);
    });

    it('should handle PUT requests', async () => {
      const mockData = { id: 1, name: 'Updated' };
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockData,
      });

      const result = await apiClient.put<typeof mockData>('/test/1', {
        name: 'Updated',
      });

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockData);
    });

    it('should handle DELETE requests', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        status: 204,
        json: async () => ({}),
      });

      const result = await apiClient.delete('/test/1');

      expect(result.success).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle 401 Unauthorized errors', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ error: 'Unauthorized' }),
      });

      const result = await apiClient.get('/protected');

      expect(result.success).toBe(false);
      expect(result.status).toBe(401);
      expect(result.error?.type).toBe('authentication');
    });

    it('should handle 403 Forbidden errors', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 403,
        json: async () => ({ error: 'Forbidden' }),
      });

      const result = await apiClient.get('/admin');

      expect(result.success).toBe(false);
      expect(result.status).toBe(403);
      expect(result.error?.type).toBe('authorization');
    });

    it('should handle 404 Not Found errors', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ error: 'Not found' }),
      });

      const result = await apiClient.get('/nonexistent');

      expect(result.success).toBe(false);
      expect(result.status).toBe(404);
      expect(result.error?.type).toBe('not_found');
    });

    it('should handle network errors', async () => {
      global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));

      const result = await apiClient.get('/test');

      expect(result.success).toBe(false);
      expect(result.error?.type).toBe('network');
    });
  });

  describe('Headers and Security', () => {
    it('should include Authorization header with token', async () => {
      const token = 'test-token';
      vi.spyOn(TokenManager, 'getAccessToken').mockReturnValueOnce(token);

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({}),
      });

      await apiClient.get('/test');

      const call = (global.fetch as any).mock.calls[0];
      expect(call[1].headers.Authorization).toBe(`Bearer ${token}`);
    });

    it('should not include Authorization header without token', async () => {
      vi.spyOn(TokenManager, 'getAccessToken').mockReturnValueOnce(null);

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({}),
      });

      await apiClient.get('/test');

      const call = (global.fetch as any).mock.calls[0];
      expect(call[1].headers.Authorization).toBeUndefined();
    });
  });

  describe('URL Building', () => {
    it('should build absolute URLs from endpoints', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({}),
      });

      apiClient.setBaseURL('https://api.example.com');
      await apiClient.get('/test');

      const call = (global.fetch as any).mock.calls[0];
      expect(call[0]).toContain('api.example.com/test');
    });

    it('should handle full URLs directly', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({}),
      });

      await apiClient.get('https://external-api.com/data');

      const call = (global.fetch as any).mock.calls[0];
      expect(call[0]).toBe('https://external-api.com/data');
    });
  });
});
