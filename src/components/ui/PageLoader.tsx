/**
 * @fileoverview Page Loader Component
 * Modern, professional loading spinner for page transitions
 */

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageLoaderProps {
  isLoading: boolean;
  message?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ isLoading, message = 'Loading...' }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"
        >
          <div className="relative flex flex-col items-center">
            {/* Multi-layer Spinner */}
            <div className="relative w-20 h-20 mb-6">
              {/* Outer rotating ring */}
              <motion.div
                className="absolute inset-0 border-4 border-transparent border-t-blue-400 border-r-purple-400 rounded-full shadow-lg shadow-blue-500/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Middle rotating ring */}
              <motion.div
                className="absolute inset-2 border-4 border-transparent border-t-purple-400 border-r-pink-400 rounded-full shadow-lg shadow-purple-500/50"
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Inner pulsing circle */}
              <motion.div
                className="absolute inset-4 bg-gradient-to-br from-blue-400/80 via-purple-400/80 to-pink-400/80 rounded-full shadow-2xl shadow-purple-500/60"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              
              {/* Center glow */}
              <div className="absolute inset-6 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 rounded-full blur-md opacity-60" />
            </div>

            {/* Loading Text */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.h3
                className="text-xl font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                {message}
              </motion.h3>
              
              {/* Loading dots */}
              <div className="flex items-center justify-center space-x-2">
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg shadow-blue-500/50"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.2,
                      ease: 'easeInOut'
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Background particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg shadow-blue-500/50"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

