'use client';
import { LoadingWrapper } from '@/app/components';
import Header from '@/app/components/Header';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  ChartBarIcon, 
  BookOpenIcon, 
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  AcademicCapIcon,
  VideoCameraIcon,
  GiftIcon
} from '@heroicons/react/24/outline';

const dashboardData = {
  overview: {
    totalRevenue: 12475.50,
    totalSales: 687,
    ebookSales: 423,
    mentorshipSales: 264,
    averageSaleValue: 18.16,
    conversionRate: 5.2,
    revenueChange: 22.4,
    salesChange: 18.7,
    avgSaleChange: 3.1,
    conversionChange: 2.2,
    gasSavings: 247.30 
  },
  recentSales: [
    { id: 'SALE-001', customer: 'John Reader', amount: 12.99, product: 'Whispers of the Forgotten', type: 'ebook', status: 'completed', date: '2023-10-15' },
    { id: 'SALE-002', customer: 'Jane Bookworm', amount: 299.00, product: 'Fiction Writing Masterclass', type: 'mentorship', status: 'completed', date: '2023-10-15' },
    { id: 'SALE-003', customer: 'Robert Learner', amount: 150.00, product: 'Career Strategy Session', type: 'mentorship', status: 'pending', date: '2023-10-14' },
    { id: 'SALE-004', customer: 'Sarah Scholar', amount: 32.50, product: 'Complete Works Collection', type: 'ebook', status: 'completed', date: '2023-10-14' },
    { id: 'SALE-005', customer: 'Michael Bibliophile', amount: 450.00, product: 'Manuscript Critique', type: 'mentorship', status: 'completed', date: '2023-10-13' }
  ],
  salesData: [
    { day: 'Oct 9', sales: 1250 },
    { day: 'Oct 10', sales: 1800 },
    { day: 'Oct 11', sales: 1450 },
    { day: 'Oct 12', sales: 2200 },
    { day: 'Oct 13', sales: 1900 },
    { day: 'Oct 14', sales: 2600 },
    { day: 'Oct 15', sales: 2300 }
  ],
  topProducts: [
    { title: 'Fiction Writing Masterclass', sales: 87, revenue: 26013.00, type: 'mentorship' },
    { title: 'Whispers of the Forgotten', sales: 76, revenue: 987.24, type: 'ebook' },
    { title: 'Manuscript Critique', sales: 65, revenue: 29250.00, type: 'mentorship' },
    { title: 'Complete Works Collection', sales: 54, revenue: 1755.00, type: 'ebook' },
    { title: 'Self-Publishing Intensive', sales: 42, revenue: 8358.00, type: 'mentorship' }
  ],
  paymentMethods: [
    { method: 'USDC (Polygon)', percentage: 78, amount: 9729.89, gasCovered: true },
    { method: 'USDC (Ethereum)', percentage: 12, amount: 1497.06, gasCovered: true },
    { method: 'Credit Card', percentage: 8, amount: 998.04, gasCovered: false },
    { method: 'Other Crypto', percentage: 2, amount: 250.51, gasCovered: true }
  ]
};

export default function AuthorDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('7d');

   if (status === 'loading') {
    return (
      <LoadingWrapper isLoading={true}>
        <></> {/* Empty fragment as children */}
      </LoadingWrapper>
    );
   }
  
  if (!session) {
    router.push('/signin');
    return null;
  }

  const StatCard = ({ title, value, change, icon: Icon, subtitle }: { 
    title: string; 
    value: string | number; 
    change: number; 
    icon: React.ElementType;
    subtitle?: string;
  }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200/50">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl bg-primary-100">
          <Icon className="h-6 w-6 text-primary-600" />
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
      <h3 className="text-2xl font-bold text-dune-900">{value}</h3>
      <p className="text-dune-500 text-sm mt-1">{title}</p>
      {subtitle && <p className="text-xs text-primary-600 mt-1">{subtitle}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-dune-900">Author Dashboard</h1>
          <p className="text-dune-600 mt-1">Track your eBook sales, mentorship revenue, and reader engagement</p>
          
          <div className="flex items-center mt-4 space-x-2">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                timeRange === '7d' 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'bg-gray-100 text-dune-600 hover:bg-gray-200'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                timeRange === '30d' 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'bg-gray-100 text-dune-600 hover:bg-gray-200'
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimeRange('90d')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                timeRange === '90d' 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'bg-gray-100 text-dune-600 hover:bg-gray-200'
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
            title="Total Sales"
            value={dashboardData.overview.totalSales}
            change={dashboardData.overview.salesChange}
            icon={BookOpenIcon}
            subtitle={`${dashboardData.overview.ebookSales} eBooks, ${dashboardData.overview.mentorshipSales} Mentorship`}
          />
          <StatCard
            title="Avg. Sale Value"
            value={`$${dashboardData.overview.averageSaleValue}`}
            change={dashboardData.overview.avgSaleChange}
            icon={ChartBarIcon}
          />
          <StatCard
            title="Gas Savings"
            value={`$${dashboardData.overview.gasSavings}`}
            change={0}
            icon={GiftIcon}
            subtitle="Covered by Circle"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-dune-900">Revenue Overview</h2>
              <span className="text-sm text-dune-500">Last 7 days</span>
            </div>
            
            <div className="h-64">
              {/* Simple bar chart using divs */}
              <div className="flex items-end h-48 gap-2 px-2 border-b border-l border-gray-200">
                {dashboardData.salesData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-md"
                      style={{ height: `${(item.sales / 3000) * 100}%` }}
                    />
                    <span className="text-xs text-dune-500 mt-2">{item.day}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between mt-4 px-2">
                <span className="text-xs text-dune-500">$0</span>
                <span className="text-xs text-dune-500">$3,000</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200/50">
            <h2 className="text-lg font-semibold text-dune-900 mb-6">Payment Methods</h2>
            
            <div className="space-y-4">
              {dashboardData.paymentMethods.map((method, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-dune-700 flex items-center">
                      {method.method}
                      {method.gasCovered && (
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
                          Gas-Free
                        </span>
                      )}
                    </span>
                    <span className="text-sm text-dune-500">{method.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${method.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-dune-500 mt-1">${method.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3 bg-primary-50 rounded-lg">
              <div className="flex items-start">
                <GiftIcon className="h-5 w-5 text-primary-600 mr-2 mt-0.5" />
                <p className="text-xs text-primary-700">
                  <span className="font-medium">Gas-Free Transactions:</span> 92% of your sales used gasless USDC payments, saving your readers ${dashboardData.overview.gasSavings} in gas fees.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Top Performing Products */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200/50 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200/50">
              <h2 className="text-lg font-semibold text-dune-900">Top Performing Products</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dune-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dune-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dune-500 uppercase tracking-wider">Sales</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dune-500 uppercase tracking-wider">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50">
                  {dashboardData.topProducts.map((product) => (
                    <tr key={product.title} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-dune-900">{product.title}</td>
                      <td className="px-6 py-4 text-sm text-dune-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.type === 'mentorship' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {product.type === 'mentorship' ? (
                            <>
                              <AcademicCapIcon className="h-3 w-3 mr-1" />
                              Mentorship
                            </>
                          ) : (
                            <>
                              <BookOpenIcon className="h-3 w-3 mr-1" />
                              eBook
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-dune-500">{product.sales}</td>
                      <td className="px-6 py-4 text-sm text-dune-900">${product.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Sales */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200/50 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200/50">
              <h2 className="text-lg font-semibold text-dune-900">Recent Sales</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dune-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dune-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dune-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dune-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dune-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50">
                  {dashboardData.recentSales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dune-900">{sale.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-dune-500">{sale.customer}</td>
                      <td className="px-6 py-4 text-sm text-dune-500">
                        <div className="flex items-center">
                          {sale.type === 'mentorship' ? (
                            <VideoCameraIcon className="h-4 w-4 mr-1 text-purple-500" />
                          ) : (
                            <BookOpenIcon className="h-4 w-4 mr-1 text-blue-500" />
                          )}
                          {sale.product}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-dune-900">${sale.amount}</td>
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
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View all sales →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}