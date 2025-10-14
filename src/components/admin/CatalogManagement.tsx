/**
 * @fileoverview Catalog Management Component
 * Complete product catalog management with CRUD operations, bulk actions, and inventory tracking
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatCurrency } from '@/lib/utils';
import { 
  Search,
  Plus,
  Edit,
  Trash2,
  Package,
  AlertTriangle,
  CheckCircle,
  X,
  Image as ImageIcon,
  Star,
  Grid,
  List
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  status: 'active' | 'inactive' | 'draft' | 'archived';
  images: string[];
  description: string;
  tags: string[];
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  createdAt: string;
  updatedAt: string;
  sales: number;
  revenue: string;
  rating: number;
  reviews: number;
  marketplace: string[];
}

interface Category {
  id: string;
  name: string;
  description: string;
  parentId?: string;
  productCount: number;
  isActive: boolean;
}

export const CatalogManagement: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  
  // State management
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cleanup effect to restore scrolling when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Sample data
  useEffect(() => {
    setProducts([
      {
        id: '1',
        name: 'Wireless Bluetooth Headphones',
        sku: 'WBH-001',
        category: 'Electronics',
        price: 99.99,
        cost: 45.00,
        stock: 150,
        minStock: 20,
        status: 'active',
        images: ['/images/headphones-1.jpg', '/images/headphones-2.jpg'],
        description: 'High-quality wireless Bluetooth headphones with noise cancellation',
        tags: ['wireless', 'bluetooth', 'noise-cancellation', 'electronics'],
        weight: 0.3,
        dimensions: { length: 20, width: 18, height: 8 },
        createdAt: '2024-01-15',
        updatedAt: '2024-01-20',
        sales: 1250,
        revenue: '$124,987.50',
        rating: 4.5,
        reviews: 342,
        marketplace: ['Shopee', 'Amazon', 'Mercado Livre']
      },
      {
        id: '2',
        name: 'Smart Fitness Watch',
        sku: 'SFW-002',
        category: 'Wearables',
        price: 199.99,
        cost: 120.00,
        stock: 75,
        minStock: 15,
        status: 'active',
        images: ['/images/watch-1.jpg'],
        description: 'Advanced fitness tracking smartwatch with heart rate monitoring',
        tags: ['fitness', 'smartwatch', 'health', 'tracking'],
        weight: 0.05,
        dimensions: { length: 4, width: 4, height: 1.2 },
        createdAt: '2024-01-10',
        updatedAt: '2024-01-18',
        sales: 890,
        revenue: '$177,911.10',
        rating: 4.7,
        reviews: 156,
        marketplace: ['TikTok Shop', 'Amazon']
      },
      {
        id: '3',
        name: 'Organic Cotton T-Shirt',
        sku: 'OCT-003',
        category: 'Clothing',
        price: 29.99,
        cost: 12.00,
        stock: 5,
        minStock: 50,
        status: 'active',
        images: ['/images/tshirt-1.jpg', '/images/tshirt-2.jpg'],
        description: 'Comfortable organic cotton t-shirt in various colors',
        tags: ['organic', 'cotton', 'clothing', 'sustainable'],
        weight: 0.2,
        dimensions: { length: 30, width: 25, height: 1 },
        createdAt: '2024-01-05',
        updatedAt: '2024-01-22',
        sales: 2100,
        revenue: '$62,979.00',
        rating: 4.3,
        reviews: 89,
        marketplace: ['Shopee', 'Mercado Livre', 'Kwai Shop']
      },
      {
        id: '4',
        name: 'Portable Phone Charger',
        sku: 'PPC-004',
        category: 'Accessories',
        price: 49.99,
        cost: 25.00,
        stock: 0,
        minStock: 30,
        status: 'inactive',
        images: ['/images/charger-1.jpg'],
        description: 'High-capacity portable phone charger with fast charging',
        tags: ['charger', 'portable', 'phone', 'battery'],
        weight: 0.4,
        dimensions: { length: 12, width: 6, height: 2 },
        createdAt: '2024-01-12',
        updatedAt: '2024-01-25',
        sales: 650,
        revenue: '$32,493.50',
        rating: 4.1,
        reviews: 203,
        marketplace: ['Amazon', 'TikTok Shop']
      }
    ]);

    setCategories([
      { id: '1', name: 'Electronics', description: 'Electronic devices and gadgets', productCount: 45, isActive: true },
      { id: '2', name: 'Wearables', description: 'Smart watches and fitness trackers', productCount: 23, isActive: true },
      { id: '3', name: 'Clothing', description: 'Apparel and fashion items', productCount: 156, isActive: true },
      { id: '4', name: 'Accessories', description: 'Phone accessories and peripherals', productCount: 78, isActive: true },
      { id: '5', name: 'Home & Garden', description: 'Home improvement and garden tools', productCount: 34, isActive: true }
    ]);
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    })
     .sort((a, b) => {
       let aValue: string | number = a[sortBy as keyof Product] as string | number;
       let bValue: string | number = b[sortBy as keyof Product] as string | number;
      
      if (sortBy === 'price' || sortBy === 'cost' || sortBy === 'stock') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Handle product selection
  const handleProductSelect = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };


  // Handle bulk actions
  const handleBulkDelete = () => {
    setProducts(prev => prev.filter(p => !selectedProducts.includes(p.id)));
    setSelectedProducts([]);
  };

  const handleBulkStatusChange = (status: string) => {
    setProducts(prev => prev.map(p => 
      selectedProducts.includes(p.id) ? { ...p, status: status as Product['status'] } : p
    ));
    setSelectedProducts([]);
  };

  // Handle product actions
  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditingProduct(true);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsAddingProduct(false);
    setIsEditingProduct(false);
    setSelectedProduct(null);
    // Restore body scrolling when modal is closed
    document.body.style.overflow = 'unset';
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'inactive': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      case 'draft': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'archived': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  // Get stock status
  const getStockStatus = (stock: number, minStock: number) => {
    if (stock === 0) return { color: 'text-red-400', icon: AlertTriangle, text: t('admin.outOfStock') };
    if (stock <= minStock) return { color: 'text-yellow-400', icon: AlertTriangle, text: t('admin.lowStock') };
    return { color: 'text-emerald-400', icon: CheckCircle, text: t('admin.inStock') };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            {t('admin.catalogManagement')}
          </h2>
          <p className="text-slate-400 mt-2 text-lg">
            {t('admin.manageProducts')} {t('admin.andInventory')}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
          </button>
           <button
             onClick={() => {
               setIsAddingProduct(true);
               // Prevent body scrolling when modal is open
               document.body.style.overflow = 'hidden';
             }}
             className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
           >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">{t('admin.addProduct')}</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('admin.searchProducts')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">{t('admin.allCategories')}</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">{t('admin.allStatuses')}</option>
              <option value="active">{t('admin.active')}</option>
              <option value="inactive">{t('admin.inactive')}</option>
              <option value="draft">{t('admin.draft')}</option>
              <option value="archived">{t('admin.archived')}</option>
            </select>

            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field);
                setSortOrder(order as 'asc' | 'desc');
              }}
              className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500"
            >
              <option value="name-asc">{t('admin.nameAsc')}</option>
              <option value="name-desc">{t('admin.nameDesc')}</option>
              <option value="price-asc">{t('admin.priceAsc')}</option>
              <option value="price-desc">{t('admin.priceDesc')}</option>
              <option value="stock-asc">{t('admin.stockAsc')}</option>
              <option value="stock-desc">{t('admin.stockDesc')}</option>
              <option value="createdAt-desc">{t('admin.newestFirst')}</option>
              <option value="createdAt-asc">{t('admin.oldestFirst')}</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-blue-300 font-medium">
                {selectedProducts.length} {t('admin.productsSelected')}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleBulkStatusChange('active')}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm transition-colors"
                >
                  {t('admin.activate')}
                </button>
                <button
                  onClick={() => handleBulkStatusChange('inactive')}
                  className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
                >
                  {t('admin.deactivate')}
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
                >
                  {t('admin.delete')}
                </button>
                <button
                  onClick={() => setSelectedProducts([])}
                  className="px-3 py-1 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-sm transition-colors"
                >
                  {t('admin.cancel')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Products Grid/List */}
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        : "space-y-4"
      }>
        {filteredProducts.map((product, index) => {
          const stockStatus = getStockStatus(product.stock, product.minStock);
          const StockIcon = stockStatus.icon;

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`group bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ${
                viewMode === 'list' ? 'p-6' : 'p-4'
              }`}
            >
              {viewMode === 'grid' ? (
                // Grid View
                <>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleProductSelect(product.id)}
                      className="absolute top-2 left-2 w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 z-10"
                    />
                    <div className="w-full h-48 bg-slate-700/30 rounded-xl mb-4 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-slate-500" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(product.status)}`}>
                        {t(`admin.${product.status}`)}
                      </span>
                      <div className="flex items-center space-x-1 text-slate-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm">{product.rating}</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-slate-400 text-sm mb-3">SKU: {product.sku}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">{t('admin.price')}</span>
                      <span className="font-bold text-emerald-400">
                        {formatCurrency(product.price, currentLanguage)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">{t('admin.stock')}</span>
                      <div className="flex items-center space-x-1">
                        <StockIcon className={`w-4 h-4 ${stockStatus.color}`} />
                        <span className={`font-medium ${stockStatus.color}`}>{product.stock}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">{t('admin.sales')}</span>
                      <span className="font-medium text-white">{product.sales}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="flex-1 py-2 text-sm font-semibold bg-slate-700/50 hover:bg-slate-700 text-white rounded-xl transition-all duration-200 border border-slate-600/50 hover:border-blue-500/50 flex items-center justify-center space-x-2"
                    >
                      <Edit className="w-4 h-4" />
                      <span>{t('admin.edit')}</span>
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="px-3 py-2 text-sm font-semibold bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-xl transition-all duration-200 border border-red-500/30 hover:border-red-500/50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                // List View
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleProductSelect(product.id)}
                    className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                  />
                  
                  <div className="w-16 h-16 bg-slate-700/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ImageIcon className="w-8 h-8 text-slate-500" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-lg font-bold text-white truncate">{product.name}</h3>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(product.status)}`}>
                        {t(`admin.${product.status}`)}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mb-2">SKU: {product.sku} • {product.category}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-slate-400">
                        {t('admin.price')}: <span className="text-emerald-400 font-medium">{formatCurrency(product.price, currentLanguage)}</span>
                      </span>
                      <span className="text-slate-400">
                        {t('admin.stock')}: <span className={`font-medium ${stockStatus.color}`}>{product.stock}</span>
                      </span>
                      <span className="text-slate-400">
                        {t('admin.sales')}: <span className="text-white font-medium">{product.sales}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="p-2 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-slate-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-300 mb-2">{t('admin.noProductsFound')}</h3>
          <p className="text-slate-500 mb-6">{t('admin.tryAdjustingFilters')}</p>
           <button
             onClick={() => {
               setIsAddingProduct(true);
               // Prevent body scrolling when modal is open
               document.body.style.overflow = 'hidden';
             }}
             className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
           >
            {t('admin.addFirstProduct')}
          </button>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      <AnimatePresence>
        {(isAddingProduct || isEditingProduct) && (
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
                  {isAddingProduct ? t('admin.addProduct') : t('admin.editProduct')}
                </h3>
                 <button
                   onClick={handleCloseModal}
                   className="p-2 text-slate-400 hover:text-white transition-colors"
                 >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Information */}
                <div className="p-4 bg-slate-700/30 rounded-xl">
                  <h4 className="text-lg font-semibold text-white mb-4">{t('admin.basicInformation')}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        {t('admin.productName')}
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedProduct?.name || ''}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        placeholder={t('admin.enterProductName')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        {t('admin.sku')}
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedProduct?.sku || ''}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        placeholder={t('admin.enterSku')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        {t('admin.category')}
                      </label>
                      <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500">
                        <option value="">{t('admin.selectCategory')}</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.name}>{category.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        {t('admin.status')}
                      </label>
                      <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500">
                        <option value="active">{t('admin.active')}</option>
                        <option value="inactive">{t('admin.inactive')}</option>
                        <option value="draft">{t('admin.draft')}</option>
                        <option value="archived">{t('admin.archived')}</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="p-4 bg-slate-700/30 rounded-xl">
                  <h4 className="text-lg font-semibold text-white mb-4">{t('admin.pricing')}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        {t('admin.sellingPrice')}
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        defaultValue={selectedProduct?.price || ''}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        {t('admin.costPrice')}
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        defaultValue={selectedProduct?.cost || ''}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                {/* Inventory */}
                <div className="p-4 bg-slate-700/30 rounded-xl">
                  <h4 className="text-lg font-semibold text-white mb-4">{t('admin.inventory')}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        {t('admin.currentStock')}
                      </label>
                      <input
                        type="number"
                        defaultValue={selectedProduct?.stock || ''}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        {t('admin.minimumStock')}
                      </label>
                      <input
                        type="number"
                        defaultValue={selectedProduct?.minStock || ''}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="p-4 bg-slate-700/30 rounded-xl">
                  <h4 className="text-lg font-semibold text-white mb-4">{t('admin.description')}</h4>
                  <textarea
                    rows={4}
                    defaultValue={selectedProduct?.description || ''}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder={t('admin.enterProductDescription')}
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                 <button
                   onClick={handleCloseModal}
                   className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                 >
                  {isAddingProduct ? t('admin.addProduct') : t('admin.saveChanges')}
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
    </div>
  );
};
