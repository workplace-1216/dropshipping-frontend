/**
 * @fileoverview Global Header Component
 * Provides consistent header across all pages with navigation, user info, and language switcher
 */

'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { LogOut, User, Bell, Menu } from 'lucide-react';

interface HeaderProps {
  title?: string;
  onMenuClick?: () => void;
  showMenu?: boolean;
  notificationComponent?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ 
  title = 'Dashboard', 
  onMenuClick,
  showMenu = false,
  notificationComponent
}) => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Translate user role
  const translateRole = (role: string) => {
    return t(`role.${role.toLowerCase()}`) || role;
  };

  return (
    <header className="bg-slate-800/90 backdrop-blur-xl shadow-lg border-b border-slate-700/50 sticky top-0 z-40">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            {showMenu && (
              <button
                onClick={onMenuClick}
                className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <h1 className="text-xl font-bold text-white">
              {title}
            </h1>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            {notificationComponent || (
              <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            )}

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* User menu */}
            {user && (
              <div className="flex items-center space-x-3 bg-slate-700/50 rounded-lg p-2 border border-slate-600/50">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-white">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-slate-400">{translateRole(user.role)}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

