/**
 * @fileoverview Centralized redirect utility functions
 * Ensures consistent redirect behavior across the application
 */

import { User } from './api';

/**
 * Get the appropriate dashboard URL based on user role
 */
export function getDashboardUrl(user: User | null): string {
  if (!user) {
    return '/login';
  }

  // Special case: admin email always goes to admin dashboard
  if (user.email === 'admin@admin.com') {
    return '/admin';
  }

  switch (user.role) {
    case 'ADMIN':
      return '/admin';
    case 'OPERATOR':
      return '/dashboard';
    case 'SUPPLIER':
    case 'SELLER':
    default:
      return '/dashboard';
  }
}

/**
 * Get the appropriate redirect URL after authentication
 */
export function getAuthRedirectUrl(user: User | null): string {
  if (!user) {
    return '/login';
  }

  // For authenticated users, redirect to their role-specific dashboard
  return getDashboardUrl(user);
}

/**
 * Get the logout redirect URL
 */
export function getLogoutRedirectUrl(): string {
  // Always redirect to home page after logout
  return '/';
}

/**
 * Check if user should be redirected to a specific page
 */
export function shouldRedirectToRoleDashboard(user: User | null, currentPath: string): boolean {
  if (!user) return false;

  const expectedPath = getDashboardUrl(user);
  
  // Don't redirect if already on the correct page
  if (currentPath === expectedPath) return false;
  
  // Don't redirect if on auth pages
  const authPages = ['/login', '/register', '/forgot-password'];
  if (authPages.some(page => currentPath.startsWith(page))) return false;
  
  return true;
}
