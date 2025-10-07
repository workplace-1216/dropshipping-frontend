/**
 * @fileoverview Gradient button component with stunning hover effects
 * Features smooth animations and modern gradient designs
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const variants = {
  primary: 'from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
  secondary: 'from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900',
  success: 'from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700',
  warning: 'from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600',
  danger: 'from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700'
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
};

export const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  type = 'button'
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative overflow-hidden rounded-lg font-semibold text-white',
        'bg-gradient-to-r transition-all duration-300',
        'hover:shadow-lg hover:shadow-blue-500/25',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'focus:outline-none focus:ring-2 focus:ring-blue-500/50',
        'flex items-center justify-center gap-2',
        variants[variant],
        sizes[size],
        className
      )}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
