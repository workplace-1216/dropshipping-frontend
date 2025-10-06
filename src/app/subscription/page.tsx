/**
 * @fileoverview Subscription plans and billing management page
 * Features pricing tables, plan comparison, and payment management
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
  Check, 
  X, 
  Star, 
  CreditCard, 
  Calendar, 
  Download,
  AlertCircle,
  CheckCircle,
  Crown,
  Zap,
  Shield,
  Users,
  Package,
  TrendingUp
} from 'lucide-react';

export default function SubscriptionPage() {
  const { t } = useLanguage();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState('pro');

  // Mock data
  const currentPlan = {
    name: 'Pro',
    price: 49,
    billing: 'monthly',
    nextBilling: '2024-02-17',
    features: ['Unlimited products', 'Advanced analytics', 'Priority support', 'API access']
  };

  const plans = [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for getting started',
      price: { monthly: 0, yearly: 0 },
      icon: Package,
      color: 'gray',
      popular: false,
      features: [
        { name: 'Up to 10 products', included: true },
        { name: 'Basic analytics', included: true },
        { name: 'Email support', included: true },
        { name: 'Standard templates', included: true },
        { name: 'API access', included: false },
        { name: 'Priority support', included: false },
        { name: 'Advanced analytics', included: false },
        { name: 'Custom branding', included: false }
      ]
    },
    {
      id: 'basic',
      name: 'Basic',
      description: 'Great for small businesses',
      price: { monthly: 19, yearly: 190 },
      icon: Zap,
      color: 'blue',
      popular: false,
      features: [
        { name: 'Up to 100 products', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Email support', included: true },
        { name: 'Premium templates', included: true },
        { name: 'API access', included: true },
        { name: 'Priority support', included: false },
        { name: 'Custom branding', included: false },
        { name: 'White-label solution', included: false }
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Perfect for growing businesses',
      price: { monthly: 49, yearly: 490 },
      icon: Star,
      color: 'purple',
      popular: true,
      features: [
        { name: 'Unlimited products', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Priority support', included: true },
        { name: 'Custom templates', included: true },
        { name: 'API access', included: true },
        { name: 'Custom branding', included: true },
        { name: 'White-label solution', included: false },
        { name: 'Dedicated account manager', included: false }
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large-scale operations',
      price: { monthly: 99, yearly: 990 },
      icon: Crown,
      color: 'gold',
      popular: false,
      features: [
        { name: 'Unlimited everything', included: true },
        { name: 'Advanced analytics', included: true },
        { name: '24/7 phone support', included: true },
        { name: 'Custom development', included: true },
        { name: 'Full API access', included: true },
        { name: 'Custom branding', included: true },
        { name: 'White-label solution', included: true },
        { name: 'Dedicated account manager', included: true }
      ]
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: 2,
      type: 'card',
      last4: '5555',
      brand: 'Mastercard',
      expiry: '08/26',
      isDefault: false
    }
  ];

  const billingHistory = [
    {
      id: 1,
      date: '2024-01-17',
      amount: 49.00,
      status: 'paid',
      description: 'Pro Plan - Monthly'
    },
    {
      id: 2,
      date: '2023-12-17',
      amount: 49.00,
      status: 'paid',
      description: 'Pro Plan - Monthly'
    },
    {
      id: 3,
      date: '2023-11-17',
      amount: 49.00,
      status: 'paid',
      description: 'Pro Plan - Monthly'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'gray': return 'from-gray-500 to-gray-600';
      case 'blue': return 'from-blue-500 to-blue-600';
      case 'purple': return 'from-purple-500 to-purple-600';
      case 'gold': return 'from-yellow-500 to-yellow-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
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
            <h1 className="text-3xl font-bold text-gray-900">Subscription & Billing</h1>
            <p className="text-gray-600 mt-1">Manage your subscription and payment methods</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Invoice
            </Button>
            <GradientButton>
              <CreditCard className="w-4 h-4 mr-2" />
              Add Payment Method
            </GradientButton>
          </div>
        </motion.div>

        {/* Current Plan */}
        <AnimatedCard delay={0.1}>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
                <p className="text-gray-600">You're currently on the {currentPlan.name} plan</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">${currentPlan.price}/month</p>
                <p className="text-sm text-gray-600">Next billing: {currentPlan.nextBilling}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {currentPlan.features.map((feature, index) => (
                <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </AnimatedCard>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center">
          <div className="bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly <span className="text-green-600">(Save 20%)</span>
            </button>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const isSelected = selectedPlan === plan.id;
            const isCurrentPlan = plan.id === 'pro'; // Mock current plan

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative ${plan.popular ? 'lg:scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <AnimatedCard className={`${isSelected ? 'ring-2 ring-blue-500' : ''} ${isCurrentPlan ? 'bg-blue-50' : ''}`}>
                  <div className="p-6">
                    <div className="text-center mb-6">
                      <div className={`w-12 h-12 bg-gradient-to-r ${getColorClasses(plan.color)} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">{plan.description}</p>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-gray-900">
                          ${plan.price[billingCycle]}
                        </span>
                        <span className="text-gray-600">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-green-500" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300" />
                          )}
                          <span className={`text-sm ${feature.included ? 'text-gray-900' : 'text-gray-400'}`}>
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      {isCurrentPlan ? (
                        <Button className="w-full" disabled>
                          Current Plan
                        </Button>
                      ) : (
                        <GradientButton
                          className="w-full"
                          onClick={() => setSelectedPlan(plan.id)}
                        >
                          {isSelected ? 'Selected' : 'Choose Plan'}
                        </GradientButton>
                      )}
                    </div>
                  </div>
                </AnimatedCard>
              </motion.div>
            );
          })}
        </div>

        {/* Payment Methods */}
        <AnimatedCard delay={0.5}>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
            <div className="space-y-4">
              {paymentMethods.map((method, index) => (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {method.brand} •••• {method.last4}
                      </p>
                      <p className="text-sm text-gray-600">Expires {method.expiry}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {method.isDefault && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Default
                      </span>
                    )}
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedCard>

        {/* Billing History */}
        <AnimatedCard delay={0.6}>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing History</h3>
            <div className="space-y-4">
              {billingHistory.map((invoice, index) => (
                <motion.div
                  key={invoice.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{invoice.description}</p>
                      <p className="text-sm text-gray-600">{invoice.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                    <span className="text-lg font-semibold text-gray-900">${invoice.amount.toFixed(2)}</span>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedCard>
      </div>
    </DashboardLayout>
  );
}
