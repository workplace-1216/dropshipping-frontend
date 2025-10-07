/**
 * @fileoverview Seller Dashboard
 * Product and sales management for sellers
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
  Package,
  ShoppingBag,
  DollarSign,
  Eye,
  Plus,
  TrendingUp,
} from 'lucide-react';
import { GradientButton } from '@/components/ui/GradientButton';

export default function SellerDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalListings: 24,
    activeListings: 22,
    totalSales: 156,
    totalRevenue: 12450,
    monthlyRevenue: 3200,
    conversionRate: 4.8,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }

    if (!isLoading && user?.role !== 'SELLER' && user?.role !== 'ADMIN') {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading || !isAuthenticated) {
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
              Seller Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your listings and track sales
            </p>
          </div>
          <GradientButton
            onClick={() => router.push('/seller/listings/new')}
            className="cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Listing
          </GradientButton>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Active Listings"
            value={stats.activeListings}
            icon={Package}
            color="blue"
            delay={0}
          />
          <StatCard
            title="Total Sales"
            value={stats.totalSales}
            icon={ShoppingBag}
            color="green"
            trend={{ value: 12.5, direction: 'up' }}
            delay={0.1}
          />
          <StatCard
            title="Revenue (30d)"
            value={`$${(stats.monthlyRevenue / 1000).toFixed(1)}k`}
            icon={DollarSign}
            color="purple"
            trend={{ value: 18.2, direction: 'up' }}
            delay={0.2}
          />
          <StatCard
            title="Conversion Rate"
            value={`${stats.conversionRate}%`}
            icon={TrendingUp}
            color="orange"
            trend={{ value: 2.1, direction: 'up' }}
            delay={0.3}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Chart */}
          <div className="lg:col-span-2">
            <ChartCard
              title="Sales Performance"
              subtitle="Last 30 days"
              delay={0.4}
              actions={
                <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              }
            >
              <div className="h-64 flex items-center justify-center text-gray-500">
                <TrendingUp className="w-16 h-16 text-gray-300" />
                <span className="ml-4">Sales chart placeholder</span>
              </div>
            </ChartCard>
          </div>

          {/* Top Products */}
          <ChartCard title="Top Products" subtitle="Best sellers" delay={0.5}>
            <div className="space-y-3">
              {[
                { name: 'Premium Widget', sales: 45, revenue: 2250 },
                { name: 'Basic Gadget', sales: 38, revenue: 1140 },
                { name: 'Super Tool', sales: 32, revenue: 2560 },
              ].map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">
                      {product.sales} sales
                    </p>
                  </div>
                  <p className="font-bold text-gray-900">${product.revenue}</p>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Recent Listings */}
        <ChartCard
          title="Your Listings"
          subtitle="Manage your product catalog"
          delay={0.6}
          actions={
            <input
              type="text"
              placeholder="Search listings..."
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
            />
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Stock
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Views
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Sales
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  {
                    name: 'Premium Widget Pro',
                    price: 49.99,
                    stock: 145,
                    views: 1250,
                    sales: 45,
                    status: 'Active',
                  },
                  {
                    name: 'Basic Gadget',
                    price: 29.99,
                    stock: 89,
                    views: 980,
                    sales: 38,
                    status: 'Active',
                  },
                  {
                    name: 'Super Tool Deluxe',
                    price: 79.99,
                    stock: 56,
                    views: 1450,
                    sales: 32,
                    status: 'Active',
                  },
                ].map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      ${product.price}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {product.stock}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {product.views}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {product.sales}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium mr-3">
                        Edit
                      </button>
                      <button className="text-sm text-gray-600 hover:text-gray-700 font-medium">
                        View
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

