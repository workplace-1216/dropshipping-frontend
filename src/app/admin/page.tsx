'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { PageLoader } from '@/components/ui/PageLoader';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  ShoppingCart, 
  Settings,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  BarChart3,
  Globe,
  Shield,
  CreditCard,
  Truck,
  FileText,
  Zap,
  Building2,
  UserCheck,
  Warehouse,
  QrCode,
  Smartphone,
  Printer,
  Clock,
  AlertCircle,
  CheckCircle,
  Eye,
  Plus,
  Search,
  Filter,
  Upload,
  Edit,
  Trash2,
  LogOut,
  BookOpen,
  AlertTriangle,
  XCircle,
  ArrowRight,
  Menu,
  Bell,
  User,
  X,
  RefreshCw,
  MapPin,
  Star,
  Users
} from 'lucide-react';

function AdminDashboard() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeModule, setActiveModule] = useState('overview');
  const [pageLoading, setPageLoading] = useState(true);

  // Persist active module to localStorage
  React.useEffect(() => {
    const savedModule = localStorage.getItem('adminActiveModule');
    if (savedModule) {
      setActiveModule(savedModule);
    }
  }, []);

  const handleModuleChange = (moduleId: string) => {
    setActiveModule(moduleId);
    localStorage.setItem('adminActiveModule', moduleId);
  };
  
  // Show sidebar by default on desktop
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setSidebarOpen(true);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    } else if (isAuthenticated && user?.email !== 'admin@admin.com') {
      router.push('/dashboard');
    } else if (isAuthenticated && user?.email === 'admin@admin.com') {
      // Set page loading to false once auth is confirmed
      setPageLoading(false);
    }
  }, [isAuthenticated, isLoading, router, user]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white font-medium">Loading Admin Panel...</p>
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Navigation modules for admin dashboard
  const modules = [
    { id: 'overview', name: 'Overview', icon: BarChart3, color: 'blue' },
    { id: 'suppliers', name: 'Multi-Tenant Suppliers', icon: Building2, color: 'green' },
    { id: 'rbac', name: 'RBAC Management', icon: Shield, color: 'purple' },
    { id: 'picking', name: 'Picking & Packing', icon: Package, color: 'orange' },
    { id: 'marketplaces', name: 'Marketplace Integration', icon: Globe, color: 'cyan' },
    { id: 'catalog', name: 'Catalog Management', icon: Warehouse, color: 'red' },
    { id: 'orders', name: 'Order Automation', icon: Zap, color: 'yellow' },
    { id: 'tax', name: 'Tax Integration', icon: FileText, color: 'indigo' },
    { id: 'logistics', name: 'Logistics & Tracking', icon: Truck, color: 'pink' },
    { id: 'wallet', name: 'Digital Wallet', icon: CreditCard, color: 'emerald' },
    { id: 'billing', name: 'Subscription & Billing', icon: DollarSign, color: 'teal' },
    { id: 'whitelabel', name: 'Whitelabel Management', icon: UserCheck, color: 'rose' },
    { id: 'security', name: 'Security & Audit', icon: Shield, color: 'slate' }
  ];

  // Overview KPI data
  const overviewKpis = [
    {
      title: 'Total Suppliers',
      value: 156,
      change: 15.7,
      trend: 'up',
      icon: Building2,
      color: 'blue',
      prefix: '',
      suffix: ''
    },
    {
      title: 'Platform Revenue',
      value: 125680,
      change: 12.5,
      trend: 'up',
      icon: DollarSign,
      color: 'green',
      prefix: '$',
      suffix: ''
    },
    {
      title: 'Active Orders',
      value: 2847,
      change: 18.2,
      trend: 'up',
      icon: ShoppingCart,
      color: 'purple',
      prefix: '',
      suffix: ''
    },
    {
      title: 'Marketplace Integrations',
      value: 6,
      change: 0,
      trend: 'up',
      icon: Globe,
      color: 'orange',
      prefix: '',
      suffix: ''
    }
  ];

  return (
    <>
      <PageLoader isLoading={pageLoading || isLoading} message="Loading Admin Dashboard..." />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Header - Fixed */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-slate-800/50 backdrop-blur-xl shadow-2xl border-b border-slate-700/50">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Admin Control Panel
                </h1>
                <p className="text-xs text-slate-400">Platform Management</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search modules, suppliers, orders..."
                  className="pl-10 pr-4 py-2.5 bg-slate-700/50 border border-slate-600/50 rounded-xl text-sm text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none backdrop-blur-sm transition-all duration-200 w-64"
                />
              </div>
            </div>

            <button className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/50 relative transition-all duration-200">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></span>
            </button>

            <div className="flex items-center space-x-3 bg-slate-800/30 rounded-xl p-2 border border-slate-700/50">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-white">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-emerald-400 font-medium">SUPER ADMIN</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black bg-opacity-75 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        <div
          className={`fixed top-16 bottom-0 left-0 z-50 w-80 bg-slate-800/95 backdrop-blur-xl shadow-2xl border-r border-slate-700/50 lg:block ${
            sidebarOpen ? '' : 'hidden'
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center justify-between px-6 border-b border-slate-700/50 bg-slate-800/30">
              <div>
                <h2 className="text-lg font-bold text-white">Navigation</h2>
                <p className="text-xs text-slate-400">Platform Modules</p>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {modules.map((module) => {
                const Icon = module.icon;
                const isActive = activeModule === module.id;
                const colorClasses = {
                  blue: 'from-blue-500 to-blue-600',
                  green: 'from-green-500 to-green-600',
                  purple: 'from-purple-500 to-purple-600',
                  orange: 'from-orange-500 to-orange-600',
                  cyan: 'from-cyan-500 to-cyan-600',
                  red: 'from-red-500 to-red-600',
                  yellow: 'from-yellow-500 to-yellow-600',
                  indigo: 'from-indigo-500 to-indigo-600',
                  pink: 'from-pink-500 to-pink-600',
                  emerald: 'from-emerald-500 to-emerald-600',
                  teal: 'from-teal-500 to-teal-600',
                  rose: 'from-rose-500 to-rose-600',
                  slate: 'from-slate-500 to-slate-600'
                };

                return (
                  <motion.button
                    key={module.id}
                    onClick={() => handleModuleChange(module.id)}
                    whileHover={{ x: 4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center space-x-3 px-4 py-3.5 text-sm font-medium rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                      isActive
                        ? `bg-gradient-to-r ${colorClasses[module.color as keyof typeof colorClasses]} text-white shadow-xl shadow-${module.color}-500/25`
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/30 hover:shadow-lg'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                      />
                    )}
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? 'bg-white/20 shadow-lg'
                        : 'bg-slate-700/50 group-hover:bg-slate-600/50'
                    }`}>
                      <Icon className={`w-4 h-4 transition-all duration-300 ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                      }`} />
                    </div>
                    <span className="flex-1 text-left font-semibold">{module.name}</span>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-2 h-2 bg-white rounded-full"
                      />
                    )}
                  </motion.button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gradient-to-br from-slate-900/50 to-gray-900/50 backdrop-blur-sm lg:ml-80">
          <main className="p-8 min-h-screen overflow-y-auto">
            <div className="max-w-7xl mx-auto">

              {/* Module Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModule}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeModule === 'overview' && (
                    <div className="space-y-8">
                      {/* Welcome Banner */}
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 p-8 shadow-2xl"
                      >
                        <div className="relative z-10">
                          <h1 className="text-4xl font-bold text-white mb-2">
                            Welcome Back, {user?.firstName}! 👋
                          </h1>
                          <p className="text-xl text-blue-100 mb-6">
                            Here's everything happening across your dropshipping empire
                          </p>
                          <div className="flex items-center space-x-4">
                            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2">
                              <span className="text-white font-semibold">Live Status: All Systems Operational</span>
                            </div>
                            <div className="bg-green-500/20 backdrop-blur-sm rounded-2xl px-4 py-2">
                              <span className="text-green-200 font-semibold">24/7 Monitoring Active</span>
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-400/20 rounded-full blur-2xl"></div>
                      </motion.div>

                      {/* Executive Summary Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {overviewKpis.map((kpi, index) => {
                          const Icon = kpi.icon;
                          const colorClasses = {
                            blue: 'from-blue-500 to-blue-600',
                            green: 'from-green-500 to-green-600',
                            purple: 'from-purple-500 to-purple-600',
                            orange: 'from-orange-500 to-orange-600'
                          };

                          return (
                            <motion.div
                              key={kpi.title}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.1 }}
                              className="group relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
                            >
                              <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                  <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[kpi.color as keyof typeof colorClasses]} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="w-6 h-6 text-white" />
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    {kpi.trend === 'up' ? (
                                      <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                                    ) : (
                                      <ArrowDownRight className="w-4 h-4 text-red-400" />
                                    )}
                                    <span className={`text-sm font-bold ${
                                      kpi.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                                    }`}>
                                      +{Math.abs(kpi.change)}%
                                    </span>
                                  </div>
                                </div>
                                <h3 className="text-sm font-medium text-slate-400 mb-1">{kpi.title}</h3>
                                <p className="text-3xl font-bold text-white">
                                  {kpi.prefix || ''}{kpi.value.toLocaleString()}{kpi.suffix || ''}
                                </p>
                                <p className="text-xs text-slate-500 mt-2">vs last month</p>
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Real-time Activity Dashboard */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Live Activity Feed */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="lg:col-span-2 rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 shadow-xl"
                        >
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <h3 className="text-xl font-bold text-white">Live Activity Feed</h3>
                              <p className="text-slate-400">Real-time platform events</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              <span className="text-sm text-green-400 font-medium">LIVE</span>
                            </div>
                          </div>
                          <div className="space-y-4">
                            {[
                              { icon: Building2, text: 'New supplier "TechSupply Pro" onboarded successfully', time: '2 min ago', color: 'emerald' },
                              { icon: ShoppingCart, text: 'Batch of 47 orders processed automatically', time: '5 min ago', color: 'blue' },
                              { icon: DollarSign, text: '$12,450 commission payout completed', time: '8 min ago', color: 'purple' },
                              { icon: AlertCircle, text: 'Low inventory alert for 5 products', time: '12 min ago', color: 'yellow' },
                              { icon: Globe, text: 'Mercado Livre API sync completed', time: '15 min ago', color: 'cyan' },
                              { icon: Shield, text: 'Security audit passed - no issues found', time: '1 hour ago', color: 'green' }
                            ].map((activity, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                                className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors duration-200"
                              >
                                <div className={`w-10 h-10 bg-${activity.color}-500/20 rounded-xl flex items-center justify-center`}>
                                  <activity.icon className={`w-5 h-5 text-${activity.color}-300`} />
                                </div>
                                <div className="flex-1">
                                  <p className="text-white font-medium">{activity.text}</p>
                                  <p className="text-sm text-slate-400">{activity.time}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>

                        {/* System Health Monitor */}
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          className="space-y-6"
                        >
                          <div className="rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 shadow-xl">
                            <h3 className="text-lg font-bold text-white mb-4">System Health</h3>
                            <div className="space-y-4">
                              {[
                                { name: 'API Uptime', value: '99.9%', status: 'excellent', color: 'emerald' },
                                { name: 'Database', value: 'Optimal', status: 'good', color: 'blue' },
                                { name: 'Response Time', value: '89ms', status: 'excellent', color: 'green' },
                                { name: 'Active Users', value: '2,341', status: 'good', color: 'purple' },
                                { name: 'Storage', value: '67%', status: 'warning', color: 'yellow' },
                                { name: 'Bandwidth', value: '45%', status: 'good', color: 'cyan' }
                              ].map((metric, index) => (
                                <div key={index} className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className={`w-2 h-2 bg-${metric.color}-400 rounded-full`}></div>
                                    <span className="text-slate-300 text-sm">{metric.name}</span>
                                  </div>
                                  <span className={`text-sm font-bold text-${metric.color}-400`}>{metric.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Quick Actions */}
                          <div className="rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 shadow-xl">
                            <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                              {[
                                { icon: Plus, text: 'Add New Supplier', color: 'emerald' },
                                { icon: Settings, text: 'System Settings', color: 'blue' },
                                { icon: BarChart3, text: 'View Reports', color: 'purple' },
                                { icon: Shield, text: 'Security Audit', color: 'orange' }
                              ].map((action, index) => (
                                <button
                                  key={index}
                                  className={`w-full flex items-center space-x-3 p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-xl transition-all duration-200 group`}
                                >
                                  <action.icon className={`w-4 h-4 text-${action.color}-400 group-hover:text-${action.color}-300`} />
                                  <span className="text-slate-300 group-hover:text-white font-medium">{action.text}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  )}

                  {activeModule === 'suppliers' && (
                    <div className="space-y-8">
                      {/* Multi-Tenant Suppliers Header */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                            Multi-Tenant Supplier Management
                          </h2>
                          <p className="text-slate-400 mt-2 text-lg">Manage isolated supplier environments and their configurations</p>
                        </div>
                        <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                          <Plus className="w-5 h-5" />
                          <span className="font-semibold">Add New Supplier</span>
                        </button>
                      </div>

                      {/* Supplier Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-slate-400">Total Suppliers</p>
                              <p className="text-3xl font-bold text-white mt-1">156</p>
                              <p className="text-xs text-emerald-400 mt-1">+12 this month</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                              <Building2 className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                          className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-slate-400">Active Suppliers</p>
                              <p className="text-3xl font-bold text-white mt-1">142</p>
                              <p className="text-xs text-blue-400 mt-1">91% active rate</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                              <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                          className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-slate-400">Pending Approval</p>
                              <p className="text-3xl font-bold text-white mt-1">8</p>
                              <p className="text-xs text-yellow-400 mt-1">Awaiting review</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                              <Clock className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 }}
                          className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-slate-400">Suspended</p>
                              <p className="text-3xl font-bold text-white mt-1">6</p>
                              <p className="text-xs text-red-400 mt-1">Needs attention</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                              <AlertCircle className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Suppliers Table */}
                      <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xl font-bold text-white">Supplier Directory</h3>
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <input
                                type="text"
                                placeholder="Search suppliers..."
                                className="pl-10 pr-4 py-2.5 bg-slate-700/50 border border-slate-600/50 rounded-xl text-sm text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none backdrop-blur-sm transition-all duration-200 w-64"
                              />
                            </div>
                            <button className="p-2.5 border border-slate-600/50 rounded-xl hover:bg-slate-700/50 transition-all duration-200">
                              <Filter className="w-4 h-4 text-slate-400 hover:text-white" />
                            </button>
                          </div>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-slate-700/50">
                                <th className="text-left py-4 px-6 font-semibold text-slate-300 text-sm uppercase tracking-wider">Supplier</th>
                                <th className="text-left py-4 px-6 font-semibold text-slate-300 text-sm uppercase tracking-wider">Status</th>
                                <th className="text-left py-4 px-6 font-semibold text-slate-300 text-sm uppercase tracking-wider">Products</th>
                                <th className="text-left py-4 px-6 font-semibold text-slate-300 text-sm uppercase tracking-wider">Revenue</th>
                                <th className="text-left py-4 px-6 font-semibold text-slate-300 text-sm uppercase tracking-wider">Joined</th>
                                <th className="text-left py-4 px-6 font-semibold text-slate-300 text-sm uppercase tracking-wider">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { name: 'TechSupply Pro', status: 'Active', products: 1250, revenue: '$45,680', joined: '2024-01-15' },
                                { name: 'Global Electronics', status: 'Active', products: 890, revenue: '$32,450', joined: '2024-02-03' },
                                { name: 'Fashion Forward', status: 'Pending', products: 456, revenue: '$12,340', joined: '2024-03-10' },
                                { name: 'Home & Garden Co', status: 'Active', products: 678, revenue: '$28,920', joined: '2024-01-28' },
                                { name: 'Sports Central', status: 'Suspended', products: 234, revenue: '$8,760', joined: '2024-02-20' }
                              ].map((supplier, index) => (
                                <motion.tr
                                  key={index}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, delay: index * 0.05 }}
                                  className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors duration-200 group"
                                >
                                  <td className="py-5 px-6">
                                    <div className="flex items-center space-x-4">
                                      <div className="relative">
                                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                          <span className="text-white font-bold text-lg">{supplier.name[0]}</span>
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-800"></div>
                                      </div>
                                      <div>
                                        <p className="font-semibold text-white text-lg">{supplier.name}</p>
                                        <p className="text-sm text-slate-400">ID: SUP-{String(index + 1).padStart(3, '0')}</p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="py-5 px-6">
                                    <span className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wide backdrop-blur-sm ${
                                      supplier.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                                      supplier.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                                      'bg-red-500/20 text-red-300 border border-red-500/30'
                                    }`}>
                                      {supplier.status}
                                    </span>
                                  </td>
                                  <td className="py-5 px-6">
                                    <span className="text-white font-semibold text-lg">{supplier.products.toLocaleString()}</span>
                                    <span className="text-slate-400 text-sm ml-2">SKUs</span>
                                  </td>
                                  <td className="py-5 px-6">
                                    <span className="text-emerald-400 font-bold text-lg">{supplier.revenue}</span>
                                  </td>
                                  <td className="py-5 px-6 text-slate-400">{supplier.joined}</td>
                                  <td className="py-5 px-6">
                                    <div className="flex items-center space-x-2">
                                      <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-xl transition-colors duration-200 border border-transparent hover:border-blue-500/30"
                                      >
                                        <Eye className="w-5 h-5" />
                                      </motion.button>
                                      <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-2 text-emerald-400 hover:bg-emerald-500/20 rounded-xl transition-colors duration-200 border border-transparent hover:border-emerald-500/30"
                                      >
                                        <Edit className="w-5 h-5" />
                                      </motion.button>
                                      <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-xl transition-colors duration-200 border border-transparent hover:border-red-500/30"
                                      >
                                        <Trash2 className="w-5 h-5" />
                                      </motion.button>
                                    </div>
                                  </td>
                                </motion.tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeModule === 'rbac' && (
                    <div className="space-y-8">
                      {/* RBAC Management Header */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                            Role-Based Access Control
                          </h2>
                          <p className="text-slate-400 mt-2 text-lg">Manage user roles, permissions, and access levels across the platform</p>
                        </div>
                        <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                          <Plus className="w-5 h-5" />
                          <span className="font-semibold">Add New Role</span>
                        </button>
                      </div>

                      {/* Role Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                          { name: 'Admin', count: 3, color: 'from-red-500 to-pink-600', icon: '👑', description: 'Full platform access', permissions: 'All permissions' },
                          { name: 'Operator', count: 12, color: 'from-blue-500 to-cyan-600', icon: '⚙️', description: 'Operational management', permissions: 'Order & Inventory' },
                          { name: 'Supplier', count: 156, color: 'from-emerald-500 to-green-600', icon: '🏪', description: 'Supplier operations', permissions: 'Product & Sales' },
                          { name: 'Seller', count: 2847, color: 'from-purple-500 to-indigo-600', icon: '💼', description: 'Sales and orders', permissions: 'Orders only' }
                        ].map((role, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="group relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                              <div className="flex items-center justify-between mb-4">
                                <div className={`w-16 h-16 bg-gradient-to-br ${role.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                  <span className="text-3xl">{role.icon}</span>
                                </div>
                                <div className="text-right">
                                  <span className="text-4xl font-bold text-white">{role.count}</span>
                                  <p className="text-xs text-slate-400 mt-1">users</p>
                                </div>
                              </div>
                              <h3 className="text-xl font-bold text-white mb-2">{role.name}</h3>
                              <p className="text-sm text-slate-400 mb-3">{role.description}</p>
                              <div className="flex items-center space-x-2 mb-4">
                                <Shield className="w-4 h-4 text-purple-400" />
                                <span className="text-xs text-slate-400">{role.permissions}</span>
                              </div>
                              <button 
                                onClick={() => router.push(`/admin/permissions?role=${role.name.toLowerCase()}`)}
                                className="w-full py-2.5 text-sm font-semibold bg-slate-700/50 hover:bg-slate-700 text-white rounded-xl transition-all duration-200 border border-slate-600/50 hover:border-purple-500/50"
                              >
                                Manage Permissions
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Users by Role */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[
                          { 
                            role: 'Admin', 
                            color: 'from-purple-500 to-purple-600',
                            users: [
                              { name: 'John Smith', email: 'admin@gmail.com', avatar: '👨‍💼', status: 'online' },
                              { name: 'Sarah Johnson', email: 'sarah@admin.com', avatar: '👩‍💼', status: 'online' },
                              { name: 'Mike Wilson', email: 'mike@admin.com', avatar: '👨', status: 'offline' }
                            ]
                          },
                          { 
                            role: 'Operator', 
                            color: 'from-blue-500 to-blue-600',
                            users: [
                              { name: 'Emma Davis', email: 'emma@operator.com', avatar: '👩', status: 'online' },
                              { name: 'David Lee', email: 'david@operator.com', avatar: '👨', status: 'online' },
                              { name: 'Lisa Chen', email: 'lisa@operator.com', avatar: '👩', status: 'away' },
                              { name: 'Tom Brown', email: 'tom@operator.com', avatar: '👨', status: 'offline' },
                              { name: 'Anna White', email: 'anna@operator.com', avatar: '👩', status: 'online' }
                            ]
                          },
                          { 
                            role: 'Supplier', 
                            color: 'from-green-500 to-green-600',
                            users: [
                              { name: 'TechSupply Pro', email: 'contact@techsupply.com', avatar: '🏢', status: 'online' },
                              { name: 'Global Electronics', email: 'sales@global-elec.com', avatar: '🏭', status: 'online' },
                              { name: 'Fashion Forward', email: 'info@fashionfw.com', avatar: '👔', status: 'away' },
                              { name: 'AudioMax', email: 'support@audiomax.com', avatar: '🎵', status: 'online' },
                              { name: 'Home & Garden Co', email: 'sales@homegarden.com', avatar: '🏡', status: 'offline' }
                            ]
                          },
                          { 
                            role: 'Seller', 
                            color: 'from-orange-500 to-orange-600',
                            users: [
                              { name: 'Carlos Silva', email: 'carlos@seller.com', avatar: '🛍️', status: 'online' },
                              { name: 'Maria Santos', email: 'maria@seller.com', avatar: '💼', status: 'online' },
                              { name: 'Pedro Costa', email: 'pedro@seller.com', avatar: '📦', status: 'away' },
                              { name: 'Ana Oliveira', email: 'ana@seller.com', avatar: '🛒', status: 'online' },
                              { name: 'João Ferreira', email: 'joao@seller.com', avatar: '💰', status: 'offline' }
                            ]
                          }
                        ].map((roleData) => (
                          <motion.div
                            key={roleData.role}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 flex flex-col h-full"
                          >
                            <div className="flex items-center justify-between mb-6">
                              <h3 className={`text-lg font-bold bg-gradient-to-r ${roleData.color} bg-clip-text text-transparent`}>
                                {roleData.role}
                              </h3>
                              <span className="px-3 py-1 bg-slate-700/50 rounded-lg text-xs text-slate-300">
                                {roleData.users.length} users
                              </span>
                            </div>

                            <div className="flex-1 space-y-3">
                              {roleData.users.map((user, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: index * 0.1 }}
                                  className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200 group cursor-pointer"
                                >
                                  <div className="relative">
                                    <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center text-xl">
                                      {user.avatar}
                                    </div>
                                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-800 ${
                                      user.status === 'online' ? 'bg-green-500' :
                                      user.status === 'away' ? 'bg-yellow-500' :
                                      'bg-slate-500'
                                    }`}></div>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white truncate group-hover:text-purple-300 transition-colors">
                                      {user.name}
                                    </p>
                                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                                  </div>
                                </motion.div>
                              ))}
                            </div>

                            <button 
                              onClick={() => router.push(`/admin/users?role=${roleData.role.toLowerCase()}`)}
                              className="w-full mt-4 py-2.5 text-sm font-medium bg-slate-700/30 hover:bg-slate-700/50 text-slate-300 hover:text-white rounded-xl transition-all duration-200 border border-slate-600/30 hover:border-slate-500/50 flex items-center justify-center space-x-2"
                            >
                              <Users className="w-4 h-4" />
                              <span>View All {roleData.role}s</span>
                            </button>
                          </motion.div>
                        ))}
                      </div>

                      {/* Permission Matrix */}
                      <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                        <h3 className="text-xl font-bold text-white mb-6">Permission Matrix</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-slate-700/50">
                                <th className="text-left py-4 px-6 font-semibold text-slate-300 text-sm">Permission</th>
                                <th className="text-center py-4 px-6 font-semibold text-slate-300 text-sm">Admin</th>
                                <th className="text-center py-4 px-6 font-semibold text-slate-300 text-sm">Operator</th>
                                <th className="text-center py-4 px-6 font-semibold text-slate-300 text-sm">Supplier</th>
                                <th className="text-center py-4 px-6 font-semibold text-slate-300 text-sm">Seller</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { permission: 'Manage Users', admin: true, operator: false, supplier: false, seller: false },
                                { permission: 'View Analytics', admin: true, operator: true, supplier: true, seller: false },
                                { permission: 'Manage Products', admin: true, operator: true, supplier: true, seller: false },
                                { permission: 'Process Orders', admin: true, operator: true, supplier: true, seller: true },
                                { permission: 'System Settings', admin: true, operator: false, supplier: false, seller: false }
                              ].map((perm, index) => (
                                <motion.tr
                                  key={index}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.3, delay: index * 0.05 }}
                                  className="border-b border-slate-700/30 hover:bg-slate-700/20"
                                >
                                  <td className="py-4 px-6 text-white font-medium">{perm.permission}</td>
                                  {['admin', 'operator', 'supplier', 'seller'].map((role) => (
                                    <td key={role} className="py-4 px-6 text-center">
                                      {perm[role as keyof typeof perm] ? (
                                        <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" />
                                      ) : (
                                        <X className="w-5 h-5 text-slate-600 mx-auto" />
                                      )}
                                    </td>
                                  ))}
                                </motion.tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeModule === 'picking' && (
                    <div className="space-y-8">
                      {/* Picking & Packing Header */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                            Picking & Packing Management
                          </h2>
                          <p className="text-slate-400 mt-2 text-lg">Track order fulfillment with barcode scanning and mobile support</p>
                        </div>
                        <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                          <QrCode className="w-5 h-5" />
                          <span className="font-semibold">Scan Barcode</span>
                        </button>
                      </div>

                      {/* Order Status Pipeline */}
                      <div className="p-8 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                        <h3 className="text-2xl font-bold text-white mb-8">Order Status Pipeline</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          {[
                            { status: 'To Pick', count: 45, color: 'from-yellow-500 to-orange-600', icon: Clock },
                            { status: 'Picking', count: 12, color: 'from-blue-500 to-cyan-600', icon: Package },
                            { status: 'Packed', count: 23, color: 'from-emerald-500 to-green-600', icon: CheckCircle },
                            { status: 'Shipped', count: 156, color: 'from-purple-500 to-pink-600', icon: Truck }
                          ].map((stage, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.1 }}
                              className="relative group"
                            >
                              <div className="text-center p-6 bg-slate-700/30 rounded-2xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300">
                                <div className={`w-20 h-20 bg-gradient-to-br ${stage.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                  <stage.icon className="w-10 h-10 text-white" />
                                </div>
                                <h4 className="font-bold text-white text-lg mb-2">{stage.status}</h4>
                                <p className="text-4xl font-bold text-white">{stage.count}</p>
                                <p className="text-sm text-slate-400 mt-2">orders</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Mobile Integration */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                          <h3 className="text-xl font-bold text-white mb-6">Mobile Integration</h3>
                          <div className="space-y-4">
                            {[
                              { icon: Smartphone, text: 'Mobile barcode scanning', color: 'blue' },
                              { icon: QrCode, text: 'QR code generation', color: 'emerald' },
                              { icon: Printer, text: 'Thermal printing', color: 'purple' },
                              { icon: Upload, text: 'Photo verification', color: 'orange' }
                            ].map((feature, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200 group"
                              >
                                <div className={`w-12 h-12 bg-${feature.color}-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                  <feature.icon className={`w-6 h-6 text-${feature.color}-400`} />
                                </div>
                                <span className="text-white font-medium">{feature.text}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                          <h3 className="text-xl font-bold text-white mb-6">Pick Performance</h3>
                          <div className="space-y-5">
                            {[
                              { label: 'Average Pick Time', value: '3.2 min', color: 'blue', trend: 'down', good: true },
                              { label: 'Accuracy Rate', value: '99.2%', color: 'emerald', trend: 'up', good: true },
                              { label: 'Missing Products', value: '0.8%', color: 'red', trend: 'down', good: true },
                              { label: 'Daily Picks', value: '1,247', color: 'purple', trend: 'up', good: true }
                            ].map((metric, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex justify-between items-center p-3 bg-slate-700/30 rounded-xl"
                              >
                                <span className="text-slate-300 font-medium">{metric.label}</span>
                                <div className="flex items-center space-x-2">
                                  <span className={`font-bold text-lg text-${metric.color}-400`}>{metric.value}</span>
                                  {metric.trend === 'up' ? (
                                    <TrendingUp className={`w-4 h-4 ${metric.good ? 'text-emerald-400' : 'text-red-400'}`} />
                                  ) : (
                                    <TrendingDown className={`w-4 h-4 ${metric.good ? 'text-emerald-400' : 'text-red-400'}`} />
                                  )}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeModule === 'marketplaces' && (
                    <div className="space-y-8">
                      {/* Marketplace Integration Header */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                            Marketplace Integration Management
                          </h2>
                          <p className="text-slate-400 mt-2 text-lg">Manage OAuth/API keys and real-time synchronization across multiple marketplaces</p>
                        </div>
                        <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                          <Plus className="w-5 h-5" />
                          <span className="font-semibold">Add Marketplace</span>
                        </button>
                      </div>

                      {/* Marketplace Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                          { name: 'Shopee', status: 'Connected', products: 1250, orders: 456, revenue: '$45,680', icon: '🛍️', color: 'from-orange-500 to-red-600' },
                          { name: 'Mercado Livre', status: 'Connected', products: 890, orders: 234, revenue: '$32,450', icon: '💛', color: 'from-yellow-500 to-orange-600' },
                          { name: 'TikTok Shop', status: 'Connected', products: 678, orders: 189, revenue: '$28,920', icon: '🎵', color: 'from-pink-500 to-purple-600' },
                          { name: 'Kwai Shop', status: 'Pending', products: 456, orders: 67, revenue: '$12,340', icon: '📱', color: 'from-purple-500 to-indigo-600' },
                          { name: 'Amazon', status: 'Connected', products: 234, orders: 123, revenue: '$18,760', icon: '📦', color: 'from-blue-500 to-cyan-600' },
                          { name: 'Magalu', status: 'Connected', products: 567, orders: 198, revenue: '$22,890', icon: '🏬', color: 'from-red-500 to-pink-600' }
                        ].map((marketplace, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="group p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                          >
                            <div className="relative z-10">
                              <div className="flex items-center justify-between mb-4">
                                <div className={`w-14 h-14 bg-gradient-to-br ${marketplace.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                  <span className="text-3xl">{marketplace.icon}</span>
                                </div>
                                <span className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wide backdrop-blur-sm ${
                                  marketplace.status === 'Connected' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                                }`}>
                                  {marketplace.status}
                                </span>
                              </div>
                              <h3 className="text-xl font-bold text-white mb-4">{marketplace.name}</h3>
                              <div className="space-y-3 mb-4">
                                <div className="flex justify-between items-center p-2 bg-slate-700/30 rounded-lg">
                                  <span className="text-slate-400 text-sm">Products</span>
                                  <span className="font-bold text-white">{marketplace.products.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-slate-700/30 rounded-lg">
                                  <span className="text-slate-400 text-sm">Orders</span>
                                  <span className="font-bold text-white">{marketplace.orders}</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-slate-700/30 rounded-lg">
                                  <span className="text-slate-400 text-sm">Revenue</span>
                                  <span className="font-bold text-emerald-400">{marketplace.revenue}</span>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <button className="flex-1 py-2.5 text-sm font-semibold bg-slate-700/50 hover:bg-slate-700 text-white rounded-xl transition-all duration-200 border border-slate-600/50 hover:border-blue-500/50">
                                  Configure
                                </button>
                                <button className="flex-1 py-2.5 text-sm font-semibold bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl transition-all duration-200 shadow-lg">
                                  Sync
                                </button>
                              </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </motion.div>
                        ))}
                      </div>

                      {/* API Management */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                          <h3 className="text-xl font-bold text-white mb-6">OAuth/API Key Management</h3>
                          <div className="space-y-4">
                            {[
                              { name: 'Shopee API', status: 'Active', lastSync: '2 minutes ago' },
                              { name: 'Mercado Livre API', status: 'Active', lastSync: '5 minutes ago' },
                              { name: 'TikTok Shop API', status: 'Pending', lastSync: 'Awaiting approval' }
                            ].map((api, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-semibold text-white">{api.name}</span>
                                  <span className={`text-sm font-medium px-3 py-1 rounded-lg ${
                                    api.status === 'Active' 
                                      ? 'bg-emerald-500/20 text-emerald-300' 
                                      : 'bg-yellow-500/20 text-yellow-300'
                                  }`}>
                                    {api.status}
                                  </span>
                                </div>
                                <p className="text-sm text-slate-400">{api.lastSync}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                          <h3 className="text-xl font-bold text-white mb-6">Sync Performance</h3>
                          <div className="space-y-5">
                            {[
                              { label: 'Product Sync Rate', value: '99.2%', color: 'emerald' },
                              { label: 'Stock Sync Rate', value: '98.8%', color: 'blue' },
                              { label: 'Order Sync Rate', value: '99.5%', color: 'purple' },
                              { label: 'Average Sync Time', value: '2.3s', color: 'cyan' }
                            ].map((metric, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex justify-between items-center p-3 bg-slate-700/30 rounded-xl"
                              >
                                <span className="text-slate-300 font-medium">{metric.label}</span>
                                <span className={`font-bold text-lg text-${metric.color}-400`}>{metric.value}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeModule === 'wallet' && (
                    <div className="space-y-8">
                      {/* Digital Wallet Header */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                            Digital Wallet Management
                          </h2>
                          <p className="text-slate-400 mt-2 text-lg">Monitor supplier financial flows, withdrawals, and KYC verification</p>
                        </div>
                        <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                          <CreditCard className="w-5 h-5" />
                          <span className="font-semibold">Process Withdrawal</span>
                        </button>
                      </div>

                      {/* Wallet Overview */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                          { title: 'Total Balance', value: '$2,456,780', icon: DollarSign, color: 'from-emerald-500 to-green-600' },
                          { title: 'Pending Withdrawals', value: '$45,680', icon: Clock, color: 'from-yellow-500 to-orange-600' },
                          { title: 'Monthly Inflow', value: '$1,234,567', icon: TrendingUp, color: 'from-blue-500 to-cyan-600' },
                          { title: 'KYC Pending', value: '12', icon: UserCheck, color: 'from-purple-500 to-pink-600' }
                        ].map((stat, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-slate-400">{stat.title}</p>
                                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                              </div>
                              <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                                <stat.icon className="w-7 h-7 text-white" />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Wallet Management */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                          <h3 className="text-xl font-bold text-white mb-6">Recent Transactions</h3>
                          <div className="space-y-4">
                            {[
                              { type: 'Inflow', amount: '$12,450', supplier: 'TechSupply Pro', status: 'Completed', time: '2 hours ago' },
                              { type: 'Withdrawal', amount: '$8,920', supplier: 'Global Electronics', status: 'Pending', time: '4 hours ago' },
                              { type: 'Inflow', amount: '$5,670', supplier: 'Fashion Forward', status: 'Completed', time: '6 hours ago' },
                              { type: 'Fee', amount: '$230', supplier: 'Home & Garden Co', status: 'Completed', time: '8 hours ago' }
                            ].map((transaction, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200"
                              >
                                <div className="flex items-center space-x-4">
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                    transaction.type === 'Inflow' ? 'bg-emerald-500/20' :
                                    transaction.type === 'Withdrawal' ? 'bg-blue-500/20' : 'bg-red-500/20'
                                  }`}>
                                    {transaction.type === 'Inflow' ? (
                                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                                    ) : transaction.type === 'Withdrawal' ? (
                                      <TrendingDown className="w-5 h-5 text-blue-400" />
                                    ) : (
                                      <DollarSign className="w-5 h-5 text-red-400" />
                                    )}
                                  </div>
                                  <div>
                                    <p className="font-semibold text-white">{transaction.supplier}</p>
                                    <p className="text-sm text-slate-400">{transaction.time}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className={`font-bold text-lg ${
                                    transaction.type === 'Inflow' ? 'text-emerald-400' :
                                    transaction.type === 'Withdrawal' ? 'text-blue-400' : 'text-red-400'
                                  }`}>
                                    {transaction.type === 'Inflow' ? '+' : transaction.type === 'Fee' ? '-' : '-'}{transaction.amount}
                                  </p>
                                  <p className={`text-sm font-medium ${
                                    transaction.status === 'Completed' ? 'text-emerald-400' : 'text-yellow-400'
                                  }`}>
                                    {transaction.status}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                          <h3 className="text-xl font-bold text-white mb-6">KYC Verification Queue</h3>
                          <div className="space-y-4">
                            {[
                              { supplier: 'Sports Central', amount: '$15,600', status: 'Pending Review', days: 2 },
                              { supplier: 'TechGear Inc', amount: '$8,900', status: 'Documents Required', days: 1 },
                              { supplier: 'Fashion Hub', amount: '$12,300', status: 'Under Review', days: 3 },
                              { supplier: 'ElectroMax', amount: '$6,750', status: 'Pending Review', days: 1 }
                            ].map((kyc, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="p-4 border border-slate-600/50 bg-slate-700/30 rounded-xl hover:border-slate-500/50 transition-all duration-200"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <span className="font-semibold text-white">{kyc.supplier}</span>
                                  <span className="text-sm text-slate-400">{kyc.days} days ago</span>
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                  <span className="text-sm text-slate-400">Balance: <span className="text-emerald-400 font-bold">{kyc.amount}</span></span>
                                  <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                                    kyc.status === 'Pending Review' ? 'bg-yellow-500/20 text-yellow-300' :
                                    kyc.status === 'Under Review' ? 'bg-blue-500/20 text-blue-300' : 'bg-red-500/20 text-red-300'
                                  }`}>
                                    {kyc.status}
                                  </span>
                                </div>
                                <div className="flex space-x-2">
                                  <button className="flex-1 py-2 text-sm font-semibold bg-slate-700/50 hover:bg-slate-700 text-white rounded-xl transition-all duration-200">
                                    Review
                                  </button>
                                  <button className="flex-1 py-2 text-sm font-semibold bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl transition-all duration-200 shadow-lg">
                                    Approve
                                  </button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeModule === 'catalog' && (
                    <div className="space-y-8">
                      {/* Catalog Management Header */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                            Centralized Catalog Management
                          </h2>
                          <p className="text-slate-400 mt-2 text-lg">Manage product catalogs, inventory, and stock synchronization across all suppliers</p>
                        </div>
                        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                          <Plus className="w-5 h-5" />
                          <span className="font-semibold">Add Product</span>
                        </button>
                      </div>

                      {/* Catalog Overview Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                          { title: 'Total Products', value: '12,847', icon: Package, color: 'from-blue-500 to-cyan-600' },
                          { title: 'Active Catalogs', value: '156', icon: BookOpen, color: 'from-emerald-500 to-green-600' },
                          { title: 'Low Stock Items', value: '89', icon: AlertTriangle, color: 'from-yellow-500 to-orange-600' },
                          { title: 'Out of Stock', value: '23', icon: XCircle, color: 'from-red-500 to-pink-600' }
                        ].map((stat, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-slate-400">{stat.title}</p>
                                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                              </div>
                              <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                                <stat.icon className="w-7 h-7 text-white" />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Product Catalog Table */}
                      <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xl font-bold text-white">Product Catalog</h3>
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <input
                                type="text"
                                placeholder="Search products..."
                                className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-xl text-sm text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              />
                            </div>
                            <select className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                              <option value="">All Suppliers</option>
                              <option value="supplier1">TechSupply Pro</option>
                              <option value="supplier2">Global Electronics</option>
                              <option value="supplier3">Fashion Forward</option>
                            </select>
                          </div>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-slate-700/50">
                                <th className="text-left py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Product</th>
                                <th className="text-left py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Supplier</th>
                                <th className="text-left py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">SKU</th>
                                <th className="text-left py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Stock</th>
                                <th className="text-left py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Price</th>
                                <th className="text-left py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="text-left py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/30">
                              {[
                                { name: 'Wireless Bluetooth Headphones', supplier: 'TechSupply Pro', sku: 'WH-001', stock: 245, price: '$89.99', status: 'Active' },
                                { name: 'Smart Fitness Watch', supplier: 'Global Electronics', sku: 'SF-002', stock: 12, price: '$199.99', status: 'Low Stock' },
                                { name: 'USB-C Fast Charger', supplier: 'TechSupply Pro', sku: 'UC-003', stock: 0, price: '$29.99', status: 'Out of Stock' },
                                { name: 'Wireless Gaming Mouse', supplier: 'Global Electronics', sku: 'WG-004', stock: 89, price: '$79.99', status: 'Active' },
                                { name: 'Bluetooth Speaker', supplier: 'AudioMax', sku: 'BS-005', stock: 156, price: '$129.99', status: 'Active' }
                              ].map((product, index) => (
                                <motion.tr
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: index * 0.1 }}
                                  className="hover:bg-slate-700/30 transition-colors duration-200"
                                >
                                  <td className="py-4 px-4">
                                    <div className="flex items-center space-x-3">
                                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                        <Package className="w-5 h-5 text-white" />
                                      </div>
                                      <div>
                                        <p className="font-semibold text-white">{product.name}</p>
                                        <p className="text-sm text-slate-400">Category: Electronics</p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="py-4 px-4">
                                    <span className="text-slate-300 font-medium">{product.supplier}</span>
                                  </td>
                                  <td className="py-4 px-4">
                                    <span className="text-slate-400 font-mono text-sm">{product.sku}</span>
                                  </td>
                                  <td className="py-4 px-4">
                                    <span className={`font-bold ${
                                      product.stock === 0 ? 'text-red-400' : 
                                      product.stock < 20 ? 'text-yellow-400' : 'text-emerald-400'
                                    }`}>
                                      {product.stock}
                                    </span>
                                  </td>
                                  <td className="py-4 px-4">
                                    <span className="font-bold text-emerald-400">{product.price}</span>
                                  </td>
                                  <td className="py-4 px-4">
                                    <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                                      product.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300' :
                                      product.status === 'Low Stock' ? 'bg-yellow-500/20 text-yellow-300' :
                                      'bg-red-500/20 text-red-300'
                                    }`}>
                                      {product.status}
                                    </span>
                                  </td>
                                  <td className="py-4 px-4">
                                    <div className="flex items-center space-x-2">
                                      <button className="p-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all duration-200">
                                        <Edit className="w-4 h-4" />
                                      </button>
                                      <button className="p-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all duration-200">
                                        <Eye className="w-4 h-4" />
                                      </button>
                                      <button className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 rounded-lg transition-all duration-200">
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </td>
                                </motion.tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Stock Management Tools */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                          <h3 className="text-xl font-bold text-white mb-6">Bulk Stock Operations</h3>
                          <div className="space-y-4">
                            {[
                              { title: 'Update Stock Levels', description: 'Bulk update inventory across suppliers', icon: RefreshCw, color: 'from-blue-500 to-cyan-600' },
                              { title: 'Sync with Marketplaces', description: 'Sync product data with all platforms', icon: Globe, color: 'from-emerald-500 to-green-600' },
                              { title: 'Price Optimization', description: 'Auto-adjust prices based on market', icon: TrendingUp, color: 'from-purple-500 to-pink-600' },
                              { title: 'Generate Reports', description: 'Export catalog and inventory reports', icon: FileText, color: 'from-orange-500 to-red-600' }
                            ].map((tool, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200 cursor-pointer"
                              >
                                <div className={`w-12 h-12 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center shadow-lg`}>
                                  <tool.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-white">{tool.title}</h4>
                                  <p className="text-sm text-slate-400">{tool.description}</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-400" />
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                          <h3 className="text-xl font-bold text-white mb-6">Inventory Alerts</h3>
                          <div className="space-y-4">
                            {[
                              { type: 'Low Stock Alert', count: 89, severity: 'warning', icon: AlertTriangle },
                              { type: 'Out of Stock', count: 23, severity: 'error', icon: XCircle },
                              { type: 'Price Changes', count: 156, severity: 'info', icon: DollarSign },
                              { type: 'New Products', count: 45, severity: 'success', icon: Plus }
                            ].map((alert, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200"
                              >
                                <div className="flex items-center space-x-4">
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                    alert.severity === 'warning' ? 'bg-yellow-500/20' :
                                    alert.severity === 'error' ? 'bg-red-500/20' :
                                    alert.severity === 'info' ? 'bg-blue-500/20' : 'bg-emerald-500/20'
                                  }`}>
                                    <alert.icon className={`w-5 h-5 ${
                                      alert.severity === 'warning' ? 'text-yellow-400' :
                                      alert.severity === 'error' ? 'text-red-400' :
                                      alert.severity === 'info' ? 'text-blue-400' : 'text-emerald-400'
                                    }`} />
                                  </div>
                                  <div>
                                    <p className="font-semibold text-white">{alert.type}</p>
                                    <p className="text-sm text-slate-400">Requires attention</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-2xl font-bold text-white">{alert.count}</p>
                                  <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                                    View Details
                                  </button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeModule === 'orders' && (
                    <div className="space-y-8">
                      {/* Order Automation Header */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                            Order Automation & Routing System
                          </h2>
                          <p className="text-slate-400 mt-2 text-lg">Automated order processing, routing, and fulfillment across multiple suppliers and marketplaces</p>
                        </div>
                        <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                          <Plus className="w-5 h-5" />
                          <span className="font-semibold">Create Rule</span>
                        </button>
                      </div>

                      {/* Order Processing Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                          { title: 'Orders Today', value: '1,247', icon: ShoppingCart, color: 'from-blue-500 to-cyan-600' },
                          { title: 'Auto-Processed', value: '1,156', icon: Zap, color: 'from-emerald-500 to-green-600' },
                          { title: 'Pending Review', value: '91', icon: Clock, color: 'from-yellow-500 to-orange-600' },
                          { title: 'Success Rate', value: '99.2%', icon: TrendingUp, color: 'from-purple-500 to-pink-600' }
                        ].map((stat, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-slate-400">{stat.title}</p>
                                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                              </div>
                              <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                                <stat.icon className="w-7 h-7 text-white" />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Order Pipeline */}
                      <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                        <h3 className="text-xl font-bold text-white mb-6">Order Processing Pipeline</h3>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                          {[
                            { stage: 'Received', count: 1247, color: 'from-blue-500 to-cyan-600', icon: ShoppingCart },
                            { stage: 'Validated', count: 1156, color: 'from-emerald-500 to-green-600', icon: CheckCircle },
                            { stage: 'Routed', count: 1134, color: 'from-purple-500 to-pink-600', icon: ArrowRight },
                            { stage: 'Fulfilled', count: 1089, color: 'from-orange-500 to-red-600', icon: Package },
                            { stage: 'Shipped', count: 1056, color: 'from-indigo-500 to-blue-600', icon: Truck }
                          ].map((stage, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.1 }}
                              className="text-center p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200"
                            >
                              <div className={`w-12 h-12 bg-gradient-to-br ${stage.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                                <stage.icon className="w-6 h-6 text-white" />
                              </div>
                              <h4 className="font-semibold text-white mb-1">{stage.stage}</h4>
                              <p className="text-2xl font-bold text-slate-300">{stage.count}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Automation Rules */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                          <h3 className="text-xl font-bold text-white mb-6">Automation Rules</h3>
                          <div className="space-y-4">
                            {[
                              { name: 'High Priority Orders', condition: 'Amount > $500', action: 'Auto-route to premium supplier', status: 'Active', color: 'emerald' },
                              { name: 'Electronics Category', condition: 'Category = Electronics', action: 'Route to TechSupply Pro', status: 'Active', color: 'blue' },
                              { name: 'Low Stock Items', condition: 'Stock < 10', action: 'Flag for manual review', status: 'Active', color: 'yellow' },
                              { name: 'International Orders', condition: 'Country != Brazil', action: 'Use international shipping', status: 'Active', color: 'purple' },
                              { name: 'Weekend Orders', condition: 'Day = Weekend', action: 'Queue for Monday processing', status: 'Paused', color: 'gray' }
                            ].map((rule, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200 border border-slate-600/30"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="font-semibold text-white">{rule.name}</h4>
                                  <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                                    rule.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-500/20 text-slate-300'
                                  }`}>
                                    {rule.status}
                                  </span>
                                </div>
                                <div className="space-y-2">
                                  <p className="text-sm text-slate-400">
                                    <span className="text-slate-300 font-medium">Condition:</span> {rule.condition}
                                  </p>
                                  <p className="text-sm text-slate-400">
                                    <span className="text-slate-300 font-medium">Action:</span> {rule.action}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2 mt-3">
                                  <button className="p-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all duration-200">
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button className="p-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all duration-200">
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 rounded-lg transition-all duration-200">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                          <h3 className="text-xl font-bold text-white mb-6">Recent Order Activity</h3>
                          <div className="space-y-4">
                            {[
                              { id: '#ORD-001247', customer: 'Maria Silva', amount: '$299.99', status: 'Processing', time: '2 minutes ago', supplier: 'TechSupply Pro' },
                              { id: '#ORD-001246', customer: 'João Santos', amount: '$149.50', status: 'Shipped', time: '15 minutes ago', supplier: 'Global Electronics' },
                              { id: '#ORD-001245', customer: 'Ana Costa', amount: '$89.99', status: 'Delivered', time: '1 hour ago', supplier: 'Fashion Forward' },
                              { id: '#ORD-001244', customer: 'Carlos Lima', amount: '$199.99', status: 'Processing', time: '2 hours ago', supplier: 'TechSupply Pro' },
                              { id: '#ORD-001243', customer: 'Lucia Oliveira', amount: '$79.99', status: 'Pending', time: '3 hours ago', supplier: 'AudioMax' }
                            ].map((order, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-white">{order.id}</h4>
                                  <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                                    order.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-300' :
                                    order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-300' :
                                    order.status === 'Processing' ? 'bg-yellow-500/20 text-yellow-300' :
                                    'bg-slate-500/20 text-slate-300'
                                  }`}>
                                    {order.status}
                                  </span>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-slate-400">
                                    <span className="text-slate-300">Customer:</span> {order.customer}
                                  </p>
                                  <p className="text-sm text-slate-400">
                                    <span className="text-slate-300">Amount:</span> <span className="text-emerald-400 font-bold">{order.amount}</span>
                                  </p>
                                  <p className="text-sm text-slate-400">
                                    <span className="text-slate-300">Supplier:</span> {order.supplier}
                                  </p>
                                  <p className="text-sm text-slate-400">
                                    <span className="text-slate-300">Time:</span> {order.time}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Routing Configuration */}
                      <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                        <h3 className="text-xl font-bold text-white mb-6">Supplier Routing Configuration</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {[
                            { supplier: 'TechSupply Pro', categories: ['Electronics', 'Gadgets'], capacity: '1000/day', status: 'Active', color: 'from-blue-500 to-cyan-600' },
                            { supplier: 'Global Electronics', categories: ['Electronics', 'Accessories'], capacity: '800/day', status: 'Active', color: 'from-emerald-500 to-green-600' },
                            { supplier: 'Fashion Forward', categories: ['Clothing', 'Accessories'], capacity: '600/day', status: 'Active', color: 'from-purple-500 to-pink-600' },
                            { supplier: 'AudioMax', categories: ['Audio', 'Electronics'], capacity: '400/day', status: 'Active', color: 'from-orange-500 to-red-600' },
                            { supplier: 'Home & Garden Co', categories: ['Home', 'Garden'], capacity: '300/day', status: 'Maintenance', color: 'from-yellow-500 to-orange-600' },
                            { supplier: 'Sports Central', categories: ['Sports', 'Fitness'], capacity: '500/day', status: 'Active', color: 'from-indigo-500 to-blue-600' }
                          ].map((supplier, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.1 }}
                              className="p-6 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200 border border-slate-600/30"
                            >
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="font-semibold text-white">{supplier.supplier}</h4>
                                <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                                  supplier.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-yellow-500/20 text-yellow-300'
                                }`}>
                                  {supplier.status}
                                </span>
                              </div>
                              <div className="space-y-3">
                                <div>
                                  <p className="text-sm text-slate-400 mb-1">Categories</p>
                                  <div className="flex flex-wrap gap-1">
                                    {supplier.categories.map((category, idx) => (
                                      <span key={idx} className="px-2 py-1 bg-slate-600/50 text-xs text-slate-300 rounded">
                                        {category}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm text-slate-400">Capacity</p>
                                  <p className="font-bold text-white">{supplier.capacity}</p>
                                </div>
                                <div className="flex items-center space-x-2 pt-2">
                                  <button className="flex-1 py-2 text-sm font-semibold bg-slate-700/50 hover:bg-slate-700 text-white rounded-xl transition-all duration-200">
                                    Configure
                                  </button>
                                  <button className="flex-1 py-2 text-sm font-semibold bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl transition-all duration-200 shadow-lg">
                                    Test Route
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeModule === 'taxes' && (
                    <div className="space-y-8">
                      {/* Tax Integration Header */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                            Tax Integration & NF-e Management
                          </h2>
                          <p className="text-slate-400 mt-2 text-lg">Automated tax calculation, NF-e issuance, and compliance management for Brazilian market</p>
                        </div>
                        <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                          <Plus className="w-5 h-5" />
                          <span className="font-semibold">Issue NF-e</span>
                        </button>
                      </div>

                      {/* Tax Overview Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                          { title: 'NF-e Issued Today', value: '2,847', icon: FileText, color: 'from-blue-500 to-cyan-600' },
                          { title: 'Tax Collected', value: 'R$ 45,680', icon: DollarSign, color: 'from-emerald-500 to-green-600' },
                          { title: 'Pending Approval', value: '23', icon: Clock, color: 'from-yellow-500 to-orange-600' },
                          { title: 'Success Rate', value: '99.8%', icon: TrendingUp, color: 'from-purple-500 to-pink-600' }
                        ].map((stat, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-slate-400">{stat.title}</p>
                                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                              </div>
                              <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                                <stat.icon className="w-7 h-7 text-white" />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Tax Configuration */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                          <h3 className="text-xl font-bold text-white mb-6">Tax Provider Configuration</h3>
                          <div className="space-y-4">
                            {[
                              { provider: 'Sefaz SP', status: 'Connected', nfes: '1,247', lastSync: '2 min ago', color: 'from-green-500 to-emerald-600' },
                              { provider: 'Sefaz RJ', status: 'Connected', nfes: '892', lastSync: '5 min ago', color: 'from-blue-500 to-cyan-600' },
                              { provider: 'Sefaz MG', status: 'Connected', nfes: '567', lastSync: '8 min ago', color: 'from-purple-500 to-pink-600' },
                              { provider: 'Sefaz RS', status: 'Maintenance', nfes: '234', lastSync: '1 hour ago', color: 'from-yellow-500 to-orange-600' }
                            ].map((provider, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200 border border-slate-600/30"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center space-x-3">
                                    <div className={`w-10 h-10 bg-gradient-to-br ${provider.color} rounded-xl flex items-center justify-center shadow-lg`}>
                                      <Shield className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-white">{provider.provider}</h4>
                                      <p className="text-sm text-slate-400">{provider.nfes} NF-e issued</p>
                                    </div>
                                  </div>
                                  <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                                    provider.status === 'Connected' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-yellow-500/20 text-yellow-300'
                                  }`}>
                                    {provider.status}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <p className="text-sm text-slate-400">Last sync: {provider.lastSync}</p>
                                  <div className="flex items-center space-x-2">
                                    <button className="p-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all duration-200">
                                      <RefreshCw className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all duration-200">
                                      <Settings className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                          <h3 className="text-xl font-bold text-white mb-6">NF-e Processing Queue</h3>
                          <div className="space-y-4">
                            {[
                              { id: 'NF-e 001247', customer: 'TechSupply Pro', amount: 'R$ 2,847.50', status: 'Processing', time: '2 min ago' },
                              { id: 'NF-e 001246', customer: 'Global Electronics', amount: 'R$ 1,456.80', status: 'Approved', time: '5 min ago' },
                              { id: 'NF-e 001245', customer: 'Fashion Forward', amount: 'R$ 892.30', status: 'Pending', time: '8 min ago' },
                              { id: 'NF-e 001244', customer: 'AudioMax', amount: 'R$ 1,234.90', status: 'Rejected', time: '12 min ago' },
                              { id: 'NF-e 001243', customer: 'Home & Garden Co', amount: 'R$ 567.40', status: 'Processing', time: '15 min ago' }
                            ].map((nfe, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-white">{nfe.id}</h4>
                                  <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                                    nfe.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300' :
                                    nfe.status === 'Processing' ? 'bg-blue-500/20 text-blue-300' :
                                    nfe.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-300' :
                                    'bg-red-500/20 text-red-300'
                                  }`}>
                                    {nfe.status}
                                  </span>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-slate-400">
                                    <span className="text-slate-300">Customer:</span> {nfe.customer}
                                  </p>
                                  <p className="text-sm text-slate-400">
                                    <span className="text-slate-300">Amount:</span> <span className="text-emerald-400 font-bold">{nfe.amount}</span>
                                  </p>
                                  <p className="text-sm text-slate-400">
                                    <span className="text-slate-300">Time:</span> {nfe.time}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Tax Rules & Compliance */}
                      <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                        <h3 className="text-xl font-bold text-white mb-6">Tax Rules & Compliance Settings</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {[
                            { rule: 'ICMS Calculation', rate: '18%', region: 'São Paulo', status: 'Active', color: 'from-blue-500 to-cyan-600' },
                            { rule: 'IPI Tax', rate: '10%', region: 'All States', status: 'Active', color: 'from-emerald-500 to-green-600' },
                            { rule: 'PIS/COFINS', rate: '9.25%', region: 'Federal', status: 'Active', color: 'from-purple-500 to-pink-600' },
                            { rule: 'ISS Service Tax', rate: '5%', region: 'Municipal', status: 'Active', color: 'from-orange-500 to-red-600' },
                            { rule: 'SIMPLES Nacional', rate: 'Variable', region: 'All States', status: 'Active', color: 'from-yellow-500 to-orange-600' },
                            { rule: 'Import Tax', rate: '60%', region: 'Customs', status: 'Active', color: 'from-indigo-500 to-blue-600' }
                          ].map((rule, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.1 }}
                              className="p-6 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200 border border-slate-600/30"
                            >
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="font-semibold text-white">{rule.rule}</h4>
                                <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase bg-emerald-500/20 text-emerald-300">
                                  {rule.status}
                                </span>
                              </div>
                              <div className="space-y-3">
                                <div>
                                  <p className="text-sm text-slate-400">Tax Rate</p>
                                  <p className="font-bold text-white text-lg">{rule.rate}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-slate-400">Applicable Region</p>
                                  <p className="text-slate-300">{rule.region}</p>
                                </div>
                                <div className="flex items-center space-x-2 pt-2">
                                  <button className="flex-1 py-2 text-sm font-semibold bg-slate-700/50 hover:bg-slate-700 text-white rounded-xl transition-all duration-200">
                                    Edit Rule
                                  </button>
                                  <button className="flex-1 py-2 text-sm font-semibold bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl transition-all duration-200 shadow-lg">
                                    Test Calc
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Compliance Monitoring */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                          <h3 className="text-xl font-bold text-white mb-6">Compliance Alerts</h3>
                          <div className="space-y-4">
                            {[
                              { type: 'Deadline Approaching', count: 5, severity: 'warning', icon: Clock, description: 'NF-e submission deadlines' },
                              { type: 'Validation Errors', count: 2, severity: 'error', icon: AlertCircle, description: 'Required field validation' },
                              { type: 'Certificate Expiry', count: 1, severity: 'warning', icon: Shield, description: 'Digital certificate renewal' },
                              { type: 'New Regulations', count: 3, severity: 'info', icon: FileText, description: 'Tax law updates' }
                            ].map((alert, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200"
                              >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                  alert.severity === 'warning' ? 'bg-yellow-500/20' :
                                  alert.severity === 'error' ? 'bg-red-500/20' :
                                  alert.severity === 'info' ? 'bg-blue-500/20' : 'bg-emerald-500/20'
                                }`}>
                                  <alert.icon className={`w-6 h-6 ${
                                    alert.severity === 'warning' ? 'text-yellow-400' :
                                    alert.severity === 'error' ? 'text-red-400' :
                                    alert.severity === 'info' ? 'text-blue-400' : 'text-emerald-400'
                                  }`} />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-white">{alert.type}</h4>
                                  <p className="text-sm text-slate-400">{alert.description}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-2xl font-bold text-white">{alert.count}</p>
                                  <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                                    View Details
                                  </button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                          <h3 className="text-xl font-bold text-white mb-6">Tax Reports & Analytics</h3>
                          <div className="space-y-4">
                            {[
                              { title: 'Monthly Tax Summary', description: 'Generate comprehensive tax reports', icon: BarChart3, color: 'from-blue-500 to-cyan-600' },
                              { title: 'NF-e Audit Trail', description: 'Track all NF-e operations', icon: FileText, color: 'from-emerald-500 to-green-600' },
                              { title: 'Compliance Dashboard', description: 'Monitor regulatory compliance', icon: Shield, color: 'from-purple-500 to-pink-600' },
                              { title: 'Tax Optimization', description: 'Identify tax saving opportunities', icon: TrendingUp, color: 'from-orange-500 to-red-600' }
                            ].map((report, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200 cursor-pointer"
                              >
                                <div className={`w-12 h-12 bg-gradient-to-br ${report.color} rounded-xl flex items-center justify-center shadow-lg`}>
                                  <report.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-white">{report.title}</h4>
                                  <p className="text-sm text-slate-400">{report.description}</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-400" />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeModule === 'logistics' && (
                    <div className="space-y-8">
                      {/* Logistics Header */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                            Logistics & Multi-Carrier Tracking
                          </h2>
                          <p className="text-slate-400 mt-2 text-lg">Comprehensive shipping management, carrier integration, and real-time package tracking</p>
                        </div>
                        <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                          <Plus className="w-5 h-5" />
                          <span className="font-semibold">Create Shipment</span>
                        </button>
                      </div>

                      {/* Logistics Overview Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                          { title: 'Active Shipments', value: '2,847', icon: Truck, color: 'from-blue-500 to-cyan-600' },
                          { title: 'Delivered Today', value: '1,456', icon: CheckCircle, color: 'from-emerald-500 to-green-600' },
                          { title: 'In Transit', value: '891', icon: Package, color: 'from-purple-500 to-pink-600' },
                          { title: 'On-Time Rate', value: '96.2%', icon: TrendingUp, color: 'from-orange-500 to-red-600' }
                        ].map((stat, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-slate-400">{stat.title}</p>
                                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                              </div>
                              <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                                <stat.icon className="w-7 h-7 text-white" />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Carrier Integration */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                          <h3 className="text-xl font-bold text-white mb-6">Carrier Integration Status</h3>
                          <div className="space-y-4">
                            {[
                              { carrier: 'Correios', status: 'Connected', shipments: '1,247', cost: 'R$ 8.50', color: 'from-blue-500 to-cyan-600' },
                              { carrier: 'Total Express', status: 'Connected', shipments: '892', cost: 'R$ 12.30', color: 'from-emerald-500 to-green-600' },
                              { carrier: 'Jadlog', status: 'Connected', shipments: '567', cost: 'R$ 15.80', color: 'from-purple-500 to-pink-600' },
                              { carrier: 'Loggi', status: 'Maintenance', shipments: '234', cost: 'R$ 18.90', color: 'from-yellow-500 to-orange-600' },
                              { carrier: 'FedEx', status: 'Connected', shipments: '156', cost: 'R$ 25.40', color: 'from-indigo-500 to-blue-600' },
                              { carrier: 'DHL', status: 'Connected', shipments: '89', cost: 'R$ 32.60', color: 'from-red-500 to-pink-600' }
                            ].map((carrier, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200 border border-slate-600/30"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center space-x-3">
                                    <div className={`w-10 h-10 bg-gradient-to-br ${carrier.color} rounded-xl flex items-center justify-center shadow-lg`}>
                                      <Truck className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-white">{carrier.carrier}</h4>
                                      <p className="text-sm text-slate-400">{carrier.shipments} shipments</p>
                                    </div>
                                  </div>
                                  <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                                    carrier.status === 'Connected' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-yellow-500/20 text-yellow-300'
                                  }`}>
                                    {carrier.status}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <p className="text-sm text-slate-400">Avg. cost: <span className="text-emerald-400 font-bold">{carrier.cost}</span></p>
                                  <div className="flex items-center space-x-2">
                                    <button className="p-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all duration-200">
                                      <Settings className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all duration-200">
                                      <BarChart3 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                          <h3 className="text-xl font-bold text-white mb-6">Recent Shipments</h3>
                          <div className="space-y-4">
                            {[
                              { id: 'SHIP-001247', customer: 'Maria Silva', carrier: 'Correios', status: 'In Transit', location: 'São Paulo Hub', time: '2 hours ago' },
                              { id: 'SHIP-001246', customer: 'João Santos', carrier: 'Total Express', status: 'Delivered', location: 'Delivered', time: '4 hours ago' },
                              { id: 'SHIP-001245', customer: 'Ana Costa', carrier: 'Jadlog', status: 'Out for Delivery', location: 'Local Distribution', time: '6 hours ago' },
                              { id: 'SHIP-001244', customer: 'Carlos Lima', carrier: 'Loggi', status: 'Processing', location: 'Warehouse', time: '8 hours ago' },
                              { id: 'SHIP-001243', customer: 'Lucia Oliveira', carrier: 'FedEx', status: 'In Transit', location: 'International Hub', time: '12 hours ago' }
                            ].map((shipment, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-white">{shipment.id}</h4>
                                  <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                                    shipment.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-300' :
                                    shipment.status === 'In Transit' ? 'bg-blue-500/20 text-blue-300' :
                                    shipment.status === 'Out for Delivery' ? 'bg-purple-500/20 text-purple-300' :
                                    'bg-yellow-500/20 text-yellow-300'
                                  }`}>
                                    {shipment.status}
                                  </span>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-slate-400">
                                    <span className="text-slate-300">Customer:</span> {shipment.customer}
                                  </p>
                                  <p className="text-sm text-slate-400">
                                    <span className="text-slate-300">Carrier:</span> {shipment.carrier}
                                  </p>
                                  <p className="text-sm text-slate-400">
                                    <span className="text-slate-300">Location:</span> {shipment.location}
                                  </p>
                                  <p className="text-sm text-slate-400">
                                    <span className="text-slate-300">Time:</span> {shipment.time}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Shipping Routes & Optimization */}
                      <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                        <h3 className="text-xl font-bold text-white mb-6">Shipping Routes & Cost Optimization</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {[
                            { route: 'São Paulo → Rio de Janeiro', distance: '429 km', cost: 'R$ 12.50', time: '2-3 days', efficiency: '95%', color: 'from-blue-500 to-cyan-600' },
                            { route: 'São Paulo → Belo Horizonte', distance: '586 km', cost: 'R$ 15.80', time: '3-4 days', efficiency: '92%', color: 'from-emerald-500 to-green-600' },
                            { route: 'São Paulo → Brasília', distance: '1,020 km', cost: 'R$ 22.40', time: '4-5 days', efficiency: '88%', color: 'from-purple-500 to-pink-600' },
                            { route: 'São Paulo → Salvador', distance: '1,970 km', cost: 'R$ 35.60', time: '5-7 days', efficiency: '85%', color: 'from-orange-500 to-red-600' },
                            { route: 'São Paulo → Porto Alegre', distance: '1,120 km', cost: 'R$ 28.90', time: '4-6 days', efficiency: '90%', color: 'from-yellow-500 to-orange-600' },
                            { route: 'São Paulo → Fortaleza', distance: '2,835 km', cost: 'R$ 42.30', time: '6-8 days', efficiency: '82%', color: 'from-indigo-500 to-blue-600' }
                          ].map((route, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.1 }}
                              className="p-6 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200 border border-slate-600/30"
                            >
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="font-semibold text-white text-sm">{route.route}</h4>
                                <div className={`w-8 h-8 bg-gradient-to-br ${route.color} rounded-lg flex items-center justify-center shadow-lg`}>
                                  <MapPin className="w-4 h-4 text-white" />
                                </div>
                              </div>
                              <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div>
                                    <p className="text-slate-400">Distance</p>
                                    <p className="text-white font-bold">{route.distance}</p>
                                  </div>
                                  <div>
                                    <p className="text-slate-400">Cost</p>
                                    <p className="text-emerald-400 font-bold">{route.cost}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div>
                                    <p className="text-slate-400">Time</p>
                                    <p className="text-white">{route.time}</p>
                                  </div>
                                  <div>
                                    <p className="text-slate-400">Efficiency</p>
                                    <p className="text-green-400 font-bold">{route.efficiency}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2 pt-2">
                                  <button className="flex-1 py-2 text-xs font-semibold bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all duration-200">
                                    Optimize
                                  </button>
                                  <button className="flex-1 py-2 text-xs font-semibold bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-lg transition-all duration-200 shadow-lg">
                                    Track
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Tracking & Analytics */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                          <h3 className="text-xl font-bold text-white mb-6">Performance Analytics</h3>
                          <div className="space-y-4">
                            {[
                              { metric: 'Average Delivery Time', value: '3.2 days', trend: '+5%', icon: Clock, color: 'from-blue-500 to-cyan-600' },
                              { metric: 'Cost per Shipment', value: 'R$ 18.40', trend: '-2%', icon: DollarSign, color: 'from-emerald-500 to-green-600' },
                              { metric: 'Customer Satisfaction', value: '4.8/5', trend: '+8%', icon: Star, color: 'from-purple-500 to-pink-600' },
                              { metric: 'Failed Deliveries', value: '1.2%', trend: '-15%', icon: AlertTriangle, color: 'from-orange-500 to-red-600' }
                            ].map((metric, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200"
                              >
                                <div className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center shadow-lg`}>
                                  <metric.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-white">{metric.metric}</h4>
                                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                                </div>
                                <div className="text-right">
                                  <p className={`text-sm font-bold ${metric.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                    {metric.trend}
                                  </p>
                                  <p className="text-xs text-slate-400">vs last month</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                          <h3 className="text-xl font-bold text-white mb-6">Real-Time Tracking</h3>
                          <div className="space-y-4">
                            {[
                              { tracking: 'BR123456789BR', status: 'In Transit', location: 'São Paulo Distribution Center', eta: 'Tomorrow 2 PM', icon: Package, color: 'from-blue-500 to-cyan-600' },
                              { tracking: 'BR987654321BR', status: 'Out for Delivery', location: 'Local Delivery Hub', eta: 'Today 6 PM', icon: Truck, color: 'from-purple-500 to-pink-600' },
                              { tracking: 'BR456789123BR', status: 'Customs Clearance', location: 'International Gateway', eta: '2 days', icon: Globe, color: 'from-orange-500 to-red-600' },
                              { tracking: 'BR789123456BR', status: 'Delivered', location: 'Customer Address', eta: 'Completed', icon: CheckCircle, color: 'from-emerald-500 to-green-600' }
                            ].map((track, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200 cursor-pointer"
                              >
                                <div className={`w-12 h-12 bg-gradient-to-br ${track.color} rounded-xl flex items-center justify-center shadow-lg`}>
                                  <track.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-white text-sm">{track.tracking}</h4>
                                  <p className="text-xs text-slate-400">{track.location}</p>
                                  <p className="text-xs text-blue-400">ETA: {track.eta}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                                  track.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-300' :
                                  track.status === 'In Transit' ? 'bg-blue-500/20 text-blue-300' :
                                  track.status === 'Out for Delivery' ? 'bg-purple-500/20 text-purple-300' :
                                  'bg-yellow-500/20 text-yellow-300'
                                }`}>
                                  {track.status}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeModule === 'subscriptions' && (
                    <div className="space-y-8">
                      {/* Subscription & Billing Header */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                            Subscription & Billing Management
                          </h2>
                          <p className="text-slate-400 mt-2 text-lg">Comprehensive subscription management, billing automation, and payment processing</p>
                        </div>
                        <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                          <Plus className="w-5 h-5" />
                          <span className="font-semibold">Create Plan</span>
                        </button>
                      </div>

                      {/* Billing Overview Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                          { title: 'Active Subscriptions', value: '2,847', icon: Users, color: 'from-blue-500 to-cyan-600' },
                          { title: 'Monthly Revenue', value: 'R$ 284,700', icon: DollarSign, color: 'from-emerald-500 to-green-600' },
                          { title: 'Pending Payments', value: '23', icon: Clock, color: 'from-yellow-500 to-orange-600' },
                          { title: 'Churn Rate', value: '2.1%', icon: TrendingDown, color: 'from-purple-500 to-pink-600' }
                        ].map((stat, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-slate-400">{stat.title}</p>
                                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                              </div>
                              <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                                <stat.icon className="w-7 h-7 text-white" />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Subscription Plans */}
                      <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                        <h3 className="text-xl font-bold text-white mb-6">Subscription Plans</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          {[
                            { name: 'Free', price: 'R$ 0', period: 'month', users: '1', orders: '100', features: ['Basic Support', 'Standard Reports'], subscribers: '1,247', color: 'from-slate-500 to-gray-600' },
                            { name: 'Starter', price: 'R$ 99', period: 'month', users: '3', orders: '1,000', features: ['Priority Support', 'Advanced Reports', 'API Access'], subscribers: '892', color: 'from-blue-500 to-cyan-600' },
                            { name: 'Professional', price: 'R$ 299', period: 'month', users: '10', orders: '10,000', features: ['24/7 Support', 'Custom Reports', 'Full API', 'White Label'], subscribers: '567', color: 'from-emerald-500 to-green-600' },
                            { name: 'Enterprise', price: 'Custom', period: 'month', users: 'Unlimited', orders: 'Unlimited', features: ['Dedicated Support', 'Custom Integration', 'SLA Guarantee', 'On-premise'], subscribers: '23', color: 'from-purple-500 to-pink-600' }
                          ].map((plan, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.1 }}
                              className="p-6 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200 border border-slate-600/30 relative"
                            >
                              {index === 2 && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                  <span className="bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    Most Popular
                                  </span>
                                </div>
                              )}
                              <div className="text-center mb-6">
                                <h4 className="text-xl font-bold text-white mb-2">{plan.name}</h4>
                                <div className="flex items-baseline justify-center">
                                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                                  <span className="text-slate-400 ml-1">/{plan.period}</span>
                                </div>
                                <p className="text-sm text-slate-400 mt-2">{plan.subscribers} subscribers</p>
                              </div>
                              <div className="space-y-3 mb-6">
                                <div className="flex items-center justify-between">
                                  <span className="text-slate-400">Users</span>
                                  <span className="text-white font-semibold">{plan.users}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-slate-400">Orders/month</span>
                                  <span className="text-white font-semibold">{plan.orders}</span>
                                </div>
                                <div className="pt-2">
                                  <p className="text-slate-400 text-sm mb-2">Features:</p>
                                  <ul className="space-y-1">
                                    {plan.features.map((feature, idx) => (
                                      <li key={idx} className="flex items-center text-sm text-slate-300">
                                        <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                                        {feature}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button className="flex-1 py-2 text-sm font-semibold bg-slate-700/50 hover:bg-slate-700 text-white rounded-xl transition-all duration-200">
                                  Edit
                                </button>
                                <button className="flex-1 py-2 text-sm font-semibold bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl transition-all duration-200 shadow-lg">
                                  Analytics
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Payment Processing */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                          <h3 className="text-xl font-bold text-white mb-6">Payment Gateways</h3>
                          <div className="space-y-4">
                            {[
                              { gateway: 'Mercado Pago', status: 'Active', transactions: '1,247', fees: '3.99%', revenue: 'R$ 45,680', color: 'from-blue-500 to-cyan-600' },
                              { gateway: 'Stripe', status: 'Active', transactions: '892', fees: '2.9%', revenue: 'R$ 32,450', color: 'from-purple-500 to-pink-600' },
                              { gateway: 'Asaas', status: 'Active', transactions: '567', fees: '2.5%', revenue: 'R$ 18,920', color: 'from-emerald-500 to-green-600' },
                              { gateway: 'PagSeguro', status: 'Maintenance', transactions: '234', fees: '4.99%', revenue: 'R$ 8,340', color: 'from-yellow-500 to-orange-600' }
                            ].map((gateway, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200 border border-slate-600/30"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center space-x-3">
                                    <div className={`w-10 h-10 bg-gradient-to-br ${gateway.color} rounded-xl flex items-center justify-center shadow-lg`}>
                                      <CreditCard className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-white">{gateway.gateway}</h4>
                                      <p className="text-sm text-slate-400">{gateway.transactions} transactions</p>
                                    </div>
                                  </div>
                                  <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                                    gateway.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-yellow-500/20 text-yellow-300'
                                  }`}>
                                    {gateway.status}
                                  </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p className="text-slate-400">Processing Fee</p>
                                    <p className="text-white font-bold">{gateway.fees}</p>
                                  </div>
                                  <div>
                                    <p className="text-slate-400">Revenue</p>
                                    <p className="text-emerald-400 font-bold">{gateway.revenue}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2 mt-3">
                                  <button className="flex-1 py-2 text-xs font-semibold bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all duration-200">
                                    Configure
                                  </button>
                                  <button className="flex-1 py-2 text-xs font-semibold bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-lg transition-all duration-200 shadow-lg">
                                    Reports
                                  </button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                          <h3 className="text-xl font-bold text-white mb-6">Recent Transactions</h3>
                          <div className="space-y-4">
                            {[
                              { id: 'TXN-001247', customer: 'TechSupply Pro', amount: 'R$ 299.00', status: 'Completed', method: 'Credit Card', time: '2 min ago' },
                              { id: 'TXN-001246', customer: 'Global Electronics', amount: 'R$ 99.00', status: 'Pending', method: 'PIX', time: '5 min ago' },
                              { id: 'TXN-001245', customer: 'Fashion Forward', amount: 'R$ 299.00', status: 'Failed', method: 'Boleto', time: '8 min ago' },
                              { id: 'TXN-001244', customer: 'AudioMax', amount: 'R$ 99.00', status: 'Completed', method: 'PIX', time: '12 min ago' },
                              { id: 'TXN-001243', customer: 'Home & Garden Co', amount: 'R$ 299.00', status: 'Completed', method: 'Credit Card', time: '15 min ago' }
                            ].map((transaction, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-white">{transaction.id}</h4>
                                  <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                                    transaction.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-300' :
                                    transaction.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-300' :
                                    'bg-red-500/20 text-red-300'
                                  }`}>
                                    {transaction.status}
                                  </span>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-slate-400">
                                    <span className="text-slate-300">Customer:</span> {transaction.customer}
                                  </p>
                                  <p className="text-sm text-slate-400">
                                    <span className="text-slate-300">Amount:</span> <span className="text-emerald-400 font-bold">{transaction.amount}</span>
                                  </p>
                                  <p className="text-sm text-slate-400">
                                    <span className="text-slate-300">Method:</span> {transaction.method}
                                  </p>
                                  <p className="text-sm text-slate-400">
                                    <span className="text-slate-300">Time:</span> {transaction.time}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Billing Analytics */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                          <h3 className="text-xl font-bold text-white mb-6">Revenue Analytics</h3>
                          <div className="space-y-4">
                            {[
                              { metric: 'Monthly Recurring Revenue', value: 'R$ 284,700', trend: '+12%', icon: TrendingUp, color: 'from-emerald-500 to-green-600' },
                              { metric: 'Average Revenue per User', value: 'R$ 99.85', trend: '+5%', icon: DollarSign, color: 'from-blue-500 to-cyan-600' },
                              { metric: 'Customer Lifetime Value', value: 'R$ 2,847', trend: '+8%', icon: Star, color: 'from-purple-500 to-pink-600' },
                              { metric: 'Payment Success Rate', value: '97.8%', trend: '+2%', icon: CheckCircle, color: 'from-orange-500 to-red-600' }
                            ].map((metric, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200"
                              >
                                <div className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center shadow-lg`}>
                                  <metric.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-white">{metric.metric}</h4>
                                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-bold text-green-400">{metric.trend}</p>
                                  <p className="text-xs text-slate-400">vs last month</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                          <h3 className="text-xl font-bold text-white mb-6">Subscription Health</h3>
                          <div className="space-y-4">
                            {[
                              { metric: 'Active Subscriptions', value: '2,847', icon: Users, color: 'from-blue-500 to-cyan-600' },
                              { metric: 'Trial Conversions', value: '23.5%', icon: TrendingUp, color: 'from-emerald-500 to-green-600' },
                              { metric: 'Churn Rate', value: '2.1%', icon: TrendingDown, color: 'from-red-500 to-pink-600' },
                              { metric: 'Upgrade Rate', value: '8.7%', icon: ArrowUpRight, color: 'from-purple-500 to-pink-600' }
                            ].map((metric, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200"
                              >
                                <div className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center shadow-lg`}>
                                  <metric.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-white">{metric.metric}</h4>
                                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-xs text-slate-400">Current</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeModule === 'whitelabel' && (
                    <div className="space-y-8">
                      {/* Whitelabel Header */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                            Whitelabel Instance Management
                          </h2>
                          <p className="text-slate-400 mt-2 text-lg">Create and manage custom-branded dropshipping platforms for enterprise clients</p>
                        </div>
                        <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                          <Plus className="w-5 h-5" />
                          <span className="font-semibold">New Instance</span>
                        </button>
                      </div>

                      {/* Whitelabel Overview Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                          { title: 'Active Instances', value: '47', icon: Globe, color: 'from-blue-500 to-cyan-600' },
                          { title: 'Custom Domains', value: '52', icon: Globe, color: 'from-emerald-500 to-green-600' },
                          { title: 'Total Users', value: '8,420', icon: Users, color: 'from-purple-500 to-pink-600' },
                          { title: 'Monthly Revenue', value: 'R$ 142,350', icon: DollarSign, color: 'from-orange-500 to-red-600' }
                        ].map((stat, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-slate-400">{stat.title}</p>
                                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                              </div>
                              <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                                <stat.icon className="w-7 h-7 text-white" />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Active Instances */}
                      <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                        <h3 className="text-xl font-bold text-white mb-6">Active Whitelabel Instances</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {[
                            { name: 'TechDrop Pro', domain: 'techdrop.com.br', logo: '🚀', users: '1,247', orders: '8,420', status: 'Active', color: 'from-blue-500 to-cyan-600' },
                            { name: 'FashionHub', domain: 'fashionhub.com', logo: '👗', users: '892', orders: '5,230', status: 'Active', color: 'from-purple-500 to-pink-600' },
                            { name: 'Electronics Plus', domain: 'electronicsplus.com.br', logo: '⚡', users: '567', orders: '3,140', status: 'Active', color: 'from-emerald-500 to-green-600' },
                            { name: 'HomeGoods Direct', domain: 'homegoods.direct', logo: '🏠', users: '234', orders: '1,820', status: 'Maintenance', color: 'from-yellow-500 to-orange-600' },
                            { name: 'Sports Central', domain: 'sportscentral.com', logo: '⚽', users: '423', orders: '2,950', status: 'Active', color: 'from-indigo-500 to-blue-600' },
                            { name: 'Beauty Shop', domain: 'beautyshop.com.br', logo: '💄', users: '356', orders: '2,140', status: 'Active', color: 'from-pink-500 to-red-600' }
                          ].map((instance, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.1 }}
                              className="p-6 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200 border border-slate-600/30"
                            >
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-12 h-12 bg-gradient-to-br ${instance.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                                    {instance.logo}
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-white">{instance.name}</h4>
                                    <p className="text-xs text-slate-400">{instance.domain}</p>
                                  </div>
                                </div>
                                <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                                  instance.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-yellow-500/20 text-yellow-300'
                                }`}>
                                  {instance.status}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                  <p className="text-xs text-slate-400">Users</p>
                                  <p className="text-lg font-bold text-white">{instance.users}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-slate-400">Orders</p>
                                  <p className="text-lg font-bold text-white">{instance.orders}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button className="flex-1 py-2 text-xs font-semibold bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all duration-200">
                                  Configure
                                </button>
                                <button className="flex-1 py-2 text-xs font-semibold bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-lg transition-all duration-200 shadow-lg">
                                  Analytics
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Customization Options */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                          <h3 className="text-xl font-bold text-white mb-6">Branding Customization</h3>
                          <div className="space-y-4">
                            {[
                              { feature: 'Custom Logo Upload', description: 'Upload and manage brand logos', status: 'Available', icon: Upload },
                              { feature: 'Color Theme', description: 'Customize primary/secondary colors', status: 'Available', icon: Zap },
                              { feature: 'Custom Domain', description: 'Connect custom domains with SSL', status: 'Available', icon: Globe },
                              { feature: 'Email Templates', description: 'Branded email notifications', status: 'Available', icon: FileText },
                              { feature: 'Custom CSS', description: 'Advanced styling options', status: 'Pro Only', icon: Edit },
                              { feature: 'White Label Mobile App', description: 'iOS/Android branded apps', status: 'Enterprise', icon: Smartphone }
                            ].map((feature, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200"
                              >
                                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                  <feature.icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-white">{feature.feature}</h4>
                                  <p className="text-sm text-slate-400">{feature.description}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                                  feature.status === 'Available' ? 'bg-emerald-500/20 text-emerald-300' :
                                  feature.status === 'Pro Only' ? 'bg-blue-500/20 text-blue-300' :
                                  'bg-purple-500/20 text-purple-300'
                                }`}>
                                  {feature.status}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                          <h3 className="text-xl font-bold text-white mb-6">Instance Performance</h3>
                          <div className="space-y-4">
                            {[
                              { instance: 'TechDrop Pro', uptime: '99.9%', response: '124ms', requests: '1.2M', color: 'from-blue-500 to-cyan-600' },
                              { instance: 'FashionHub', uptime: '99.7%', response: '156ms', requests: '890K', color: 'from-purple-500 to-pink-600' },
                              { instance: 'Electronics Plus', uptime: '99.8%', response: '132ms', requests: '650K', color: 'from-emerald-500 to-green-600' },
                              { instance: 'HomeGoods Direct', uptime: '98.5%', response: '245ms', requests: '320K', color: 'from-yellow-500 to-orange-600' }
                            ].map((perf, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200"
                              >
                                <h4 className="font-semibold text-white mb-3">{perf.instance}</h4>
                                <div className="grid grid-cols-3 gap-3 text-xs">
                                  <div>
                                    <p className="text-slate-400">Uptime</p>
                                    <p className="text-emerald-400 font-bold">{perf.uptime}</p>
                                  </div>
                                  <div>
                                    <p className="text-slate-400">Response</p>
                                    <p className="text-blue-400 font-bold">{perf.response}</p>
                                  </div>
                                  <div>
                                    <p className="text-slate-400">Requests</p>
                                    <p className="text-purple-400 font-bold">{perf.requests}</p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeModule === 'security' && (
                    <div className="space-y-8">
                      {/* Security Header */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                            Security & Audit Management
                          </h2>
                          <p className="text-slate-400 mt-2 text-lg">Monitor security events, manage access controls, and ensure platform compliance</p>
                        </div>
                        <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                          <Shield className="w-5 h-5" />
                          <span className="font-semibold">Security Scan</span>
                        </button>
                      </div>

                      {/* Security Overview Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                          { title: 'Security Score', value: '98/100', icon: Shield, color: 'from-emerald-500 to-green-600' },
                          { title: 'Blocked Threats', value: '1,247', icon: AlertTriangle, color: 'from-red-500 to-pink-600' },
                          { title: 'Active Sessions', value: '2,847', icon: Users, color: 'from-blue-500 to-cyan-600' },
                          { title: 'Audit Logs', value: '45,680', icon: FileText, color: 'from-purple-500 to-pink-600' }
                        ].map((stat, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-slate-400">{stat.title}</p>
                                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                              </div>
                              <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                                <stat.icon className="w-7 h-7 text-white" />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Security Threats */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                          <h3 className="text-xl font-bold text-white mb-6">Recent Security Events</h3>
                          <div className="space-y-4">
                            {[
                              { event: 'Failed Login Attempts', count: 247, severity: 'High', source: 'Multiple IPs', time: '2 min ago', icon: AlertTriangle },
                              { event: 'SQL Injection Blocked', count: 89, severity: 'Critical', source: '192.168.1.42', time: '15 min ago', icon: Shield },
                              { event: 'Rate Limit Exceeded', count: 156, severity: 'Medium', source: '10.0.0.15', time: '1 hour ago', icon: Clock },
                              { event: 'Suspicious API Calls', count: 34, severity: 'High', source: 'API Gateway', time: '2 hours ago', icon: AlertCircle },
                              { event: 'Malware Upload Blocked', count: 12, severity: 'Critical', source: 'File Upload', time: '3 hours ago', icon: XCircle }
                            ].map((threat, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200 border-l-4 border-l-red-500"
                              >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                  threat.severity === 'Critical' ? 'bg-red-500/20' :
                                  threat.severity === 'High' ? 'bg-orange-500/20' :
                                  'bg-yellow-500/20'
                                }`}>
                                  <threat.icon className={`w-6 h-6 ${
                                    threat.severity === 'Critical' ? 'text-red-400' :
                                    threat.severity === 'High' ? 'text-orange-400' :
                                    'text-yellow-400'
                                  }`} />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-white">{threat.event}</h4>
                                  <p className="text-sm text-slate-400">Source: {threat.source}</p>
                                  <p className="text-xs text-slate-500">{threat.time}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-2xl font-bold text-white">{threat.count}</p>
                                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                                    threat.severity === 'Critical' ? 'bg-red-500/20 text-red-300' :
                                    threat.severity === 'High' ? 'bg-orange-500/20 text-orange-300' :
                                    'bg-yellow-500/20 text-yellow-300'
                                  }`}>
                                    {threat.severity}
                                  </span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                          <h3 className="text-xl font-bold text-white mb-6">Audit Trail</h3>
                          <div className="space-y-4">
                            {[
                              { action: 'User Role Updated', user: 'admin@example.com', target: 'TechSupply Pro', time: '5 min ago', status: 'Success' },
                              { action: 'Payment Gateway Changed', user: 'admin@example.com', target: 'Stripe Settings', time: '12 min ago', status: 'Success' },
                              { action: 'Product Catalog Updated', user: 'supplier@tech.com', target: '247 products', time: '25 min ago', status: 'Success' },
                              { action: 'Failed Admin Login', user: 'unknown@suspicious.com', target: 'Admin Panel', time: '1 hour ago', status: 'Failed' },
                              { action: 'Database Backup', user: 'system', target: 'Full Backup', time: '2 hours ago', status: 'Success' }
                            ].map((log, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-white">{log.action}</h4>
                                  <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                                    log.status === 'Success' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                                  }`}>
                                    {log.status}
                                  </span>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-slate-400">
                                    <span className="text-slate-300">User:</span> {log.user}
                                  </p>
                                  <p className="text-sm text-slate-400">
                                    <span className="text-slate-300">Target:</span> {log.target}
                                  </p>
                                  <p className="text-sm text-slate-400">
                                    <span className="text-slate-300">Time:</span> {log.time}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Security Configuration */}
                      <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                        <h3 className="text-xl font-bold text-white mb-6">Security Settings</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {[
                            { setting: 'Two-Factor Authentication', status: 'Enforced', users: '100%', icon: Shield, color: 'from-emerald-500 to-green-600' },
                            { setting: 'Password Policy', status: 'Strong', requirement: 'Min 12 chars', icon: Shield, color: 'from-blue-500 to-cyan-600' },
                            { setting: 'Session Timeout', status: 'Active', duration: '30 minutes', icon: Clock, color: 'from-purple-500 to-pink-600' },
                            { setting: 'IP Whitelist', status: 'Enabled', entries: '47 IPs', icon: Globe, color: 'from-orange-500 to-red-600' },
                            { setting: 'API Rate Limiting', status: 'Active', limit: '1000/hour', icon: Zap, color: 'from-yellow-500 to-orange-600' },
                            { setting: 'Data Encryption', status: 'AES-256', type: 'At Rest & Transit', icon: Shield, color: 'from-indigo-500 to-blue-600' }
                          ].map((setting, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.1 }}
                              className="p-6 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200 border border-slate-600/30"
                            >
                              <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 bg-gradient-to-br ${setting.color} rounded-xl flex items-center justify-center shadow-lg`}>
                                  <setting.icon className="w-6 h-6 text-white" />
                                </div>
                                <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase bg-emerald-500/20 text-emerald-300">
                                  Active
                                </span>
                              </div>
                              <h4 className="font-semibold text-white mb-2">{setting.setting}</h4>
                              <div className="space-y-1 text-sm">
                                <p className="text-slate-400">
                                  <span className="text-slate-300">Status:</span> {setting.status}
                                </p>
                                <p className="text-slate-400">
                                  <span className="text-slate-300">
                                    {setting.users ? 'Coverage' : setting.requirement ? 'Requirement' : setting.duration ? 'Duration' : setting.entries ? 'Entries' : setting.limit ? 'Limit' : 'Type'}:
                                  </span> {setting.users || setting.requirement || setting.duration || setting.entries || setting.limit || setting.type}
                                </p>
                              </div>
                              <button className="w-full mt-4 py-2 text-sm font-semibold bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all duration-200">
                                Configure
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeModule !== 'overview' && activeModule !== 'suppliers' && activeModule !== 'rbac' && activeModule !== 'picking' && activeModule !== 'marketplaces' && activeModule !== 'wallet' && activeModule !== 'catalog' && activeModule !== 'orders' && activeModule !== 'taxes' && activeModule !== 'logistics' && activeModule !== 'subscriptions' && activeModule !== 'whitelabel' && activeModule !== 'security' && (
                    <div className="p-8 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
                      <div className="text-center py-16">
                        <div className={`w-20 h-20 bg-gradient-to-br from-${modules.find(m => m.id === activeModule)?.color}-500 to-${modules.find(m => m.id === activeModule)?.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                          {React.createElement(modules.find(m => m.id === activeModule)?.icon || Settings, { 
                            className: "w-8 h-8 text-white" 
                          })}
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">
                          {modules.find(m => m.id === activeModule)?.name}
                        </h3>
                        <p className="text-slate-400 mb-8 text-lg max-w-2xl mx-auto">
                          This module is under development. Advanced features for {modules.find(m => m.id === activeModule)?.name.toLowerCase()} management will be available soon.
                        </p>
                        <div className="flex justify-center space-x-4">
                          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold">
                            Configure Settings
                          </button>
                          <button className="px-6 py-3 bg-slate-700/50 hover:bg-slate-700 text-white rounded-2xl transition-all duration-300 border border-slate-600/50 hover:border-slate-500/50 font-semibold">
                            View Documentation
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </div>
    </>
  );
}

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  );
}