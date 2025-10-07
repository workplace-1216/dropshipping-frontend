/**
 * @fileoverview Admin Dashboard
 * Comprehensive admin interface for platform management
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/StatCard';
import { ChartCard } from '@/components/ui/ChartCard';
import { useAuth } from '@/contexts/AuthContext';
import {
  Users,
  Store,
  Package,
  DollarSign,
  TrendingUp,
  ShoppingCart,
  AlertCircle,
  Settings,
  Plus,
} from 'lucide-react';
import { GradientButton } from '@/components/ui/GradientButton';

export default function AdminDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalTenants: 42,
    activeTenants: 38,
    totalUsers: 1250,
    totalRevenue: 145680,
    monthlyRevenue: 24500,
    totalOrders: 3420,
    pendingOrders: 28,
    totalProducts: 5640,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
    
    // Check if user has admin role
    if (!isLoading && user?.role !== 'ADMIN') {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading || !isAuthenticated || user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Platform-wide management and analytics
            </p>
          </div>
          <div className="flex gap-3">
            <GradientButton
              onClick={() => router.push('/admin/tenants/new')}
              className="cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Tenant
            </GradientButton>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Tenants"
            value={stats.totalTenants}
            icon={Store}
            color="blue"
            trend={{ value: 12.5, direction: 'up' }}
            delay={0}
          />
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={Users}
            color="green"
            trend={{ value: 8.2, direction: 'up' }}
            delay={0.1}
          />
          <StatCard
            title="Total Revenue"
            value={`$${(stats.totalRevenue / 1000).toFixed(1)}k`}
            icon={DollarSign}
            color="purple"
            trend={{ value: 15.3, direction: 'up' }}
            delay={0.2}
          />
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={ShoppingCart}
            color="orange"
            trend={{ value: 10.1, direction: 'up' }}
            delay={0.3}
          />
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2">
            <ChartCard
              title="Revenue Overview"
              subtitle="Monthly revenue across all tenants"
              delay={0.4}
              actions={
                <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>Last year</option>
                </select>
              }
            >
              <div className="h-64 flex items-center justify-center text-gray-500">
                <TrendingUp className="w-16 h-16 text-gray-300" />
                <span className="ml-4">Revenue chart placeholder</span>
              </div>
            </ChartCard>
          </div>

          {/* Quick Stats */}
          <ChartCard
            title="Quick Stats"
            subtitle="Platform metrics"
            delay={0.5}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <Store className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-sm font-medium text-gray-700">
                    Active Tenants
                  </span>
                </div>
                <span className="text-lg font-bold text-blue-600">
                  {stats.activeTenants}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-orange-600 mr-3" />
                  <span className="text-sm font-medium text-gray-700">
                    Pending Orders
                  </span>
                </div>
                <span className="text-lg font-bold text-orange-600">
                  {stats.pendingOrders}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-sm font-medium text-gray-700">
                    Monthly Revenue
                  </span>
                </div>
                <span className="text-lg font-bold text-green-600">
                  ${(stats.monthlyRevenue / 1000).toFixed(1)}k
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center">
                  <Package className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="text-sm font-medium text-gray-700">
                    Total Products
                  </span>
                </div>
                <span className="text-lg font-bold text-purple-600">
                  {stats.totalProducts}
                </span>
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Recent Tenants */}
        <ChartCard
          title="Recent Tenants"
          subtitle="Latest registered tenants"
          delay={0.6}
          actions={
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all
            </button>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Tenant
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Plan
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Users
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Revenue
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  {
                    name: 'Acme Corp',
                    plan: 'Enterprise',
                    status: 'Active',
                    users: 45,
                    revenue: 4500,
                  },
                  {
                    name: 'Tech Solutions',
                    plan: 'Pro',
                    status: 'Active',
                    users: 28,
                    revenue: 2800,
                  },
                  {
                    name: 'Global Traders',
                    plan: 'Basic',
                    status: 'Trial',
                    users: 12,
                    revenue: 0,
                  },
                ].map((tenant, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {tenant.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {tenant.plan}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          tenant.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {tenant.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {tenant.users}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      ${tenant.revenue}
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>
      </div>
    </DashboardLayout>
  );
}

