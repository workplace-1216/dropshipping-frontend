/**
 * @fileoverview Animated Counter Component
 * Displays animated number transitions with smooth counting effects
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  /**
   * The target number to count to
   */
  value: number;
  /**
   * Duration of the animation in seconds
   */
  duration?: number;
  /**
   * Number of decimal places to show
   */
  decimals?: number;
  /**
   * Prefix to show before the number (e.g., '$', '+')
   */
  prefix?: string;
  /**
   * Suffix to show after the number (e.g., '%', 'K', 'M')
   */
  suffix?: string;
  /**
   * Custom CSS class name
   */
  className?: string;
  /**
   * Whether to trigger animation when component comes into view
   */
  triggerOnView?: boolean;
  /**
   * Delay before starting animation (in seconds)
   */
  delay?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
  triggerOnView = true,
  delay = 0,
}) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const spring = useSpring(0, {
    stiffness: 100,
    damping: 30,
    duration: duration * 1000,
  });

  const display = useTransform(spring, (current) => {
    return current.toFixed(decimals);
  });

  useEffect(() => {
    if (!triggerOnView || (triggerOnView && isInView && !hasAnimated)) {
      const timer = setTimeout(() => {
        spring.set(value);
        setHasAnimated(true);
      }, delay * 1000);

      return () => clearTimeout(timer);
    } else if (!triggerOnView && !hasAnimated) {
      spring.set(value);
      setHasAnimated(true);
    }
  }, [value, spring, isInView, hasAnimated, triggerOnView, delay]);

  // Reset animation when value changes
  useEffect(() => {
    if (hasAnimated) {
      spring.set(0);
      const timer = setTimeout(() => {
        spring.set(value);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [value, spring, hasAnimated]);

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={triggerOnView ? (isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }) : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.span className="tabular-nums">
        {prefix}
        <motion.span>{display}</motion.span>
        {suffix}
      </motion.span>
    </motion.span>
  );
};

// Preset configurations for common use cases
export const AnimatedCounterPresets = {
  /**
   * Currency counter (e.g., $1,234.56)
   */
  Currency: ({ value, ...props }: Omit<AnimatedCounterProps, 'prefix' | 'decimals'>) => (
    <AnimatedCounter value={value} prefix="$" decimals={2} {...props} />
  ),

  /**
   * Percentage counter (e.g., 95.5%)
   */
  Percentage: ({ value, ...props }: Omit<AnimatedCounterProps, 'suffix' | 'decimals'>) => (
    <AnimatedCounter value={value} suffix="%" decimals={1} {...props} />
  ),

  /**
   * Thousand counter with K suffix (e.g., 1.2K)
   */
  Thousand: ({ value, ...props }: Omit<AnimatedCounterProps, 'suffix'>) => (
    <AnimatedCounter value={value} suffix="K" decimals={1} {...props} />
  ),

  /**
   * Million counter with M suffix (e.g., 1.5M)
   */
  Million: ({ value, ...props }: Omit<AnimatedCounterProps, 'suffix'>) => (
    <AnimatedCounter value={value} suffix="M" decimals={1} {...props} />
  ),

  /**
   * Integer counter (e.g., 1,234)
   */
  Integer: ({ value, ...props }: Omit<AnimatedCounterProps, 'decimals'>) => (
    <AnimatedCounter value={value} decimals={0} {...props} />
  ),

  /**
   * Plus prefix counter (e.g., +25)
   */
  Plus: ({ value, ...props }: Omit<AnimatedCounterProps, 'prefix'>) => (
    <AnimatedCounter value={value} prefix="+" {...props} />
  ),
};

export default AnimatedCounter;
