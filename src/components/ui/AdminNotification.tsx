'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CheckCircle, AlertCircle, Info, UserPlus, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface AdminNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'supplier_pending';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  data?: unknown;
}

interface AdminNotificationProps {
  notifications: AdminNotification[];
  onMarkAsRead: (id: string) => void;
  onRemove: (id: string) => void;
  onApproveSupplier?: (supplierData: unknown) => void;
  onRejectSupplier?: (supplierData: unknown) => void;
}

export const AdminNotificationComponent: React.FC<AdminNotificationProps> = ({
  notifications,
  onMarkAsRead,
  onRemove,
  onApproveSupplier,
  onRejectSupplier,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'supplier_pending':
        return <UserPlus className="w-5 h-5 text-blue-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
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
    return `${days}d ago`;
  };

  const handleViewAllNotifications = () => {
    setIsOpen(false);
    router.push('/admin/notifications');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-white transition-colors duration-200"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.div>
        )}
      </button>

      {/* Notification Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-96 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Notifications</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-gray-400">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No notifications</p>
                </div>
              ) : (
                notifications.slice(0, 5).map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors ${
                      !notification.read ? 'bg-gray-700/20' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {getIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold text-white">
                            {notification.title}
                          </h4>
                          <span className="text-xs text-gray-400">
                            {formatTime(notification.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 mt-1">
                          {notification.message}
                        </p>

                        {/* Supplier Pending Actions */}
                        {notification.type === 'supplier_pending' && !!notification.data && (
                          <div className="mt-3 flex space-x-2">
                            <button
                              onClick={() => {
                                onApproveSupplier?.(notification.data);
                                onMarkAsRead(notification.id);
                              }}
                              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded-lg transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => {
                                onRejectSupplier?.(notification.data);
                                onMarkAsRead(notification.id);
                              }}
                              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        )}

                        {/* Mark as Read Button */}
                        {!notification.read && (
                          <button
                            onClick={() => onMarkAsRead(notification.id)}
                            className="mt-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            Mark as read
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => onRemove(notification.id)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* View All Notifications Footer */}
            <div className="p-3 border-t border-gray-700 bg-gray-800/50">
              <button
                onClick={handleViewAllNotifications}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 hover:bg-gray-700/50 rounded-lg transition-all duration-200"
              >
                <span>View All Notifications</span>
                <ExternalLink className="w-4 h-4" />
              </button>
              {notifications.length > 5 && (
                <p className="text-center text-xs text-gray-500 mt-1">
                  +{notifications.length - 5} more notifications
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Hook for managing admin notifications
export const useAdminNotifications = () => {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);

  const addNotification = (notification: Omit<AdminNotification, 'timestamp' | 'read'> | Omit<AdminNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: AdminNotification = {
      ...notification,
      id: 'id' in notification ? notification.id : `${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      read: false,
    };
    
    // Prevent duplicates by checking if notification with same ID already exists
    setNotifications(prev => {
      const exists = prev.some(n => n.id === newNotification.id);
      if (exists) return prev;
      return [newNotification, ...prev];
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return {
    notifications,
    addNotification,
    markAsRead,
    removeNotification,
    clearAll,
  };
};
