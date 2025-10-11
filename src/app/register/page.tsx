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
  Package
} from 'lucide-react';

const createRegisterSchema = (t: (key: string) => string) => z.object({
  firstName: z.string().min(2, t('auth.firstNameMinLength')),
  lastName: z.string().min(2, t('auth.lastNameMinLength')),
  email: z.string().email(t('auth.pleaseEnterValidEmail')),
  password: z.string().min(6, t('auth.passwordMinLength')),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: t('auth.passwordsDontMatch'),
  path: ["confirmPassword"],
});

// Default schema for TypeScript type inference
const defaultRegisterSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof defaultRegisterSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser, user } = useAuth();
  const { t } = useLanguage();
  const toast = useToastHelpers();
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Create schema with translations
  const registerSchema = React.useMemo(() => createRegisterSchema(t), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError('');
      setIsSubmitting(true);
      console.log('Starting registration with data:', { ...data, password: '***', confirmPassword: '***' });
      
      const { confirmPassword, ...registerData } = data;
      
      console.log('Calling registerUser...');
      await registerUser(registerData);
      
      console.log('Registration successful!');
      
      // Show success toast
      toast.success(
        'Account Created Successfully!',
        `Welcome ${data.firstName}! Your account has been created and you're now logged in.`
      );
      
      // Small delay to show the toast before navigation
      setTimeout(() => {
        // Redirect based on user role
        const redirectUrl = getAuthRedirectUrl(user);
        console.log('Redirecting to:', redirectUrl);
        router.push(redirectUrl);
      }, 1000);
    } catch (err: unknown) {
      setIsSubmitting(false);
      console.error('Registration error:', err);
      const errorResponse = (err as { response?: { data?: unknown } })?.response?.data;
      console.error('Error response:', errorResponse);
      
      const errorMessage = (err as { response?: { data?: { message?: string } }, message?: string })?.response?.data?.message || 
                          (err as { message?: string })?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      
      // Show error toast
      toast.error(
        'Registration Failed',
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
      
      // Send Google credential to backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credential: googleResponse.access_token,
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
        `Successfully signed up with Google. Redirecting to your dashboard...`
      );
      
      // Redirect to appropriate dashboard
      setTimeout(() => {
        const redirectUrl = getAuthRedirectUrl(authData.user);
        console.log('Redirecting to:', redirectUrl);
        router.push(redirectUrl);
      }, 1000);
      
    } catch (err: unknown) {
      setIsSubmitting(false);
      console.error('Google Sign-Up error:', err);
      const errorMessage = (err as { message?: string })?.message || 'Google authentication failed';
      setError(errorMessage);
      
      toast.error(
        'Google Sign-Up Failed',
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
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            {/* Left Side - Branding */}
            <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-950 p-8 lg:p-12 flex flex-col justify-start pt-16 relative overflow-hidden">
              {/* Background Elements */}
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
              </div>


              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className='mt-30'
              >
                {/* Logo and Sign Up Section - Centered */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mb-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm mx-auto cursor-pointer hover:scale-105 transition-transform duration-200"
                    onClick={() => router.push('/')}
                  >
                    <span className="text-white font-bold text-2xl">W</span>
                  </motion.div>
                  
                  <h2 className="text-3xl font-bold mb-3 text-white text-center">
                    {t('auth.joinPlatform')}
                  </h2>
                  <p className="text-lg text-white/90 leading-relaxed text-center">
                    {t('auth.startManagingBusiness')}
                  </p>
                </motion.div>

                {/* Welcome Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mb-8 mt-10 text-center"
                >
                  <p className="text-xl text-white/90 leading-relaxed">
                    {t('auth.welcomeSubtitle')}
                  </p>
                </motion.div>

                 {/* Features */}
                 <div className="space-y-4 mt-0 pl-[20%] sm:pl-[30%] md:pl-[36%] lg:px-20 xl:px-24 2xl:px-24">
                   {[
                     t('home.multiTenantInventory'),
                     t('home.realTimeOrderTracking'),
                     t('home.automatedAlertsReporting'),
                     t('home.securePaymentProcessing')
                   ].map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Package className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white/90 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Side - Form */}
            <div className="p-8 lg:p-12 lg:py-10 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-md mx-auto w-full"
              >
                {/* Header */}
                <div className="text-center mb-6">
                   <h2 className="text-2xl font-bold text-white mb-2">
                     {t('auth.createAccountTitle')}
                   </h2>
                   <p className="text-gray-300">
                     {t('auth.joinManageBusiness')}
          </p>
        </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        {t('auth.firstName')}
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          {...register('firstName')}
                          placeholder={t('auth.johnPlaceholder')}
                          className={`w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 ${
                            errors.firstName ? 'border-red-500' : ''
                          }`}
                        />
                        {errors.firstName && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                            <AlertCircle className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        {t('auth.lastName')}
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          {...register('lastName')}
                          placeholder={t('auth.doePlaceholder')}
                          className={`w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 ${
                            errors.lastName ? 'border-red-500' : ''
                          }`}
                        />
                        {errors.lastName && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                            <AlertCircle className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      {t('auth.email')}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        {...register('email')}
                        type="email"
                        placeholder={t('auth.emailPlaceholder')}
                        className={`w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 ${
                          errors.email ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.email && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                          <AlertCircle className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Password Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        {t('auth.password')}
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                {...register('password')}
                          type={showPassword ? 'text' : 'password'}
                          placeholder={t('auth.enterPasswordPlaceholder')}
                          className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 ${
                            errors.password ? 'border-red-500' : ''
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                        {errors.password && (
                          <div className="absolute right-10 top-1/2 transform -translate-y-1/2 text-red-500">
                            <AlertCircle className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                    >
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        {t('auth.confirmPassword')}
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                {...register('confirmPassword')}
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder={t('auth.confirmPasswordPlaceholder')}
                          className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 ${
                            errors.confirmPassword ? 'border-red-500' : ''
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 cursor-pointer"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                        {errors.confirmPassword && (
                          <div className="absolute right-10 top-1/2 transform -translate-y-1/2 text-red-500">
                            <AlertCircle className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative group overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {/* Background Animation */}
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Content */}
                      <span className="relative flex items-center justify-center space-x-3">
                        {isSubmitting ? (
                          <>
                            {/* Modern Loading Spinner */}
                            <div className="relative w-5 h-5">
                              {/* Outer ring */}
                              <div className="absolute inset-0 border-2 border-white/30 rounded-full"></div>
                              {/* Spinning arc */}
                              <div className="absolute inset-0 border-2 border-transparent border-t-white border-r-white rounded-full animate-spin"></div>
                              {/* Inner pulse */}
                              <div className="absolute inset-1 bg-white/20 rounded-full animate-pulse"></div>
                            </div>
                            <span className="animate-pulse">{t('auth.creatingAccount')}</span>
                          </>
                        ) : (
                          <>
                            <span>{t('auth.createAccount')}</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                          </>
                        )}
                      </span>
                    </button>
                  </motion.div>

                  {/* Social Login Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    className="mt-6"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-600" />
                      </div>
                       <div className="relative flex justify-center text-sm">
                         <span className="px-2 bg-gray-800 text-gray-400">{t('auth.orContinueWith')}</span>
                       </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      {/* Google Sign In */}
                      <motion.button
                        onClick={handleGoogleSignIn}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg shadow-sm bg-gray-700/50 text-sm font-medium text-gray-200 hover:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer transition-colors"
                      >
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                         {t('auth.signInWithGoogle')}
                      </motion.button>



                      {/* Register as Supplier */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => router.push('/register/supplier')}
                        className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg shadow-sm bg-gradient-to-r from-emerald-600/20 to-green-600/20 text-sm font-medium text-emerald-300 hover:from-emerald-600/30 hover:to-green-600/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 cursor-pointer transition-all duration-200 border-emerald-500/30 hover:border-emerald-400/50"
                      >
                        <Package className="w-5 h-5 mr-3 text-emerald-400" />
                        {t('auth.registerAsSupplier')}
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Sign In Link */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    className="text-center"
                  >
              <p className="text-sm text-gray-300">
                      {t('auth.alreadyHaveAccount')}{' '}
                <Link
                  href="/login"
                        className="font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                        {t('auth.login')}
                </Link>
              </p>
                  </motion.div>
                </form>
              </motion.div>
            </div>
            </div>
        </motion.div>
      </div>
    </div>
  );
}



