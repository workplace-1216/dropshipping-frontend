'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { PageLoader } from '@/components/ui/PageLoader';
import { Header } from '@/components/layout/Header';
import AlertModal, { useAlertModal } from '@/components/ui/AlertModal';
import { apiClient } from '@/lib/api';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  FileText,
  Calendar,
  DollarSign,
  Package,
  TrendingUp,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock,
  XCircle
} from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  country?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  city?: string;
  taxId?: string;
  website?: string;
  status: string;
  isActive: boolean;
  productCount: number;
  activeOrders: number;
  revenue: number;
  createdAt: string;
  updatedAt: string;
}

export default function SupplierViewPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const { t } = useLanguage();
  const { alertState, showSuccess, showError, closeAlert } = useAlertModal();
  
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [loadingSupplier, setLoadingSupplier] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (params.id && isAuthenticated) {
      fetchSupplier();
    }
  }, [params.id, isAuthenticated]);

  const fetchSupplier = async () => {
    try {
      setLoadingSupplier(true);
      const response = await apiClient.get<Supplier>(`/suppliers/${params.id}`);
      setSupplier(response);
    } catch (error) {
      console.error('Error fetching supplier:', error);
      showError('Error Loading Supplier', 'Failed to load supplier details. Please try again.');
    } finally {
      setLoadingSupplier(false);
    }
  };

  const handleDelete = async () => {
    if (!supplier) return;

    try {
      await apiClient.delete(`/suppliers/${supplier.id}`);
      showSuccess('Supplier Deleted', `${supplier.name} has been successfully deleted.`);
      router.push('/admin');
    } catch (error) {
      console.error('Error deleting supplier:', error);
      showError('Delete Failed', 'Failed to delete supplier. Please try again.');
    } finally {
      setShowDeleteModal(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'PENDING':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'SUSPENDED':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'INACTIVE':
        return <AlertCircle className="w-5 h-5 text-slate-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-slate-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'PENDING':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'SUSPENDED':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'INACTIVE':
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  if (loading || loadingSupplier) {
    return <PageLoader />;
  }

  if (!supplier) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <Header title="Supplier Not Found" />
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-12 h-12 text-red-500" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">Supplier Not Found</h1>
              <p className="text-slate-400 mb-8">The supplier you're looking for doesn't exist or has been removed.</p>
              <button
                onClick={() => router.push('/admin')}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2 mx-auto"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Header title={`${supplier.name} - Supplier Details`} />
        
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.push('/admin')}
            className="mb-6 flex items-center space-x-2 text-slate-400 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </motion.button>

          {/* Supplier Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 mb-8 border border-slate-700/50 shadow-2xl"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center space-x-6 mb-6 lg:mb-0">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-2xl">{supplier.name[0]}</span>
                  </div>
                  <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-2 border-slate-800 ${
                    supplier.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-red-500'
                  }`}></div>
                </div>
                
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{supplier.name}</h1>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1.5 rounded-xl text-sm font-bold uppercase tracking-wide backdrop-blur-sm border ${getStatusColor(supplier.status)}`}>
                      {supplier.status}
                    </span>
                    <span className="text-slate-400 text-sm">
                      Joined {new Date(supplier.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push(`/admin/suppliers/${supplier.id}/edit`)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <Edit className="w-5 h-5" />
                  <span>Edit Supplier</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDeleteModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Delete</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 shadow-xl"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Total Products</p>
                  <p className="text-2xl font-bold text-white">{supplier.productCount}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 shadow-xl"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Active Orders</p>
                  <p className="text-2xl font-bold text-white">{supplier.activeOrders}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 shadow-xl"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold text-white">${supplier.revenue.toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 shadow-xl"
            >
              <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <Building2 className="w-6 h-6 text-blue-400" />
                <span>Contact Information</span>
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-slate-400 text-sm">Email</p>
                    <p className="text-white">{supplier.email}</p>
                  </div>
                </div>
                
                {supplier.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-slate-400 text-sm">Phone</p>
                      <p className="text-white">{supplier.phone}</p>
                    </div>
                  </div>
                )}
                
                {supplier.contactName && (
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-slate-400 text-sm">Contact Person</p>
                      <p className="text-white">{supplier.contactName}</p>
                    </div>
                  </div>
                )}
                
                {supplier.website && (
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-slate-400 text-sm">Website</p>
                      <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                        {supplier.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Address Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 shadow-xl"
            >
              <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <MapPin className="w-6 h-6 text-purple-400" />
                <span>Address Information</span>
              </h2>
              
              <div className="space-y-4">
                {supplier.address && (
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Address</p>
                    <p className="text-white">{supplier.address}</p>
                  </div>
                )}
                
                {supplier.city && (
                  <div>
                    <p className="text-slate-400 text-sm mb-1">City</p>
                    <p className="text-white">{supplier.city}</p>
                  </div>
                )}
                
                {supplier.country && (
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Country</p>
                    <p className="text-white">{supplier.country}</p>
                  </div>
                )}
                
                {supplier.taxId && (
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Tax ID</p>
                    <p className="text-white font-mono">{supplier.taxId}</p>
                  </div>
                )}
                
                <div className="flex items-center space-x-3 pt-4 border-t border-slate-700/50">
                  <Calendar className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-slate-400 text-sm">Last Updated</p>
                    <p className="text-white">{new Date(supplier.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full mx-4 border border-slate-700/50 shadow-2xl"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trash2 className="w-8 h-8 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4">Delete Supplier</h2>
                <p className="text-slate-300 mb-6">
                  Are you sure you want to delete <span className="font-semibold text-white">{supplier.name}</span>? 
                  This action cannot be undone and will permanently remove all supplier data.
                </p>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-6 py-3 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-all duration-200 border border-slate-600/50 hover:border-slate-500/50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <Trash2 className="w-5 h-5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Alert Modal */}
        <AlertModal
          isOpen={alertState.isOpen}
          type={alertState.type}
          title={alertState.title}
          message={alertState.message}
          confirmText={alertState.confirmText}
          onClose={closeAlert}
        />
      </div>
    </ProtectedRoute>
  );
}
