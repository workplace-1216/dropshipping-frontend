'use client';

import React, { useState, useEffect } from 'react';
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
import { Input } from '@/components/ui/Input';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { t, currentLanguage } = useLanguage();
  const toast = useToastHelpers();
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError('');
      setIsSubmitting(true);
      console.log('Login attempt with data:', { email: data.email, password: '***' });
      
      const loggedInUser = await login(data);
      console.log('Login successful, user:', loggedInUser);
      
      // Show success toast
      toast.success(
        'Welcome Back!',
        `Successfully logged in. Redirecting to your dashboard...`
      );
      
      // Small delay to show the toast before navigation
      setTimeout(() => {
        const redirectUrl = getAuthRedirectUrl(loggedInUser);
        console.log('Redirecting to:', redirectUrl);
        router.push(redirectUrl);
      }, 1000);
    } catch (err: unknown) {
      // Translate common error messages
      const errorMessage = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      let displayError = '';
      
      if (errorMessage === 'Invalid email or password') {
        displayError = t('auth.invalidCredentials');
      } else {
        displayError = t('auth.loginFailed');
      }
      
      setError(displayError);
      
      // Show error toast
      toast.error(
        'Login Failed',
        displayError
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setIsSubmitting(true);
      
      // Show loading toast
      toast.info('Signing in with Google...', 'Please complete the Google authentication');
      
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
        `Successfully signed in with Google. Redirecting to your dashboard...`
      );
      
      // Redirect to appropriate dashboard
      setTimeout(() => {
        const redirectUrl = getAuthRedirectUrl(authData.user);
        console.log('Redirecting to:', redirectUrl);
        router.push(redirectUrl);
      }, 1000);
      
    } catch (err: unknown) {
      console.error('Google Sign-In error:', err);
      const errorMessage = (err as { message?: string })?.message || 'Google authentication failed';
      setError(errorMessage);
      
      toast.error(
        'Google Sign-In Failed',
        errorMessage
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Force re-render when language changes
  useEffect(() => {
    // This effect will trigger re-render when currentLanguage changes
  }, [currentLanguage]);

  // Update error message when language changes
  useEffect(() => {
    if (error) {
      // Re-translate the current error message
      if (error === 'Invalid email or password' || error === 'E-mail ou senha inválidos') {
        setError(t('auth.invalidCredentials'));
      } else if (error === 'Login failed. Please try again.' || error === 'Falha no login. Por favor, tente novamente.') {
        setError(t('auth.loginFailed'));
      }
    }
  }, [currentLanguage, error, t]);

  // Show loading state until hydrated
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center p-2 sm:p-4 lg:p-6 relative">
      {/* Language Switcher */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50"
      >
        <LanguageSwitcher />
      </motion.div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-800/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] sm:min-h-[600px]">
            {/* Left Side - Branding */}
            <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-950 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-start pt-8 sm:pt-12 lg:pt-16 relative overflow-hidden">
              {/* Background Elements */}
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-18 sm:h-18 lg:w-24 lg:h-24 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-white/5 rounded-full blur-3xl"></div>
              </div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className='mt-4 sm:mt-6 lg:mt-10'
              >
                {/* Logo and Sign In Section - Centered */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mb-4 sm:mb-6 lg:mb-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 backdrop-blur-sm mx-auto cursor-pointer hover:scale-105 transition-transform duration-200"
                    onClick={() => router.push('/')}
                  >
                    <span className="text-white font-bold text-lg sm:text-xl lg:text-2xl">W</span>
                  </motion.div>
                  
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 text-white text-center">
                    {t('auth.login')}
                  </h2>
                  <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed text-center px-2">
                    {t('auth.welcome')}
                  </p>
                </motion.div>

                {/* Welcome Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mb-4 sm:mb-6 lg:mb-8 mt-4 sm:mt-6 lg:mt-10 text-center"
                >
                  <p className="text-sm sm:text-base lg:text-xl text-white/90 leading-relaxed px-2">
                    {t('auth.welcomeSubtitle')}
                  </p>
                </motion.div>

                 {/* Features */}
                 <div className="space-y-2 sm:space-y-3 lg:space-y-4 mt-0 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
                   {[
                     t('auth.feature1'),
                     t('auth.feature2'),
                     t('auth.feature3'),
                     t('auth.feature4')
                   ].map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      className="flex items-center space-x-2 sm:space-x-3"
                    >
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <span className="text-xs sm:text-sm lg:text-base text-white/90">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Side - Form */}
            <div className="p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-sm sm:max-w-md mx-auto w-full"
              >
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {t('auth.login')}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-300">
                    {t('auth.welcome')}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center space-x-2 p-3 bg-red-900/20 border border-red-500/30 rounded-lg"
                    >
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <span className="text-red-300 text-sm">{error}</span>
                    </motion.div>
                  )}

                  {/* Email Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">
                      {t('auth.email')}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        {...register('email')}
                        id="email"
                        type="email"
                        placeholder={t('auth.email')}
                        className={`pl-10 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                      />
                      {errors.email && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        </div>
                      )}
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                    )}
                  </motion.div>

                  {/* Password Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <label htmlFor="password" className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">
                      {t('auth.password')}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        {...register('password')}
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder={t('auth.password')}
                        className={`pl-10 pr-10 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 ${errors.password ? 'border-red-500' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                      {errors.password && (
                        <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        </div>
                      )}
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
                    )}
                  </motion.div>

                  {/* Remember Me & Forgot Password */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0"
                  >
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-xs sm:text-sm text-gray-300">{t('auth.rememberMe')}</span>
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 font-medium"
                    >
                      {t('auth.forgotPassword')}
                    </Link>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
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
                            <span className="animate-pulse">{t('auth.signingIn')}</span>
                          </>
                        ) : (
                          <>
                            <span>{t('auth.login')}</span>
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
                    transition={{ duration: 0.5, delay: 0.75 }}
                    className="space-y-3 sm:space-y-4"
                  >
                    {/* Divider */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-600" />
                      </div>
                      <div className="relative flex justify-center text-xs sm:text-sm">
                        <span className="px-2 bg-gray-800 text-gray-400">{t('auth.orContinueWith')}</span>
                      </div>
                    </div>

                    {/* Google Sign In Button */}
                    <motion.button
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="w-full flex items-center justify-center px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-600 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                    >
                      {/* Shimmer effect when loading */}
                      {isSubmitting && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                      )}
                      
                      {isSubmitting ? (
                        <>
                          <div className="relative w-5 h-5 mr-3">
                            <div className="absolute inset-0 border-2 border-gray-400/30 rounded-full"></div>
                            <div className="absolute inset-0 border-2 border-transparent border-t-gray-200 border-r-gray-200 rounded-full animate-spin"></div>
                          </div>
                          <span className="text-sm sm:text-base text-gray-200 font-medium">Signing in with Google...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          <span className="text-sm sm:text-base text-gray-200 font-medium">{t('auth.signInWithGoogle')}</span>
                        </>
                      )}
                    </motion.button>

                  </motion.div>

                  {/* Sign Up Link */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="text-center"
                  >
                    <p className="text-xs sm:text-sm text-gray-300">
                      {t('auth.dontHaveAccount')}{' '}
                      <Link
                        href="/register"
                        className="text-blue-400 hover:text-blue-300 font-medium"
                      >
                        {t('auth.signUpHere')}
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

