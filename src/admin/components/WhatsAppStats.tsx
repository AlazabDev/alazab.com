'use client';

import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface WhatsAppStatsProps {
  stats: {
    totalMessages: number;
    inboundMessages: number;
    outboundMessages: number;
    successfulMessages: number;
    failedMessages: number;
    uniqueContacts: number;
    averageResponseTime: number;
  };
}

const COLORS = ['#10b981', '#ef4444', '#f59e0b', '#3b82f6'];

export const WhatsAppStats: React.FC<WhatsAppStatsProps> = ({ stats }) => {
  const chartData = [
    { name: 'Mon', sent: 120, received: 100, failed: 5 },
    { name: 'Tue', sent: 150, received: 130, failed: 3 },
    { name: 'Wed', sent: 200, received: 180, failed: 8 },
    { name: 'Thu', sent: 160, received: 140, failed: 2 },
    { name: 'Fri', sent: 180, received: 160, failed: 4 },
    { name: 'Sat', sent: 140, received: 120, failed: 6 },
    { name: 'Sun', sent: 100, received: 90, failed: 1 },
  ];

  const pieData = [
    { name: 'Success', value: stats.successfulMessages },
    { name: 'Failed', value: stats.failedMessages },
  ];

  const successRate = stats.totalMessages > 0 
    ? ((stats.successfulMessages / stats.totalMessages) * 100).toFixed(2)
    : 0;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-400 text-sm mb-1">Success Rate</p>
          <p className="text-3xl font-bold text-green-400">{successRate}%</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-400 text-sm mb-1">Avg Response Time</p>
          <p className="text-3xl font-bold text-blue-400">{stats.averageResponseTime?.toFixed(2)}s</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-400 text-sm mb-1">Unique Contacts</p>
          <p className="text-3xl font-bold text-purple-400">{stats.uniqueContacts}</p>
        </div>
      </div>

      {/* Message Trends */}
      <div className="bg-gray-700 p-6 rounded-lg">
        <h4 className="text-lg font-bold mb-4">Message Trends</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
            <XAxis stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} />
            <Legend />
            <Line type="monotone" dataKey="sent" stroke="#10b981" name="Sent" />
            <Line type="monotone" dataKey="received" stroke="#3b82f6" name="Received" />
            <Line type="monotone" dataKey="failed" stroke="#ef4444" name="Failed" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-700 p-6 rounded-lg">
          <h4 className="text-lg font-bold mb-4">Message Distribution</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Inbound', value: stats.inboundMessages },
                  { name: 'Outbound', value: stats.outboundMessages },
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg">
          <h4 className="text-lg font-bold mb-4">Status Breakdown</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={[
                { name: 'Success', value: stats.successfulMessages },
                { name: 'Failed', value: stats.failedMessages },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
              <XAxis stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppStats;
