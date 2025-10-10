/**
 * @fileoverview Admin Notifications Page
 * Displays all notifications with filtering and management capabilities
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { PageLoader } from '@/components/ui/PageLoader';
import { Header } from '@/components/layout/Header';
import { AdminNotificationComponent, useAdminNotifications } from '@/components/ui/AdminNotification';
import { apiClient } from '@/lib/api';
import { motion } from 'framer-motion';
import {
  Bell,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Info,
  UserPlus,
  Filter,
  Search,
  Trash2,
  Check,
  Clock
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'supplier_pending';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  data?: unknown;
}

function NotificationsPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(true);
  const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);
  const { notifications, markAsRead, removeNotification } = useAdminNotifications();

  // Redirect if not admin
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.email !== 'admin@admin.com')) {
      router.push('/dashboard');
    } else if (isAuthenticated && user?.email === 'admin@admin.com') {
      setPageLoading(false);
    }
  }, [isAuthenticated, isLoading, router, user]);

  // Fetch notifications from backend
  const fetchNotifications = useCallback(async () => {
    try {
      interface BackendNotification {
        id: string;
        type: string;
        title: string;
        message: string;
        createdAt: string;
        read: boolean;
        data?: string;
      }
      
      const response = await apiClient.get('/notifications') as BackendNotification[] | { data: BackendNotification[] };
      
      // Handle different response structures
      const backendNotifications: BackendNotification[] = Array.isArray(response) 
        ? response 
        : (response as { data: BackendNotification[] })?.data || [];
      
      // Map backend notification types to frontend types
      const mapNotificationType = (backendType: string): Notification['type'] => {
        const type = backendType.toLowerCase();
        if (type === 'supplier' || type === 'supplier_pending') return 'supplier_pending';
        if (type === 'error') return 'error';
        if (type === 'warning') return 'warning';
        if (type === 'success') return 'success';
        return 'info'; // default for order, user, product, system
      };
      
      // Convert backend notifications to frontend format
      const formattedNotifications: Notification[] = backendNotifications.map((notif: BackendNotification) => ({
        id: notif.id,
        type: mapNotificationType(notif.type),
        title: notif.title,
        message: notif.message,
        timestamp: new Date(notif.createdAt),
        read: notif.read,
        data: notif.data ? JSON.parse(notif.data) : undefined,
      }));
      
      setAllNotifications(formattedNotifications);
      setFilteredNotifications(formattedNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Fallback to empty array on error
      setAllNotifications([]);
      setFilteredNotifications([]);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && user?.email === 'admin@admin.com') {
      fetchNotifications();
    }
  }, [isAuthenticated, user, fetchNotifications]);

  // Filter notifications
  useEffect(() => {
    let filtered = [...allNotifications];

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(n => n.type === filterType);
    }

    // Filter by read status
    if (showOnlyUnread) {
      filtered = filtered.filter(n => !n.read);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(n =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredNotifications(filtered);
  }, [allNotifications, filterType, showOnlyUnread, searchQuery]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-6 h-6 text-yellow-500" />;
      case 'supplier_pending':
        return <UserPlus className="w-6 h-6 text-blue-500" />;
      default:
        return <Info className="w-6 h-6 text-blue-500" />;
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    return timestamp.toLocaleDateString();
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await apiClient.patch(`/notifications/${id}/read`);
      setAllNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );
      markAsRead(id);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await apiClient.post('/notifications/mark-all-read');
      setAllNotifications(prev =>
        prev.map(n => ({ ...n, read: true }))
      );
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiClient.delete(`/notifications/${id}`);
      setAllNotifications(prev => prev.filter(n => n.id !== id));
      removeNotification(id);
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await apiClient.delete('/notifications/all');
      setAllNotifications([]);
    } catch (error) {
      console.error('Error deleting all notifications:', error);
    }
  };

  const unreadCount = allNotifications.filter(n => !n.read).length;

  if (isLoading || pageLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
        <PageLoader isLoading={true} />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
        {/* Header - Fixed */}
        <div className="fixed top-0 left-0 right-0 z-30">
          <Header 
            title="Admin Notifications - All Notifications"
            showMenu={false}
            notificationComponent={
              <AdminNotificationComponent
                notifications={notifications}
                onMarkAsRead={markAsRead}
                onRemove={removeNotification}
              />
            }
          />
        </div>
        
        <div className="container mx-auto px-4 py-8 max-w-6xl pt-24">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-slate-400 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Bell className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white">Notifications</h1>
                  <p className="text-slate-400 mt-1">
                    {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleMarkAllAsRead}
                  disabled={unreadCount === 0}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg transition-all duration-200 flex items-center space-x-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Mark All Read</span>
                </button>
                <button
                  onClick={handleDeleteAll}
                  disabled={allNotifications.length === 0}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg transition-all duration-200 flex items-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear All</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Type Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                >
                  <option value="all">All Types</option>
                  <option value="supplier_pending">Supplier Pending</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                  <option value="info">Info</option>
                </select>
              </div>

              {/* Unread Filter */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="unread"
                  checked={showOnlyUnread}
                  onChange={(e) => setShowOnlyUnread(e.target.checked)}
                  className="w-5 h-5 bg-slate-700 border-slate-600 rounded cursor-pointer"
                />
                <label htmlFor="unread" className="text-white cursor-pointer">
                  Show only unread
                </label>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-12 text-center">
                <Bell className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No notifications found</h3>
                <p className="text-slate-400">
                  {searchQuery || filterType !== 'all' || showOnlyUnread
                    ? 'Try adjusting your filters'
                    : 'You have no notifications at this time'}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-slate-800/50 backdrop-blur-xl border rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-200 ${
                    !notification.read ? 'border-blue-500/50 bg-blue-500/5' : 'border-slate-700'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {getIcon(notification.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                            <span>{notification.title}</span>
                            {!notification.read && (
                              <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                                New
                              </span>
                            )}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-slate-400">
                              {formatTime(notification.timestamp)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {!notification.read && (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="p-2 text-blue-400 hover:text-blue-300 hover:bg-slate-700/50 rounded-lg transition-all"
                              title="Mark as read"
                            >
                              <Check className="w-5 h-5" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(notification.id)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-slate-700/50 rounded-lg transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-slate-300 leading-relaxed">{notification.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default NotificationsPage;

