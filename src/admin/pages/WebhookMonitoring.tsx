'use client';

import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useWebhookEvents } from '../hooks/useAdminAPI';
import { Loader, RotateCcw, Trash2, Plus } from 'lucide-react';

const WebhookMonitoringPage: React.FC = () => {
  const { events, loading, error, refetch } = useWebhookEvents();
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [eventTypeFilter, setEventTypeFilter] = useState<string>('');
  const [showAddEndpoint, setShowAddEndpoint] = useState(false);

  const eventTypes = [...new Set(events.map(e => e.eventType))];

  const filteredEvents = eventTypeFilter
    ? events.filter(e => e.eventType === eventTypeFilter)
    : events;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-900 text-green-200';
      case 'failed':
        return 'bg-red-900 text-red-200';
      case 'error':
        return 'bg-orange-900 text-orange-200';
      default:
        return 'bg-blue-900 text-blue-200';
    }
  };

  const handleRetry = async (webhookId: string) => {
    try {
      // TODO: Implement retry API call
      await refetch();
    } catch (error) {
      console.error('Retry failed:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Webhook Monitoring</h2>
          <button
            onClick={() => setShowAddEndpoint(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
          >
            <Plus size={20} /> Add Endpoint
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Events', value: events.length, color: 'from-blue-500 to-blue-600' },
            {
              label: 'Successful',
              value: events.filter(e => e.status === 'completed').length,
              color: 'from-green-500 to-green-600',
            },
            {
              label: 'Failed',
              value: events.filter(e => e.status === 'failed').length,
              color: 'from-red-500 to-red-600',
            },
            {
              label: 'Errors',
              value: events.filter(e => e.status === 'error').length,
              color: 'from-orange-500 to-orange-600',
            },
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
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex gap-4 items-center">
          <select
            value={eventTypeFilter}
            onChange={(e) => setEventTypeFilter(e.target.value)}
            className="px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="">All Event Types</option>
            {eventTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition"
          >
            <RotateCcw size={20} /> Refresh
          </button>
        </div>

        {/* Events List */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-bold mb-4">Webhook Events</h3>
          {loading ? (
            <div className="text-center py-8">
              <Loader className="animate-spin mx-auto" />
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-400">
              Error: {error}
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No webhook events found.
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition cursor-pointer"
                  onClick={() => setSelectedEvent(selectedEvent === event.webhookId ? null : event.webhookId)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold">{event.eventType}</p>
                        <span className={`px-2 py-1 text-xs rounded font-medium ${getStatusColor(event.status)}`}>
                          {event.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">
                        ID: {event.webhookId}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(event.createdAt).toLocaleString()}
                      </p>
                    </div>
                    {event.status === 'failed' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRetry(event.webhookId);
                        }}
                        className="p-2 hover:bg-blue-600 rounded-lg transition"
                        title="Retry webhook"
                      >
                        <RotateCcw size={16} />
                      </button>
                    )}
                  </div>

                  {/* Expanded Details */}
                  {selectedEvent === event.webhookId && (
                    <div className="mt-4 pt-4 border-t border-gray-600 space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-300 mb-1">Payload:</p>
                        <pre className="bg-gray-800 p-3 rounded text-xs text-gray-300 overflow-x-auto max-h-48 overflow-y-auto">
                          {JSON.stringify(event.payload, null, 2)}
                        </pre>
                      </div>
                      {event.errorMessage && (
                        <div>
                          <p className="text-sm font-medium text-red-400 mb-1">Error:</p>
                          <p className="text-xs text-red-300">{event.errorMessage}</p>
                        </div>
                      )}
                      <div className="flex gap-2">
                        {event.status === 'failed' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRetry(event.webhookId);
                            }}
                            className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs font-medium transition"
                          >
                            <RotateCcw size={14} /> Retry
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // TODO: Implement delete
                          }}
                          className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-xs font-medium transition"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Registered Endpoints */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-bold mb-4">Registered Endpoints</h3>
          <div className="space-y-3">
            {[
              { name: 'Primary Webhook', url: 'https://api.alazab.com/webhooks', events: ['whatsapp.message', 'meta.post'] },
              { name: 'Backup Webhook', url: 'https://backup.alazab.com/webhooks', events: ['whatsapp.message'] },
            ].map((endpoint, index) => (
              <div key={index} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-bold">{endpoint.name}</p>
                    <p className="text-sm text-gray-400 font-mono">{endpoint.url}</p>
                    <div className="flex gap-2 mt-2">
                      {endpoint.events.map((event) => (
                        <span key={event} className="text-xs bg-blue-900 text-blue-200 px-2 py-1 rounded">
                          {event}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="p-2 hover:bg-red-600 rounded-lg transition">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Endpoint Modal */}
      {showAddEndpoint && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700">
            <h3 className="text-xl font-bold mb-4">Add Webhook Endpoint</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Endpoint Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="e.g., Primary Webhook"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">URL</label>
                <input
                  type="url"
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="https://example.com/webhook"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Events</label>
                <div className="space-y-2">
                  {['whatsapp.message', 'meta.post', 'user.created', 'user.updated'].map((event) => (
                    <label key={event} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" defaultChecked={event === 'whatsapp.message'} />
                      <span className="text-sm">{event}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
                >
                  Add Endpoint
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddEndpoint(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default WebhookMonitoringPage;
