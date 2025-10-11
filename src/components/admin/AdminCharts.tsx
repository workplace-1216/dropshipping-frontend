'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';

type TimeRange = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';

interface ChartData {
  name: string;
  value?: number;
  sales?: number;
  orders?: number;
  users?: number;
  revenue?: number;
}

const COLORS = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#EC4899'];

export const AdminCharts: React.FC = () => {
  const { t } = useLanguage();
  const [timeRange, setTimeRange] = useState<TimeRange>('monthly');

  // Generate sample data based on time range
  const generateData = React.useCallback((range: TimeRange): ChartData[] => {
    switch (range) {
      case 'daily':
        return Array.from({ length: 24 }, (_, i) => ({
          name: `${i}:00`,
          revenue: Math.floor(Math.random() * 5000) + 1000,
          sales: Math.floor(Math.random() * 50) + 10,
          orders: Math.floor(Math.random() * 30) + 5,
          users: Math.floor(Math.random() * 20) + 5,
        }));
      case 'weekly':
        return [
          { name: t('admin.monday'), revenue: 12000, sales: 234, orders: 156, users: 45 },
          { name: t('admin.tuesday'), revenue: 15000, sales: 289, orders: 187, users: 52 },
          { name: t('admin.wednesday'), revenue: 18000, sales: 312, orders: 203, users: 67 },
          { name: t('admin.thursday'), revenue: 16000, sales: 298, orders: 189, users: 58 },
          { name: t('admin.friday'), revenue: 22000, sales: 389, orders: 245, users: 89 },
          { name: t('admin.saturday'), revenue: 25000, sales: 421, orders: 289, users: 98 },
          { name: t('admin.sunday'), revenue: 19000, sales: 334, orders: 212, users: 73 },
        ];
      case 'monthly':
        return [
          { name: t('admin.jan'), revenue: 45000, sales: 890, orders: 567, users: 234 },
          { name: t('admin.feb'), revenue: 52000, sales: 1023, orders: 645, users: 289 },
          { name: t('admin.mar'), revenue: 48000, sales: 945, orders: 601, users: 267 },
          { name: t('admin.apr'), revenue: 61000, sales: 1189, orders: 734, users: 312 },
          { name: t('admin.may'), revenue: 55000, sales: 1067, orders: 678, users: 298 },
          { name: t('admin.jun'), revenue: 67000, sales: 1298, orders: 812, users: 345 },
          { name: t('admin.jul'), revenue: 72000, sales: 1389, orders: 889, users: 378 },
          { name: t('admin.aug'), revenue: 68000, sales: 1312, orders: 834, users: 356 },
          { name: t('admin.sep'), revenue: 59000, sales: 1145, orders: 723, users: 323 },
          { name: t('admin.oct'), revenue: 64000, sales: 1234, orders: 789, users: 341 },
          { name: t('admin.nov'), revenue: 71000, sales: 1367, orders: 867, users: 367 },
          { name: t('admin.dec'), revenue: 78000, sales: 1498, orders: 945, users: 398 },
        ];
      case 'quarterly':
        return [
          { name: t('admin.q1'), revenue: 145000, sales: 2858, orders: 1813, users: 790 },
          { name: t('admin.q2'), revenue: 183000, sales: 3554, orders: 2224, users: 955 },
          { name: t('admin.q3'), revenue: 199000, sales: 3846, orders: 2446, users: 1057 },
          { name: t('admin.q4'), revenue: 213000, sales: 4099, orders: 2601, users: 1106 },
        ];
      case 'yearly':
        return Array.from({ length: 5 }, (_, i) => {
          const year = new Date().getFullYear() - 4 + i;
          return {
            name: year.toString(),
            revenue: Math.floor(Math.random() * 500000) + 300000,
            sales: Math.floor(Math.random() * 15000) + 8000,
            orders: Math.floor(Math.random() * 10000) + 5000,
            users: Math.floor(Math.random() * 4000) + 2000,
          };
        });
      default:
        return [];
    }
  }, [t]);

  const chartData = useMemo(() => generateData(timeRange), [timeRange, generateData]);

  const categoryData = [
    { name: t('admin.electronics'), value: 35000 },
    { name: t('admin.clothing'), value: 28000 },
    { name: t('admin.food'), value: 19000 },
    { name: t('admin.books'), value: 12000 },
    { name: t('admin.toys'), value: 8000 },
    { name: t('admin.other'), value: 6000 },
  ];

  const timeRangeOptions: { value: TimeRange; label: string }[] = [
    { value: 'daily', label: t('admin.dailyView') },
    { value: 'weekly', label: t('admin.weeklyView') },
    { value: 'monthly', label: t('admin.monthlyView') },
    { value: 'quarterly', label: t('admin.quarterlyView') },
    { value: 'yearly', label: t('admin.yearlyView') },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const calculateTrend = (data: ChartData[]): { value: number; isPositive: boolean } => {
    if (data.length < 2) return { value: 0, isPositive: true };
    const lastValue = data[data.length - 1].revenue || 0;
    const previousValue = data[data.length - 2].revenue || 0;
    const percentChange = ((lastValue - previousValue) / previousValue) * 100;
    return {
      value: Math.abs(Math.round(percentChange * 10) / 10),
      isPositive: percentChange >= 0,
    };
  };

  const trend = calculateTrend(chartData);

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 shadow-xl">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-slate-400" />
          <span className="text-sm font-medium text-slate-300">{t('admin.selectPeriod')}:</span>
        </div>
        <div className="flex items-center space-x-2">
          {timeRangeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTimeRange(option.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                timeRange === option.value
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-slate-700/30 text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Revenue Overview Chart */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">{t('admin.revenueOverview')}</h3>
            <p className="text-sm text-slate-400 mt-1">{t('admin.trends')} - {timeRangeOptions.find(opt => opt.value === timeRange)?.label}</p>
          </div>
          <div className="flex items-center space-x-2">
            {trend.isPositive ? (
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-400" />
            )}
            <span className={`text-sm font-semibold ${trend.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
              {trend.isPositive ? '+' : '-'}{trend.value}% {t('admin.vsLastPeriod')}
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis dataKey="name" stroke="#94A3B8" style={{ fontSize: '12px' }} />
            <YAxis stroke="#94A3B8" style={{ fontSize: '12px' }} tickFormatter={formatCurrency} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1E293B',
                border: '1px solid #475569',
                borderRadius: '8px',
                color: '#F8FAFC',
                fontSize: '14px',
                fontWeight: '600',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
              }}
              formatter={(value: number) => [formatCurrency(value), t('admin.revenue')]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8B5CF6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Sales and Orders Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-6">{t('admin.salesTrends')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="name" stroke="#94A3B8" style={{ fontSize: '12px' }} />
              <YAxis stroke="#94A3B8" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#F8FAFC',
                  fontSize: '14px',
                  fontWeight: '600',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                }}
              />
              <Bar dataKey="sales" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-6">{t('admin.orderStatistics')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="name" stroke="#94A3B8" style={{ fontSize: '12px' }} />
              <YAxis stroke="#94A3B8" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#F8FAFC',
                  fontSize: '14px',
                  fontWeight: '600',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                }}
              />
              <Bar dataKey="orders" fill="#10B981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* User Growth and Revenue by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-6">{t('admin.userGrowth')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="name" stroke="#94A3B8" style={{ fontSize: '12px' }} />
              <YAxis stroke="#94A3B8" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#F8FAFC',
                  fontSize: '14px',
                  fontWeight: '600',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#F59E0B"
                strokeWidth={3}
                dot={{ fill: '#F59E0B', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-6">{t('admin.revenueByCategory')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#F8FAFC',
                  fontSize: '14px',
                  fontWeight: '600',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                }}
                formatter={(value: number) => formatCurrency(value)}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Metrics Summary */}
      <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 backdrop-blur-xl rounded-xl p-6 border border-purple-500/30 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4">{t('admin.performanceMetrics')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-700/30 backdrop-blur-sm rounded-lg p-4 border border-slate-600/30 hover:bg-slate-700/50 transition-all">
            <p className="text-sm text-slate-400">{t('admin.totalSales')}</p>
            <p className="text-2xl font-bold text-purple-400">
              {chartData.reduce((sum, item) => sum + (item.sales || 0), 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-slate-700/30 backdrop-blur-sm rounded-lg p-4 border border-slate-600/30 hover:bg-slate-700/50 transition-all">
            <p className="text-sm text-slate-400">{t('admin.total')} {t('admin.orders')}</p>
            <p className="text-2xl font-bold text-blue-400">
              {chartData.reduce((sum, item) => sum + (item.orders || 0), 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-slate-700/30 backdrop-blur-sm rounded-lg p-4 border border-slate-600/30 hover:bg-slate-700/50 transition-all">
            <p className="text-sm text-slate-400">{t('admin.newUsers')}</p>
            <p className="text-2xl font-bold text-emerald-400">
              {chartData.reduce((sum, item) => sum + (item.users || 0), 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-slate-700/30 backdrop-blur-sm rounded-lg p-4 border border-slate-600/30 hover:bg-slate-700/50 transition-all">
            <p className="text-sm text-slate-400">{t('admin.averageOrderValue')}</p>
            <p className="text-2xl font-bold text-orange-400">
              {formatCurrency(
                chartData.reduce((sum, item) => sum + (item.revenue || 0), 0) /
                  chartData.reduce((sum, item) => sum + (item.orders || 0), 1)
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

