'use client';

import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { Menu, X, Bell, LogOut } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { sidebarOpen, toggleSidebar, currentUser, notifications, removeNotification } = useAdmin();

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-800 border-r border-gray-700 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <span className={`font-bold text-xl ${!sidebarOpen && 'hidden'}`}>Alazab Admin</span>
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-700 rounded-lg transition"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {[
            { label: 'Dashboard', path: '/admin', icon: '📊' },
            { label: 'WhatsApp', path: '/admin/whatsapp', icon: '💬' },
            { label: 'Webhooks', path: '/admin/webhooks', icon: '🪝' },
            { label: 'Database', path: '/admin/database', icon: '🗄️' },
            { label: 'Audit Logs', path: '/admin/audit-logs', icon: '📋' },
            { label: 'Meta Integration', path: '/admin/meta', icon: '👥' },
            { label: 'Settings', path: '/admin/settings', icon: '⚙️' },
          ].map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition ${
                !sidebarOpen && 'justify-center'
              }`}
              title={item.label}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </a>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-700">
          {currentUser ? (
            <div className={`flex items-center ${!sidebarOpen && 'justify-center'}`}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center font-bold">
                {currentUser.name.charAt(0)}
              </div>
              {sidebarOpen && (
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium">{currentUser.name}</p>
                  <p className="text-xs text-gray-400">{currentUser.role}</p>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          
          <div className="flex items-center gap-6">
            {/* Notifications */}
            <div className="relative">
              <button className="relative p-2 hover:bg-gray-700 rounded-lg transition">
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {notifications.length > 0 && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-700 rounded-lg shadow-lg p-4 z-50">
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3 rounded-lg ${
                          notif.type === 'error'
                            ? 'bg-red-900 border border-red-700'
                            : 'bg-gray-600 border border-gray-500'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-medium">{notif.title}</p>
                            <p className="text-sm text-gray-300">{notif.message}</p>
                          </div>
                          <button
                            onClick={() => removeNotification(notif.id)}
                            className="ml-2 text-gray-400 hover:text-white"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Logout */}
            <button className="p-2 hover:bg-gray-700 rounded-lg transition">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
