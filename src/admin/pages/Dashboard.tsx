'use client';

import React, { useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useDatabaseStats, useWhatsAppStatistics } from '../hooks/useAdminAPI';
import AdminLayout from '../components/AdminLayout';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface StatCard {
  label: string;
  value: number | string;
  change?: number;
  icon: string;
  color: string;
}

const DashboardPage: React.FC = () => {
  const { dashboard, refreshDashboard, loading } = useAdmin();
  const { stats: dbStats } = useDatabaseStats();
  const { stats: whatsappStats } = useWhatsAppStatistics();

  useEffect(() => {
    refreshDashboard();
  }, [refreshDashboard]);

  const statCards: StatCard[] = [
    {
      label: 'Total Users',
      value: dashboard?.totalUsers || 0,
      change: 12,
      icon: '👥',
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Messages Today',
      value: dashboard?.todayMessages || 0,
      change: 8,
      icon: '💬',
      color: 'from-green-500 to-green-600',
    },
    {
      label: 'Failed Messages',
      value: dashboard?.failedMessages || 0,
      change: -2,
      icon: '❌',
      color: 'from-red-500 to-red-600',
    },
    {
      label: 'Active Connections',
      value: dbStats?.activeConnections || 0,
      icon: '🔌',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const chartData = [
    { name: 'Mon', messages: 240, webhooks: 240 },
    { name: 'Tue', messages: 139, webhooks: 221 },
    { name: 'Wed', messages: 980, webhooks: 229 },
    { name: 'Thu', messages: 390, webhooks: 200 },
    { name: 'Fri', messages: 490, webhooks: 220 },
    { name: 'Sat', messages: 590, webhooks: 250 },
    { name: 'Sun', messages: 320, webhooks: 229 },
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition">
            Download Report
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${card.color} p-6 rounded-lg text-white shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-200 text-sm mb-1">{card.label}</p>
                  <p className="text-3xl font-bold">{card.value}</p>
                  {card.change !== undefined && (
                    <p className={`text-sm mt-1 ${card.change >= 0 ? 'text-green-200' : 'text-red-200'}`}>
                      {card.change >= 0 ? '↑' : '↓'} {Math.abs(card.change)}% from last week
                    </p>
                  )}
                </div>
                <div className="text-4xl opacity-20">{card.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Messages & Webhooks Chart */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold mb-4">Messages & Webhooks Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                <XAxis stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#f3f4f6' }}
                />
                <Legend />
                <Line type="monotone" dataKey="messages" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="webhooks" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Activity Distribution */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold mb-4">Activity Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                <XAxis stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#f3f4f6' }}
                />
                <Bar dataKey="messages" fill="#3b82f6" />
                <Bar dataKey="webhooks" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Database & WhatsApp Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Database Statistics */}
          {dbStats && (
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 space-y-4">
              <h3 className="text-xl font-bold">Database Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Active Connections</span>
                  <span className="text-xl font-bold text-green-400">{dbStats.activeConnections}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Connections</span>
                  <span className="text-xl font-bold text-blue-400">{dbStats.totalConnections}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Idle Connections</span>
                  <span className="text-xl font-bold text-yellow-400">{dbStats.idleConnections}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Version</span>
                  <span className="text-sm font-mono text-gray-400">{dbStats.version?.split(' ')[1]}</span>
                </div>
              </div>
            </div>
          )}

          {/* WhatsApp Statistics */}
          {whatsappStats && (
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 space-y-4">
              <h3 className="text-xl font-bold">WhatsApp Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Messages</span>
                  <span className="text-xl font-bold text-green-400">{whatsappStats.totalMessages}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Success Rate</span>
                  <span className="text-xl font-bold text-blue-400">
                    {whatsappStats.totalMessages > 0
                      ? ((whatsappStats.successfulMessages / whatsappStats.totalMessages) * 100).toFixed(2)
                      : 0}
                    %
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Unique Contacts</span>
                  <span className="text-xl font-bold text-purple-400">{whatsappStats.uniqueContacts}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Avg Response Time</span>
                  <span className="text-sm font-mono text-gray-400">{whatsappStats.averageResponseTime?.toFixed(2)}s</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium">WhatsApp Message Received</p>
                  <p className="text-sm text-gray-400">from +201001234567</p>
                </div>
                <span className="text-xs text-gray-500">5 minutes ago</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
