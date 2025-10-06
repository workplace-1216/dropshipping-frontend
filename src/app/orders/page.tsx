/**
 * @fileoverview Orders management page with timeline visualization
 * Features order tracking, status updates, and beautiful animations
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
  Search, 
  Filter, 
  Download, 
  Eye, 
  Package, 
  Truck, 
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Calendar,
  User,
  DollarSign,
  MapPin
} from 'lucide-react';

export default function OrdersPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

  // Mock data
  const orders = [
    {
      id: '#1234',
      customer: 'John Doe',
      email: 'john@example.com',
      total: 299.99,
      status: 'delivered',
      date: '2024-01-15',
      items: 3,
      shippingAddress: '123 Main St, New York, NY 10001',
      timeline: [
        { status: 'created', date: '2024-01-15 10:00', completed: true },
        { status: 'paid', date: '2024-01-15 10:05', completed: true },
        { status: 'separated', date: '2024-01-15 14:30', completed: true },
        { status: 'packed', date: '2024-01-15 16:00', completed: true },
        { status: 'shipped', date: '2024-01-16 09:00', completed: true },
        { status: 'delivered', date: '2024-01-17 15:30', completed: true }
      ]
    },
    {
      id: '#1235',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      total: 149.50,
      status: 'shipped',
      date: '2024-01-16',
      items: 2,
      shippingAddress: '456 Oak Ave, Los Angeles, CA 90210',
      timeline: [
        { status: 'created', date: '2024-01-16 11:00', completed: true },
        { status: 'paid', date: '2024-01-16 11:15', completed: true },
        { status: 'separated', date: '2024-01-16 15:00', completed: true },
        { status: 'packed', date: '2024-01-16 17:30', completed: true },
        { status: 'shipped', date: '2024-01-17 10:00', completed: true },
        { status: 'delivered', date: null, completed: false }
      ]
    },
    {
      id: '#1236',
      customer: 'Bob Johnson',
      email: 'bob@example.com',
      total: 89.99,
      status: 'processing',
      date: '2024-01-17',
      items: 1,
      shippingAddress: '789 Pine St, Chicago, IL 60601',
      timeline: [
        { status: 'created', date: '2024-01-17 09:00', completed: true },
        { status: 'paid', date: '2024-01-17 09:10', completed: true },
        { status: 'separated', date: null, completed: false },
        { status: 'packed', date: null, completed: false },
        { status: 'shipped', date: null, completed: false },
        { status: 'delivered', date: null, completed: false }
      ]
    }
  ];

  const statuses = ['all', 'created', 'paid', 'separated', 'packed', 'shipped', 'delivered', 'cancelled'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'packed': return 'text-purple-600 bg-purple-100';
      case 'separated': return 'text-orange-600 bg-orange-100';
      case 'paid': return 'text-yellow-600 bg-yellow-100';
      case 'created': return 'text-gray-600 bg-gray-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'packed': return <Package className="w-4 h-4" />;
      case 'separated': return <AlertCircle className="w-4 h-4" />;
      case 'paid': return <DollarSign className="w-4 h-4" />;
      case 'created': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const OrderTimeline = ({ order }: { order: any }) => (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900">Order Timeline</h3>
      <div className="relative">
        {order.timeline.map((step: any, index: number) => (
          <div key={step.status} className="flex items-start space-x-4 pb-4">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              step.completed ? 'bg-green-500' : 'bg-gray-200'
            }`}>
              {step.completed ? (
                <CheckCircle className="w-4 h-4 text-white" />
              ) : (
                <Clock className="w-4 h-4 text-gray-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${
                step.completed ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
              </p>
              {step.date && (
                <p className="text-xs text-gray-500">{step.date}</p>
              )}
            </div>
            {index < order.timeline.length - 1 && (
              <div className={`absolute left-4 top-8 w-0.5 h-8 ${
                step.completed ? 'bg-green-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

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
            <h1 className="text-3xl font-bold text-gray-900">{t('orders.title')}</h1>
            <p className="text-gray-600 mt-1">Track and manage your orders</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <GradientButton>
              <Package className="w-4 h-4 mr-2" />
              Create Order
            </GradientButton>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: 'Total Orders', value: orders.length, icon: Package, color: 'blue' },
            { title: 'Pending', value: orders.filter(o => o.status === 'processing').length, icon: Clock, color: 'yellow' },
            { title: 'Shipped', value: orders.filter(o => o.status === 'shipped').length, icon: Truck, color: 'purple' },
            { title: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, icon: CheckCircle, color: 'green' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: 'from-blue-500 to-blue-600',
              yellow: 'from-yellow-500 to-yellow-600',
              purple: 'from-purple-500 to-purple-600',
              green: 'from-green-500 to-green-600'
            };

            return (
              <AnimatedCard key={stat.title} delay={index * 0.1}>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
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

        {/* Filters */}
        <AnimatedCard delay={0.4}>
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="md:w-48">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </AnimatedCard>

        {/* Orders List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <AnimatedCard>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{order.id}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <User className="w-4 h-4" />
                              <span>{order.customer}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{order.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Package className="w-4 h-4" />
                              <span>{order.items} items</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">${order.total}</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MapPin className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Order Details */}
                    <AnimatePresence>
                      {selectedOrder === order.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 pt-6 border-t border-gray-200"
                        >
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">Customer Information</h4>
                              <div className="space-y-2 text-sm">
                                <p><span className="font-medium">Name:</span> {order.customer}</p>
                                <p><span className="font-medium">Email:</span> {order.email}</p>
                                <p><span className="font-medium">Shipping Address:</span> {order.shippingAddress}</p>
                              </div>
                            </div>
                            <div>
                              <OrderTimeline order={order} />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-12"
          >
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <GradientButton>
              <Package className="w-4 h-4 mr-2" />
              Create Your First Order
            </GradientButton>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
