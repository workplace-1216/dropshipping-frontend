'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToastHelpers } from '@/components/ui/Toast';
import AlertModal, { useAlertModal } from '@/components/ui/AlertModal';
import { getAuthRedirectUrl } from '@/lib/redirect';
import { googleAuth } from '@/lib/google-auth';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { motion } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  AlertCircle,
  Package,
  Building2,
  Phone,
  MapPin,
  Globe,
  FileText,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';

const supplierRegisterSchema = z.object({
  // Authentication
  email: z.string().email('Please enter a valid email address').refine(
    (email) => email.includes('@supplier') || email.includes('@company'),
    'Supplier email must contain @supplier or @company domain'
  ),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),

  // Company Information
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  contactName: z.string().min(2, 'Contact name must be at least 2 characters'),

  // Contact Information
  phone: z.string().min(10, 'Please enter a valid phone number'),

  // Address Information
  address: z.string().min(5, 'Please enter a complete address'),
  city: z.string().min(2, 'Please enter a valid city'),
  country: z.string().min(2, 'Please enter a valid country'),

  // Additional Information
  taxId: z.string().min(5, 'Please enter a valid tax ID').optional().or(z.literal('')),
  website: z.string().url('Please enter a valid website URL').optional().or(z.literal('')),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SupplierRegisterFormData = z.infer<typeof supplierRegisterSchema>;

export default function SupplierRegisterPage() {
  const router = useRouter();
  const { register: registerUser, user } = useAuth();
  const { t } = useLanguage();
  const toast = useToastHelpers();
  const { alertState, showSuccess, showError, closeAlert } = useAlertModal();
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SupplierRegisterFormData>({
    resolver: zodResolver(supplierRegisterSchema),
  });

  const onSubmit = async (data: SupplierRegisterFormData) => {
    try {
      setError('');
      setIsSubmitting(true);
      console.log('Starting supplier registration with data:', { ...data, password: '***', confirmPassword: '***' });

      const { confirmPassword, ...registerData } = data;

      // Add supplier role to registration data
      const supplierData = {
        ...registerData,
        role: 'SUPPLIER' as const
      };

      console.log('Calling registerUser with supplier data...');
      await registerUser(supplierData);

      console.log('Supplier registration successful!');

      // Show success alarm modal
      showSuccess(
        'Supplier Account Created Successfully!',
        `Your supplier account has been created and is pending admin approval. You will be notified once approved. Please wait for admin approval before accessing your supplier dashboard.`
      );
    } catch (err: unknown) {
      setIsSubmitting(false);
      console.error('Supplier registration error:', err);
      const errorResponse = (err as { response?: { data?: unknown } })?.response?.data;
      console.error('Error response:', errorResponse);

      const errorMessage = (err as { response?: { data?: { message?: string } }, message?: string })?.response?.data?.message ||
        (err as { message?: string })?.message || 'Supplier registration failed. Please try again.';
      setError(errorMessage);

      // Show error alarm modal
      showError(
        'Supplier Registration Failed',
        errorMessage
      );
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');

      // Show loading toast
      toast.info('Signing up with Google...', 'Please complete the Google authentication');

      const googleResponse = await googleAuth.signIn();

      // Send Google credential to backend with supplier role
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credential: googleResponse.access_token,
          role: 'SUPPLIER'
        }),
      });

      if (!response.ok) {
        throw new Error('Google authentication failed');
      }

      const authData = await response.json();

      // Store the auth data in context
      localStorage.setItem('access_token', authData.access_token);
      localStorage.setItem('user', JSON.stringify(authData.user));

      // Show success toast
      toast.success(
        'Welcome!',
        `Successfully signed up as a supplier with Google. Redirecting to your dashboard...`
      );

      // Redirect to appropriate dashboard
      setTimeout(() => {
        const redirectUrl = getAuthRedirectUrl(authData.user);
        console.log('Redirecting to:', redirectUrl);
        router.push(redirectUrl);
      }, 1000);

    } catch (err: unknown) {
      setIsSubmitting(false);
      console.error('Google Supplier Sign-Up error:', err);
      const errorMessage = (err as { message?: string })?.message || 'Google authentication failed';
      setError(errorMessage);

      showError(
        'Google Supplier Sign-Up Failed',
        errorMessage
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center p-4">
      {/* Language Switcher */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="absolute top-6 right-6 z-10"
      >
        <LanguageSwitcher />
      </motion.div>

      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-500/20 to-green-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-green-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-800/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-[95vh] lg:max-h-[900px]">
            {/* Left Side - Branding (Hidden on Mobile) */}
            <div className="hidden lg:flex p-8 lg:p-12 flex-col justify-center relative overflow-hidden">
              {/* Background Image - Bottom Layer */}
              <img
                src="/image/supplier-register.png"
                alt="Supplier Register"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Gradient Overlay - Middle Layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-green-900/70 to-teal-950/90"></div>

              {/* Background Decorative Elements */}
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
              </div>

              {/* Content - Top Layer */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative z-10 text-center flex flex-col justify-center h-full"
              >
                {/* Logo and Sign Up Section - Centered */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mb-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm mx-auto cursor-pointer hover:scale-105 transition-transform duration-200"
                    onClick={() => router.push('/')}
                  >
                    <Package className="w-8 h-8 text-white" />
                  </motion.div>

                  <h2 className="text-3xl font-bold mb-3 text-white">
                    Join as Supplier
                  </h2>
                  <p className="text-lg text-white/90 leading-relaxed">
                    Start your dropshipping supplier journey today
                  </p>
                </motion.div>

                {/* Welcome Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mb-8"
                >
                  <p className="text-lg text-white/90 leading-relaxed">
                    Become a trusted supplier and grow your business with our platform
                  </p>
                </motion.div>

                {/* Features */}
                <div className="relative flex justify-center">
                  {/* Red vertical line */}

                  <div className="space-y-4 pl-10 w-full max-w-sm">
                    {[
                      'Manage your product catalog',
                      'Track orders in real-time',
                      'Automated inventory sync',
                      'Secure payment processing',
                      'Analytics and reporting',
                      '24/7 customer support'
                    ].map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                        className="flex items-center space-x-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-white text-sm font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Form (Full Width on Mobile) */}
            <div className="p-4 sm:p-6 lg:p-8 xl:p-12 flex flex-col justify-center overflow-y-hidden">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full"
              >
                {/* Back Button */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  onClick={() => router.push('/register')}
                  className="mb-4 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">Back to Registration</span>
                </motion.button>

                {/* Header */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Supplier Registration
                  </h2>
                  <p className="text-base text-gray-300">
                    Create your supplier account and start selling
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                  {/* Authentication Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                      <Mail className="w-5 h-5 text-emerald-400" />
                      <span>Account Authentication</span>
                    </h3>

                    {/* Email */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          {...register('email')}
                          type="email"
                          placeholder="supplier@example.com"
                          className={`w-full pl-9 pr-9 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 ${errors.email ? 'border-red-500' : ''
                            }`}
                        />
                        {errors.email && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                            <AlertCircle className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-emerald-400 mt-1">Must contain @supplier or @company domain</p>
                    </motion.div>

                    {/* Password Fields */}
                    <div className="grid grid-cols-2 gap-3">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Password *
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            {...register('password')}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter password"
                            className={`w-full pl-9 pr-9 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 ${errors.password ? 'border-red-500' : ''
                              }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 cursor-pointer"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          {errors.password && (
                            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 text-red-500">
                              <AlertCircle className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                      >
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Confirm Password *
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            {...register('confirmPassword')}
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm password"
                            className={`w-full pl-9 pr-9 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 ${errors.confirmPassword ? 'border-red-500' : ''
                              }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 cursor-pointer"
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          {errors.confirmPassword && (
                            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 text-red-500">
                              <AlertCircle className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Company Information Section */}
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-white flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-emerald-400" />
                      <span>Company Information</span>
                    </h3>

                    {/* Company Name and Contact Name */}
                    <div className="grid grid-cols-2 gap-3">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Company Name *
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            {...register('companyName')}
                            placeholder="Enter company name"
                            className={`w-full pl-9 pr-9 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 ${errors.companyName ? 'border-red-500' : ''
                              }`}
                          />
                          {errors.companyName && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                              <AlertCircle className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                      >
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Contact Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            {...register('contactName')}
                            placeholder="Enter contact name"
                            className={`w-full pl-9 pr-9 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 ${errors.contactName ? 'border-red-500' : ''
                              }`}
                          />
                          {errors.contactName && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                              <AlertCircle className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Contact & Address Information Section */}
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-white flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-emerald-400" />
                      <span>Contact & Address Information</span>
                    </h3>

                    {/* Phone and Address */}
                    <div className="grid grid-cols-2 gap-3">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.0 }}
                      >
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            {...register('phone')}
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            className={`w-full pl-9 pr-9 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 ${errors.phone ? 'border-red-500' : ''
                              }`}
                          />
                          {errors.phone && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                              <AlertCircle className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.1 }}
                      >
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Street Address *
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            {...register('address')}
                            placeholder="123 Main Street"
                            className={`w-full pl-9 pr-9 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 ${errors.address ? 'border-red-500' : ''
                              }`}
                          />
                          {errors.address && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                              <AlertCircle className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>

                    {/* City and Country */}
                    <div className="grid grid-cols-2 gap-3">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                      >
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          City *
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            {...register('city')}
                            placeholder="New York"
                            className={`w-full pl-9 pr-9 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 ${errors.city ? 'border-red-500' : ''
                              }`}
                          />
                          {errors.city && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                              <AlertCircle className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.3 }}
                      >
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Country *
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            {...register('country')}
                            placeholder="United States"
                            className={`w-full pl-9 pr-9 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 ${errors.country ? 'border-red-500' : ''
                              }`}
                          />
                          {errors.country && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                              <AlertCircle className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Additional Information Section */}
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-white flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-emerald-400" />
                      <span>Additional Information</span>
                    </h3>

                    {/* Tax ID and Website */}
                    <div className="grid grid-cols-2 gap-3">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.4 }}
                      >
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Tax ID / VAT Number
                        </label>
                        <div className="relative">
                          <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            {...register('taxId')}
                            placeholder="123-45-6789"
                            className={`w-full pl-9 pr-9 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 ${errors.taxId ? 'border-red-500' : ''
                              }`}
                          />
                          {errors.taxId && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                              <AlertCircle className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.5 }}
                      >
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Website
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            {...register('website')}
                            type="url"
                            placeholder="https://example.com"
                            className={`w-full pl-9 pr-9 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 ${errors.website ? 'border-red-500' : ''
                              }`}
                          />
                          {errors.website && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                              <AlertCircle className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.6 }}
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative group overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {/* Background Animation */}
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Content */}
                      <span className="relative flex items-center justify-center space-x-2">
                        {isSubmitting ? (
                          <>
                            {/* Modern Loading Spinner */}
                            <div className="relative w-4 h-4">
                              {/* Outer ring */}
                              <div className="absolute inset-0 border-2 border-white/30 rounded-full"></div>
                              {/* Spinning arc */}
                              <div className="absolute inset-0 border-2 border-transparent border-t-white border-r-white rounded-full animate-spin"></div>
                              {/* Inner pulse */}
                              <div className="absolute inset-1 bg-white/20 rounded-full animate-pulse"></div>
                            </div>
                            <span className="text-sm animate-pulse">Creating Account...</span>
                          </>
                        ) : (
                          <>
                            <Package className="w-4 h-4" />
                            <span className="text-sm">Create Supplier Account</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </>
                        )}
                      </span>
                    </button>
                  </motion.div>
                </form>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Alert Modal */}
      <AlertModal
        isOpen={alertState.isOpen}
        type={alertState.type}
        title={alertState.title}
        message={alertState.message}
        onClose={() => {
          closeAlert();
          // If it's a success modal, redirect to login page
          if (alertState.type === 'success') {
            router.push('/login');
          }
        }}
      />
    </div>
  );
}
