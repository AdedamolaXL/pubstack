// app/(pages)/(authorized)/merchant/dashboard/page.tsx
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  ChartBarIcon, 
  BookOpenIcon, 
  UsersIcon, 
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { LoadingWrapper } from '@/app/components';
import MerchantNav from '@/app/components/Dashboard/DashboardNav';

// Mock data for eBook storefront
const dashboardData = {
  overview: {
    totalRevenue: 8475.50,
    totalSales: 423,
    averageSaleValue: 20.04,
    conversionRate: 4.1,
    revenueChange: 15.2,
    salesChange: 12.7,
    avgSaleChange: 2.1,
    conversionChange: 1.2
  },
  recentSales: [
    { id: 'SALE-001', customer: 'John Reader', amount: 12.99, book: 'Blockchain Revolution', status: 'completed', date: '2023-10-15' },
    { id: 'SALE-002', customer: 'Jane Bookworm', amount: 24.99, book: 'The Bitcoin Standard', status: 'completed', date: '2023-10-15' },
    { id: 'SALE-003', customer: 'Robert Learner', amount: 8.99, book: 'Cryptoassets', status: 'pending', date: '2023-10-14' },
    { id: 'SALE-004', customer: 'Sarah Scholar', amount: 32.50, book: 'Mastering Bitcoin', status: 'completed', date: '2023-10-14' },
    { id: 'SALE-005', customer: 'Michael Bibliophile', amount: 15.99, book: 'Digital Gold', status: 'completed', date: '2023-10-13' }
  ],
  salesData: [
    { day: 'Oct 9', sales: 850 },
    { day: 'Oct 10', sales: 1200 },
    { day: 'Oct 11', sales: 950 },
    { day: 'Oct 12', sales: 1800 },
    { day: 'Oct 13', sales: 1500 },
    { day: 'Oct 14', sales: 2100 },
    { day: 'Oct 15', sales: 1975 }
  ],
  topBooks: [
    { title: 'Blockchain Revolution', sales: 87, revenue: 1128.63 },
    { title: 'The Bitcoin Standard', sales: 76, revenue: 1060.24 },
    { title: 'Mastering Bitcoin', sales: 65, revenue: 974.35 },
    { title: 'Digital Gold', sales: 54, revenue: 783.00 },
    { title: 'Cryptoassets', sales: 42, revenue: 604.58 }
  ],
  paymentMethods: [
    { method: 'USDC (Polygon)', percentage: 82, amount: 6949.91 },
    { method: 'Credit Card', percentage: 12, amount: 1017.06 },
    { method: 'Other Crypto', percentage: 6, amount: 508.53 }
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
          <h1 className="text-2xl font-bold text-gray-900">Author Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your eBook sales and reader engagement</p>
          
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
            title="Total eBook Sales"
            value={dashboardData.overview.totalSales}
            change={dashboardData.overview.salesChange}
            icon={BookOpenIcon}
          />
          <StatCard
            title="Avg. Sale Value"
            value={`$${dashboardData.overview.averageSaleValue}`}
            change={dashboardData.overview.avgSaleChange}
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
              {/* Simple bar chart using divs */}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Top Performing Books */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200/50 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200/50">
              <h2 className="text-lg font-semibold text-gray-900">Top Performing Books</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50">
                  {dashboardData.topBooks.map((book) => (
                    <tr key={book.title} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{book.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{book.sales}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">${book.revenue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Sales */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200/50 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200/50">
              <h2 className="text-lg font-semibold text-gray-900">Recent Sales</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50">
                  {dashboardData.recentSales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sale.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.customer}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">{sale.book}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${sale.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          sale.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : sale.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {sale.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200/50 bg-gray-50">
              <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                View all sales →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}