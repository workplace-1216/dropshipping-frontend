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
  CheckCircle,
  Rocket,
  Clock,
  DollarSign,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

export default function Home() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { t, currentLanguage } = useLanguage();
  const router = useRouter();

  // All hooks must be called before any conditional returns
  // Section 2: Marketplaces
  const marketplaces = React.useMemo(() => [
    { name: t('home.shopee'), color: 'from-orange-500 to-red-500', description: t('home.realTimeStockSync') + ' & ' + t('home.easyProductPublishing') },
    { name: t('home.mercadoLivre'), color: 'from-yellow-400 to-yellow-600', description: t('home.seamlessIntegration') + ' & ' + t('home.orderManagementAutomation') },
    { name: t('home.amazon'), color: 'from-blue-600 to-blue-800', description: t('home.globalReachAutomatedFulfillment') },
    { name: t('home.tikTokShop'), color: 'from-black to-cyan-500', description: t('home.socialCommerceMadeEasy') },
    { name: t('home.kwaiShop'), color: 'from-orange-600 to-pink-600', description: t('home.quickProductPublishingSalesTracking') },
    { name: t('home.magalu'), color: 'from-blue-500 to-blue-700', description: t('home.brazilianMarketLeaderIntegration') }
  ], [t]);

  // Section 3: Order Flow Steps
  const orderFlowSteps = React.useMemo(() => [
    { svg: '/svg/order-received.svg', label: t('home.orderReceived'), color: 'from-green-500 to-emerald-600' },
    { svg: '/svg/inventory-sync.svg', label: t('home.autoInventorySync'), color: 'from-blue-500 to-cyan-600' },
    { svg: '/svg/stock-management.svg', label: t('home.stockManagement'), color: 'from-purple-500 to-pink-600' },
    { svg: '/svg/instant-invoicing.svg', label: t('home.instantInvoicing'), color: 'from-orange-500 to-red-600' },
    { svg: '/svg/fast-shipment.svg', label: t('home.fastShipment'), color: 'from-indigo-500 to-blue-600' }
  ], [t]);

  // Section 6: Key Benefits
  const keyBenefits = React.useMemo(() => [
    {
      svg: '/svg/multi-channel.svg',
      title: t('home.multiChannelIntegration'),
      description: t('home.connectWithMultipleMarketplacesSellEverywhere'),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      svg: '/svg/automated-fulfillment.svg',
      title: t('home.automatedOrderFulfillment'),
      description: t('home.focusOnGrowingBusinessHandleLogistics'),
      color: 'from-green-500 to-emerald-500'
    },
    {
      svg: '/svg/whitelabel.svg',
      title: t('home.whitelabelSolution'),
      description: t('home.runYourOwnBrandedPlatformScalability'),
      color: 'from-purple-500 to-pink-500'
    },
    {
      svg: '/svg/digital-wallet.svg',
      title: t('home.digitalWallet'),
      description: t('home.seamlessFinancialTransactionsIntegratedGateways'),
      color: 'from-orange-500 to-red-500'
    },
    {
      svg: '/svg/realtime-sync.svg',
      title: t('home.realTimeDataSyncing'),
      description: t('home.alwaysUpToDateAcrossAllPlatforms'),
      color: 'from-indigo-500 to-blue-500'
    }
  ], [t]);

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
          <p className="mt-4 text-gray-600 font-medium">{t('home.loadingText')}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div key={currentLanguage} className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950">
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
                  {t('home.dropshipHub')}
                </h1>
                <p className="text-xs text-gray-400">{t('home.completeDropshippingSolution')}</p>
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
                {t('home.signIn')}
              </Button>
              <GradientButton onClick={() => router.push('/register')} className="cursor-pointer shadow-lg">
                {t('home.getStartedFree')}
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
                <span className="font-semibold text-blue-200">{t('home.theCompleteDropshippingSolution')}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight relative z-20"
              >
                <span className="text-blue-200">{t('home.welcomeTo')}</span> <span className="text-yellow-300">{t('home.dropshipHub')}</span>
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
                {t('home.connectMarketplacesDescription')}
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
                    style={{ transform: 'rotate(25deg)' }}
                  >
                    <img src="/svg/multi-marketplace.svg" alt="Multi-Marketplace" className="w-6 h-6" />
                    <span className="text-blue-100 font-medium">{t('home.multiMarketplace')}</span>
                  </motion.div>

                  {/* Badge 2 - Automated (Bottom Left) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="absolute left-1/4 bottom-0 flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-400/40 rounded-xl px-6 py-3 shadow-lg"
                    style={{ transform: 'translateX(-50%) rotate(18deg)' }}
                  >
                    <img src="/svg/automated-badge.svg" alt="Automated" className="w-6 h-6" />
                    <span className="text-green-100 font-medium">{t('home.automated')}</span>
                  </motion.div>

                  {/* Badge 3 - Secure (Bottom Right) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="absolute right-1/4 bottom-0 flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-400/40 rounded-xl px-6 py-3 shadow-lg"
                    style={{ transform: 'translateX(50%) rotate(-22deg)' }}
                  >
                    <img src="/svg/secure-badge.svg" alt="Secure" className="w-6 h-6" />
                    <span className="text-purple-100 font-medium">{t('home.secure')}</span>
                  </motion.div>

                  {/* Badge 4 - Scalable (Right Top) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="absolute right-0 top-8 flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-400/40 rounded-xl px-6 py-3 shadow-lg"
                    style={{ transform: 'rotate(-28deg)' }}
                  >
                    <img src="/svg/scalable-badge.svg" alt="Scalable" className="w-6 h-6" />
                    <span className="text-orange-100 font-medium">{t('home.scalable')}</span>
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
                  <span className="text-sm font-semibold text-blue-200">{t('home.marketplaceIntegration')}</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-blue-200">{t('home.connectToLeadingMarketplaces').split(' ')[0]} {t('home.connectToLeadingMarketplaces').split(' ')[1]}</span> <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {t('home.connectToLeadingMarketplaces').split(' ').slice(2).join(' ')}
                  </span>
                </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {t('home.seamlessIntegration')}
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
                                  <span className="text-sm">{t('home.realTimeStockSync')}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <CheckCircle className="w-5 h-5 text-green-400" />
                                  <span className="text-sm">{t('home.easyProductPublishing')}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <CheckCircle className="w-5 h-5 text-green-400" />
                                  <span className="text-sm">{t('home.orderManagementAutomation')}</span>
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
                    {t('home.hoverToPauseRotation')}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Feature badges below carousel - Semicircle arrangement */}
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
                  style={{ transform: 'rotate(25deg)' }}
                >
                  <img src="/svg/multi-marketplace.svg" alt="Multi-Marketplace" className="w-6 h-6" />
                  <span className="text-blue-100 font-medium">{t('home.multiMarketplace')}</span>
                </motion.div>

                {/* Badge 2 - Automated (Bottom Left) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="absolute left-1/4 bottom-0 flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-400/40 rounded-xl px-6 py-3 shadow-lg"
                  style={{ transform: 'translateX(-50%) rotate(18deg)' }}
                >
                  <img src="/svg/automated-badge.svg" alt="Automated" className="w-6 h-6" />
                  <span className="text-green-100 font-medium">{t('home.automated')}</span>
                </motion.div>

                {/* Badge 3 - Secure (Bottom Right) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="absolute right-1/4 bottom-0 flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-400/40 rounded-xl px-6 py-3 shadow-lg"
                  style={{ transform: 'translateX(50%) rotate(-22deg)' }}
                >
                  <img src="/svg/secure-badge.svg" alt="Secure" className="w-6 h-6" />
                  <span className="text-purple-100 font-medium">{t('home.secure')}</span>
                </motion.div>

                {/* Badge 4 - Scalable (Right Top) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="absolute right-0 top-8 flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-400/40 rounded-xl px-6 py-3 shadow-lg"
                  style={{ transform: 'rotate(-28deg)' }}
                >
                  <img src="/svg/scalable-badge.svg" alt="Scalable" className="w-6 h-6" />
                  <span className="text-orange-100 font-medium">{t('home.scalable')}</span>
                </motion.div>
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
                <img src="/svg/automated-workflow.svg" alt="Automated Workflow" className="w-5 h-5" />
                <span className="text-sm font-semibold text-green-200">{t('home.automatedWorkflow')}</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-green-200">{t('home.automatedOrderManagement')}</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {t('home.fromOrderReceivedToShipment')}
              </p>
            </motion.div>

            {/* Timeline Workflow */}
            <div className="relative max-w-4xl mx-auto">
              {/* Background Timeline Line (Gray) */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-700 transform md:-translate-x-1/2"></div>
              
              {/* Animated Timeline Line (Green) */}
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="absolute left-8 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-green-400 via-emerald-500 to-green-400 transform md:-translate-x-1/2"
              ></motion.div>

              {/* Workflow Steps */}
              <div className="space-y-12">
                {orderFlowSteps.map((step, index) => {
                  const isEven = index % 2 === 0;
                  
                  return (
                    <motion.div
                      key={step.label}
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, amount: 0.5 }}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                      className={`relative flex items-center ${
                        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                      } flex-row`}
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: false, amount: 0.5 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: index * 0.15 + 0.2,
                            type: "spring",
                            stiffness: 200,
                            damping: 15
                          }}
                          className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-gray-900 relative"
                        >
                          <motion.span 
                            className="text-white font-bold text-xl"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: false }}
                            transition={{ delay: index * 0.15 + 0.4 }}
                          >
                            {index + 1}
                          </motion.span>
                          
                          {/* Pulsing ring animation */}
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-green-400"
                            initial={{ scale: 1, opacity: 0.5 }}
                            animate={{ 
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 0, 0.5]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: index * 0.3
                            }}
                          />
                        </motion.div>
                      </div>

                      {/* Connecting Line from Dot to Card */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                        className={`hidden md:block absolute top-1/2 h-0.5 bg-gradient-to-r ${
                          isEven 
                            ? 'left-1/2 ml-8 from-green-400 to-transparent origin-left' 
                            : 'right-1/2 mr-8 from-transparent to-green-400 origin-right'
                        } w-12`}
                        style={{ transform: 'translateY(-50%)' }}
                      />

                      {/* Content Card */}
                      <div className={`flex-1 ${isEven ? 'md:pr-16 pl-24' : 'md:pl-16 pl-24'} md:pl-0`}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: false, amount: 0.5 }}
                          transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
                          whileHover={{ scale: 1.02, y: -5 }}
                          className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6 md:p-8 border border-gray-600 hover:border-green-400 transition-all duration-300 shadow-xl hover:shadow-2xl group relative overflow-hidden"
                        >
                          {/* Sliding Background Images - For all five cards */}
                          {(index === 0 || index === 1 || index === 2 || index === 3 || index === 4) && (
                            <div className="absolute inset-0 z-0 overflow-hidden">
                              <motion.div
                                className="flex h-full"
                                animate={{
                                  x: ['0%', '0%', '-100%', '-100%', '-200%', '-200%', '-300%']
                                }}
                                transition={{
                                  duration: 10.8,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                  times: [0, 0.27, 0.33, 0.60, 0.66, 0.93, 1]
                                }}
                              >
                                {/* Repeat images to create seamless loop */}
                                {index === 0 
                                  ? ['/image/order1.jpg', '/image/order2.jpg', '/image/order3.jpg', '/image/order1.jpg'].map((img, imgIndex) => (
                                      <div
                                        key={imgIndex}
                                        className="flex-shrink-0 w-full h-full bg-cover bg-center"
                                        style={{ backgroundImage: `url("${img}")` }}
                                      />
                                    ))
                                  : index === 1
                                  ? ['/image/sync%20(1).jpg', '/image/sync%20(2).jpg', '/image/sync%20(3).jpg', '/image/sync%20(1).jpg'].map((img, imgIndex) => (
                                      <div
                                        key={imgIndex}
                                        className="flex-shrink-0 w-full h-full bg-cover bg-center"
                                        style={{ backgroundImage: `url("${img}")` }}
                                      />
                                    ))
                                  : index === 2
                                  ? ['/image/management1%20(1).jpg', '/image/management1%20(2).jpg', '/image/management1%20(3).jpg', '/image/management1%20(1).jpg'].map((img, imgIndex) => (
                                      <div
                                        key={imgIndex}
                                        className="flex-shrink-0 w-full h-full bg-cover bg-center"
                                        style={{ backgroundImage: `url("${img}")` }}
                                      />
                                    ))
                                  : index === 3
                                  ? ['/image/invoice%20(1).jpg', '/image/invoice%20(2).jpg', '/image/invoice%20(3).jpg', '/image/invoice%20(1).jpg'].map((img, imgIndex) => (
                                      <div
                                        key={imgIndex}
                                        className="flex-shrink-0 w-full h-full bg-cover bg-center"
                                        style={{ backgroundImage: `url("${img}")` }}
                                      />
                                    ))
                                  : ['/image/shipment%20(1).jpg', '/image/shipment%20(2).jpg', '/image/shipment%20(3).jpg', '/image/shipment%20(1).jpg'].map((img, imgIndex) => (
                                      <div
                                        key={imgIndex}
                                        className="flex-shrink-0 w-full h-full bg-cover bg-center"
                                        style={{ backgroundImage: `url("${img}")` }}
                                      />
                                    ))
                                }
                              </motion.div>
                              {/* Light overlay for readability - reduced opacity to show images clearly */}
                              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-gray-800/40 to-gray-900/50"></div>
                            </div>
                          )}
                          
                          <div className="flex items-start space-x-4 relative z-10">
                            {/* SVG Icon */}
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center flex-shrink-0 shadow-xl group-hover:shadow-2xl transition-all duration-300"
                            >
                              <img 
                                src={step.svg} 
                                alt={step.label}
                                className="w-full h-full object-contain drop-shadow-2xl"
                              />
                            </motion.div>

                            {/* Content */}
                            <div className="flex-1">
                              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300 drop-shadow-lg">
                                {step.label}
                              </h3>
                              <p className="text-gray-300 text-sm md:text-base leading-relaxed drop-shadow-md">
                                {t('home.automatedInRealTime')}
                              </p>
                              
                              {/* Stats */}
                              <div className="mt-4 flex items-center space-x-6">
                                <div className="flex items-center space-x-2">
                                  <Clock className="w-4 h-4 text-green-400" />
                                  <span className="text-xs text-gray-400">{t('home.lessThan2s')}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                                  <span className="text-xs text-gray-400">{t('home.successRate')}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Hidden Spacer for Desktop Layout */}
                      <div className="hidden md:block flex-1"></div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Workflow Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 border border-gray-700 shadow-2xl"
            >
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-green-400 mb-1">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 1.4 }}
                    >
                      &lt; 5s
                    </motion.span>
                  </div>
                  <div className="text-sm text-gray-400">{t('home.processingTime')}</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-1">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 1.5 }}
                    >
                      99.9%
                    </motion.span>
                  </div>
                  <div className="text-sm text-gray-400">{t('home.accuracyRate')}</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-1">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 1.6 }}
                    >
                      24/7
                    </motion.span>
                  </div>
                  <div className="text-sm text-gray-400">{t('home.alwaysActive')}</div>
                </div>
              </div>
            </motion.div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/30 rounded-2xl p-6 hover:border-blue-400 transition-all duration-300 group"
              >
                <div className="w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                  <img src="/svg/lightning-fast.svg" alt="Lightning Fast" className="w-14 h-14 drop-shadow-2xl" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{t('home.lightningFast')}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t('home.ordersProcessedInstantly')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/30 rounded-2xl p-6 hover:border-green-400 transition-all duration-300 group"
              >
                <div className="w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                  <img src="/svg/fully-automated.svg" alt="Fully Automated" className="w-14 h-14 drop-shadow-2xl" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{t('home.fullyAutomated')}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t('home.zeroManualWork')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/30 rounded-2xl p-6 hover:border-purple-400 transition-all duration-300 group"
              >
                <div className="w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                  <img src="/svg/error-free.svg" alt="Error-Free" className="w-14 h-14 drop-shadow-2xl" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{t('home.errorFree')}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t('home.aiPoweredValidation')}
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
                <img src="/svg/wallet-icon.svg" alt="Wallet" className="w-5 h-5" />
                <span className="text-sm font-semibold text-green-400">{t('home.digitalWallet')}</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-green-200">{t('home.completeFinancialControl')}</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {t('home.trackEarningsManageTransactions')}
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
                      <h3 className="text-2xl font-bold text-white mb-1">{t('home.myWallet')}</h3>
                      <p className="text-sm text-gray-400">{t('home.realTimeBalance')}</p>
                    </div>
                    <div className="w-12 h-12 flex items-center justify-center">
                      <img src="/svg/wallet-icon.svg" alt="Wallet" className="w-12 h-12 drop-shadow-2xl" />
                    </div>
                  </div>

                  {/* Balance Card */}
                  <div className="bg-gradient-to-br from-green-700 to-emerald-700 rounded-2xl p-6 mb-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="relative z-10">
                      <p className="text-sm text-white/80 mb-2">{t('home.totalBalance')}</p>
                      <p className="text-5xl font-bold text-white mb-3">$12,458.50</p>
                      <div className="flex items-center space-x-2">
                        <img src="/svg/trending-up.svg" alt="Trending Up" className="w-4 h-4" />
                        <p className="text-sm text-white/90">+$2,340 {t('home.thisMonth')} (+23%)</p>
                      </div>
                    </div>
                  </div>

                  {/* Recent Transactions */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-400 mb-4">{t('home.recentTransactions')}</h4>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-gray-700/50 rounded-xl p-4 flex items-center justify-between border border-gray-600 hover:border-green-400 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                          <img src="/svg/trending-up.svg" alt="Payment Received" className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">{t('home.paymentReceived')}</p>
                          <p className="text-sm text-gray-400">{t('home.mercadoPago')} • {t('home.today')}</p>
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
                          <img src="/svg/shopping-cart.svg" alt="Order" className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">{t('home.order')} #1234</p>
                          <p className="text-sm text-gray-400">Shopee • {t('home.yesterday')}</p>
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
                          <img src="/svg/trending-down.svg" alt="Withdrawal" className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">{t('home.withdrawal')}</p>
                          <p className="text-sm text-gray-400">{t('home.bankTransfer')} • 2 {t('home.daysAgo')}</p>
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
                    <div className="w-14 h-14 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <img src="/svg/dollar-earnings.svg" alt="Track Earnings" className="w-14 h-14 drop-shadow-2xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{t('home.trackYourEarnings')}</h3>
                      <p className="text-gray-300 leading-relaxed">
                        {t('home.realTimeRevenueTracking')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-blue-400 transition-all duration-300 group">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <img src="/svg/secure-shield.svg" alt="Secure Payment" className="w-14 h-14 drop-shadow-2xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{t('home.securePaymentProcessing')}</h3>
                      <p className="text-gray-300 leading-relaxed">
                        {t('home.bankLevelEncryption')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-purple-400 transition-all duration-300 group">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <img src="/svg/credit-card.svg" alt="Instant Withdrawals" className="w-14 h-14 drop-shadow-2xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{t('home.instantWithdrawals')}</h3>
                      <p className="text-gray-300 leading-relaxed">
                        {t('home.accessFundsAnytime')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
                  <h4 className="text-sm font-semibold text-gray-400 mb-4">{t('home.supportedPaymentMethods')}</h4>
                  <div className="flex flex-wrap gap-3">
                    <div className="bg-gray-700 rounded-lg px-4 py-2 text-sm text-white">{t('home.mercadoPago')}</div>
                    <div className="bg-gray-700 rounded-lg px-4 py-2 text-sm text-white">{t('home.pix')}</div>
                    <div className="bg-gray-700 rounded-lg px-4 py-2 text-sm text-white">{t('home.creditCard')}</div>
                    <div className="bg-gray-700 rounded-lg px-4 py-2 text-sm text-white">{t('home.boleto')}</div>
                    <div className="bg-gray-700 rounded-lg px-4 py-2 text-sm text-white">{t('home.bankTransfer')}</div>
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
                <img src="/svg/palette-icon.svg" alt="Palette" className="w-5 h-5" />
                <span className="text-sm font-semibold text-purple-400">{t('home.whitelabelSolution')}</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-purple-200">{t('home.launchYourBrandedPlatform')}</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {t('home.completeWhitelabelSolution')}
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
                <div className="mb-15 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-purple-400 transition-all duration-300 group">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <img src="/svg/globe-domain.svg" alt="Custom Domain" className="w-12 h-12 drop-shadow-2xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{t('home.customDomainBranding')}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {t('home.useYourOwnDomain')}
                      </p>
                    </div>
                  </div>
                </div>

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
                            <img src="/svg/package-icon.svg" alt="Package" className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-sm">{t('home.yourBrand')}</h4>
                            <p className="text-xs text-gray-400">{t('home.dropshipPlatform')}</p>
                          </div>
                        </div>
                        <img src="/svg/settings-icon.svg" alt="Settings" className="w-5 h-5" />
                      </div>

                      {/* Color Palette Display */}
                      <div className="mb-4">
                        <p className="text-xs text-gray-400 mb-3">{t('home.customColorScheme')}</p>
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
                    <img src="/svg/palette-icon.svg" alt="Customizable" className="w-4 h-4" />
                    <span>{t('home.fullyCustomizableYourBrandYourRules')}</span>
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
                

                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-pink-400 transition-all duration-300 group">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <img src="/svg/palette-custom.svg" alt="Visual Control" className="w-12 h-12 drop-shadow-2xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{t('home.completeVisualControl')}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {t('home.customizeColorsLogos')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-blue-400 transition-all duration-300 group">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <img src="/svg/users-portal.svg" alt="White Label Portal" className="w-12 h-12 drop-shadow-2xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{t('home.whiteLabeledPortal')}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {t('home.customersSeeOnlyYourBrand')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-green-400 transition-all duration-300 group">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <img src="/svg/scalability.svg" alt="Scalability" className="w-12 h-12 drop-shadow-2xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{t('home.unlimitedScalability')}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {t('home.growWithoutLimits')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature Checklist */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
                  <h4 className="text-sm font-semibold text-gray-400 mb-4">{t('home.whatsIncluded')}</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{t('home.customLogoFavicon')}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{t('home.customColorSchemes')}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{t('home.customDomainSetup')}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{t('home.emailTemplatesWithBranding')}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{t('home.whiteLabeledCommunications')}</span>
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
                <span className="text-sm font-semibold text-blue-400">{t('home.plansAndSubscriptions')}</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-blue-200">{t('home.plansAndSubscriptions')}</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {t('home.flexiblePricingPlans')}
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
                  <h3 className="text-2xl font-bold text-white mb-2">{t('home.free')}</h3>
                  <div className="text-4xl font-bold text-gray-300 mb-2">R$ 0</div>
                  <p className="text-gray-400 text-sm">{t('home.perfectForGettingStarted')}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">100 {t('home.activeSKUs')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">50 {t('home.ordersPerMonth')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">2 {t('home.marketplaces')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{t('home.basicSupport')}</span>
                  </li>
                </ul>
                <Button className="w-full bg-gray-700 text-white hover:bg-gray-600 mt-auto">
                  {t('home.getStartedFree')}
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
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">{t('home.popular')}</span>
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{t('home.basic')}</h3>
                  <div className="text-4xl font-bold text-blue-400 mb-2">R$ 97</div>
                  <p className="text-gray-400 text-sm">{t('home.perMonth')}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">1,000 {t('home.activeSKUs')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">500 {t('home.ordersPerMonth')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">5 {t('home.marketplaces')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{t('home.emailSupport')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{t('home.basicReports')}</span>
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 mt-auto">
                  {t('home.startBasicPlan')}
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
                  <h3 className="text-2xl font-bold text-white mb-2">{t('home.pro')}</h3>
                  <div className="text-4xl font-bold text-purple-400 mb-2">R$ 197</div>
                  <p className="text-gray-400 text-sm">{t('home.perMonth')}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">5,000 {t('home.activeSKUs')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">2,000 {t('home.ordersPerMonth')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{t('home.unlimitedMarketplaces')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{t('home.prioritySupport')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{t('home.advancedReports')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{t('home.apiAccess')}</span>
                  </li>
                </ul>
                <Button className="w-full bg-purple-600 text-white hover:bg-purple-700 mt-auto">
                  {t('home.goPro')}
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
                  <h3 className="text-2xl font-bold text-white mb-2">{t('home.enterprise')}</h3>
                  <div className="text-4xl font-bold text-yellow-400 mb-2">{t('home.custom')}</div>
                  <p className="text-gray-400 text-sm">{t('home.contactUs')}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{t('home.unlimitedSKUs')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{t('home.unlimitedOrders')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{t('home.allMarketplaces')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{t('home.support24_7')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{t('home.customReports')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{t('home.dedicatedManager')}</span>
                  </li>
                </ul>
                <Button className="w-full bg-yellow-600 text-white hover:bg-yellow-700 mt-auto">
                  {t('home.contactSales')}
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
              <h3 className="text-2xl font-bold text-white mb-8">{t('home.flexiblePaymentOptions')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-600">
                  <img src="/svg/credit-cards.svg" alt="Credit Cards" className="w-12 h-12 mx-auto mb-4 drop-shadow-2xl" />
                  <h4 className="text-lg font-semibold text-white mb-2">{t('home.creditCards')}</h4>
                  <p className="text-gray-300 text-sm">{t('home.visaMastercardAmericanExpress')}</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-600">
                  <img src="/svg/pix-payment.svg" alt="PIX" className="w-12 h-12 mx-auto mb-4 drop-shadow-2xl" />
                  <h4 className="text-lg font-semibold text-white mb-2">{t('home.pix')}</h4>
                  <p className="text-gray-300 text-sm">{t('home.instantBrazilianPayments')}</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-600">
                  <img src="/svg/boleto-bank.svg" alt="Boleto" className="w-12 h-12 mx-auto mb-4 drop-shadow-2xl" />
                  <h4 className="text-lg font-semibold text-white mb-2">{t('home.boleto')}</h4>
                  <p className="text-gray-300 text-sm">{t('home.bankSlipPayments')}</p>
                </div>
              </div>
              
              <div className="mt-8 flex flex-wrap justify-center gap-4 text-gray-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">{t('home.automaticBilling')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">{t('home.retryOnFailure')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">{t('home.webhookIntegration')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">{t('home.autoUpgradeOptions')}</span>
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
                <span className="text-blue-200">{t('home.whyChooseDropshipHub')}</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {t('home.everythingYouNeedToSucceed')}
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
                      <div className="w-20 h-20 flex items-center justify-center mb-6">
                        <img 
                          src={benefit.svg} 
                          alt={benefit.title}
                          className="w-full h-full object-contain drop-shadow-2xl"
                        />
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
                        <div className="w-20 h-20 flex items-center justify-center mb-6">
                          <img 
                            src={benefit.svg} 
                            alt={benefit.title}
                            className="w-full h-full object-contain drop-shadow-2xl"
                          />
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
                <span className="text-blue-200">{t('home.readyToScaleYour')}</span> <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {t('home.dropshippingBusiness')}
                </span>
              </h2>

              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                {t('home.joinThousandsOfSuccessfulEntrepreneurs')} {t('home.toAutomateGrowBusiness')}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <GradientButton
                  size="lg"
                  onClick={() => router.push('/register')}
                  className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 text-xl px-10 py-6 shadow-2xl w-full sm:w-auto h-16"
                >
                  <div className='flex items-center'>
                    <Rocket className="w-6 h-6 mr-2 text-blue-200" />
                    <span className="text-white font-semibold">{t('home.signUpNowItsFree')}</span>
                  </div>
                </GradientButton>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => router.push('/login')}
                  className="cursor-pointer border-2 border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white hover:bg-gray-700 text-xl px-10 py-6 w-full sm:w-auto h-16"
                >
                  {t('home.alreadyHaveAnAccount')}
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-white">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>{t('home.noCreditCardRequired')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>{t('home.freeForeverPlan')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>{t('home.setupIn5Minutes')}</span>
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
                <h3 className="text-white font-bold text-sm uppercase mb-6 tracking-wider">{t('home.ourServices')}</h3>
                <div className="space-y-3">
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    {t('home.dropshipHubForMe')}
                  </a>
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    {t('home.dropshipHubForBusiness')}
                  </a>
                </div>
              </div>

              {/* Column 2: GETTING STARTED */}
              <div>
                <h3 className="text-white font-bold text-sm uppercase mb-6 tracking-wider">{t('home.gettingStarted')}</h3>
                <div className="space-y-3">
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    {t('home.howItWorks')}
                  </a>
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    {t('home.pricingAndPlans')}
                  </a>
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    {t('home.faqs')}
                  </a>
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    {t('home.shippingMethods')}
                  </a>
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    {t('home.whatCanISell')}
                  </a>
                </div>
              </div>

              {/* Column 3: ABOUT US */}
              <div>
                <h3 className="text-white font-bold text-sm uppercase mb-6 tracking-wider">{t('home.aboutUs')}</h3>
                <div className="space-y-3">
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    {t('home.whatIsDropshipHub')}
                  </a>
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    {t('home.warehouseLocations')}
                  </a>
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    {t('home.blog')}
                  </a>
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    {t('home.news')}
                  </a>
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    {t('home.customerReviews')}
                  </a>
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    {t('home.affiliateProgram')}
                  </a>
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    {t('home.directSellers')}
                  </a>
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                    {t('home.usUnlocked')}
                  </a>
                </div>
              </div>

              {/* Column 4: CONTACT US */}
              <div>
                <h3 className="text-white font-bold text-sm uppercase mb-6 tracking-wider">{t('home.contactUs')}</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    </div>
                    <span className="text-gray-300 text-sm">{t('home.contactUsLink')}</span>
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
                    <span className="text-gray-300 text-sm">{t('home.liveChatPST')}</span>
                  </div>
                  <div className="ml-7 space-y-1">
                    <p className="text-gray-400 text-xs">{t('home.weekdaysHours')}</p>
                    <p className="text-gray-400 text-xs">{t('home.weekendsClosed')}</p>
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
                © 2025 {t('home.dropshipHub')}. {t('home.allRightsReserved')} | {t('home.privacyPolicy')} | {t('home.termsOfService')}
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
