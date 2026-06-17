'use client';

import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useAuditLogs } from '../hooks/useAdminAPI';
import { Loader, Download, Filter } from 'lucide-react';

const AuditLogsPage: React.FC = () => {
  const { logs, loading, error, total, refetch } = useAuditLogs();
  const [actionFilter, setActionFilter] = useState<string>('');
  const [resourceFilter, setResourceFilter] = useState<string>('');
  const [selectedLog, setSelectedLog] = useState<number | null>(null);

  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATE':
        return 'bg-green-900 text-green-200';
      case 'UPDATE':
        return 'bg-blue-900 text-blue-200';
      case 'DELETE':
        return 'bg-red-900 text-red-200';
      case 'LOGIN':
        return 'bg-purple-900 text-purple-200';
      default:
        return 'bg-gray-700 text-gray-200';
    }
  };

  const getResourceIcon = (resource: string) => {
    switch (resource) {
      case 'user':
        return '👤';
      case 'whatsapp':
        return '💬';
      case 'webhook':
        return '🪝';
      case 'database':
        return '🗄️';
      default:
        return '📋';
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Audit Logs</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition">
            <Download size={20} /> Export
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Actions', value: total || 0, color: 'from-blue-500 to-blue-600' },
            { label: 'Today', value: 45, color: 'from-green-500 to-green-600' },
            { label: 'This Week', value: 320, color: 'from-purple-500 to-purple-600' },
            { label: 'This Month', value: 1250, color: 'from-orange-500 to-orange-600' },
          ].map((stat, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.color} p-4 rounded-lg text-white`}
            >
              <p className="text-gray-200 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} />
            <span className="font-medium">Filters</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Action</label>
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="">All Actions</option>
                <option value="CREATE">Create</option>
                <option value="UPDATE">Update</option>
                <option value="DELETE">Delete</option>
                <option value="LOGIN">Login</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Resource</label>
              <select
                value={resourceFilter}
                onChange={(e) => setResourceFilter(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="">All Resources</option>
                <option value="user">User</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="webhook">Webhook</option>
                <option value="database">Database</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Date Range</label>
              <input
                type="date"
                className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-bold mb-4">Activity Log</h3>
          {loading ? (
            <div className="text-center py-8">
              <Loader className="animate-spin mx-auto" />
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-400">
              Error: {error}
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No audit logs found.
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {logs.map((log) => (
                <div key={log.id} className="cursor-pointer">
                  <div
                    className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                    onClick={() => setSelectedLog(selectedLog === log.id ? null : log.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xl">{getResourceIcon(log.resource)}</span>
                          <div>
                            <p className="font-bold">
                              {log.action} {log.resource}
                              {log.resourceId && ` #${log.resourceId}`}
                            </p>
                            <p className="text-xs text-gray-400">by Admin User</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 text-xs rounded font-medium ${getActionColor(log.action)}`}>
                          {log.action}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(log.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {selectedLog === log.id && (
                      <div className="mt-4 pt-4 border-t border-gray-600 space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-400">IP Address</p>
                            <p className="text-gray-200 font-mono">{log.ipAddress}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Resource ID</p>
                            <p className="text-gray-200 font-mono">{log.resourceId || 'N/A'}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm mb-1">User Agent</p>
                          <p className="text-xs text-gray-300 break-words">{log.userAgent}</p>
                        </div>
                        {log.changes && Object.keys(log.changes).length > 0 && (
                          <div>
                            <p className="text-gray-400 text-sm mb-1">Changes</p>
                            <pre className="bg-gray-800 p-3 rounded text-xs text-gray-300 overflow-x-auto">
                              {JSON.stringify(log.changes, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-bold mb-4">Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Most Active User', value: 'admin@alazab.com', subvalue: '245 actions' },
              { label: 'Most Modified Resource', value: 'Users', subvalue: '89 changes' },
              { label: 'Critical Actions', value: '5', subvalue: 'this week' },
              { label: 'Failed Attempts', value: '2', subvalue: 'login failures' },
            ].map((item, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                <p className="font-bold text-lg">{item.value}</p>
                <p className="text-xs text-gray-500">{item.subvalue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AuditLogsPage;
