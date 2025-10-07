/**
 * @fileoverview Chart Card Component
 * Wrapper for chart components with title and actions
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  delay?: number;
}

export function ChartCard({
  title,
  subtitle,
  children,
  actions,
  delay = 0,
}: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        {actions && <div>{actions}</div>}
      </div>
      <div className="w-full">{children}</div>
    </motion.div>
  );
}

