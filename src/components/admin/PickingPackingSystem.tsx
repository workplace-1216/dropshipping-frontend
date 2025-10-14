/**
 * @fileoverview Picking and Packing System Component
 * Comprehensive order fulfillment system with picking, packing, and shipping workflows
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatCurrency } from '@/lib/utils';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  status: 'pending' | 'picking' | 'packing' | 'shipped' | 'completed';
  totalAmount: string;
  items: OrderItem[];
  specialInstructions?: string;
  carrier?: string;
  trackingNumber?: string;
  createdAt: string;
  supplier?: string;
}

interface OrderItem {
  id: string;
  productName: string;
  sku: string;
  quantity: number;
  currentStock: number;
  price: string;
  status: 'pending' | 'picked' | 'packed' | 'shipped';
  pickedQuantity?: number;
  packedQuantity?: number;
  isFragile?: boolean;
}

interface PackingMaterial {
  id: string;
  name: string;
  type: 'box' | 'envelope' | 'bubbleWrap' | 'paddedEnvelope';
  size?: string;
  available: boolean;
}

interface Operator {
  id: string;
  name: string;
  role: string;
}

interface OrderHistoryLog {
  id: string;
  orderId: string;
  action: string;
  operatorId: string;
  timestamp: string;
  operatorName: string;
}

export const PickingPackingSystem: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<'picking' | 'packing' | 'shipping'>('picking');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [scannedBarcode, setScannedBarcode] = useState('');
  const [currentOperator, setCurrentOperator] = useState<Operator>({
    id: 'OP001',
    name: 'João Silva',
    role: 'Warehouse Operator'
  });

  // Sample data
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001247',
      customerName: 'Maria Silva',
      customerEmail: 'maria@email.com',
      shippingAddress: 'Rua das Flores, 123, São Paulo, SP',
      status: 'pending',
      totalAmount: '$299.99',
      createdAt: '2024-01-15T10:30:00Z',
      supplier: 'TechSupply Pro',
      items: [
        {
          id: 'ITEM-001',
          productName: 'Wireless Bluetooth Headphones',
          sku: 'WH-001',
          quantity: 2,
          currentStock: 245,
          price: '$89.99',
          status: 'pending',
          isFragile: true
        },
        {
          id: 'ITEM-002',
          productName: 'USB-C Fast Charger',
          sku: 'UC-003',
          quantity: 1,
          currentStock: 0,
          price: '$29.99',
          status: 'pending'
        }
      ]
    },
    {
      id: 'ORD-001246',
      customerName: 'João Santos',
      customerEmail: 'joao@email.com',
      shippingAddress: 'Av. Paulista, 456, São Paulo, SP',
      status: 'picking',
      totalAmount: '$149.50',
      createdAt: '2024-01-15T09:15:00Z',
      supplier: 'Global Electronics',
      items: [
        {
          id: 'ITEM-003',
          productName: 'Smart Fitness Watch',
          sku: 'SF-002',
          quantity: 1,
          currentStock: 12,
          price: '$199.99',
          status: 'picked',
          pickedQuantity: 1
        }
      ]
    }
  ]);

  const [packingMaterials] = useState<PackingMaterial[]>([
    { id: 'BOX-001', name: 'Small Box (20x15x10cm)', type: 'box', size: 'Small', available: true },
    { id: 'BOX-002', name: 'Medium Box (30x20x15cm)', type: 'box', size: 'Medium', available: true },
    { id: 'BOX-003', name: 'Large Box (40x30x20cm)', type: 'box', size: 'Large', available: true },
    { id: 'ENV-001', name: 'Standard Envelope', type: 'envelope', available: true },
    { id: 'ENV-002', name: 'Padded Envelope', type: 'paddedEnvelope', available: true },
    { id: 'BUBBLE-001', name: 'Bubble Wrap Roll', type: 'bubbleWrap', available: true }
  ]);

  const [selectedMaterial, setSelectedMaterial] = useState<PackingMaterial | null>(null);
  const [orderHistory, setOrderHistory] = useState<OrderHistoryLog[]>([]);

  // Filter orders by status
  const getOrdersByStatus = (status: string) => {
    return orders.filter(order => {
      if (status === 'picking') return order.status === 'pending' || order.status === 'picking';
      if (status === 'packing') return order.status === 'packing';
      if (status === 'shipping') return order.status === 'shipped';
      return false;
    });
  };

  // Handle barcode scanning
  const handleBarcodeScan = (barcode: string) => {
    setScannedBarcode(barcode);
    if (selectedOrder) {
      const item = selectedOrder.items.find(item => item.sku === barcode);
      if (item) {
        // Verify product matches order requirements
        if (item.currentStock >= item.quantity) {
          // Mark as picked
          updateItemStatus(selectedOrder.id, item.id, 'picked', item.quantity);
        } else {
          // Flag for review
          alert(t('admin.stockShortage'));
        }
      } else {
        alert(t('admin.wrongProduct'));
      }
    }
  };

  // Update item status
  const updateItemStatus = (orderId: string, itemId: string, status: string, quantity?: number) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const updatedItems = order.items.map(item => {
          if (item.id === itemId) {
            return {
              ...item,
              status: status as OrderItem['status'],
              ...(quantity && { pickedQuantity: quantity }),
              ...(quantity && { packedQuantity: quantity })
            };
          }
          return item;
        });

        // Check if all items are picked/packed
        const allPicked = updatedItems.every(item => item.status === 'picked' || item.status === 'packed');
        const allPacked = updatedItems.every(item => item.status === 'packed');

        let newOrderStatus = order.status;
        if (status === 'picked' && allPicked) {
          newOrderStatus = 'packing';
        } else if (status === 'packed' && allPacked) {
          newOrderStatus = 'shipped';
        }

        return {
          ...order,
          items: updatedItems,
          status: newOrderStatus
        };
      }
      return order;
    }));

    // Log action
    logAction(orderId, `Item ${itemId} marked as ${status}`, currentOperator.id);
  };

  // Log action for audit trail
  const logAction = (orderId: string, action: string, operatorId: string) => {
    const logEntry = {
      id: Date.now().toString(),
      orderId,
      action,
      operatorId,
      timestamp: new Date().toISOString(),
      operatorName: currentOperator.name
    };
    setOrderHistory(prev => [logEntry, ...prev]);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-400/20';
      case 'picking': return 'text-blue-400 bg-blue-400/20';
      case 'packing': return 'text-purple-400 bg-purple-400/20';
      case 'shipped': return 'text-green-400 bg-green-400/20';
      case 'completed': return 'text-emerald-400 bg-emerald-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  // Get stock status color
  const getStockColor = (currentStock: number, requiredQuantity: number) => {
    if (currentStock === 0) return 'text-red-400 bg-red-400/20';
    if (currentStock < requiredQuantity) return 'text-yellow-400 bg-yellow-400/20';
    return 'text-green-400 bg-green-400/20';
  };

  return (
    <div className="p-6 bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">{t('admin.pickingPacking')}</h1>
        <p className="text-slate-400">Comprehensive order fulfillment system</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8 bg-slate-800/50 p-1 rounded-xl">
        {[
          { key: 'picking', label: t('admin.orderPicking'), icon: '/svg/picking.svg' },
          { key: 'packing', label: t('admin.orderPacking'), icon: '/svg/packing.svg' },
          { key: 'shipping', label: t('admin.shipping'), icon: '/svg/shipping.svg' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as 'picking' | 'packing' | 'shipping')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 ${
              activeTab === tab.key
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <img src={tab.icon} alt={tab.label} className="w-5 h-5" />
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">
              {activeTab === 'picking' && t('admin.pickingList')}
              {activeTab === 'packing' && t('admin.packingList')}
              {activeTab === 'shipping' && t('admin.shippingList')}
            </h2>

            <div className="space-y-4">
              {getOrdersByStatus(activeTab).map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                    selectedOrder?.id === order.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-slate-700 bg-slate-700/30 hover:border-slate-600'
                  }`}
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="font-bold text-white">{order.id}</span>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(order.status)}`}>
                        {t(`admin.${order.status}`)}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-400">{order.customerName}</p>
                      <p className="text-lg font-bold text-emerald-400">
                        {formatCurrency(order.totalAmount, currentLanguage)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-400">{t('admin.supplier')}</p>
                      <p className="text-white">{order.supplier}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">{t('admin.quantity')}</p>
                      <p className="text-white">{order.items.length} {t('admin.items')}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="lg:col-span-1">
          {selectedOrder ? (
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">{t('admin.orderDetails')}</h3>
              
              {/* Customer Info */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-slate-400 mb-2">{t('admin.customerDetails')}</h4>
                <div className="space-y-1 text-sm">
                  <p className="text-white">{selectedOrder.customerName}</p>
                  <p className="text-slate-400">{selectedOrder.customerEmail}</p>
                  <p className="text-slate-400">{selectedOrder.shippingAddress}</p>
                </div>
              </div>

              {/* Items */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-slate-400 mb-3">{t('admin.items')}</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white text-sm">{item.productName}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                          {t(`admin.${item.status}`)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-slate-400">{t('admin.sku')}</p>
                          <p className="text-white">{item.sku}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">{t('admin.quantity')}</p>
                          <p className="text-white">{item.quantity}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">{t('admin.currentStock')}</p>
                          <p className={`${getStockColor(item.currentStock, item.quantity)} px-2 py-1 rounded text-xs`}>
                            {item.currentStock}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-400">{t('admin.price')}</p>
                          <p className="text-white">{formatCurrency(item.price, currentLanguage)}</p>
                        </div>
                      </div>
                      {item.isFragile && (
                        <div className="mt-2 flex items-center space-x-1 text-yellow-400 text-xs">
                          <img src="/svg/alert-triangle.svg" alt="Fragile" className="w-4 h-4" />
                          <span>{t('admin.fragileWarning')}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                {activeTab === 'picking' && (
                  <>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder={t('admin.scanBarcode')}
                        value={scannedBarcode}
                        onChange={(e) => setScannedBarcode(e.target.value)}
                        className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                      />
                      <button
                        onClick={() => handleBarcodeScan(scannedBarcode)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        <img src="/svg/barcode.svg" alt="Scan" className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        selectedOrder.items.forEach(item => {
                          if (item.status === 'pending' && item.currentStock >= item.quantity) {
                            updateItemStatus(selectedOrder.id, item.id, 'picked', item.quantity);
                          }
                        });
                      }}
                      className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <img src="/svg/check-circle.svg" alt="Mark as Picked" className="w-4 h-4" />
                      <span>{t('admin.markAsPicked')}</span>
                    </button>
                  </>
                )}

                {activeTab === 'packing' && (
                  <>
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-slate-400 mb-2">{t('admin.packingMaterials')}</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {packingMaterials.map((material) => (
                          <button
                            key={material.id}
                            onClick={() => setSelectedMaterial(material)}
                            className={`p-2 rounded-lg text-xs transition-colors ${
                              selectedMaterial?.id === material.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                            }`}
                          >
                            {t(`admin.${material.type}`)}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        selectedOrder.items.forEach(item => {
                          if (item.status === 'picked') {
                            updateItemStatus(selectedOrder.id, item.id, 'packed', item.quantity);
                          }
                        });
                      }}
                      className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <img src="/svg/package.svg" alt="Mark as Packed" className="w-4 h-4" />
                      <span>{t('admin.markAsPacked')}</span>
                    </button>
                  </>
                )}

                {activeTab === 'shipping' && (
                  <button
                    onClick={() => {
                      selectedOrder.items.forEach(item => {
                        if (item.status === 'packed') {
                          updateItemStatus(selectedOrder.id, item.id, 'shipped', item.quantity);
                        }
                      });
                    }}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <img src="/svg/shipping.svg" alt="Mark as Shipped" className="w-4 h-4" />
                    <span>{t('admin.markAsShipped')}</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <img src="/svg/package.svg" alt="No Order Selected" className="w-16 h-16 opacity-60" />
              </div>
              <p className="text-slate-400">{t('admin.selectOrderToView')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Order History */}
      {orderHistory.length > 0 && (
        <div className="mt-8 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">{t('admin.orderHistory')}</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {orderHistory.slice(0, 10).map((log) => (
              <div key={log.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div>
                  <p className="text-white text-sm">{log.action}</p>
                  <p className="text-slate-400 text-xs">{log.operatorName} • {log.orderId}</p>
                </div>
                <p className="text-slate-400 text-xs">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
