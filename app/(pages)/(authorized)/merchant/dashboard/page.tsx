// app/(pages)/(authorized)/merchant/dashboard/page.tsx
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  ChartBarIcon, 
  ShoppingBagIcon, 
  UsersIcon, 
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';
import { LoadingWrapper } from '@/app/components';
import MerchantNav  from './components/MerchantNav';

// Mock data for demonstration
const dashboardData = {
  overview: {
    totalRevenue: 12450.75,
    totalOrders: 189,
    averageOrderValue: 65.85,
    conversionRate: 3.2,
    revenueChange: 12.5,
    ordersChange: 8.3,
    aovChange: -2.1,
    conversionChange: 0.4
  },
  recentOrders: [
    { id: 'ORD-001', customer: 'John Doe', amount: 129.99, status: 'completed', date: '2023-10-15' },
    { id: 'ORD-002', customer: 'Jane Smith', amount: 89.50, status: 'completed', date: '2023-10-15' },
    { id: 'ORD-003', customer: 'Robert Johnson', amount: 45.00, status: 'pending', date: '2023-10-14' },
    { id: 'ORD-004', customer: 'Sarah Williams', amount: 210.25, status: 'completed', date: '2023-10-14' },
    { id: 'ORD-005', customer: 'Michael Brown', amount: 59.99, status: 'failed', date: '2023-10-13' }
  ],
  salesData: [
    { day: 'Oct 9', sales: 1250 },
    { day: 'Oct 10', sales: 1800 },
    { day: 'Oct 11', sales: 1500 },
    { day: 'Oct 12', sales: 2100 },
    { day: 'Oct 13', sales: 1900 },
    { day: 'Oct 14', sales: 2300 },
    { day: 'Oct 15', sales: 2450 }
  ],
  paymentMethods: [
    { method: 'USDC (Polygon)', percentage: 78, amount: 9710.25 },
    { method: 'Credit Card', percentage: 15, amount: 1867.50 },
    { method: 'Other Crypto', percentage: 7, amount: 873.00 }
  ]
};

export default function MerchantDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('7d');

  if (status === 'loading') {
    return <LoadingWrapper isLoading={true} children={undefined} />;
  }

  if (!session) {
    router.push('/signin');
    return null;
  }

  const StatCard = ({ title, value, change, icon: Icon }: { 
    title: string; 
    value: string | number; 
    change: number; 
    icon: React.ElementType;
  }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200/50">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl bg-indigo-100">
          <Icon className="h-6 w-6 text-indigo-600" />
        </div>
        <span className={`flex items-center text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? (
            <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
          ) : (
            <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
          )}
          {Math.abs(change)}%
        </span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      <p className="text-gray-500 text-sm mt-1">{title}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
       <MerchantNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Merchant Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your sales and performance</p>
          
          <div className="flex items-center mt-4 space-x-2">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                timeRange === '7d' 
                  ? 'bg-indigo-100 text-indigo-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                timeRange === '30d' 
                  ? 'bg-indigo-100 text-indigo-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimeRange('90d')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                timeRange === '90d' 
                  ? 'bg-indigo-100 text-indigo-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              90 Days
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={`$${dashboardData.overview.totalRevenue.toLocaleString()}`}
            change={dashboardData.overview.revenueChange}
            icon={CurrencyDollarIcon}
          />
          <StatCard
            title="Total Orders"
            value={dashboardData.overview.totalOrders}
            change={dashboardData.overview.ordersChange}
            icon={ShoppingBagIcon}
          />
          <StatCard
            title="Avg. Order Value"
            value={`$${dashboardData.overview.averageOrderValue}`}
            change={dashboardData.overview.aovChange}
            icon={ChartBarIcon}
          />
          <StatCard
            title="Conversion Rate"
            value={`${dashboardData.overview.conversionRate}%`}
            change={dashboardData.overview.conversionChange}
            icon={UsersIcon}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Sales Overview</h2>
              <span className="text-sm text-gray-500">Last 7 days</span>
            </div>
            
            <div className="h-64">
              {/* Simple bar chart using divs (in a real app, use a charting library) */}
              <div className="flex items-end h-48 gap-2 px-2 border-b border-l border-gray-200">
                {dashboardData.salesData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-md"
                      style={{ height: `${(item.sales / 2500) * 100}%` }}
                    />
                    <span className="text-xs text-gray-500 mt-2">{item.day}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between mt-4 px-2">
                <span className="text-xs text-gray-500">0</span>
                <span className="text-xs text-gray-500">$2,500</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200/50">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Payment Methods</h2>
            
            <div className="space-y-4">
              {dashboardData.paymentMethods.map((method, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{method.method}</span>
                    <span className="text-sm text-gray-500">{method.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${method.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">${method.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200/50 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200/50">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/50">
                {dashboardData.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 border-t border-gray-200/50 bg-gray-50">
            <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
              View all orders →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}