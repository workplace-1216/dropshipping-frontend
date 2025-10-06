'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { GradientButton } from '@/components/ui/GradientButton';
import { 
  TrendingUp, 
  ShoppingCart, 
  Package, 
  Users, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { t, currentLanguage } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Force re-render when language changes
  useEffect(() => {
    // This effect will trigger re-render when currentLanguage changes
  }, [currentLanguage]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">{t('common.loading')}</p>
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Mock data for demonstration
  const kpiData = [
    {
      title: t('dashboard.totalOrders'),
      value: 1247,
      change: 12.5,
      trend: 'up',
      icon: ShoppingCart,
      color: 'blue'
    },
    {
      title: t('dashboard.totalRevenue'),
      value: 45680,
      change: 8.2,
      trend: 'up',
      icon: DollarSign,
      color: 'green',
      prefix: '$',
      decimals: 0
    },
    {
      title: t('dashboard.totalProducts'),
      value: 89,
      change: -2.1,
      trend: 'down',
      icon: Package,
      color: 'purple'
    },
    {
      title: t('dashboard.activeUsers'),
      value: 2341,
      change: 15.3,
      trend: 'up',
      icon: Users,
      color: 'orange'
    }
  ];

  const recentOrders = [
    { id: '#1234', customer: 'John Doe', amount: 299.99, status: t('orders.delivered'), date: t('dashboard.time2hoursAgo') },
    { id: '#1235', customer: 'Jane Smith', amount: 149.50, status: t('orders.shipped'), date: t('dashboard.time4hoursAgo') },
    { id: '#1236', customer: 'Bob Johnson', amount: 89.99, status: t('orders.processing'), date: t('dashboard.time6hoursAgo') },
    { id: '#1237', customer: 'Alice Brown', amount: 199.99, status: t('orders.delivered'), date: t('dashboard.time8hoursAgo') }
  ];

  const alerts = [
    { type: 'warning', message: t('dashboard.lowStockAlert'), time: t('dashboard.time5minAgo') },
    { type: 'success', message: t('dashboard.paymentProcessed'), time: t('dashboard.time1hourAgo') },
    { type: 'info', message: t('dashboard.newCustomerRegistration'), time: t('dashboard.time2hoursAgo') }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                {t('dashboard.welcome')}, {user?.name || 'User'}! 👋
              </h1>
              <p className="mt-2 text-blue-100">
                {t('dashboard.welcomeSubtitle')} {user?.role || t('common.account')} {t('common.today')}.
              </p>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:block"
            >
              <Activity className="w-24 h-24 text-white/20" />
            </motion.div>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            const colorClasses = {
              blue: 'from-blue-500 to-blue-600',
              green: 'from-green-500 to-green-600',
              purple: 'from-purple-500 to-purple-600',
              orange: 'from-orange-500 to-orange-600'
            };

            return (
              <AnimatedCard key={kpi.title} delay={index * 0.1}>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        <AnimatedCounter
                          value={kpi.value}
                          prefix={kpi.prefix}
                          suffix={kpi.suffix}
                          decimals={kpi.decimals}
                        />
                      </p>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[kpi.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    {kpi.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ml-1 ${
                      kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {Math.abs(kpi.change)}%
                    </span>
                    <span className="text-sm text-gray-500 ml-1">{t('dashboard.vsLastMonth')}</span>
                  </div>
                </div>
              </AnimatedCard>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <AnimatedCard className="lg:col-span-2" delay={0.4}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('dashboard.recentOrders')}
                </h3>
                <GradientButton size="sm" variant="secondary" className="cursor-pointer">
                  {t('dashboard.viewAll')}
                </GradientButton>
              </div>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <ShoppingCart className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-500">{order.customer}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${order.amount}</p>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedCard>

          {/* Alerts */}
          <AnimatedCard delay={0.5}>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                {t('dashboard.alerts')}
              </h3>
              <div className="space-y-4">
                {alerts.map((alert, index) => {
                  const Icon = alert.type === 'warning' ? AlertCircle : 
                              alert.type === 'success' ? CheckCircle : AlertCircle;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                      className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <Icon className={`w-5 h-5 mt-0.5 ${
                        alert.type === 'warning' ? 'text-yellow-500' :
                        alert.type === 'success' ? 'text-green-500' : 'text-blue-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </DashboardLayout>
  );
}