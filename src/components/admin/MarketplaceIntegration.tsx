/**
 * @fileoverview Marketplace Integration Management Component
 * Complete marketplace integration with OAuth, API management, and real-time sync
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatCurrency } from '@/lib/utils';
import { 
  ShoppingCart, 
  Heart, 
  Music, 
  Smartphone, 
  Package, 
  Building2,
  Settings,
  RefreshCw,
  Eye,
  EyeOff,
  Copy,
  Check,
  AlertCircle,
  Download,
  Key,
  Globe,
  TrendingUp,
  TrendingDown,
  Activity,
  X
} from 'lucide-react';

interface Marketplace {
  id: string;
  name: string;
  status: 'connected' | 'pending' | 'disconnected' | 'error';
  products: number;
  orders: number;
  revenue: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  apiKey?: string;
  lastSync?: string;
  syncStatus?: 'syncing' | 'success' | 'error' | 'idle';
  webhookUrl?: string;
  oauthUrl?: string;
  isOauthConnected?: boolean;
  syncFrequency?: 'realtime' | 'hourly' | 'daily';
  errorMessage?: string;
}

interface ApiKey {
  id: string;
  name: string;
  marketplace: string;
  key: string;
  status: 'active' | 'inactive' | 'expired';
  lastUsed: string;
  permissions: string[];
}

interface SyncLog {
  id: string;
  marketplace: string;
  type: 'products' | 'orders' | 'inventory' | 'pricing';
  status: 'success' | 'error' | 'pending';
  timestamp: string;
  recordsProcessed: number;
  errorMessage?: string;
}

export const MarketplaceIntegration: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const [marketplaces, setMarketplaces] = useState<Marketplace[]>([
    {
      id: 'shopee',
      name: 'Shopee',
      status: 'connected',
      products: 1250,
      orders: 456,
      revenue: '$45,680',
      icon: ShoppingCart,
      color: 'from-orange-500 to-red-600',
      apiKey: 'sk_live_...',
      lastSync: '2 minutes ago',
      syncStatus: 'success',
      webhookUrl: 'https://api.shopee.com/webhook',
      isOauthConnected: true,
      syncFrequency: 'realtime'
    },
    {
      id: 'mercado-livre',
      name: 'Mercado Livre',
      status: 'connected',
      products: 890,
      orders: 234,
      revenue: '$32,450',
      icon: Heart,
      color: 'from-yellow-500 to-orange-600',
      apiKey: 'ml_live_...',
      lastSync: '5 minutes ago',
      syncStatus: 'success',
      webhookUrl: 'https://api.mercadolibre.com/webhook',
      isOauthConnected: true,
      syncFrequency: 'realtime'
    },
    {
      id: 'tiktok-shop',
      name: 'TikTok Shop',
      status: 'connected',
      products: 678,
      orders: 189,
      revenue: '$28,920',
      icon: Music,
      color: 'from-pink-500 to-purple-600',
      apiKey: 'tt_live_...',
      lastSync: '1 minute ago',
      syncStatus: 'syncing',
      webhookUrl: 'https://api.tiktok.com/webhook',
      isOauthConnected: true,
      syncFrequency: 'hourly'
    },
    {
      id: 'kwai-shop',
      name: 'Kwai Shop',
      status: 'pending',
      products: 456,
      orders: 67,
      revenue: '$12,340',
      icon: Smartphone,
      color: 'from-purple-500 to-indigo-600',
      lastSync: 'Never',
      syncStatus: 'idle',
      isOauthConnected: false,
      syncFrequency: 'daily',
      errorMessage: 'OAuth connection required'
    },
    {
      id: 'amazon',
      name: 'Amazon',
      status: 'connected',
      products: 234,
      orders: 123,
      revenue: '$18,760',
      icon: Package,
      color: 'from-blue-500 to-cyan-600',
      apiKey: 'amz_live_...',
      lastSync: '3 minutes ago',
      syncStatus: 'success',
      webhookUrl: 'https://api.amazon.com/webhook',
      isOauthConnected: true,
      syncFrequency: 'realtime'
    },
    {
      id: 'magalu',
      name: 'Magalu',
      status: 'connected',
      products: 567,
      orders: 198,
      revenue: '$22,890',
      icon: Building2,
      color: 'from-red-500 to-pink-600',
      apiKey: 'mg_live_...',
      lastSync: '4 minutes ago',
      syncStatus: 'success',
      webhookUrl: 'https://api.magalu.com/webhook',
      isOauthConnected: true,
      syncFrequency: 'realtime'
    }
  ]);

  const [selectedMarketplace, setSelectedMarketplace] = useState<Marketplace | null>(null);
  const [showApiKey, setShowApiKey] = useState<{ [key: string]: boolean }>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [syncLogs, setSyncLogs] = useState<SyncLog[]>([]);
  const [isAddingMarketplace, setIsAddingMarketplace] = useState(false);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [newMarketplace, setNewMarketplace] = useState<{
    name: string;
    apiKey: string;
    webhookUrl: string;
    syncFrequency: 'realtime' | 'hourly' | 'daily';
  }>({
    name: '',
    apiKey: '',
    webhookUrl: '',
    syncFrequency: 'hourly'
  });
  const [configData, setConfigData] = useState({
    apiKey: '',
    webhookUrl: '',
    syncFrequency: 'hourly' as 'realtime' | 'hourly' | 'daily',
    autoSync: true,
    notifications: true
  });
  const [showConnectionAlert, setShowConnectionAlert] = useState(false);
  const [connectionAlertData, setConnectionAlertData] = useState({
    type: 'success' as 'success' | 'error',
    message: '',
    title: ''
  });

  // Sample sync logs
  useEffect(() => {
    setSyncLogs([
      {
        id: '1',
        marketplace: 'Shopee',
        type: 'products',
        status: 'success',
        timestamp: '2 minutes ago',
        recordsProcessed: 45
      },
      {
        id: '2',
        marketplace: 'Mercado Livre',
        type: 'orders',
        status: 'success',
        timestamp: '5 minutes ago',
        recordsProcessed: 12
      },
      {
        id: '3',
        marketplace: 'TikTok Shop',
        type: 'inventory',
        status: 'error',
        timestamp: '8 minutes ago',
        recordsProcessed: 0,
        errorMessage: 'API rate limit exceeded'
      }
    ]);
  }, []);

  // Cleanup effect to restore scrolling when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle marketplace configuration
  const handleConfigure = (marketplace: Marketplace) => {
    setSelectedMarketplace(marketplace);
    setConfigData({
      apiKey: marketplace.apiKey || '',
      webhookUrl: marketplace.webhookUrl || '',
      syncFrequency: marketplace.syncFrequency || 'hourly',
      autoSync: true,
      notifications: true
    });
    setIsConfiguring(true);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  // Handle save configuration
  const handleSaveConfiguration = () => {
    if (selectedMarketplace) {
      setMarketplaces(prev => prev.map(mp => 
        mp.id === selectedMarketplace.id 
          ? { 
              ...mp, 
              apiKey: configData.apiKey,
              webhookUrl: configData.webhookUrl,
              syncFrequency: configData.syncFrequency
            }
          : mp
      ));
      setIsConfiguring(false);
      setSelectedMarketplace(null);
      // Restore body scrolling when modal is closed
      document.body.style.overflow = 'unset';
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsConfiguring(false);
    setSelectedMarketplace(null);
    // Restore body scrolling when modal is closed
    document.body.style.overflow = 'unset';
  };

  // Handle sync action
  const handleSync = async (marketplace: Marketplace) => {
    setMarketplaces(prev => prev.map(mp => 
      mp.id === marketplace.id 
        ? { ...mp, syncStatus: 'syncing' as const }
        : mp
    ));

    // Simulate sync process
    setTimeout(() => {
      setMarketplaces(prev => prev.map(mp => 
        mp.id === marketplace.id 
          ? { 
              ...mp, 
              syncStatus: 'success' as const,
              lastSync: 'Just now',
              products: mp.products + Math.floor(Math.random() * 10),
              orders: mp.orders + Math.floor(Math.random() * 5)
            }
          : mp
      ));
    }, 2000);
  };

  // Handle OAuth connection
  const handleOAuthConnect = (marketplace: Marketplace) => {
    // Simulate OAuth flow
    setMarketplaces(prev => prev.map(mp => 
      mp.id === marketplace.id 
        ? { 
            ...mp, 
            status: 'connected' as const,
            isOauthConnected: true,
            syncStatus: 'success' as const,
            lastSync: 'Just now'
          }
        : mp
    ));
  };

  // Toggle API key visibility
  const toggleApiKeyVisibility = (marketplaceId: string) => {
    setShowApiKey(prev => ({
      ...prev,
      [marketplaceId]: !prev[marketplaceId]
    }));
  };

  // Copy API key
  const copyApiKey = (key: string, marketplaceId: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(marketplaceId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Add new marketplace
  const handleAddMarketplace = () => {
    if (newMarketplace.name && newMarketplace.apiKey) {
      const newMp: Marketplace = {
        id: newMarketplace.name.toLowerCase().replace(/\s+/g, '-'),
        name: newMarketplace.name,
        status: 'connected',
        products: 0,
        orders: 0,
        revenue: '$0',
        icon: Globe,
        color: 'from-gray-500 to-gray-600',
        apiKey: newMarketplace.apiKey,
        lastSync: 'Just now',
        syncStatus: 'success',
        webhookUrl: newMarketplace.webhookUrl,
        isOauthConnected: true,
        syncFrequency: newMarketplace.syncFrequency
      };
      
      setMarketplaces(prev => [...prev, newMp]);
      setNewMarketplace({ name: '', apiKey: '', webhookUrl: '', syncFrequency: 'hourly' });
      setIsAddingMarketplace(false);
    }
  };


  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'disconnected': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      case 'error': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  // Get sync status color
  const getSyncStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-emerald-400';
      case 'syncing': return 'text-blue-400 animate-pulse';
      case 'error': return 'text-red-400';
      case 'idle': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
       {/* Header */}
       <div>
         <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
           {t('admin.marketplaceIntegration')}
         </h2>
         <p className="text-slate-400 mt-2 text-lg">
           {t('admin.manageOauthApiKeys')} {t('admin.andRealTimeSync')}
         </p>
       </div>

      {/* Configuration Modal */}
      <AnimatePresence>
        {isConfiguring && selectedMarketplace && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center p-4"
             onClick={handleCloseModal}
           >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
              style={{ 
                position: 'absolute',
                transform: 'translate(-50%, -50%)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">
                  {t('admin.configure')} {selectedMarketplace.name}
                </h3>
                 <button
                   onClick={handleCloseModal}
                   className="p-2 text-slate-400 hover:text-white transition-colors"
                 >
                   <X className="w-6 h-6" />
                 </button>
              </div>

              <div className="space-y-6">
                {/* API Configuration */}
                <div className="p-4 bg-slate-700/30 rounded-xl">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <Key className="w-5 h-5" />
                    <span>{t('admin.apiConfiguration')}</span>
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        {t('admin.apiKey')}
                      </label>
                      <input
                        type="password"
                        value={configData.apiKey}
                        onChange={(e) => setConfigData(prev => ({ ...prev, apiKey: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        placeholder={t('admin.enterApiKey')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        {t('admin.webhookUrl')}
                      </label>
                      <input
                        type="url"
                        value={configData.webhookUrl}
                        onChange={(e) => setConfigData(prev => ({ ...prev, webhookUrl: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        placeholder={t('admin.enterWebhookUrl')}
                      />
                    </div>
                  </div>
                </div>

                {/* Sync Configuration */}
                <div className="p-4 bg-slate-700/30 rounded-xl">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <RefreshCw className="w-5 h-5" />
                    <span>{t('admin.syncConfiguration')}</span>
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        {t('admin.syncFrequency')}
                      </label>
                      <select
                        value={configData.syncFrequency}
                        onChange={(e) => setConfigData(prev => ({ ...prev, syncFrequency: e.target.value as 'realtime' | 'hourly' | 'daily' }))}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="realtime">{t('admin.realTime')}</option>
                        <option value="hourly">{t('admin.hourly')}</option>
                        <option value="daily">{t('admin.daily')}</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="autoSync"
                        checked={configData.autoSync}
                        onChange={(e) => setConfigData(prev => ({ ...prev, autoSync: e.target.checked }))}
                        className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="autoSync" className="text-sm text-slate-300">
                        {t('admin.enableAutoSync')}
                      </label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="notifications"
                        checked={configData.notifications}
                        onChange={(e) => setConfigData(prev => ({ ...prev, notifications: e.target.checked }))}
                        className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="notifications" className="text-sm text-slate-300">
                        {t('admin.enableNotifications')}
                      </label>
                    </div>
                  </div>
                </div>

                {/* Test Connection */}
                <div className="p-4 bg-slate-700/30 rounded-xl">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <Globe className="w-5 h-5" />
                    <span>{t('admin.testConnection')}</span>
                  </h4>
                   <button
                     onClick={() => {
                       // Simulate connection test with random success/failure
                       const isSuccess = Math.random() > 0.3; // 70% success rate for demo
                       
                       if (isSuccess) {
                         setConnectionAlertData({
                           type: 'success',
                           title: t('admin.connectionTestSuccessful'),
                           message: t('admin.connectionTestSuccessful')
                         });
                       } else {
                         setConnectionAlertData({
                           type: 'error',
                           title: t('admin.connectionTestFailed'),
                           message: t('admin.connectionTestFailed') || 'Connection test failed. Please check your API key and try again.'
                         });
                       }
                       setShowConnectionAlert(true);
                     }}
                     className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                   >
                     <Activity className="w-4 h-4" />
                     <span>{t('admin.testConnection')}</span>
                   </button>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleSaveConfiguration}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                >
                  {t('admin.saveConfiguration')}
                </button>
                 <button
                   onClick={handleCloseModal}
                   className="flex-1 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium"
                 >
                   {t('admin.cancel')}
                 </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Marketplace Modal */}
      <AnimatePresence>
        {isAddingMarketplace && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-6 w-full max-w-md relative"
              style={{ 
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <h3 className="text-xl font-bold text-white mb-4">{t('admin.addNewMarketplace')}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    {t('admin.marketplaceName')}
                  </label>
                  <input
                    type="text"
                    value={newMarketplace.name}
                    onChange={(e) => setNewMarketplace(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder={t('admin.enterMarketplaceName')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    {t('admin.apiKey')}
                  </label>
                  <input
                    type="text"
                    value={newMarketplace.apiKey}
                    onChange={(e) => setNewMarketplace(prev => ({ ...prev, apiKey: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder={t('admin.enterApiKey')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    {t('admin.webhookUrl')}
                  </label>
                  <input
                    type="url"
                    value={newMarketplace.webhookUrl}
                    onChange={(e) => setNewMarketplace(prev => ({ ...prev, webhookUrl: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder={t('admin.enterWebhookUrl')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    {t('admin.syncFrequency')}
                  </label>
                  <select
                    value={newMarketplace.syncFrequency}
                    onChange={(e) => setNewMarketplace(prev => ({ ...prev, syncFrequency: e.target.value as 'realtime' | 'hourly' | 'daily' }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="realtime">{t('admin.realTime')}</option>
                    <option value="hourly">{t('admin.hourly')}</option>
                    <option value="daily">{t('admin.daily')}</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleAddMarketplace}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {t('admin.addMarketplace')}
                </button>
                <button
                  onClick={() => setIsAddingMarketplace(false)}
                  className="flex-1 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
                >
                  {t('admin.cancel')}
                </button>
              </div>
            </motion.div>
          </motion.div>
         )}
       </AnimatePresence>

       {/* Connection Alert Dialog */}
       <AnimatePresence>
         {showConnectionAlert && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex justify-center p-4"
           >
             <motion.div
               initial={{ scale: 0.9, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 20 }}
               className="bg-slate-800 rounded-2xl p-6 w-full max-w-md relative border-2 shadow-2xl"
               style={{ 
                 position: 'absolute',
                 transform: 'translate(-50%, -50%)',
                 borderColor: connectionAlertData.type === 'success' ? '#10b981' : '#ef4444'
               }}
             >
               <div className="flex items-center space-x-4 mb-4">
                 <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                   connectionAlertData.type === 'success' 
                     ? 'bg-emerald-500/20 text-emerald-400' 
                     : 'bg-red-500/20 text-red-400'
                 }`}>
                   {connectionAlertData.type === 'success' ? (
                     <Check className="w-6 h-6" />
                   ) : (
                     <AlertCircle className="w-6 h-6" />
                   )}
                 </div>
                 <div>
                   <h3 className={`text-lg font-bold ${
                     connectionAlertData.type === 'success' ? 'text-emerald-400' : 'text-red-400'
                   }`}>
                     {connectionAlertData.type === 'success' ? t('admin.success') : t('admin.error')}
                   </h3>
                   <p className="text-slate-300 text-sm">{connectionAlertData.title}</p>
                 </div>
               </div>
               
               <div className="mb-6">
                 <p className="text-slate-300 text-sm leading-relaxed">
                   {connectionAlertData.message}
                 </p>
               </div>

               <div className="flex justify-end">
                 <button
                   onClick={() => setShowConnectionAlert(false)}
                   className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                     connectionAlertData.type === 'success'
                       ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                       : 'bg-red-600 hover:bg-red-700 text-white'
                   }`}
                 >
                   {t('admin.ok')}
                 </button>
               </div>
             </motion.div>
           </motion.div>
         )}
       </AnimatePresence>

       {/* Marketplace Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketplaces.map((marketplace, index) => (
          <motion.div
            key={marketplace.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${marketplace.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <marketplace.icon className="w-7 h-7 text-white" />
                </div>
                 <div className="flex items-center space-x-2">
                   <span className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wide backdrop-blur-sm border ${getStatusColor(marketplace.status)}`}>
                     {t(`admin.${marketplace.status}`)}
                   </span>
                 </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-4">{marketplace.name}</h3>

              {/* Sync Status */}
              <div className="flex items-center space-x-2 mb-4">
                <Activity className={`w-4 h-4 ${getSyncStatusColor(marketplace.syncStatus || 'idle')}`} />
                <span className={`text-sm ${getSyncStatusColor(marketplace.syncStatus || 'idle')}`}>
                  {marketplace.syncStatus === 'syncing' ? t('admin.syncing') : marketplace.lastSync}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center p-2 bg-slate-700/30 rounded-lg">
                  <span className="text-slate-400 text-sm">{t('admin.products')}</span>
                  <span className="font-bold text-white">{marketplace.products.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-700/30 rounded-lg">
                  <span className="text-slate-400 text-sm">{t('admin.orders')}</span>
                  <span className="font-bold text-white">{marketplace.orders}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-700/30 rounded-lg">
                  <span className="text-slate-400 text-sm">{t('admin.revenue')}</span>
                  <span className="font-bold text-emerald-400">
                    {formatCurrency(marketplace.revenue, currentLanguage)}
                  </span>
                </div>
              </div>

              {/* API Key Display */}
              {marketplace.apiKey && (
                <div className="mb-4 p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">{t('admin.apiKey')}</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleApiKeyVisibility(marketplace.id)}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        {showApiKey[marketplace.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => copyApiKey(marketplace.apiKey!, marketplace.id)}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        {copiedKey === marketplace.id ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <p className="text-white text-sm font-mono mt-1">
                    {showApiKey[marketplace.id] ? marketplace.apiKey : '••••••••••••••••'}
                  </p>
                </div>
              )}

              {/* Error Message */}
              {marketplace.errorMessage && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <span className="text-red-400 text-sm">{marketplace.errorMessage}</span>
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <button
                  onClick={() => handleConfigure(marketplace)}
                  className="flex-1 py-2.5 text-sm font-semibold bg-slate-700/50 hover:bg-slate-700 text-white rounded-xl transition-all duration-200 border border-slate-600/50 hover:border-blue-500/50 flex items-center justify-center space-x-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>{t('admin.configure')}</span>
                </button>
                {marketplace.status === 'connected' ? (
                  <button
                    onClick={() => handleSync(marketplace)}
                    disabled={marketplace.syncStatus === 'syncing'}
                    className="flex-1 py-2.5 text-sm font-semibold bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
                  >
                    <RefreshCw className={`w-4 h-4 ${marketplace.syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
                    <span>{t('admin.sync')}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleOAuthConnect(marketplace)}
                    className="flex-1 py-2.5 text-sm font-semibold bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
                  >
                    <Key className="w-4 h-4" />
                    <span>{t('admin.connect')}</span>
                  </button>
                )}
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
          </motion.div>
        ))}
      </div>

      {/* API Management & Sync Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Management */}
        <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
          <h3 className="text-xl font-bold text-white mb-6">{t('admin.oauthApiKeyManagement')}</h3>
          <div className="space-y-4">
            {marketplaces.filter(mp => mp.apiKey).map((marketplace, index) => (
              <motion.div
                key={marketplace.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">{marketplace.name} API</span>
                  <span className={`text-sm font-medium px-3 py-1 rounded-lg ${
                    marketplace.status === 'connected' 
                      ? 'bg-emerald-500/20 text-emerald-300' 
                      : 'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {t(`admin.${marketplace.status}`)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">{t('admin.lastSync')}: {marketplace.lastSync}</span>
                  <span className="text-slate-400">{t('admin.syncFrequency')}: {t(`admin.${marketplace.syncFrequency}`)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sync Performance */}
        <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
          <h3 className="text-xl font-bold text-white mb-6">{t('admin.syncPerformance')}</h3>
          <div className="space-y-5">
            {[
              { label: t('admin.productSyncRate'), value: '99.2%', color: 'emerald', trend: 'up' },
              { label: t('admin.stockSyncRate'), value: '98.8%', color: 'blue', trend: 'up' },
              { label: t('admin.orderSyncRate'), value: '99.5%', color: 'purple', trend: 'up' },
              { label: t('admin.averageSyncTime'), value: '2.3s', color: 'yellow', trend: 'down' }
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
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-emerald-400" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Sync Logs */}
      <div className="p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">{t('admin.syncLogs')}</h3>
          <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>{t('admin.exportLogs')}</span>
          </button>
        </div>
        <div className="space-y-3">
          {syncLogs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  log.status === 'success' ? 'bg-emerald-400' :
                  log.status === 'error' ? 'bg-red-400' : 'bg-yellow-400'
                }`}></div>
                <div>
                  <p className="text-white font-medium">{log.marketplace} - {t(`admin.${log.type}`)}</p>
                  <p className="text-slate-400 text-sm">{log.timestamp} • {log.recordsProcessed} {t('admin.recordsProcessed')}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-sm font-medium px-3 py-1 rounded-lg ${
                  log.status === 'success' ? 'bg-emerald-500/20 text-emerald-300' :
                  log.status === 'error' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'
                }`}>
                  {t(`admin.${log.status}`)}
                </span>
                {log.errorMessage && (
                  <p className="text-red-400 text-xs mt-1">{log.errorMessage}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
