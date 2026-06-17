'use client';

import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useWhatsAppAccounts, useWhatsAppMessages, useSendWhatsAppMessage } from '../hooks/useAdminAPI';
import { Trash2, Plus, Send, Loader } from 'lucide-react';

const WhatsAppManagementPage: React.FC = () => {
  const { accounts, loading: accountsLoading, refetch: refetchAccounts } = useWhatsAppAccounts();
  const { messages, loading: messagesLoading } = useWhatsAppMessages();
  const { send: sendMessage, loading: sendingLoading } = useSendWhatsAppMessage();

  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [messageText, setMessageText] = useState('');
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [newAccount, setNewAccount] = useState({
    accountName: '',
    phoneNumber: '',
    businessAccountId: '',
    accessToken: '',
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAccount || !messageText) return;

    try {
      await sendMessage(selectedAccount, messageText);
      setMessageText('');
      // Show success notification
    } catch (error) {
      // Show error notification
    }
  };

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to add account
    setShowAddAccount(false);
    setNewAccount({ accountName: '', phoneNumber: '', businessAccountId: '', accessToken: '' });
    await refetchAccounts();
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">WhatsApp Management</h2>
          <button
            onClick={() => setShowAddAccount(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition"
          >
            <Plus size={20} /> Add Account
          </button>
        </div>

        {/* Accounts List */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-bold mb-4">Connected Accounts</h3>
          {accountsLoading ? (
            <div className="text-center py-8">
              <Loader className="animate-spin mx-auto" />
            </div>
          ) : accounts.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No WhatsApp accounts connected yet.
            </div>
          ) : (
            <div className="space-y-3">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition cursor-pointer"
                  onClick={() => setSelectedAccount(account.phoneNumber)}
                >
                  <div className="flex-1">
                    <p className="font-bold">{account.accountName}</p>
                    <p className="text-sm text-gray-400">{account.phoneNumber}</p>
                    <div className="flex gap-4 mt-2 text-xs text-gray-400">
                      <span>Messages: {account.messageCount}</span>
                      <span>Status: {account.isActive ? '✓ Active' : '✗ Inactive'}</span>
                      <span>Connected: {new Date(account.connectedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-red-600 rounded-lg transition">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Send Message Section */}
        {selectedAccount && (
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 space-y-4">
            <h3 className="text-xl font-bold">Send Message</h3>
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">To</label>
                <input
                  type="text"
                  value={selectedAccount}
                  disabled
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 text-gray-300 disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  maxLength={4096}
                  rows={5}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Type your message..."
                />
                <div className="text-xs text-gray-400 mt-1">
                  {messageText.length} / 4096 characters
                </div>
              </div>
              <button
                type="submit"
                disabled={sendingLoading || !messageText}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg font-medium transition"
              >
                {sendingLoading ? <Loader className="animate-spin" size={20} /> : <Send size={20} />}
                Send Message
              </button>
            </form>
          </div>
        )}

        {/* Message History */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-bold mb-4">Message History</h3>
          {messagesLoading ? (
            <div className="text-center py-8">
              <Loader className="animate-spin mx-auto" />
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No messages yet.
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {messages.map((msg) => (
                <div key={msg.id} className="p-4 bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <p className="font-medium">{msg.phoneNumber}</p>
                      <p className="text-sm text-gray-400">
                        {msg.direction === 'inbound' ? 'Inbound' : 'Outbound'} •{' '}
                        {new Date(msg.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded font-medium ${
                        msg.status === 'success'
                          ? 'bg-green-900 text-green-200'
                          : 'bg-red-900 text-red-200'
                      }`}
                    >
                      {msg.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-200 break-words">{msg.message}</p>
                  {msg.errorMessage && (
                    <p className="text-xs text-red-400 mt-2">Error: {msg.errorMessage}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Account Modal */}
      {showAddAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700">
            <h3 className="text-xl font-bold mb-4">Add WhatsApp Account</h3>
            <form onSubmit={handleAddAccount} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Account Name</label>
                <input
                  type="text"
                  value={newAccount.accountName}
                  onChange={(e) => setNewAccount({ ...newAccount, accountName: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="e.g., Main Account"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={newAccount.phoneNumber}
                  onChange={(e) => setNewAccount({ ...newAccount, phoneNumber: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="+1234567890"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Business Account ID</label>
                <input
                  type="text"
                  value={newAccount.businessAccountId}
                  onChange={(e) => setNewAccount({ ...newAccount, businessAccountId: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="123456789"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Access Token</label>
                <input
                  type="password"
                  value={newAccount.accessToken}
                  onChange={(e) => setNewAccount({ ...newAccount, accessToken: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Bearer token"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
                >
                  Add Account
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddAccount(false)}
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

export default WhatsAppManagementPage;
