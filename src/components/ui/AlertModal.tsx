"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export interface AlertModalProps {
  isOpen: boolean;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  onClose: () => void;
  confirmText?: string;
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  type,
  title,
  message,
  onClose,
  confirmText = 'OK'
}) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/30">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
        );
      case 'error':
        return (
          <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500/30">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
        );
      case 'warning':
        return (
          <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-500/30">
            <AlertTriangle className="w-8 h-8 text-amber-400" />
          </div>
        );
      case 'info':
        return (
          <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 border-2 border-blue-500/30">
            <Info className="w-8 h-8 text-blue-400" />
          </div>
        );
      default:
        return (
          <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 border-2 border-blue-500/30">
            <Info className="w-8 h-8 text-blue-400" />
          </div>
        );
    }
  };

  const getButtonColor = () => {
    switch (type) {
      case 'success':
        return 'from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 focus:ring-emerald-500/50';
      case 'error':
        return 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:ring-red-500/50';
      case 'warning':
        return 'from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 focus:ring-amber-500/50';
      case 'info':
        return 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring-blue-500/50';
      default:
        return 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring-blue-500/50';
    }
  };

  const getAccentColor = () => {
    switch (type) {
      case 'success':
        return 'border-t-emerald-500';
      case 'error':
        return 'border-t-red-500';
      case 'warning':
        return 'border-t-amber-500';
      case 'info':
        return 'border-t-blue-500';
      default:
        return 'border-t-blue-500';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ 
              type: "spring",
              damping: 25,
              stiffness: 300,
              duration: 0.3 
            }}
            onClick={(e) => e.stopPropagation()}
            className={`relative bg-slate-800/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full border border-slate-700/50 ${getAccentColor()} border-t-4 overflow-hidden`}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200 z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="p-8">
              {/* Icon */}
              <div className="mb-6">
                {getIcon()}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white text-center mb-3">
                {title}
              </h3>

              {/* Message */}
              {message && (
                <p className="text-slate-300 text-center leading-relaxed mb-6">
                  {message}
                </p>
              )}

              {/* Action Button */}
              <button
                onClick={onClose}
                className={`w-full px-6 py-3 bg-gradient-to-r ${getButtonColor()} text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 transform hover:scale-[1.02] active:scale-[0.98]`}
              >
                {confirmText}
              </button>
            </div>

            {/* Decorative gradient overlay */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Hook for managing alert modal
export const useAlertModal = () => {
  const [alertState, setAlertState] = React.useState<{
    isOpen: boolean;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
    confirmText?: string;
  }>({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    confirmText: 'OK'
  });

  const showAlert = (
    type: 'success' | 'error' | 'warning' | 'info',
    title: string,
    message?: string,
    confirmText?: string
  ) => {
    setAlertState({
      isOpen: true,
      type,
      title,
      message,
      confirmText: confirmText || 'OK'
    });
  };

  const showSuccess = (title: string, message?: string, confirmText?: string) => {
    showAlert('success', title, message, confirmText);
  };

  const showError = (title: string, message?: string, confirmText?: string) => {
    showAlert('error', title, message, confirmText);
  };

  const showWarning = (title: string, message?: string, confirmText?: string) => {
    showAlert('warning', title, message, confirmText);
  };

  const showInfo = (title: string, message?: string, confirmText?: string) => {
    showAlert('info', title, message, confirmText);
  };

  const closeAlert = () => {
    setAlertState(prev => ({ ...prev, isOpen: false }));
  };

  return {
    alertState,
    showAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    closeAlert
  };
};

export default AlertModal;

