'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/app/context/CardContext';

interface HeaderProps {
  activeLink?: 'blog' | 'ebooks' | 'dashboard' | 'wallets'; 
}

const Header = ({ activeLink }: HeaderProps) => {
  const pathname = usePathname();
  const { cartCount, toggleCart, isCartOpen } = useCart();

  // Determine active link based on pathname if not provided
  const getActiveLink = () => {
    if (activeLink) return activeLink;
    if (pathname === '/ebooks') return 'ebooks';
    if (pathname === '/dashboard') return 'dashboard';
    if (pathname.startsWith('/wallets')) return 'wallets'; 
    return 'blog';
  };

  const currentActive = getActiveLink();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-serif font-bold text-primary-600 hover:text-primary-700 transition">
          PubStack
        </Link>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link 
                href="/" 
                className={`transition ${
                  currentActive === 'blog' 
                    ? 'text-primary-600 font-medium border-b-2 border-primary-600' 
                    : 'text-dune-700 hover:text-primary-600'
                }`}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link 
                href="/ebooks" 
                className={`transition ${
                  currentActive === 'ebooks' 
                    ? 'text-primary-600 font-medium border-b-2 border-primary-600' 
                    : 'text-dune-700 hover:text-primary-600'
                }`}
              >
                Ebooks
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard" 
                className={`transition ${
                  currentActive === 'dashboard' 
                    ? 'text-primary-600 font-medium border-b-2 border-primary-600' 
                    : 'text-dune-700 hover:text-primary-600'
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
                    ? 'text-primary-600 font-medium border-b-2 border-primary-600' 
                    : 'text-dune-700 hover:text-primary-600'
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
              className="text-dune-700 hover:text-primary-600 transition focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md p-1"
              aria-label="Open shopping cart"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
          
          <Link href="/login">
            <button className="hidden md:block bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
              Sign In
            </button>
          </Link>
          
          {/* Mobile menu button */}
          <button className="md:hidden text-dune-700 hover:text-primary-600 transition focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu (hidden by default) */}
      <div className="md:hidden border-t py-2 hidden">
        <div className="container mx-auto px-4 flex flex-col space-y-2">
          <Link href="/" className="text-dune-700 hover:text-primary-600 transition py-1">
            Blog
          </Link>
          <Link href="/merchants" className="text-dune-700 hover:text-primary-600 transition py-1">
            Ebooks
          </Link>
          <Link href="/wallets" className="text-dune-700 hover:text-primary-600 transition py-1">
            Wallets
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;