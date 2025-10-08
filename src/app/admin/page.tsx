'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  Settings,
  LogOut 
} from 'lucide-react';

function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <LayoutDashboard className="w-8 h-8 text-white" />
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <div className="text-white text-sm">
                {user?.firstName} {user?.lastName}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20"
        >
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome, {user?.firstName}!
          </h2>
          <p className="text-white/70">
            Admin Dashboard - Manage your entire platform from here
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Users, label: 'Total Users', value: '0', color: 'blue' },
            { icon: Package, label: 'Total Products', value: '0', color: 'green' },
            { icon: ShoppingCart, label: 'Total Orders', value: '0', color: 'purple' },
            { icon: Settings, label: 'Active Tenants', value: '0', color: 'orange' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`p-3 bg-${stat.color}-500/20 rounded-lg`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20 text-center"
        >
          <LayoutDashboard className="w-16 h-16 text-white/50 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Admin Dashboard
          </h3>
          <p className="text-white/70 max-w-md mx-auto">
            This is your admin dashboard. You can manage users, products, orders, and tenants from here.
          </p>
        </motion.div>
      </main>
    </div>
  );
}

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  );
}

