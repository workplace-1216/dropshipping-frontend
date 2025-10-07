/**
 * @fileoverview Supplier Dashboard
 * Inventory and order management for suppliers
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
  ShoppingCart,
  TrendingUp,
  AlertCircle,
  Plus,
  Upload,
  Download,
} from 'lucide-react';
import { GradientButton } from '@/components/ui/GradientButton';

export default function SupplierDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalProducts: 156,
    lowStockProducts: 12,
    totalOrders: 89,
    pendingOrders: 8,
    revenue: 45600,
    monthlyGrowth: 15.3,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }

    if (!isLoading && user?.role !== 'SUPPLIER' && user?.role !== 'ADMIN') {
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
              Supplier Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your inventory and fulfillment
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Import
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
            <GradientButton
              onClick={() => router.push('/supplier/products/new')}
              className="cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Product
            </GradientButton>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            icon={Package}
            color="blue"
            delay={0}
          />
          <StatCard
            title="Low Stock Items"
            value={stats.lowStockProducts}
            icon={AlertCircle}
            color="orange"
            delay={0.1}
          />
          <StatCard
            title="Pending Orders"
            value={stats.pendingOrders}
            icon={ShoppingCart}
            color="purple"
            delay={0.2}
          />
          <StatCard
            title="Monthly Revenue"
            value={`$${(stats.revenue / 1000).toFixed(1)}k`}
            icon={TrendingUp}
            color="green"
            trend={{ value: stats.monthlyGrowth, direction: 'up' }}
            delay={0.3}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Low Stock Alerts */}
          <ChartCard
            title="Low Stock Alerts"
            subtitle="Products requiring attention"
            delay={0.4}
          >
            <div className="space-y-3">
              {[
                {
                  name: 'Premium Widget Pro',
                  sku: 'PWP-001',
                  stock: 5,
                  threshold: 20,
                },
                {
                  name: 'Basic Gadget',
                  sku: 'BG-045',
                  stock: 8,
                  threshold: 15,
                },
                {
                  name: 'Super Tool Deluxe',
                  sku: 'STD-789',
                  stock: 3,
                  threshold: 10,
                },
              ].map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200"
                >
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-orange-600">
                      {product.stock}
                    </p>
                    <p className="text-xs text-gray-500">
                      Min: {product.threshold}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>

          {/* Recent Orders */}
          <ChartCard
            title="Recent Orders"
            subtitle="Orders awaiting fulfillment"
            delay={0.5}
          >
            <div className="space-y-3">
              {[
                {
                  orderNumber: '#ORD-1234',
                  customer: 'Acme Corp',
                  items: 5,
                  total: 499.99,
                  status: 'Pending',
                },
                {
                  orderNumber: '#ORD-1235',
                  customer: 'Tech Solutions',
                  items: 3,
                  total: 299.99,
                  status: 'Processing',
                },
                {
                  orderNumber: '#ORD-1236',
                  customer: 'Global Traders',
                  items: 8,
                  total: 799.99,
                  status: 'Pending',
                },
              ].map((order, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {order.orderNumber}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.customer} · {order.items} items
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${order.total}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${order.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                        }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Inventory Table */}
        <ChartCard
          title="Inventory Overview"
          subtitle="Your product catalog"
          delay={0.6}
          actions={
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search products..."
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
              />
            </div>
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
                    SKU
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Stock
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
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
                    sku: 'PWP-001',
                    stock: 145,
                    price: 49.99,
                    status: 'Active',
                  },
                  {
                    name: 'Basic Gadget',
                    sku: 'BG-045',
                    stock: 8,
                    price: 29.99,
                    status: 'Low Stock',
                  },
                  {
                    name: 'Super Tool Deluxe',
                    sku: 'STD-789',
                    stock: 89,
                    price: 79.99,
                    status: 'Active',
                  },
                ].map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {product.sku}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {product.stock}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      ${product.price}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${product.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-orange-100 text-orange-800'
                          }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Edit
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

