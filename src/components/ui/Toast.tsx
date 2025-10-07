/**
 * @fileoverview Modern Toast Notification Component
 * Beautiful, animated toast notifications for user feedback
 */

'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration || 4000,
    };

    setToasts((prev) => [...prev, newToast]);

    // Auto-hide after duration
    setTimeout(() => {
      hideToast(id);
    }, newToast.duration);
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <ToastContainer toasts={toasts} onClose={hideToast} />
    </ToastContext.Provider>
  );
}

function ToastContainer({ toasts, onClose }: { toasts: Toast[]; onClose: (id: string) => void }) {
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={onClose} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: (id: string) => void }) {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  const colors = {
    success: {
      bg: 'bg-gradient-to-r from-green-500 to-emerald-600',
      icon: 'text-white',
      border: 'border-green-400',
    },
    error: {
      bg: 'bg-gradient-to-r from-red-500 to-rose-600',
      icon: 'text-white',
      border: 'border-red-400',
    },
    warning: {
      bg: 'bg-gradient-to-r from-yellow-500 to-orange-600',
      icon: 'text-white',
      border: 'border-yellow-400',
    },
    info: {
      bg: 'bg-gradient-to-r from-blue-500 to-indigo-600',
      icon: 'text-white',
      border: 'border-blue-400',
    },
  };

  const Icon = icons[toast.type];
  const colorClasses = colors[toast.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className="pointer-events-auto"
    >
      <div className={`${colorClasses.bg} rounded-2xl shadow-2xl border ${colorClasses.border} backdrop-blur-xl overflow-hidden max-w-md`}>
        <div className="p-4 flex items-start gap-4">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 500, damping: 20 }}
            className="flex-shrink-0"
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Icon className={`w-6 h-6 ${colorClasses.icon}`} />
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 pt-0.5">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="font-semibold text-white text-base mb-1"
            >
              {toast.title}
            </motion.h3>
            {toast.message && (
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="text-sm text-white/90"
              >
                {toast.message}
              </motion.p>
            )}
          </div>

          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => onClose(toast.id)}
            className="flex-shrink-0 text-white/80 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: (toast.duration || 4000) / 1000, ease: 'linear' }}
          className="h-1 bg-white/30 origin-left"
        />
      </div>
    </motion.div>
  );
}

// Helper hook for common toast messages
export function useToastHelpers() {
  const { showToast } = useToast();

  return {
    success: (title: string, message?: string) => 
      showToast({ type: 'success', title, message }),
    
    error: (title: string, message?: string) => 
      showToast({ type: 'error', title, message }),
    
    warning: (title: string, message?: string) => 
      showToast({ type: 'warning', title, message }),
    
    info: (title: string, message?: string) => 
      showToast({ type: 'info', title, message }),
  };
}

