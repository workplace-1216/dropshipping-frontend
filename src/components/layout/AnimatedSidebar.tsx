/**
 * @fileoverview Animated sidebar component for multi-tenant dashboard
 * Features smooth animations, role-based navigation, and elegant design
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Warehouse, 
  Wallet, 
  Settings, 
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
  HelpCircle,
  Link,
  CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href: string;
  roles: string[];
  badge?: number;
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'nav.dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    roles: ['admin', 'seller', 'operator']
  },
  {
    id: 'products',
    label: 'nav.products',
    icon: Package,
    href: '/products',
    roles: ['admin', 'seller'],
    badge: 12
  },
  {
    id: 'orders',
    label: 'nav.orders',
    icon: ShoppingCart,
    href: '/orders',
    roles: ['admin', 'seller', 'operator'],
    badge: 5
  },
  {
    id: 'inventory',
    label: 'nav.inventory',
    icon: Warehouse,
    href: '/inventory',
    roles: ['admin', 'seller']
  },
  {
    id: 'wallet',
    label: 'nav.wallet',
    icon: Wallet,
    href: '/wallet',
    roles: ['admin', 'seller']
  },
  {
    id: 'marketplace',
    label: 'Marketplace',
    icon: Link,
    href: '/marketplace',
    roles: ['admin', 'seller']
  },
  {
    id: 'subscription',
    label: 'Subscription',
    icon: CreditCard,
    href: '/subscription',
    roles: ['admin', 'seller']
  },
  {
    id: 'settings',
    label: 'nav.settings',
    icon: Settings,
    href: '/settings',
    roles: ['admin', 'seller', 'operator']
  }
];

interface AnimatedSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const AnimatedSidebar: React.FC<AnimatedSidebarProps> = ({
  isCollapsed,
  onToggle
}) => {
  const { t, currentLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const [activeItem, setActiveItem] = useState('dashboard');

  const filteredItems = sidebarItems.filter(item => 
    user?.role && item.roles.includes(user.role)
  );

  // Force re-render when language changes
  useEffect(() => {
    // This effect will trigger re-render when currentLanguage changes
  }, [currentLanguage]);

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-white border-r border-gray-200 flex flex-col h-full"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">W</span>
                </div>
                <div>
                  <h1 className="font-bold text-gray-900">Workana</h1>
                  <p className="text-xs text-gray-500">Hourly Platform</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {filteredItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <motion.a
              key={item.id}
              href={item.href}
              onClick={() => setActiveItem(item.id)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
              className={cn(
                'flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200',
                'hover:bg-gray-50 hover:shadow-sm',
                isActive 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                  : 'text-gray-700 hover:text-gray-900'
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-between flex-1 min-w-0"
                  >
                    <span className="font-medium truncate">{t(item.label)}</span>
                    {item.badge && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center"
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.a>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex-1 min-w-0"
              >
                <p className="font-medium text-gray-900 truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {user?.role || 'User'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="mt-3 space-y-1"
            >
              <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </button>
              <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <HelpCircle className="w-4 h-4" />
                <span>Help & Support</span>
              </button>
              <button 
                onClick={logout}
                className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>{t('nav.logout')}</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
};
