'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { getAuthRedirectUrl } from '@/lib/redirect';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { GradientButton } from '@/components/ui/GradientButton';
import { SparklesCore } from '@/components/ui/sparkles';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { motion } from 'framer-motion';
import {
  Package,
  TrendingUp,
  Users,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  ShoppingCart,
  BarChart3,
  Rocket,
  Clock,
  DollarSign,
  Box,
  Truck,
  Search,
  Target,
  Sparkles,
  Globe,
  RefreshCw,
  FileText,
  Wallet,
  Palette,
  Link as LinkIcon,
  Layers,
  Settings,
  CreditCard,
  TrendingDown,
  ShoppingBag
} from 'lucide-react';

export default function Home() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const redirectUrl = getAuthRedirectUrl(user);
      router.push(redirectUrl);
    }
  }, [isAuthenticated, isLoading, user, router]);

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
          <p className="mt-4 text-gray-600 font-medium">Loading...</p>
        </motion.div>
      </div>
    );
  }

  // Section 2: Marketplaces
  const marketplaces = [
    { name: 'Shopee', color: 'from-orange-500 to-red-500', description: 'Real-time stock sync & automated listings' },
    { name: 'Mercado Livre', color: 'from-yellow-400 to-yellow-600', description: 'Seamless integration & order management' },
    { name: 'Amazon', color: 'from-blue-600 to-blue-800', description: 'Global reach with automated fulfillment' },
    { name: 'TikTok Shop', color: 'from-black to-cyan-500', description: 'Social commerce made easy' },
    { name: 'Kwai Shop', color: 'from-orange-600 to-pink-600', description: 'Quick product publishing & sales tracking' },
    { name: 'Magalu', color: 'from-blue-500 to-blue-700', description: 'Brazilian market leader integration' }
  ];

  // Section 3: Order Flow Steps
  const orderFlowSteps = [
    { icon: ShoppingCart, label: 'Order Received', color: 'from-green-500 to-emerald-600' },
    { icon: RefreshCw, label: 'Auto Inventory Sync', color: 'from-blue-500 to-cyan-600' },
    { icon: Box, label: 'Stock Management', color: 'from-purple-500 to-pink-600' },
    { icon: FileText, label: 'Instant Invoicing', color: 'from-orange-500 to-red-600' },
    { icon: Truck, label: 'Fast Shipment', color: 'from-indigo-500 to-blue-600' }
  ];

  // Section 6: Key Benefits
  const keyBenefits = [
    {
      icon: Globe,
      title: 'Multi-Channel Integration',
      description: 'Connect with multiple marketplaces and sell everywhere',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Automated Order Fulfillment',
      description: 'Focus on growing your business while we handle logistics',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Palette,
      title: 'Whitelabel Solution',
      description: 'Run your own branded platform for scalability',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Wallet,
      title: 'Digital Wallet',
      description: 'Seamless financial transactions with integrated payment gateways',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: RefreshCw,
      title: 'Real-Time Data Syncing',
      description: 'Always up-to-date, across all platforms',
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950">
      {/* Fixed Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-xl border-b border-gray-700 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center space-x-3"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl border border-white/20">
                <Package className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Dropship Hub
                </h1>
                <p className="text-xs text-gray-400">Complete Dropshipping Solution</p>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center space-x-4"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <LanguageSwitcher />
              <Button 
                variant="outline" 
                onClick={() => router.push('/login')} 
                className="cursor-pointer border-gray-600 text-gray-300 hover:border-blue-400 hover:text-white hover:bg-gray-700 transition-colors"
              >
                Sign In
              </Button>
              <GradientButton onClick={() => router.push('/register')} className="cursor-pointer shadow-lg">
                Get Started Free
              </GradientButton>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <main className="pt-24">
        {/* SECTION 1: Welcome Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-800 via-gray-900 to-slate-900 text-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20"
              >
                <Sparkles className="w-5 h-5 text-blue-300" />
                <span className="font-semibold text-blue-200">The Complete Dropshipping Solution</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight relative z-20"
              >
                <span className="text-blue-200">Welcome to</span> <span className="text-yellow-300">Dropship Hub</span>
              </motion.h1>

              {/* Sparkles Effect */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="w-full max-w-4xl mx-auto h-40 relative mb-8"
              >
                {/* Gradients */}
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-[2px] w-3/4 blur-sm" />
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent h-px w-3/4" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent h-[5px] w-1/4 blur-sm" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent h-px w-1/4" />

                {/* Sparkles Core */}
                <SparklesCore
                  background="transparent"
                  minSize={0.4}
                  maxSize={1}
                  particleDensity={1200}
                  className="w-full h-full"
                  particleColor="#FFFFFF"
                />

                {/* Radial Gradient to prevent sharp edges */}
                <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed text-blue-50"
              >
                Connect with multiple marketplaces (Shopee, Mercado Livre, TikTok Shop, Amazon, etc.),
                automate your order management, and streamline your entire business operation.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative flex justify-center items-start mt-12 h-48"
              >
                {/* Semicircle arrangement - Upward arc */}
                <div className="relative w-full max-w-3xl h-full">
                  {/* Badge 1 - Multi-Marketplace (Left Top) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="absolute left-0 top-8 flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-400/40 rounded-xl px-6 py-3 shadow-lg"
                    style={{ transform: 'rotate(15deg)' }}
                  >
                    <ShoppingCart className="w-6 h-6 text-blue-300" />
                    <span className="text-blue-100 font-medium">Multi-Marketplace</span>
                  </motion.div>

                  {/* Badge 2 - Automated (Bottom Left) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="absolute left-1/4 bottom-0 flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-400/40 rounded-xl px-6 py-3 shadow-lg"
                    style={{ transform: 'translateX(-50%) rotate(5deg)' }}
                  >
                    <Zap className="w-6 h-6 text-green-300" />
                    <span className="text-green-100 font-medium">Automated</span>
                  </motion.div>

                  {/* Badge 3 - Secure (Bottom Right) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="absolute right-1/4 bottom-0 flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-400/40 rounded-xl px-6 py-3 shadow-lg"
                    style={{ transform: 'translateX(50%) rotate(-5deg)' }}
                  >
                    <Shield className="w-6 h-6 text-purple-300" />
                    <span className="text-purple-100 font-medium">Secure</span>
                  </motion.div>

                  {/* Badge 4 - Scalable (Right Top) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="absolute right-0 top-8 flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-400/40 rounded-xl px-6 py-3 shadow-lg"
                    style={{ transform: 'rotate(-15deg)' }}
                  >
                    <TrendingUp className="w-6 h-6 text-orange-300" />
                    <span className="text-orange-100 font-medium">Scalable</span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: Supported Marketplaces - 360° Rotating Carousel */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full px-4 py-2 mb-6 border border-blue-400/30">
                  <ShoppingBag className="w-5 h-5 text-blue-300" />
                  <span className="text-sm font-semibold text-blue-200">Marketplace Integration</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-blue-200">Connect to</span> <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Leading Marketplaces
                  </span>
                </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Seamless integration with all major e-commerce platforms
              </p>
            </motion.div>

            {/* 360° 3D Rotating Carousel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl" />
              
              <div className="relative rounded-3xl overflow-visible py-16">
                <div
                  className="marketplace-carousel-container flex items-center justify-center"
                  style={{ perspective: "1400px", minHeight: "500px" }}
                >
                  <div className="marketplace-carousel-3d">
                    {marketplaces.map((marketplace, idx) => {
                      const angle = (360 / marketplaces.length) * idx;
                      const transform = `rotateY(${angle}deg) translateZ(520px)`;
                      
                      return (
                        <div
                          key={`marketplace-3d-${idx}`}
                          className="marketplace-carousel-item"
                          style={{ transform }}
                        >
                          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 rounded-2xl p-6 w-[320px] h-[380px] shadow-2xl hover:border-blue-400 transition-all duration-300 group">
                            <div className={`absolute inset-0 bg-gradient-to-br ${marketplace.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
                            
                            <div className="relative z-10 flex flex-col h-full">
                              <div className={`w-16 h-16 bg-gradient-to-br ${marketplace.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-xl border border-white/20`}>
                                <ShoppingBag className="w-8 h-8 text-white drop-shadow-lg" />
                              </div>

                              <h3 className="text-xl font-bold text-white mb-3">{marketplace.name}</h3>

                              <div className="space-y-2 text-gray-300 mb-4 flex-grow">
                                <div className="flex items-center space-x-2">
                                  <CheckCircle className="w-5 h-5 text-green-400" />
                                  <span className="text-sm">Real-time stock syncing</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <CheckCircle className="w-5 h-5 text-green-400" />
                                  <span className="text-sm">Easy product publishing</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <CheckCircle className="w-5 h-5 text-green-400" />
                                  <span className="text-sm">Order management automation</span>
                                </div>
                              </div>

                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-auto">
                                <p className={`text-xs font-semibold bg-gradient-to-r ${marketplace.color} bg-clip-text text-transparent`}>
                                  {marketplace.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Hover to pause hint */}
                <div className="text-center mt-8">
                  <p className="text-sm text-gray-400">
                    <span className="inline-block mr-2">🖱️</span>
                    Hover to pause rotation
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Feature badges below carousel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4 mt-12"
            >
              <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-400/40 rounded-xl px-6 py-3 shadow-lg">
                <ShoppingCart className="w-6 h-6 text-blue-300" />
                <span className="text-blue-100 font-medium">Multi-Marketplace</span>
              </div>
              <div className="flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-400/40 rounded-xl px-6 py-3 shadow-lg">
                <Zap className="w-6 h-6 text-green-300" />
                <span className="text-green-100 font-medium">Automated</span>
              </div>
              <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-400/40 rounded-xl px-6 py-3 shadow-lg">
                <Shield className="w-6 h-6 text-purple-300" />
                <span className="text-purple-100 font-medium">Secure</span>
              </div>
              <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-400/40 rounded-xl px-6 py-3 shadow-lg">
                <TrendingUp className="w-6 h-6 text-orange-300" />
                <span className="text-orange-100 font-medium">Scalable</span>
              </div>
            </motion.div>
          </div>

          {/* CSS for 360° 3D Rotating Carousel */}
          <style>{`
            @keyframes spinMarketplaceRing {
              0% { transform: translateZ(-520px) rotateY(0deg); }
              100% { transform: translateZ(-520px) rotateY(-360deg); }
            }
            
            .marketplace-carousel-3d {
              position: relative;
              width: 320px;
              height: 380px;
              transform-style: preserve-3d;
              animation: spinMarketplaceRing 30s linear infinite;
            }
            
            .marketplace-carousel-3d:hover {
              animation-play-state: paused;
            }
            
            .marketplace-carousel-item {
              position: absolute;
              top: 50%;
              left: 50%;
              transform-style: preserve-3d;
              transform-origin: center center;
              margin: -190px 0 0 -160px;
              transition: all 0.3s ease;
            }
            
            .marketplace-carousel-item:hover {
              transform: scale(1.05);
            }
          `}</style>
        </section>

        {/* SECTION 3: Automated Order Management */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-800 to-gray-900 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full px-4 py-2 mb-6 border border-green-400/30">
                <Zap className="w-5 h-5 text-green-300" />
                <span className="text-sm font-semibold text-green-200">Automated Workflow</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-green-200">Order Management</span> <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  On Autopilot
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                From order received to shipment - fully automated in seconds with zero errors
              </p>
            </motion.div>

            {/* Main Workflow Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 border border-gray-700 shadow-2xl mb-12"
            >
              {/* Workflow Steps */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
                {orderFlowSteps.map((step, index) => (
                  <React.Fragment key={step.label}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.15 }}
                      className="relative"
                    >
                      {/* Step Card */}
                      <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6 border border-gray-600 hover:border-green-400 transition-all duration-300 group cursor-pointer h-full">
                        {/* Step Number */}
                        <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                          {index + 1}
                        </div>

                        {/* Icon */}
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={`w-18 h-18 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-xl border border-white/20 group-hover:shadow-2xl transition-all duration-300`}
                        >
                          <step.icon className="w-9 h-9 text-white drop-shadow-lg" />
                        </motion.div>

                        {/* Label */}
                        <h3 className="text-sm font-semibold text-white text-center group-hover:text-green-400 transition-colors duration-300">
                          {step.label}
                        </h3>

                        {/* Hover Description */}
                        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                          <p className="text-xs text-gray-400">Automated in real-time</p>
                        </div>
                      </div>

                      {/* Animated Arrow */}
                      {index < orderFlowSteps.length - 1 && (
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="hidden md:block absolute top-1/2 -right-8 transform -translate-y-1/2 z-10"
                        >
                          <ArrowRight className="w-6 h-6 text-green-400" />
                        </motion.div>
                      )}
                    </motion.div>
                  </React.Fragment>
                ))}
              </div>

              {/* Workflow Stats */}
              <div className="mt-10 pt-8 border-t border-gray-700">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-green-400 mb-1">
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                      >
                        &lt; 5s
                      </motion.span>
                    </div>
                    <div className="text-sm text-gray-400">Processing Time</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-400 mb-1">
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.7 }}
                      >
                        99.9%
                      </motion.span>
                    </div>
                    <div className="text-sm text-gray-400">Accuracy Rate</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-400 mb-1">
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.9 }}
                      >
                        24/7
                      </motion.span>
                    </div>
                    <div className="text-sm text-gray-400">Always Active</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/30 rounded-2xl p-6 hover:border-blue-400 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg border border-white/20">
                  <Clock className="w-7 h-7 text-white drop-shadow-lg" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Lightning Fast</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Orders processed instantly with real-time inventory sync across all marketplaces
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/30 rounded-2xl p-6 hover:border-green-400 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg border border-white/20">
                  <Zap className="w-7 h-7 text-white drop-shadow-lg" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Fully Automated</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Zero manual work - from order capture to invoice generation, everything runs automatically
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/30 rounded-2xl p-6 hover:border-purple-400 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg border border-white/20">
                  <Shield className="w-7 h-7 text-white drop-shadow-lg" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Error-Free</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  AI-powered validation ensures 99.9% accuracy with automatic error detection and recovery
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Digital Wallet */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-950 to-slate-900 text-white relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 right-10 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center space-x-2 bg-green-500/20 rounded-full px-4 py-2 mb-6">
                <Wallet className="w-5 h-5 text-green-400" />
                <span className="text-sm font-semibold text-green-400">Digital Wallet</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-green-200">Complete</span> <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Financial Control
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Track earnings, manage transactions, and process instant withdrawals - all in one place
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Wallet Preview Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                {/* Main Wallet Card */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700 shadow-2xl">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">My Wallet</h3>
                      <p className="text-sm text-gray-400">Real-time balance</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Wallet className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Balance Card */}
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 mb-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="relative z-10">
                      <p className="text-sm text-white/80 mb-2">Total Balance</p>
                      <p className="text-5xl font-bold text-white mb-3">$12,458.50</p>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-white" />
                        <p className="text-sm text-white/90">+$2,340 this month (+23%)</p>
                      </div>
                    </div>
                  </div>

                  {/* Recent Transactions */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-400 mb-4">Recent Transactions</h4>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-gray-700/50 rounded-xl p-4 flex items-center justify-between border border-gray-600 hover:border-green-400 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">Payment Received</p>
                          <p className="text-sm text-gray-400">Mercado Pago • Today</p>
                        </div>
                      </div>
                      <p className="font-bold text-green-400 text-lg">+$850.00</p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-gray-700/50 rounded-xl p-4 flex items-center justify-between border border-gray-600 hover:border-blue-400 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                          <ShoppingCart className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">Order #1234</p>
                          <p className="text-sm text-gray-400">Shopee • Yesterday</p>
                        </div>
                      </div>
                      <p className="font-bold text-green-400 text-lg">+$425.00</p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-gray-700/50 rounded-xl p-4 flex items-center justify-between border border-gray-600 hover:border-red-400 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                          <TrendingDown className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">Withdrawal</p>
                          <p className="text-sm text-gray-400">Bank Transfer • 2 days ago</p>
                        </div>
                      </div>
                      <p className="font-bold text-red-400 text-lg">-$500.00</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Features List */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-6"
              >
                {/* Feature 1 */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-green-400 transition-all duration-300 group">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <DollarSign className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Track Your Earnings</h3>
                      <p className="text-gray-300 leading-relaxed">
                        Real-time revenue tracking with detailed analytics, automated reports, and financial insights to help you grow your business.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-blue-400 transition-all duration-300 group">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Shield className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Secure Payment Processing</h3>
                      <p className="text-gray-300 leading-relaxed">
                        Bank-level encryption, fraud protection, and compliance with international security standards keep your money safe.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-purple-400 transition-all duration-300 group">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <CreditCard className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Instant Withdrawals</h3>
                      <p className="text-gray-300 leading-relaxed">
                        Access your funds anytime with automated payouts. Integration with Mercado Pago, PIX, and major payment gateways.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
                  <h4 className="text-sm font-semibold text-gray-400 mb-4">Supported Payment Methods</h4>
                  <div className="flex flex-wrap gap-3">
                    <div className="bg-gray-700 rounded-lg px-4 py-2 text-sm text-white">Mercado Pago</div>
                    <div className="bg-gray-700 rounded-lg px-4 py-2 text-sm text-white">PIX</div>
                    <div className="bg-gray-700 rounded-lg px-4 py-2 text-sm text-white">Credit Card</div>
                    <div className="bg-gray-700 rounded-lg px-4 py-2 text-sm text-white">Boleto</div>
                    <div className="bg-gray-700 rounded-lg px-4 py-2 text-sm text-white">Bank Transfer</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Whitelabel Solution */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center space-x-2 bg-purple-500/20 rounded-full px-4 py-2 mb-6">
                <Palette className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-semibold text-purple-400">Whitelabel Solution</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-purple-200">Launch Your</span> <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Branded Platform
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Complete whitelabel solution with custom domains, branding, and unlimited scalability
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Branding Preview */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="order-2 lg:order-1"
              >
                {/* Main Preview Card */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700 shadow-2xl">
                  {/* Browser Mockup */}
                  <div className="bg-gray-950 rounded-2xl overflow-hidden shadow-xl border border-gray-700">
                    {/* Browser Bar */}
                    <div className="bg-gray-800 px-4 py-3 flex items-center space-x-2 border-b border-gray-700">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="flex-1 bg-gray-700 rounded px-3 py-1 ml-4">
                        <p className="text-xs text-gray-400">yourbrand.com</p>
                      </div>
                    </div>

                    {/* Dashboard Preview */}
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-sm">Your Brand</h4>
                            <p className="text-xs text-gray-400">Dropship Platform</p>
                          </div>
                        </div>
                        <Settings className="w-5 h-5 text-gray-400" />
                      </div>

                      {/* Color Palette Display */}
                      <div className="mb-4">
                        <p className="text-xs text-gray-400 mb-3">Custom Color Scheme</p>
                        <div className="grid grid-cols-5 gap-2">
                          <div className="h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg"></div>
                          <div className="h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg"></div>
                          <div className="h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
                          <div className="h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg"></div>
                          <div className="h-12 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-lg"></div>
                        </div>
                      </div>

                      {/* Dashboard Elements */}
                      <div className="space-y-2">
                        <div className="bg-gray-800 rounded-lg h-8"></div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-gray-800 rounded-lg h-16"></div>
                          <div className="bg-gray-800 rounded-lg h-16"></div>
                          <div className="bg-gray-800 rounded-lg h-16"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Customization Badge */}
                  <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-300">
                    <Palette className="w-4 h-4 text-purple-400" />
                    <span>100% Customizable • Your Brand, Your Rules</span>
                  </div>
                </div>
              </motion.div>

              {/* Features List */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="order-1 lg:order-2 space-y-6"
              >
                {/* Feature Cards */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-purple-400 transition-all duration-300 group">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Custom Domain & Branding</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Use your own domain name and create a unique brand identity that resonates with your customers.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-pink-400 transition-all duration-300 group">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Palette className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Complete Visual Control</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Customize colors, logos, fonts, and layouts to match your brand perfectly across all pages.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-blue-400 transition-all duration-300 group">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">White-Labeled Portal</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Your customers see only your brand - no third-party branding or references anywhere.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-green-400 transition-all duration-300 group">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Unlimited Scalability</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Grow without limits - add unlimited products, users, and marketplaces as you scale.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature Checklist */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
                  <h4 className="text-sm font-semibold text-gray-400 mb-4">What&apos;s Included</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Custom logo & favicon</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Custom color schemes</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Custom domain setup</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Email templates with your branding</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">White-labeled customer communications</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Plans and Subscriptions */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-950 to-slate-900">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center space-x-2 bg-blue-500/20 rounded-full px-4 py-2 mb-6">
                <DollarSign className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-semibold text-blue-400">Plans & Subscriptions</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-blue-200">Choose Your</span> <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Perfect Plan
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Flexible pricing plans designed to scale with your dropshipping business
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Free Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gray-800 rounded-2xl p-8 border border-gray-600 hover:border-blue-400 transition-all duration-300 flex flex-col"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
                  <div className="text-4xl font-bold text-gray-300 mb-2">R$ 0</div>
                  <p className="text-gray-400 text-sm">Perfect for getting started</p>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">100 Active SKUs</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">50 Orders/month</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">2 Marketplaces</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Basic Support</span>
                  </li>
                </ul>
                <Button className="w-full bg-gray-700 text-white hover:bg-gray-600 mt-auto">
                  Get Started Free
                </Button>
              </motion.div>

              {/* Basic Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-800 rounded-2xl p-8 border border-blue-500 hover:border-blue-400 transition-all duration-300 relative flex flex-col"
              >
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Popular</span>
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Basic</h3>
                  <div className="text-4xl font-bold text-blue-400 mb-2">R$ 97</div>
                  <p className="text-gray-400 text-sm">per month</p>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">1,000 Active SKUs</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">500 Orders/month</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">5 Marketplaces</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Email Support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Basic Reports</span>
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 mt-auto">
                  Start Basic Plan
                </Button>
              </motion.div>

              {/* Pro Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gray-800 rounded-2xl p-8 border border-purple-500 hover:border-purple-400 transition-all duration-300 flex flex-col"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                  <div className="text-4xl font-bold text-purple-400 mb-2">R$ 197</div>
                  <p className="text-gray-400 text-sm">per month</p>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">5,000 Active SKUs</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">2,000 Orders/month</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Unlimited Marketplaces</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Priority Support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Advanced Reports</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">API Access</span>
                  </li>
                </ul>
                <Button className="w-full bg-purple-600 text-white hover:bg-purple-700 mt-auto">
                  Go Pro
                </Button>
              </motion.div>

              {/* Enterprise Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-8 border border-yellow-500 hover:border-yellow-400 transition-all duration-300 flex flex-col"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                  <div className="text-4xl font-bold text-yellow-400 mb-2">Custom</div>
                  <p className="text-gray-400 text-sm">Contact us</p>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Unlimited SKUs</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Unlimited Orders</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">All Marketplaces</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">24/7 Support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Custom Reports</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Dedicated Manager</span>
                  </li>
                </ul>
                <Button className="w-full bg-yellow-600 text-white hover:bg-yellow-700 mt-auto">
                  Contact Sales
                </Button>
              </motion.div>
            </div>

            {/* Payment Methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-16 text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-8">Flexible Payment Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-600">
                  <CreditCard className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">Credit Cards</h4>
                  <p className="text-gray-300 text-sm">Visa, Mastercard, American Express</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-600">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">PIX</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">PIX</h4>
                  <p className="text-gray-300 text-sm">Instant Brazilian payments</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-600">
                  <FileText className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">Boleto</h4>
                  <p className="text-gray-300 text-sm">Bank slip payments</p>
                </div>
              </div>
              
              <div className="mt-8 flex flex-wrap justify-center gap-4 text-gray-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Automatic billing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Retry on failure</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Webhook integration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Auto-upgrade options</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 7: Key Benefits */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-800 to-gray-900">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-blue-200">Why Choose</span> <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Dropship Hub?
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Everything you need to succeed in dropshipping
              </p>
            </motion.div>

            <div className="space-y-8">
              {/* First row - 3 cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {keyBenefits.slice(0, 3).map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative rounded-2xl p-[2px] overflow-hidden"
                  >
                    <GlowingEffect
                      spread={80}
                      glow={true}
                      disabled={false}
                    />
                    <div className="relative bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-600 h-full">
                      <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                        <benefit.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">{benefit.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Second row - 2 cards centered */}
              <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                  {keyBenefits.slice(3, 5).map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
                      className="relative rounded-2xl p-[2px] overflow-hidden"
                    >
                      <GlowingEffect
                        spread={80}
                        glow={true}
                        disabled={false}
                      />
                      <div className="relative bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-600 h-full">
                        <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                          <benefit.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">{benefit.title}</h3>
                        <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: Call to Action */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-800 via-gray-900 to-slate-900">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Rocket className="w-20 h-20 text-blue-400 mx-auto mb-6" />

              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-blue-200">Ready to Scale Your</span> <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Dropshipping Business?
                </span>
              </h2>

              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                Join thousands of successful entrepreneurs who are already using our platform
                to automate and grow their businesses.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <GradientButton
                  size="lg"
                  onClick={() => router.push('/register')}
                  className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 text-xl px-10 py-6 shadow-2xl w-full sm:w-auto h-16"
                >
                  <div className='flex items-center'>
                    <Rocket className="w-6 h-6 mr-2 text-blue-200" />
                    <span className="text-white font-semibold">Sign Up Now - It&apos;s Free!</span>
                  </div>
                </GradientButton>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => router.push('/login')}
                  className="cursor-pointer border-2 border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white hover:bg-gray-700 text-xl px-10 py-6 w-full sm:w-auto h-16"
                >
                  Already have an account?
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-white">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>Free forever plan</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>Setup in 5 minutes</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 9: Footer */}
        <footer className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Column 1: OUR SERVICES */}
              <div>
                <h3 className="text-white font-bold text-sm uppercase mb-6 tracking-wider">OUR SERVICES</h3>
                <div className="space-y-3">
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    Dropship Hub For Me
                  </a>
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    Dropship Hub For Business
                  </a>
                </div>
              </div>

              {/* Column 2: GETTING STARTED */}
              <div>
                <h3 className="text-white font-bold text-sm uppercase mb-6 tracking-wider">GETTING STARTED</h3>
                <div className="space-y-3">
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    How It Works
                  </a>
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    Pricing & Plans
                  </a>
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    FAQs
                  </a>
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    Shipping Methods
                  </a>
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    What Can I Sell?
                  </a>
                </div>
              </div>

              {/* Column 3: ABOUT US */}
              <div>
                <h3 className="text-white font-bold text-sm uppercase mb-6 tracking-wider">ABOUT US</h3>
                <div className="space-y-3">
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    What Is Dropship Hub
                  </a>
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    Warehouse Locations
                  </a>
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    Blog
                  </a>
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    News
                  </a>
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    Customer Reviews
                  </a>
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    Affiliate Program
                  </a>
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    Direct Sellers
                  </a>
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    US Unlocked
                  </a>
                </div>
              </div>

              {/* Column 4: CONTACT US */}
              <div>
                <h3 className="text-white font-bold text-sm uppercase mb-6 tracking-wider">CONTACT US</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    </div>
                    <span className="text-gray-300 text-sm">Contact Us</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <div className="w-3 h-2 bg-gray-300 rounded-sm"></div>
                    </div>
                    <span className="text-gray-300 text-sm">support@dropshiphub.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    </div>
                    <span className="text-gray-300 text-sm">Live chat (PST Time Zone):</span>
                  </div>
                  <div className="ml-7 space-y-1">
                    <p className="text-gray-400 text-xs">Weekdays: 9AM to 5PM</p>
                    <p className="text-gray-400 text-xs">Weekends: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-center space-x-6 mb-8">
              <div className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
                <img src="/facebook.svg" alt="Facebook" className="w-5 h-5 text-gray-300" />
              </div>
              <div className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
                <img src="/twitter.svg" alt="Twitter" className="w-5 h-5 text-gray-300" />
              </div>
              <div className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
                <img src="/youtube.svg" alt="YouTube" className="w-5 h-5 text-gray-300" />
              </div>
              <div className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
                <img src="/instagram.svg" alt="Instagram" className="w-5 h-5 text-gray-300" />
              </div>
            </div>

            {/* Bottom Separator Line */}
            <div className="border-t border-gray-600 mb-6"></div>

            {/* Bottom Content */}
            <div className="text-center">
              <p className="text-gray-400 text-xs">
                © 2025 Dropship Hub. All rights reserved. | Privacy Policy | Terms of Service
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
