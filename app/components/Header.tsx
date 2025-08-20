'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/app/context/CardContext';

interface HeaderProps {
  activeLink?: 'products' | 'merchants' | 'dashboard' | 'wallets'; 
}

const Header = ({ activeLink }: HeaderProps) => {
  const pathname = usePathname();
  const { cartCount, toggleCart, isCartOpen } = useCart();

  // Determine active link based on pathname if not provided
  const getActiveLink = () => {
    if (activeLink) return activeLink;
    if (pathname === '/merchants') return 'merchants';
    if (pathname === '/dashboard') return 'dashboard';
    if (pathname.startsWith('/wallets')) return 'wallets'; 
    return 'products';
  };

  const currentActive = getActiveLink();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition">
          CryptoCommerce
        </Link>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <Link 
                href="/" 
                className={`transition ${
                  currentActive === 'products' 
                    ? 'text-indigo-600 font-medium border-b-2 border-indigo-600' 
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                Products
              </Link>
            </li>
            <li>
              <Link 
                href="/merchants" 
                className={`transition ${
                  currentActive === 'merchants' 
                    ? 'text-indigo-600 font-medium border-b-2 border-indigo-600' 
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                Merchants
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard" 
                className={`transition ${
                  currentActive === 'dashboard' 
                    ? 'text-indigo-600 font-medium border-b-2 border-indigo-600' 
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                Dashboard
              </Link>
            </li>

            <li>
  <Link 
    href="/wallets" 
    className={`transition ${
      currentActive === 'wallets' 
        ? 'text-indigo-600 font-medium border-b-2 border-indigo-600' 
        : 'text-gray-600 hover:text-indigo-600'
    }`}
  >
    Wallets
  </Link>
</li>
          </ul>
        </nav>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
  <button 
    onClick={toggleCart}
    className="text-gray-600 hover:text-indigo-600 transition"
    aria-label="Open shopping cart"
  >
    <ShoppingCartIcon className="h-6 w-6" />
    {cartCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        {cartCount}
      </span>
    )}
  </button>
</div>
          
          <Link href="/login">
  <button className="hidden md:block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium">
    Sign In
  </button>
</Link>
          
          {/* Mobile menu button */}
          <button className="md:hidden text-gray-600 hover:text-indigo-600 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu (hidden by default) */}
      <div className="md:hidden border-t py-2 hidden">
        <div className="container mx-auto px-4 flex flex-col space-y-2">
          <Link href="/" className="text-gray-600 hover:text-indigo-600 transition py-1">
            Products
          </Link>
          <Link href="/merchants" className="text-gray-600 hover:text-indigo-600 transition py-1">
            Merchants
          </Link>
          <Link href="/dashboard" className="text-gray-600 hover:text-indigo-600 transition py-1">
            Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;