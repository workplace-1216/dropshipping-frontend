/**
 * @fileoverview RBAC Permissions Management Page
 * Provides detailed permission management interface for roles
 */

'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { PageLoader } from '@/components/ui/PageLoader';
import { motion } from 'framer-motion';
import {
  Shield,
  ArrowLeft,
  Check,
  X,
  Search,
  Filter,
  Save,
  RefreshCw,
  Lock,
  Unlock,
  Users,
  Settings,
  FileText,
  Package,
  ShoppingCart,
  DollarSign,
} from 'lucide-react';

export default function PermissionsManagement() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState('Admin');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // Get role from URL parameters
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roleParam = urlParams.get('role');
    if (roleParam) {
      // Capitalize first letter to match role names
      const capitalizedRole = roleParam.charAt(0).toUpperCase() + roleParam.slice(1);
      setSelectedRole(capitalizedRole);
    }
  }, []);

  // Redirect if not admin
  React.useEffect(() => {
    if (!isLoading && isAuthenticated && user?.email !== 'admin@admin.com') {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (!isAuthenticated || user?.email !== 'admin@admin.com') {
    return null;
  }

  if (isLoading) {
    return <PageLoader isLoading={true} message="Loading Permissions..." />;
  }

  const roles = [
    { name: 'Admin', color: 'from-purple-500 to-purple-600', users: 3 },
    { name: 'Operator', color: 'from-blue-500 to-blue-600', users: 12 },
    { name: 'Supplier', color: 'from-green-500 to-green-600', users: 156 },
    { name: 'Seller', color: 'from-orange-500 to-orange-600', users: 847 }
  ];

  const permissionCategories = [
    { id: 'users', name: 'User Management', icon: Users, color: 'blue' },
    { id: 'products', name: 'Product Management', icon: Package, color: 'green' },
    { id: 'orders', name: 'Order Management', icon: ShoppingCart, color: 'orange' },
    { id: 'finance', name: 'Financial', icon: DollarSign, color: 'emerald' },
    { id: 'settings', name: 'System Settings', icon: Settings, color: 'purple' },
    { id: 'reports', name: 'Reports & Analytics', icon: FileText, color: 'indigo' }
  ];

  const permissions = [
    // User Management
    { id: 'users.view', name: 'View Users', category: 'users', description: 'Can view user list and details', admin: true, operator: true, supplier: false, seller: false },
    { id: 'users.create', name: 'Create Users', category: 'users', description: 'Can create new users', admin: true, operator: true, supplier: false, seller: false },
    { id: 'users.edit', name: 'Edit Users', category: 'users', description: 'Can modify user information', admin: true, operator: true, supplier: false, seller: false },
    { id: 'users.delete', name: 'Delete Users', category: 'users', description: 'Can delete users', admin: true, operator: false, supplier: false, seller: false },
    
    // Product Management
    { id: 'products.view', name: 'View Products', category: 'products', description: 'Can view product catalog', admin: true, operator: true, supplier: true, seller: true },
    { id: 'products.create', name: 'Create Products', category: 'products', description: 'Can add new products', admin: true, operator: true, supplier: true, seller: false },
    { id: 'products.edit', name: 'Edit Products', category: 'products', description: 'Can modify product information', admin: true, operator: true, supplier: true, seller: false },
    { id: 'products.delete', name: 'Delete Products', category: 'products', description: 'Can remove products', admin: true, operator: true, supplier: true, seller: false },
    { id: 'products.pricing', name: 'Manage Pricing', category: 'products', description: 'Can set and modify prices', admin: true, operator: true, supplier: true, seller: false },
    
    // Order Management
    { id: 'orders.view', name: 'View Orders', category: 'orders', description: 'Can view order list', admin: true, operator: true, supplier: true, seller: true },
    { id: 'orders.create', name: 'Create Orders', category: 'orders', description: 'Can create new orders', admin: true, operator: true, supplier: false, seller: true },
    { id: 'orders.edit', name: 'Edit Orders', category: 'orders', description: 'Can modify order details', admin: true, operator: true, supplier: false, seller: false },
    { id: 'orders.cancel', name: 'Cancel Orders', category: 'orders', description: 'Can cancel orders', admin: true, operator: true, supplier: false, seller: false },
    { id: 'orders.fulfill', name: 'Fulfill Orders', category: 'orders', description: 'Can process fulfillment', admin: true, operator: true, supplier: true, seller: false },
    
    // Financial
    { id: 'finance.view', name: 'View Financial Data', category: 'finance', description: 'Can view financial reports', admin: true, operator: true, supplier: true, seller: true },
    { id: 'finance.transactions', name: 'Manage Transactions', category: 'finance', description: 'Can process transactions', admin: true, operator: true, supplier: false, seller: false },
    { id: 'finance.payouts', name: 'Manage Payouts', category: 'finance', description: 'Can approve payouts', admin: true, operator: true, supplier: false, seller: false },
    { id: 'finance.refunds', name: 'Process Refunds', category: 'finance', description: 'Can issue refunds', admin: true, operator: true, supplier: false, seller: false },
    
    // System Settings
    { id: 'settings.view', name: 'View Settings', category: 'settings', description: 'Can view system settings', admin: true, operator: true, supplier: false, seller: false },
    { id: 'settings.edit', name: 'Edit Settings', category: 'settings', description: 'Can modify system settings', admin: true, operator: false, supplier: false, seller: false },
    { id: 'settings.integrations', name: 'Manage Integrations', category: 'settings', description: 'Can configure integrations', admin: true, operator: true, supplier: false, seller: false },
    
    // Reports & Analytics
    { id: 'reports.view', name: 'View Reports', category: 'reports', description: 'Can access reports', admin: true, operator: true, supplier: true, seller: true },
    { id: 'reports.export', name: 'Export Reports', category: 'reports', description: 'Can export report data', admin: true, operator: true, supplier: true, seller: false },
    { id: 'reports.create', name: 'Create Custom Reports', category: 'reports', description: 'Can build custom reports', admin: true, operator: true, supplier: false, seller: false }
  ];

  const filteredPermissions = permissions.filter(perm => {
    const matchesSearch = perm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         perm.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || perm.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getPermissionStatus = (permission: typeof permissions[0]) => {
    const roleKey = selectedRole.toLowerCase() as 'admin' | 'operator' | 'supplier' | 'seller';
    return permission[roleKey];
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.push('/admin')}
              className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors mb-6 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Admin Dashboard</span>
            </button>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
                  Permission Management
                </h1>
                <p className="text-slate-400">Configure role-based access control permissions</p>
              </div>
              <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                <Save className="w-5 h-5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {roles.map((role) => (
              <motion.button
                key={role.name}
                onClick={() => setSelectedRole(role.name)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                  selectedRole === role.name
                    ? `bg-gradient-to-r ${role.color} border-transparent shadow-xl text-white`
                    : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Shield className="w-6 h-6" />
                  <span className="text-sm opacity-80">{role.users} users</span>
                </div>
                <h3 className="text-xl font-bold">{role.name}</h3>
              </motion.button>
            ))}
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search permissions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="pl-10 pr-8 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none appearance-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                {permissionCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Permissions Grid */}
          <div className="space-y-6">
            {permissionCategories
              .filter(cat => filterCategory === 'All' || filterCategory === cat.id)
              .map((category) => {
                const categoryPerms = filteredPermissions.filter(p => p.category === category.id);
                if (categoryPerms.length === 0) return null;

                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50"
                  >
                    <div className="flex items-center space-x-3 mb-6">
                      <div className={`w-10 h-10 bg-gradient-to-r from-${category.color}-500 to-${category.color}-600 rounded-xl flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{category.name}</h3>
                      <span className="text-sm text-slate-400">({categoryPerms.length} permissions)</span>
                    </div>

                    <div className="space-y-3">
                      {categoryPerms.map((permission) => {
                        const hasPermission = getPermissionStatus(permission);
                        return (
                          <motion.div
                            key={permission.id}
                            whileHover={{ x: 4 }}
                            className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200 group"
                          >
                            <div className="flex items-center space-x-4 flex-1">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                hasPermission ? 'bg-green-500/20' : 'bg-slate-600/20'
                              }`}>
                                {hasPermission ? (
                                  <Unlock className="w-5 h-5 text-green-400" />
                                ) : (
                                  <Lock className="w-5 h-5 text-slate-500" />
                                )}
                              </div>
                              <div className="flex-1">
                                <h4 className="text-white font-medium group-hover:text-purple-300 transition-colors">
                                  {permission.name}
                                </h4>
                                <p className="text-sm text-slate-400">{permission.description}</p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-3">
                              <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                                hasPermission 
                                  ? 'bg-green-500/20 text-green-300' 
                                  : 'bg-slate-600/20 text-slate-400'
                              }`}>
                                {hasPermission ? 'Enabled' : 'Disabled'}
                              </span>
                              <button
                                className={`p-2 rounded-lg transition-all duration-200 ${
                                  hasPermission
                                    ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                    : 'bg-slate-600/20 text-slate-400 hover:bg-slate-600/30'
                                }`}
                              >
                                {hasPermission ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                              </button>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex items-center justify-between bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center space-x-3">
              <RefreshCw className="w-5 h-5 text-slate-400" />
              <span className="text-slate-300">Last updated: Just now</span>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-6 py-3 bg-slate-700/50 hover:bg-slate-700 text-white rounded-xl transition-all duration-200 border border-slate-600/50">
                Reset to Defaults
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2">
                <Save className="w-5 h-5" />
                <span>Save All Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

