/**
 * @fileoverview Marketplace integration page
 * Features connection panels for various marketplaces with OAuth and API key management
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { Button } from '@/components/ui/Button';
import { 
  ExternalLink, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Settings,
  RefreshCw,
  Eye,
  EyeOff,
  Key,
  Link,
  TrendingUp,
  Package,
  ShoppingCart,
  Users
} from 'lucide-react';

export default function MarketplacePage() {
  const { t } = useLanguage();
  const [showApiKeys, setShowApiKeys] = useState<{ [key: string]: boolean }>({});

  // Mock data for marketplace integrations
  const marketplaces = [
    {
      id: 'shopee',
      name: 'Shopee',
      description: 'Southeast Asia\'s leading e-commerce platform',
      logo: '🛍️',
      status: 'connected',
      lastSync: '2024-01-17 14:30',
      products: 45,
      orders: 23,
      revenue: 12500.00,
      apiKey: 'sk_live_1234567890abcdef',
      webhookUrl: 'https://api.workana.com/webhooks/shopee',
      features: ['Product Sync', 'Order Sync', 'Inventory Management', 'Price Updates']
    },
    {
      id: 'mercadolivre',
      name: 'Mercado Livre',
      description: 'Latin America\'s largest online marketplace',
      logo: '🛒',
      status: 'connected',
      lastSync: '2024-01-17 12:15',
      products: 32,
      orders: 18,
      revenue: 8900.00,
      apiKey: 'ml_live_abcdef1234567890',
      webhookUrl: 'https://api.workana.com/webhooks/mercadolivre',
      features: ['Product Sync', 'Order Sync', 'Inventory Management']
    },
    {
      id: 'tiktok',
      name: 'TikTok Shop',
      description: 'Social commerce platform for short-form video content',
      logo: '🎵',
      status: 'pending',
      lastSync: null,
      products: 0,
      orders: 0,
      revenue: 0,
      apiKey: null,
      webhookUrl: null,
      features: ['Product Sync', 'Order Sync', 'Live Streaming']
    },
    {
      id: 'amazon',
      name: 'Amazon',
      description: 'Global e-commerce and cloud computing platform',
      logo: '📦',
      status: 'disconnected',
      lastSync: '2024-01-10 09:45',
      products: 0,
      orders: 0,
      revenue: 0,
      apiKey: null,
      webhookUrl: null,
      features: ['Product Sync', 'Order Sync', 'FBA Integration']
    },
    {
      id: 'magalu',
      name: 'Magazine Luiza',
      description: 'Brazilian retail chain and e-commerce platform',
      logo: '🏪',
      status: 'error',
      lastSync: '2024-01-15 16:20',
      products: 12,
      orders: 5,
      revenue: 2100.00,
      apiKey: 'mag_live_error123456',
      webhookUrl: 'https://api.workana.com/webhooks/magalu',
      features: ['Product Sync', 'Order Sync']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'disconnected': return 'text-gray-600 bg-gray-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'disconnected': return <XCircle className="w-4 h-4" />;
      case 'error': return <XCircle className="w-4 h-4" />;
      default: return <XCircle className="w-4 h-4" />;
    }
  };

  const toggleApiKeyVisibility = (marketplaceId: string) => {
    setShowApiKeys(prev => ({
      ...prev,
      [marketplaceId]: !prev[marketplaceId]
    }));
  };

  const handleConnect = (marketplaceId: string) => {
    // Handle marketplace connection
    console.log(`Connecting to ${marketplaceId}`);
  };

  const handleDisconnect = (marketplaceId: string) => {
    // Handle marketplace disconnection
    console.log(`Disconnecting from ${marketplaceId}`);
  };

  const handleSync = (marketplaceId: string) => {
    // Handle manual sync
    console.log(`Syncing ${marketplaceId}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Marketplace Integration</h1>
            <p className="text-gray-600 mt-1">Connect and manage your marketplace accounts</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync All
            </Button>
            <GradientButton>
              <Link className="w-4 h-4 mr-2" />
              Add Marketplace
            </GradientButton>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: 'Connected Platforms', value: marketplaces.filter(m => m.status === 'connected').length, icon: Link, color: 'green' },
            { title: 'Total Products', value: marketplaces.reduce((sum, m) => sum + m.products, 0), icon: Package, color: 'blue' },
            { title: 'Total Orders', value: marketplaces.reduce((sum, m) => sum + m.orders, 0), icon: ShoppingCart, color: 'purple' },
            { title: 'Total Revenue', value: marketplaces.reduce((sum, m) => sum + m.revenue, 0), icon: TrendingUp, color: 'orange', prefix: '$' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              green: 'from-green-500 to-green-600',
              blue: 'from-blue-500 to-blue-600',
              purple: 'from-purple-500 to-purple-600',
              orange: 'from-orange-500 to-orange-600'
            };

            return (
              <AnimatedCard key={stat.title} delay={index * 0.1}>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {stat.prefix}{stat.value.toLocaleString()}
                      </p>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[stat.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            );
          })}
        </div>

        {/* Marketplace Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {marketplaces.map((marketplace, index) => (
            <motion.div
              key={marketplace.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AnimatedCard>
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{marketplace.logo}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{marketplace.name}</h3>
                        <p className="text-sm text-gray-600">{marketplace.description}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(marketplace.status)}`}>
                      {getStatusIcon(marketplace.status)}
                      <span className="ml-1">{marketplace.status}</span>
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{marketplace.products}</p>
                      <p className="text-sm text-gray-600">Products</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{marketplace.orders}</p>
                      <p className="text-sm text-gray-600">Orders</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">${marketplace.revenue.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Revenue</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {marketplace.features.map((feature, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* API Key */}
                  {marketplace.apiKey && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900">API Key</h4>
                        <button
                          onClick={() => toggleApiKeyVisibility(marketplace.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {showApiKeys[marketplace.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded-lg">
                        <Key className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-mono text-gray-700">
                          {showApiKeys[marketplace.id] ? marketplace.apiKey : '••••••••••••••••'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Last Sync */}
                  {marketplace.lastSync && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">
                        Last sync: {marketplace.lastSync}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    {marketplace.status === 'connected' ? (
                      <>
                        <Button size="sm" variant="outline" onClick={() => handleSync(marketplace.id)}>
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Sync
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="w-4 h-4 mr-1" />
                          Settings
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDisconnect(marketplace.id)}>
                          <XCircle className="w-4 h-4 mr-1" />
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <GradientButton size="sm" onClick={() => handleConnect(marketplace.id)}>
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Connect
                      </GradientButton>
                    )}
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>
          ))}
        </div>

        {/* Integration Guide */}
        <AnimatedCard delay={0.6}>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Integration Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Key className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">1. Get API Keys</h4>
                <p className="text-sm text-gray-600">Obtain API credentials from your marketplace developer console</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Link className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">2. Connect Account</h4>
                <p className="text-sm text-gray-600">Use the connect button to link your marketplace account</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <RefreshCw className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">3. Sync Data</h4>
                <p className="text-sm text-gray-600">Automatically sync products, orders, and inventory</p>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </DashboardLayout>
  );
}
