'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Package, DollarSign, ShoppingBag, TrendingUp, Plus, Settings, LogOut, Search } from 'lucide-react';

export default function SellerDashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <ProtectedRoute requiredRole="SELLER">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.firstName}!</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 bg-green-100 px-3 py-1 rounded-full">
                  {user?.role}
                </span>
                <Button variant="outline" size="sm" onClick={() => router.push('/seller/settings')}>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Products Listed</p>
                    <p className="text-3xl font-bold text-gray-900">0</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-3xl font-bold text-gray-900">$0</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Orders</p>
                    <p className="text-3xl font-bold text-gray-900">0</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <ShoppingBag className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                    <p className="text-3xl font-bold text-gray-900">0%</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your selling business</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => router.push('/seller/products/browse')}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Browse Products to Sell
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => router.push('/seller/products')}
                  >
                    <Package className="w-4 h-4 mr-2" />
                    My Listed Products
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => router.push('/seller/orders')}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    View Orders
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => router.push('/seller/analytics')}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>Begin your selling journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-sm font-semibold">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Complete your profile</p>
                      <p className="text-sm text-gray-600">Add your store information and payment details</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-sm font-semibold">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Browse supplier catalog</p>
                      <p className="text-sm text-gray-600">Find products to add to your store</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 text-sm font-semibold">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Start selling</p>
                      <p className="text-sm text-gray-600">List products and start receiving orders</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your latest customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>No orders yet</p>
                <p className="text-sm mt-2">Orders will appear here once customers start buying</p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  );
}
