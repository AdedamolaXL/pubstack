// app/(pages)/(authorized)/merchant/components/MerchantNav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChartBarIcon, 
  BookOpenIcon, 
  Cog6ToothIcon,
  UserGroupIcon,
  PencilIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/merchant/dashboard', icon: ChartBarIcon },
  { name: 'My eBooks', href: '/merchant/ebooks', icon: BookOpenIcon },
  { name: 'Readers', href: '/merchant/readers', icon: UserGroupIcon },
  { name: 'Write New', href: '/merchant/write', icon: PencilIcon },
  { name: 'Settings', href: '/merchant/settings', icon: Cog6ToothIcon },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 transition-colors ${
                  isActive
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}