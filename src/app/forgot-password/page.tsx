'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { GradientButton } from '@/components/ui/GradientButton';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, always show success
      setIsSuccess(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center p-2 sm:p-4 lg:p-6 relative overflow-hidden">
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
        <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-3xl"></div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10"
        >
          <Card className="border-0 shadow-xl bg-gray-800/90 backdrop-blur-xl border-gray-700/50 rounded-2xl sm:rounded-3xl">
            <CardHeader className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto w-16 h-16 bg-green-900/20 rounded-full flex items-center justify-center"
              >
                <CheckCircle className="w-8 h-8 text-green-400" />
              </motion.div>
              <CardTitle className="text-2xl text-green-400">{t('auth.emailSent')}</CardTitle>
              <CardDescription className="text-gray-300">
                {t('auth.emailSentDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <GradientButton
                onClick={() => router.push('/login')}
                className="w-full cursor-pointer"
              >
                {t('auth.backToSignIn')}
              </GradientButton>
              <Button
                variant="outline"
                onClick={() => router.push('/')}
                className="w-full cursor-pointer border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white hover:border-gray-500 transition-all duration-200"
              >
                {t('auth.goToHomepage')}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center p-2 sm:p-4 lg:p-6 relative overflow-hidden">
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
      <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-3xl"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-blue-300 hover:text-blue-200 hover:bg-gray-700/50 rounded-lg px-3 py-2 transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('auth.back')}</span>
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-blue-900/20 rounded-full flex items-center justify-center mb-4"
          >
            <Mail className="w-8 h-8 text-blue-300" />
          </motion.div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {t('auth.forgotPasswordTitle')}
          </h1>
          <p className="mt-2 text-gray-300">
            {t('auth.forgotPasswordSubtitle')}
          </p>
        </motion.div>

        {/* Forgot Password Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-0 shadow-xl bg-gray-700/90 backdrop-blur-xl border-gray-700/50 rounded-2xl sm:rounded-3xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center text-white">{t('auth.resetPassword')}</CardTitle>
              <CardDescription className="text-center text-gray-300">
                {t('auth.resetPasswordSubtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('auth.emailAddress')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5 z-10" />
                    <input
                      {...register('email')}
                      type="email"
                      placeholder={t('auth.enterEmailAddress')}
                      className="w-full pl-10 pr-4 py-3 h-12 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-700/50 text-white placeholder-gray-400 transition-all duration-200"
                    />
                  </div>
                  {errors.email?.message && (
                    <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="space-y-3"
                >
                  <GradientButton
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 cursor-pointer flex items-center justify-center"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{t('auth.sendingResetLink')}</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>{t('auth.sendResetLink')}</span>
                      </div>
                    )}
                  </GradientButton>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/login')}
                    className="w-full cursor-pointer border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white hover:border-gray-500 transition-all duration-200"
                  >
                    {t('auth.backToSignIn')}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center mt-6"
        >
          <p className="text-sm text-gray-300">
            {t('auth.rememberPassword')}{' '}
            <button
              onClick={() => router.push('/login')}
              className="font-medium text-blue-300 hover:text-blue-200 transition-colors cursor-pointer"
            >
              {t('auth.signInHere')}
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
