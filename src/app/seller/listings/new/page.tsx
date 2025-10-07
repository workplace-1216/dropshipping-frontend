/**
 * @fileoverview Create New Listing Page for Sellers
 * Form to create new product listings for marketplace sales
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { GradientButton } from '@/components/ui/GradientButton';
import { useAuth } from '@/contexts/AuthContext';
import { useToastHelpers } from '@/components/ui/Toast';
import { ArrowLeft, ShoppingBag, DollarSign, Tag, FileText, Image, Globe } from 'lucide-react';

const listingSchema = z.object({
  title: z.string().min(1, 'Listing title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  category: z.string().min(1, 'Category is required'),
  tags: z.string().min(1, 'At least one tag is required'),
  marketplace: z.string().min(1, 'Marketplace is required'),
});

type ListingFormData = z.infer<typeof listingSchema>;

export default function NewListingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const toast = useToastHelpers();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
  });

  const onSubmit = async (data: ListingFormData) => {
    try {
      setIsSubmitting(true);
      console.log('Creating listing:', data);
      
      // TODO: Implement API call to create listing
      // await apiClient.createListing(data);
      
      toast.success(
        'Listing Created!',
        `${data.title} has been published to the marketplace.`
      );
      
      // Redirect back to seller dashboard
      setTimeout(() => {
        router.push('/seller');
      }, 1500);
    } catch (error) {
      console.error('Error creating listing:', error);
      toast.error(
        'Creation Failed',
        'There was an error creating the listing. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Listing</h1>
              <p className="text-gray-600 mt-1">List a product for sale on the marketplace</p>
            </div>
          </div>
        </motion.div>

        {/* Listing Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5" />
                <span>Listing Information</span>
              </CardTitle>
              <CardDescription>
                Fill in the details for your new marketplace listing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Listing Title *
                    </label>
                    <Input
                      {...register('title')}
                      placeholder="Enter listing title"
                      className={errors.title ? 'border-red-500' : ''}
                    />
                    {errors.title && (
                      <p className="text-sm text-red-600">{errors.title.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Marketplace *
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        {...register('marketplace')}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.marketplace ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select marketplace</option>
                        <option value="shopee">Shopee</option>
                        <option value="mercadolibre">Mercado Libre</option>
                        <option value="amazon">Amazon</option>
                        <option value="all">All Marketplaces</option>
                      </select>
                    </div>
                    {errors.marketplace && (
                      <p className="text-sm text-red-600">{errors.marketplace.message}</p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Description *
                  </label>
                  <textarea
                    {...register('description')}
                    rows={4}
                    placeholder="Describe your product listing..."
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-600">{errors.description.message}</p>
                  )}
                </div>

                {/* Price, Category, and Tags */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Price *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="number"
                        step="0.01"
                        {...register('price', { valueAsNumber: true })}
                        placeholder="0.00"
                        className={`pl-10 ${errors.price ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.price && (
                      <p className="text-sm text-red-600">{errors.price.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Category *
                    </label>
                    <select
                      {...register('category')}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.category ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select category</option>
                      <option value="electronics">Electronics</option>
                      <option value="clothing">Clothing & Accessories</option>
                      <option value="home">Home & Garden</option>
                      <option value="sports">Sports & Outdoors</option>
                      <option value="books">Books & Media</option>
                      <option value="beauty">Beauty & Health</option>
                      <option value="toys">Toys & Games</option>
                      <option value="automotive">Automotive</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.category && (
                      <p className="text-sm text-red-600">{errors.category.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Tags *
                    </label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        {...register('tags')}
                        placeholder="tag1, tag2, tag3"
                        className={`pl-10 ${errors.tags ? 'border-red-500' : ''}`}
                      />
                    </div>
                    <p className="text-xs text-gray-500">Separate tags with commas</p>
                    {errors.tags && (
                      <p className="text-sm text-red-600">{errors.tags.message}</p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <GradientButton
                    type="submit"
                    disabled={isSubmitting}
                    className="min-w-[120px]"
                  >
                    {isSubmitting ? 'Creating...' : 'Create Listing'}
                  </GradientButton>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
