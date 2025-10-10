'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { PageLoader } from '@/components/ui/PageLoader';
import { apiClient } from '@/lib/api';
import { Header } from '@/components/layout/Header';
import AlertModal, { useAlertModal } from '@/components/ui/AlertModal';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  MapPin, 
  Building2,
  Eye
} from 'lucide-react';

interface PendingSupplier {
  id: string;
  name: string;
  email: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  taxId: string;
  website: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function PendingSuppliersPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const { alertState, showSuccess, showError, closeAlert } = useAlertModal();
  
  const [pendingSuppliers, setPendingSuppliers] = useState<PendingSupplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSupplier, setSelectedSupplier] = useState<PendingSupplier | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [processing, setProcessing] = useState<string | null>(null);

  const fetchPendingSuppliers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.get<{ suppliers: PendingSupplier[] }>('/suppliers');
      const allSuppliers = response.suppliers || [];
      const pending = allSuppliers.filter((supplier: PendingSupplier) => supplier.status === 'PENDING');
      setPendingSuppliers(pending);
    } catch (error) {
      console.error('Error fetching pending suppliers:', error);
      showError('Error', 'Failed to fetch pending suppliers');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const handleApproveSupplier = async (supplier: PendingSupplier) => {
    setProcessing(supplier.id);
    try {
      await apiClient.post('/notifications/approve-supplier', {
        supplierId: supplier.id,
        supplierData: supplier,
      });
      
      showSuccess('Supplier Approved', `${supplier.name} has been approved and can now access the platform.`);
      
      // Refresh the list
      await fetchPendingSuppliers();
      setShowDetailsModal(false);
    } catch (error) {
      console.error('Error approving supplier:', error);
      showError('Approval Failed', 'Failed to approve the supplier. Please try again.');
    } finally {
      setProcessing(null);
    }
  };

  const handleRejectSupplier = async (supplier: PendingSupplier) => {
    setProcessing(supplier.id);
    try {
      await apiClient.post('/notifications/reject-supplier', {
        supplierId: supplier.id,
        supplierData: supplier,
      });
      
      showSuccess('Supplier Rejected', `${supplier.name} has been rejected.`);
      
      // Refresh the list
      await fetchPendingSuppliers();
      setShowDetailsModal(false);
    } catch (error) {
      console.error('Error rejecting supplier:', error);
      showError('Rejection Failed', 'Failed to reject the supplier. Please try again.');
    } finally {
      setProcessing(null);
    }
  };

  const openDetailsModal = (supplier: PendingSupplier) => {
    setSelectedSupplier(supplier);
    setShowDetailsModal(true);
  };

  useEffect(() => {
    if (isAuthenticated && user?.role === 'ADMIN') {
      fetchPendingSuppliers();
    }
  }, [isAuthenticated, user, fetchPendingSuppliers]);

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading || loading) {
    return <PageLoader isLoading={true} message="Loading pending suppliers..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-30">
        <Header 
          title="Pending Supplier Approvals"
          onMenuClick={() => router.push('/admin')}
          showMenu={true}
        />
      </div>

      <div className="pt-16 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.push('/admin')}
            className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-2">Pending Supplier Approvals</h1>
            <p className="text-slate-400">
              Review and approve {pendingSuppliers.length} supplier{pendingSuppliers.length !== 1 ? 's' : ''} waiting for approval
            </p>
          </motion.div>

          {/* Suppliers List */}
          <div className="grid gap-6">
            {pendingSuppliers.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Pending Approvals</h3>
                <p className="text-slate-400">All suppliers have been reviewed and approved.</p>
              </motion.div>
            ) : (
              pendingSuppliers.map((supplier, index) => (
                <motion.div
                  key={supplier.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{supplier.name}</h3>
                        <p className="text-slate-400">{supplier.contactName}</p>
                        <p className="text-sm text-slate-500">{supplier.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => openDetailsModal(supplier)}
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center space-x-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                      
                      <button
                        onClick={() => handleApproveSupplier(supplier)}
                        disabled={processing === supplier.id}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 text-white rounded-lg transition-colors flex items-center space-x-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>{processing === supplier.id ? 'Processing...' : 'Approve'}</span>
                      </button>
                      
                      <button
                        onClick={() => handleRejectSupplier(supplier)}
                        disabled={processing === supplier.id}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white rounded-lg transition-colors flex items-center space-x-2"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>{processing === supplier.id ? 'Processing...' : 'Reject'}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedSupplier && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDetailsModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Supplier Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Company Information */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                    <Building2 className="w-5 h-5 text-blue-400" />
                    <span>Company Information</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-400">Company Name</label>
                      <p className="text-white font-medium">{selectedSupplier.name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-slate-400">Contact Person</label>
                      <p className="text-white font-medium">{selectedSupplier.contactName}</p>
                    </div>
                    <div>
                      <label className="text-sm text-slate-400">Tax ID</label>
                      <p className="text-white font-medium">{selectedSupplier.taxId || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-slate-400">Website</label>
                      <p className="text-white font-medium">{selectedSupplier.website || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                    <User className="w-5 h-5 text-green-400" />
                    <span>Contact Information</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-400">Email</label>
                      <p className="text-white font-medium">{selectedSupplier.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-slate-400">Phone</label>
                      <p className="text-white font-medium">{selectedSupplier.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-slate-400">Contact Email</label>
                      <p className="text-white font-medium">{selectedSupplier.contactEmail}</p>
                    </div>
                    <div>
                      <label className="text-sm text-slate-400">Contact Phone</label>
                      <p className="text-white font-medium">{selectedSupplier.contactPhone || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <span>Address Information</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-400">Address</label>
                      <p className="text-white font-medium">{selectedSupplier.address || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-slate-400">City</label>
                      <p className="text-white font-medium">{selectedSupplier.city || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-slate-400">Country</label>
                      <p className="text-white font-medium">{selectedSupplier.country || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Registration Date */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-yellow-400" />
                    <span>Registration Information</span>
                  </h3>
                  <div>
                    <label className="text-sm text-slate-400">Registration Date</label>
                    <p className="text-white font-medium">
                      {new Date(selectedSupplier.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-slate-700">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => handleRejectSupplier(selectedSupplier)}
                  disabled={processing === selectedSupplier.id}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white rounded-lg transition-colors flex items-center space-x-2"
                >
                  <XCircle className="w-4 h-4" />
                  <span>{processing === selectedSupplier.id ? 'Processing...' : 'Reject'}</span>
                </button>
                <button
                  onClick={() => handleApproveSupplier(selectedSupplier)}
                  disabled={processing === selectedSupplier.id}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 text-white rounded-lg transition-colors flex items-center space-x-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{processing === selectedSupplier.id ? 'Processing...' : 'Approve'}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alert Modal */}
      <AlertModal
        isOpen={alertState.isOpen}
        type={alertState.type}
        title={alertState.title}
        message={alertState.message}
        onClose={closeAlert}
      />
    </div>
  );
}
