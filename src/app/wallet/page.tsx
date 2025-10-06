/**
 * @fileoverview Digital wallet and financial dashboard
 * Features balance overview, transactions, and withdrawal management
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { Button } from '@/components/ui/Button';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownLeft,
  Plus,
  Minus,
  CreditCard,
  Banknote,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  Download,
  Eye
} from 'lucide-react';

export default function WalletPage() {
  const { t } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedTransaction, setSelectedTransaction] = useState<number | null>(null);

  // Mock data
  const walletData = {
    balance: 12547.89,
    pending: 234.56,
    available: 12313.33,
    totalEarnings: 45680.90,
    totalWithdrawals: 33133.01
  };

  const transactions = [
    {
      id: 1,
      type: 'credit',
      amount: 1250.00,
      description: 'Order #1234 - Wireless Headphones',
      date: '2024-01-17 14:30',
      status: 'completed',
      method: 'sale'
    },
    {
      id: 2,
      type: 'debit',
      amount: 500.00,
      description: 'Withdrawal to Bank Account',
      date: '2024-01-16 10:15',
      status: 'completed',
      method: 'withdrawal'
    },
    {
      id: 3,
      type: 'credit',
      amount: 89.99,
      description: 'Order #1235 - Smart Watch',
      date: '2024-01-15 16:45',
      status: 'completed',
      method: 'sale'
    },
    {
      id: 4,
      type: 'debit',
      amount: 25.00,
      description: 'Platform Fee',
      date: '2024-01-15 16:45',
      status: 'completed',
      method: 'fee'
    },
    {
      id: 5,
      type: 'debit',
      amount: 1000.00,
      description: 'Withdrawal Request',
      date: '2024-01-14 09:20',
      status: 'pending',
      method: 'withdrawal'
    }
  ];

  const getTransactionIcon = (type: string, method: string) => {
    if (type === 'credit') {
      return <ArrowUpRight className="w-5 h-5 text-green-600" />;
    } else {
      if (method === 'withdrawal') return <ArrowDownLeft className="w-5 h-5 text-blue-600" />;
      if (method === 'fee') return <Minus className="w-5 h-5 text-red-600" />;
      return <ArrowDownLeft className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredTransactions = transactions; // Add filtering logic here

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
            <h1 className="text-3xl font-bold text-gray-900">{t('nav.wallet')}</h1>
            <p className="text-gray-600 mt-1">Manage your earnings and withdrawals</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <GradientButton>
              <Plus className="w-4 h-4 mr-2" />
              Request Withdrawal
            </GradientButton>
          </div>
        </motion.div>

        {/* Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              title: 'Available Balance', 
              value: walletData.available, 
              icon: Wallet, 
              color: 'green',
              prefix: '$'
            },
            { 
              title: 'Pending Balance', 
              value: walletData.pending, 
              icon: Clock, 
              color: 'yellow',
              prefix: '$'
            },
            { 
              title: 'Total Earnings', 
              value: walletData.totalEarnings, 
              icon: TrendingUp, 
              color: 'blue',
              prefix: '$'
            },
            { 
              title: 'Total Withdrawals', 
              value: walletData.totalWithdrawals, 
              icon: TrendingDown, 
              color: 'purple',
              prefix: '$'
            }
          ].map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              green: 'from-green-500 to-green-600',
              yellow: 'from-yellow-500 to-yellow-600',
              blue: 'from-blue-500 to-blue-600',
              purple: 'from-purple-500 to-purple-600'
            };

            return (
              <AnimatedCard key={stat.title} delay={index * 0.1}>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        <AnimatedCounter
                          value={stat.value}
                          prefix={stat.prefix}
                          decimals={2}
                        />
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

        {/* Quick Actions */}
        <AnimatedCard delay={0.4}>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
              >
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-green-900">Add Funds</p>
                  <p className="text-sm text-green-600">Deposit money to your wallet</p>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <ArrowDownLeft className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-blue-900">Withdraw</p>
                  <p className="text-sm text-blue-600">Transfer to your bank account</p>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-3 p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-purple-900">Payment Methods</p>
                  <p className="text-sm text-purple-600">Manage your payment options</p>
                </div>
              </motion.button>
            </div>
          </div>
        </AnimatedCard>

        {/* Transaction History */}
        <AnimatedCard delay={0.5}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
              <div className="flex items-center space-x-3">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {filteredTransactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {getTransactionIcon(transaction.type, transaction.method)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{transaction.date}</span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                            {getStatusIcon(transaction.status)}
                            <span className="ml-1">{transaction.status}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className={`text-lg font-semibold ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </span>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Load More */}
            <div className="mt-6 text-center">
              <Button variant="outline">
                Load More Transactions
              </Button>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </DashboardLayout>
  );
}
