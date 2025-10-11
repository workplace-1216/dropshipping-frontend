'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { PageLoader } from '@/components/ui/PageLoader';
import { 
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
  const [pageLoading, setPageLoading] = useState(true);

  // Mock data for demonstration - will update when language changes
  const kpiData = React.useMemo(() => [
    {
      title: t('dashboard.totalOrders'),
      value: 1247,
      change: 12.5,
      trend: 'up',
      icon: ShoppingCart,
      color: 'blue',
      suffix: ''
    },
    {
      title: t('dashboard.totalRevenue'),
      value: 45680,
      change: 8.2,
      trend: 'up',
      icon: DollarSign,
      color: 'green',
      prefix: '$',
      decimals: 0,
      suffix: ''
    },
    {
      title: t('dashboard.totalProducts'),
      value: 89,
      change: -2.1,
      trend: 'down',
      icon: Package,
      color: 'purple',
      suffix: ''
    },
    {
      title: t('dashboard.activeUsers'),
      value: 2341,
      change: 15.3,
      trend: 'up',
      icon: Users,
      color: 'orange',
      suffix: ''
    }
  ], [currentLanguage, t]);

  const recentOrders = React.useMemo(() => [
    { id: '#1234', customer: 'John Doe', amount: 299.99, status: t('orders.delivered'), date: t('dashboard.time2hoursAgo') },
    { id: '#1235', customer: 'Jane Smith', amount: 149.50, status: t('orders.shipped'), date: t('dashboard.time4hoursAgo') },
    { id: '#1236', customer: 'Bob Johnson', amount: 89.99, status: t('orders.processing'), date: t('dashboard.time6hoursAgo') },
    { id: '#1237', customer: 'Alice Brown', amount: 199.99, status: t('orders.delivered'), date: t('dashboard.time8hoursAgo') }
  ], [currentLanguage, t]);

  const alerts = React.useMemo(() => [
    { type: 'warning', message: t('dashboard.lowStockAlert'), time: t('dashboard.time5minAgo') },
    { type: 'success', message: t('dashboard.paymentProcessed'), time: t('dashboard.time1hourAgo') },
    { type: 'info', message: t('dashboard.newCustomerRegistration'), time: t('dashboard.time2hoursAgo') }
  ], [t]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    } else if (isAuthenticated) {
      // Simulate data loading
      setTimeout(() => {
        setPageLoading(false);
      }, 500);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || pageLoading) {
    return <PageLoader isLoading={true} message={t('dashboard.loadingDashboardMessage')} />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardLayout key={currentLanguage}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-8 text-white relative overflow-hidden border border-slate-600/50"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                {t('dashboard.welcome')}, {user?.firstName || 'User'}! 👋
              </h1>
              <p className="mt-3 text-slate-300 text-lg">
                {t('dashboard.hereIsWhatHappening')} {user?.role || 'SELLER'} {t('dashboard.businessToday')}
              </p>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:block relative"
            >
              {/* Modern waveform graphic */}
              <div className="w-32 h-32 relative">
                <div className="absolute inset-0 flex items-end space-x-1.5">
                  <div className="w-1.5 bg-gradient-to-t from-blue-400 to-blue-300 rounded-full animate-pulse" style={{ height: '20%' }}></div>
                  <div className="w-1.5 bg-gradient-to-t from-purple-400 to-purple-300 rounded-full animate-pulse" style={{ height: '60%', animationDelay: '0.2s' }}></div>
                  <div className="w-1.5 bg-gradient-to-t from-cyan-400 to-cyan-300 rounded-full animate-pulse" style={{ height: '40%', animationDelay: '0.4s' }}></div>
                  <div className="w-1.5 bg-gradient-to-t from-emerald-400 to-emerald-300 rounded-full animate-pulse" style={{ height: '80%', animationDelay: '0.6s' }}></div>
                  <div className="w-1.5 bg-gradient-to-t from-orange-400 to-orange-300 rounded-full animate-pulse" style={{ height: '30%', animationDelay: '0.8s' }}></div>
                  <div className="w-1.5 bg-gradient-to-t from-pink-400 to-pink-300 rounded-full animate-pulse" style={{ height: '70%', animationDelay: '1s' }}></div>
                  <div className="w-1.5 bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-full animate-pulse" style={{ height: '50%', animationDelay: '1.2s' }}></div>
                </div>
              </div>
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
                <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-400">{kpi.title}</p>
                      <p className="text-3xl font-bold text-white mt-2">
                        <AnimatedCounter
                          value={kpi.value}
                          prefix={kpi.prefix}
                          suffix={kpi.suffix}
                          decimals={kpi.decimals}
                        />
                      </p>
                    </div>
                    <div className={`w-14 h-14 bg-gradient-to-br ${colorClasses[kpi.color as keyof typeof colorClasses]} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center mt-5">
                    {kpi.trend === 'up' ? (
                      <ArrowUpRight className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5 text-red-400" />
                    )}
                    <span className={`text-sm font-bold ml-2 ${
                      kpi.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {Math.abs(kpi.change)}%
                    </span>
                    <span className="text-sm text-slate-400 ml-2">{t('dashboard.vsLastMonthText')}</span>
                  </div>
                </div>
              </AnimatedCard>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <AnimatedCard className="lg:col-span-2" delay={0.4}>
            <div className="p-8 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    {t('dashboard.recentOrders')}
                  </h3>
                  <p className="text-slate-400 mt-1">
                    {t('dashboard.latestTransactionActivity')}
                  </p>
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl">
                  {t('dashboard.viewAll')}
                </button>
              </div>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="group flex items-center justify-between p-5 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200 border border-slate-600/30 hover:border-slate-500/50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <ShoppingCart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg">{order.id}</p>
                        <p className="text-sm text-slate-400">{order.customer}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-400 text-lg">${order.amount}</p>
                      <p className="text-sm text-slate-400">{order.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedCard>

          {/* Alerts */}
          <AnimatedCard delay={0.5}>
            <div className="p-8 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
              <div className="mb-8">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
                  {t('dashboard.systemAlerts')}
                </h3>
                <p className="text-slate-400">
                  {t('dashboard.importantNotifications')}
                </p>
              </div>
              <div className="space-y-4">
                {alerts.map((alert, index) => {
                  const Icon = alert.type === 'warning' ? AlertCircle : 
                              alert.type === 'success' ? CheckCircle : Activity;
                  
                  const colorClasses = {
                    warning: 'from-yellow-500 to-orange-600',
                    success: 'from-emerald-500 to-green-600',
                    info: 'from-blue-500 to-cyan-600'
                  };
                  
                  const textColors = {
                    warning: 'text-yellow-300',
                    success: 'text-emerald-300',
                    info: 'text-blue-300'
                  };
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                      className="group p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200 border border-slate-600/30 hover:border-slate-500/50"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-10 h-10 bg-gradient-to-br ${colorClasses[alert.type as keyof typeof colorClasses]} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold ${textColors[alert.type as keyof typeof textColors]} mb-1`}>
                            {alert.message}
                          </p>
                          <p className="text-xs text-slate-400">{alert.time}</p>
                        </div>
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