/**
 * @fileoverview All Users Management Page
 * Displays all users by role with filtering and management capabilities
 */

'use client';

import React, { useState, Suspense } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UsersResponse {
  users: User[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface UsersByRoleResponse {
  [key: string]: number;
}
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { PageLoader } from '@/components/ui/PageLoader';
import { apiClient } from '@/lib/api';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Search,
  Filter,
  Shield,
  MoreHorizontal,
  Users,
  Building2,
  ShoppingBag,
  Settings,
  X,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';

function AllUsersContent() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleFilter = searchParams.get('role') || 'all';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: ''
  });
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [usersByRole, setUsersByRole] = useState<Record<string, number>>({});

  const totalUsers = Object.values(usersByRole).reduce((sum: number, count: number) => sum + (count || 0), 0);

  // Redirect if not admin
  React.useEffect(() => {
    if (!isLoading && isAuthenticated && user?.email !== 'admin@admin.com') {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, user, router]);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showRoleDropdown && !target.closest('[data-dropdown]')) {
        setShowRoleDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showRoleDropdown]);

  // Fetch users data
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        
        const [usersData, rolesData] = await Promise.all([
          apiClient.get<UsersResponse>(`/users?role=${roleFilter}&search=${searchQuery}&status=${statusFilter}`),
          apiClient.get<UsersByRoleResponse>('/users/by-role')
        ]);
        
        setUsers(usersData.users || []);
        setUsersByRole(rolesData || {});
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && user?.email === 'admin@admin.com') {
      fetchUsers();
    }
  }, [isAuthenticated, user, roleFilter, searchQuery, statusFilter]);

  if (!isAuthenticated || user?.email !== 'admin@admin.com') {
    return null;
  }
  
  const roles = [
    { id: 'all', name: t('admin.allUsers'), icon: Users, color: 'from-gray-500 to-gray-600', count: totalUsers },
    { id: 'admin', name: t('admin.admins'), icon: Shield, color: 'from-purple-500 to-purple-600', count: usersByRole.ADMIN || 0 },
    { id: 'operator', name: t('admin.operators'), icon: Settings, color: 'from-blue-500 to-blue-600', count: usersByRole.OPERATOR || 0 },
    { id: 'supplier', name: t('admin.suppliers'), icon: Building2, color: 'from-green-500 to-green-600', count: usersByRole.SUPPLIER || 0 },
    { id: 'seller', name: t('admin.sellers'), icon: ShoppingBag, color: 'from-orange-500 to-orange-600', count: usersByRole.SELLER || 0 }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role.toLowerCase() === roleFilter;
    const matchesStatus = statusFilter === 'all' || (statusFilter === 'active' ? user.isActive : !user.isActive);
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'text-green-400' : 'text-red-400';
  };

  const getStatusText = (isActive: boolean) => {
    return isActive ? 'Active' : 'Inactive';
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'from-purple-500 to-purple-600';
      case 'OPERATOR': return 'from-blue-500 to-blue-600';
      case 'SUPPLIER': return 'from-green-500 to-green-600';
      case 'SELLER': return 'from-orange-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newUser.password !== newUser.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await apiClient.post('/users', {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
      });

      // Refresh users list
      const usersData = await apiClient.get<UsersResponse>('/users');
      setUsers(usersData.users || []);

      setShowAddUserModal(false);
      setNewUser({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user. Please try again.');
    }
  };

  return (
    <ProtectedRoute>
      <PageLoader isLoading={isLoading || loading} message={t('admin.loadingUsers')} />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.push('/admin')}
              className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors mb-6 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>{t('admin.backToAdmin')}</span>
            </button>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
                  {t('admin.userManagement')}
                </h1>
                <p className="text-slate-400">{t('admin.manageAllUsers')}</p>
              </div>
              <div className="flex items-center space-x-4">
                {/* Language Switcher */}
                <LanguageSwitcher />
                
                <button 
                  onClick={() => setShowAddUserModal(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Plus className="w-5 h-5" />
                  <span>{t('admin.addNewUser')}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Role Filter Tabs */}
          <div className="flex flex-wrap gap-3 mb-8">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => router.push(`/admin/users?role=${role.id}`)}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-200 ${
                    roleFilter === role.id
                      ? `bg-gradient-to-r ${role.color} text-white shadow-xl`
                      : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{role.name}</span>
                  <span className={`px-2 py-1 rounded-lg text-xs ${
                    roleFilter === role.id ? 'bg-white/20' : 'bg-slate-700/50'
                  }`}>
                    {role.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder={t('admin.searchUsers')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none appearance-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="online">Online</option>
                <option value="away">Away</option>
                <option value="offline">Offline</option>
              </select>
            </div>
          </div>

          {/* Users Grid */}
          {loading ? (
            <div className="p-8 flex items-center justify-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <span className="text-slate-400">Loading users...</span>
              </div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-slate-400 text-lg">No users found</div>
              <div className="text-slate-500 text-sm mt-1">Try adjusting your filters</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center text-2xl">
                        {user.firstName?.charAt(0) || 'U'}
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-slate-800 ${
                        user.isActive ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                        {user.firstName} {user.lastName}
                      </h3>
                      <p className="text-sm text-slate-400">{user.email}</p>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Role</span>
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold bg-gradient-to-r ${getRoleColor(user.role)} text-white`}>
                      {user.role}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Status</span>
                    <span className={`text-sm font-medium ${getStatusColor(user.isActive)}`}>
                      {getStatusText(user.isActive)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Last Updated</span>
                    <span className="text-sm text-slate-300">{new Date(user.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Join Date</span>
                    <span className="text-sm text-slate-300">{new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="flex-1 flex items-center justify-center space-x-2 py-2.5 bg-slate-700/30 hover:bg-slate-700/50 text-slate-300 hover:text-white rounded-xl transition-all duration-200 border border-slate-600/30 hover:border-slate-500/50">
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-xl transition-all duration-200 border border-red-500/30 hover:border-red-500/50">
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </motion.div>
            ))}
            </div>
          )}

          {/* Results Summary */}
          <div className="mt-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-slate-400" />
                <span className="text-slate-300">Showing {filteredUsers.length} of {users.length} users</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-slate-400">Last updated: Just now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Add User Modal */}
        {showAddUserModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowAddUserModal(false);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4 border border-slate-700/50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">{t('admin.addNewUser')}</h2>
                <button
                  onClick={() => setShowAddUserModal(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddUser} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={newUser.firstName}
                    onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all duration-200"
                    placeholder={t('admin.enterFirstName')}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={newUser.lastName}
                    onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all duration-200"
                    placeholder={t('admin.enterLastName')}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all duration-200"
                    placeholder={t('admin.enterEmail')}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Role
                  </label>
                  <div className="relative" data-dropdown>
                    <button
                      type="button"
                      onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all duration-200 flex items-center justify-between hover:bg-slate-700/70"
                    >
                      <div className="flex items-center space-x-3">
                        {newUser.role === 'Admin' && (
                          <>
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                              <Shield className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-white font-medium">Administrator</span>
                          </>
                        )}
                        {newUser.role === 'Operator' && (
                          <>
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                              <Settings className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-white font-medium">Platform Operator</span>
                          </>
                        )}
                        {newUser.role === 'Supplier' && (
                          <>
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                              <Building2 className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-white font-medium">Product Supplier</span>
                          </>
                        )}
                        {!newUser.role && (
                          <span className="text-slate-400 font-medium">Choose role...</span>
                        )}
                      </div>
                      <svg 
                        className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${showRoleDropdown ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {showRoleDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700/50 rounded-xl shadow-2xl z-10 overflow-hidden">
                        <div className="py-2">
                          <button
                            type="button"
                            onClick={() => {
                              setNewUser({ ...newUser, role: 'ADMIN' });
                              setShowRoleDropdown(false);
                            }}
                            className="w-full px-4 py-3 flex items-center space-x-3 text-left hover:bg-slate-700/50 transition-all duration-200 group"
                          >
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Shield className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="text-white font-medium">Administrator</div>
                              <div className="text-xs text-slate-400">Full system access and control</div>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setNewUser({ ...newUser, role: 'OPERATOR' });
                              setShowRoleDropdown(false);
                            }}
                            className="w-full px-4 py-3 flex items-center space-x-3 text-left hover:bg-slate-700/50 transition-all duration-200 group"
                          >
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Settings className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="text-white font-medium">Platform Operator</div>
                              <div className="text-xs text-slate-400">Operational management and support</div>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setNewUser({ ...newUser, role: 'SUPPLIER' });
                              setShowRoleDropdown(false);
                            }}
                            className="w-full px-4 py-3 flex items-center space-x-3 text-left hover:bg-slate-700/50 transition-all duration-200 group"
                          >
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Building2 className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="text-white font-medium">Product Supplier</div>
                              <div className="text-xs text-slate-400">Inventory and product management</div>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setNewUser({ ...newUser, role: 'SELLER' });
                              setShowRoleDropdown(false);
                            }}
                            className="w-full px-4 py-3 flex items-center space-x-3 text-left hover:bg-slate-700/50 transition-all duration-200 group"
                          >
                            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                              <ShoppingBag className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="text-white font-medium">Seller</div>
                              <div className="text-xs text-slate-400">Customer sales and order management</div>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all duration-200"
                    placeholder={t('admin.enterPassword')}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={newUser.confirmPassword}
                    onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all duration-200"
                    placeholder={t('admin.confirmPassword')}
                    required
                  />
                </div>

                <div className="flex items-center space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddUserModal(false)}
                    className="flex-1 px-6 py-3 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-all duration-200 border border-slate-600/50 hover:border-slate-500/50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Add User
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

export default function AllUsersPage() {
  return (
    <Suspense fallback={<PageLoader isLoading={true} message="Loading Users..." />}>
      <AllUsersContent />
    </Suspense>
  );
}
