/**
 * @fileoverview Toast Notification Demo Page
 * Showcase all toast types and features
 */

'use client';

import React from 'react';
import { useToastHelpers } from '@/components/ui/Toast';
import { GradientButton } from '@/components/ui/GradientButton';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

export default function ToastDemo() {
  const toast = useToastHelpers();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Toast Notification System
          </h1>
          <p className="text-gray-600 text-lg">
            Modern, beautiful, and professional notifications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Success Examples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Success Toasts</h2>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => toast.success('Account Created!', 'Welcome to the platform!')}
                className="w-full px-4 py-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg font-medium transition-colors"
              >
                Registration Success
              </button>
              
              <button
                onClick={() => toast.success('Login Successful!', 'Redirecting to dashboard...')}
                className="w-full px-4 py-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg font-medium transition-colors"
              >
                Login Success
              </button>
              
              <button
                onClick={() => toast.success('Settings Saved', 'Your preferences have been updated')}
                className="w-full px-4 py-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg font-medium transition-colors"
              >
                Save Success
              </button>
            </div>
          </motion.div>

          {/* Error Examples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-rose-600 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Error Toasts</h2>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => toast.error('Login Failed', 'Invalid email or password')}
                className="w-full px-4 py-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg font-medium transition-colors"
              >
                Login Error
              </button>
              
              <button
                onClick={() => toast.error('Payment Failed', 'Your card was declined')}
                className="w-full px-4 py-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg font-medium transition-colors"
              >
                Payment Error
              </button>
              
              <button
                onClick={() => toast.error('Network Error', 'Unable to connect to server')}
                className="w-full px-4 py-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg font-medium transition-colors"
              >
                Network Error
              </button>
            </div>
          </motion.div>

          {/* Warning Examples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Warning Toasts</h2>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => toast.warning('Low Stock', 'Product inventory is running low')}
                className="w-full px-4 py-3 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded-lg font-medium transition-colors"
              >
                Low Stock Warning
              </button>
              
              <button
                onClick={() => toast.warning('Subscription Expiring', 'Your plan expires in 3 days')}
                className="w-full px-4 py-3 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded-lg font-medium transition-colors"
              >
                Expiration Warning
              </button>
              
              <button
                onClick={() => toast.warning('Action Required', 'Please verify your email address')}
                className="w-full px-4 py-3 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded-lg font-medium transition-colors"
              >
                Action Warning
              </button>
            </div>
          </motion.div>

          {/* Info Examples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Info className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Info Toasts</h2>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => toast.info('New Feature', 'Check out our latest inventory tools!')}
                className="w-full px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-medium transition-colors"
              >
                Feature Info
              </button>
              
              <button
                onClick={() => toast.info('System Update', 'The platform will be updated tonight')}
                className="w-full px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-medium transition-colors"
              >
                Update Info
              </button>
              
              <button
                onClick={() => toast.info('Tip', 'Use keyboard shortcuts to navigate faster')}
                className="w-full px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-medium transition-colors"
              >
                Tip Info
              </button>
            </div>
          </motion.div>
        </div>

        {/* Multiple Toasts Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white rounded-xl shadow-lg p-6 text-center"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Advanced Demos</h2>
          
          <div className="flex justify-center gap-4 flex-wrap">
            <GradientButton
              onClick={() => {
                toast.info('Processing...', 'Starting the operation');
                setTimeout(() => toast.warning('Almost done...', 'Just a few more seconds'), 1500);
                setTimeout(() => toast.success('Completed!', 'Operation finished successfully'), 3000);
              }}
              className="cursor-pointer"
            >
              Sequence Demo
            </GradientButton>
            
            <button
              onClick={() => {
                toast.success('Success 1');
                toast.error('Error 2');
                toast.warning('Warning 3');
                toast.info('Info 4');
              }}
              className="px-6 py-3 border-2 border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Stack Demo
            </button>
          </div>
        </motion.div>

        {/* Code Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gray-900 rounded-xl shadow-lg p-6 text-white"
        >
          <h3 className="text-lg font-bold mb-4 text-blue-400">Usage Example</h3>
          <pre className="text-sm overflow-x-auto">
            <code>{`import { useToastHelpers } from '@/components/ui/Toast';

function MyComponent() {
  const toast = useToastHelpers();

  const handleSuccess = () => {
    toast.success('Success!', 'Operation completed');
  };

  const handleError = () => {
    toast.error('Error!', 'Something went wrong');
  };

  return (
    <div>
      <button onClick={handleSuccess}>Success</button>
      <button onClick={handleError}>Error</button>
    </div>
  );
}`}</code>
          </pre>
        </motion.div>
      </div>
    </div>
  );
}

