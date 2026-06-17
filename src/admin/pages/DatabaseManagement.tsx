'use client';

import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useDatabaseStats } from '../hooks/useAdminAPI';
import { Download, RotateCcw, Loader, Plus } from 'lucide-react';

const DatabaseManagementPage: React.FC = () => {
  const { stats, loading, refetch } = useDatabaseStats();
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [backups] = useState([
    { id: 1, filename: 'backup-2026-06-17-10-30.sql', size: '245.3 MB', date: '2026-06-17 10:30', status: 'completed' },
    { id: 2, filename: 'backup-2026-06-16-22-00.sql', size: '242.8 MB', date: '2026-06-16 22:00', status: 'completed' },
    { id: 3, filename: 'backup-2026-06-15-22-00.sql', size: '240.1 MB', date: '2026-06-15 22:00', status: 'completed' },
  ]);

  const getConnectionPercentage = () => {
    if (!stats) return 0;
    return (stats.activeConnections / stats.totalConnections) * 100;
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Database Management</h2>
          <div className="flex gap-3">
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition"
            >
              <RotateCcw size={20} /> Refresh
            </button>
            <button
              onClick={() => setShowBackupModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
            >
              <Plus size={20} /> Create Backup
            </button>
          </div>
        </div>

        {/* Database Status */}
        {stats && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Connection Pool */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold mb-6">Connection Pool</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-300">Active Connections</p>
                    <span className="text-2xl font-bold text-green-400">{stats.activeConnections}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full"
                      style={{ width: `${getConnectionPercentage()}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    {stats.activeConnections} / {stats.totalConnections} connections
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-300">Idle Connections</p>
                    <span className="text-2xl font-bold text-yellow-400">{stats.idleConnections}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-full rounded-full"
                      style={{ width: `${(stats.idleConnections / stats.totalConnections) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Total Connections</p>
                    <p className="text-2xl font-bold">{stats.totalConnections}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Waiting Requests</p>
                    <p className="text-2xl font-bold text-red-400">{stats.waitingRequests}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Database Info */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold mb-6">Database Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Version</p>
                  <p className="text-lg font-mono text-gray-200">{stats.version}</p>
                </div>

                <div className="pt-4 border-t border-gray-700 space-y-3">
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-400">Status</p>
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-sm font-medium">Connected</span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-400">Last Updated</p>
                    <p className="text-sm text-gray-300">{new Date().toLocaleTimeString()}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-400">Uptime</p>
                    <p className="text-sm text-gray-300">25 days 3 hours</p>
                  </div>
                </div>

                <button className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition">
                  View Full Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Query Performance', value: '98.5%', color: 'from-green-500 to-green-600' },
            { label: 'Cache Hit Rate', value: '94.2%', color: 'from-blue-500 to-blue-600' },
            { label: 'Replication Lag', value: '0.02s', color: 'from-purple-500 to-purple-600' },
          ].map((metric, index) => (
            <div key={index} className={`bg-gradient-to-br ${metric.color} p-6 rounded-lg text-white`}>
              <p className="text-gray-200 text-sm mb-2">{metric.label}</p>
              <p className="text-3xl font-bold">{metric.value}</p>
            </div>
          ))}
        </div>

        {/* Backups */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-bold mb-4">Backups</h3>
          <div className="space-y-3">
            {backups.map((backup) => (
              <div key={backup.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                <div className="flex-1">
                  <p className="font-medium">{backup.filename}</p>
                  <div className="flex gap-4 mt-1 text-sm text-gray-400">
                    <span>Size: {backup.size}</span>
                    <span>Date: {backup.date}</span>
                    <span
                      className={`${
                        backup.status === 'completed'
                          ? 'text-green-400'
                          : 'text-yellow-400'
                      }`}
                    >
                      {backup.status === 'completed' ? '✓ Completed' : 'In Progress'}
                    </span>
                  </div>
                </div>
                <button className="p-2 hover:bg-blue-600 rounded-lg transition" title="Download">
                  <Download size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tables Overview */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-bold mb-4">Tables Overview</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Table Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Rows</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Size</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Last Updated</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'users', rows: 1250, size: '15.2 MB', updated: '2026-06-17 10:15', status: 'Healthy' },
                  { name: 'whatsapp_messages', rows: 45820, size: '128.5 MB', updated: '2026-06-17 10:29', status: 'Healthy' },
                  { name: 'webhook_events', rows: 12340, size: '45.3 MB', updated: '2026-06-17 10:28', status: 'Healthy' },
                  { name: 'audit_logs', rows: 89230, size: '256.7 MB', updated: '2026-06-17 10:30', status: 'Healthy' },
                ].map((table, index) => (
                  <tr key={index} className="border-b border-gray-700 hover:bg-gray-700 transition">
                    <td className="py-3 px-4 text-sm font-medium">{table.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-300">{table.rows.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-gray-300">{table.size}</td>
                    <td className="py-3 px-4 text-sm text-gray-400">{table.updated}</td>
                    <td className="py-3 px-4 text-sm">
                      <span className="px-2 py-1 bg-green-900 text-green-200 rounded text-xs font-medium">
                        {table.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Backup Modal */}
      {showBackupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700">
            <h3 className="text-xl font-bold mb-4">Create Database Backup</h3>
            <p className="text-gray-400 mb-6">
              This will create a full backup of the database. The process may take a few minutes.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowBackupModal(false)}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition"
              >
                Cancel
              </button>
              <button
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition flex items-center justify-center gap-2"
              >
                <Loader className="animate-spin" size={20} /> Creating...
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default DatabaseManagementPage;
