/**
 * @fileoverview Shimmer effect component for loading states
 * Creates elegant loading animations with shimmer effects
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ShimmerEffectProps {
  className?: string;
  children?: React.ReactNode;
  width?: string;
  height?: string;
}

export const ShimmerEffect: React.FC<ShimmerEffectProps> = ({
  className,
  children,
  width = '100%',
  height = '100%'
}) => {
  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{ width, height }}
    >
      {children}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </div>
  );
};
