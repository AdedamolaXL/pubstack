'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { 
  ArrowRightStartOnRectangleIcon, 
  Cog6ToothIcon, 
  UserCircleIcon,
  ChartBarIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';
import { useCart } from '@/app/context/CardContext';
import { useSession, signOut } from 'next-auth/react';

interface HeaderProps {
  activeLink?: 'blog' | 'ebooks' | 'dashboard' | 'wallets' | 'mentorship'; 
}

const Header = ({ activeLink }: HeaderProps) => {
  const pathname = usePathname();
  const { cartCount, toggleCart, isCartOpen } = useCart();
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Determine active link based on pathname if not provided
  const getActiveLink = () => {
    if (activeLink) return activeLink;
    if (pathname === '/ebooks') return 'ebooks';
    if (pathname === '/dashboard') return 'dashboard';
    if (pathname.startsWith('/wallets')) return 'wallets'; 
    if (pathname === '/mentorship') return 'mentorship';
    return 'blog';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentActive = getActiveLink();
  const isAuthenticated = status === 'authenticated';

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    setIsDropdownOpen(false);
    signOut({
      redirect: true,
      callbackUrl: '/',
    });
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between p-4">
        {/* Logo on far left */}
        <Link 
          href="/" 
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors flex-shrink-0"
        >
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="font-serif font-bold text-lg">PubStack</span>
        </Link>

        {/* Navigation centered with maximum space */}
        <nav className="flex-grow mx-4 min-w-0 hidden md:block">
          <ul className="flex items-center justify-center space-x-8">
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
                href="/mentorship" 
                className={`transition ${
                  currentActive === 'mentorship' 
                    ? 'text-primary-600 font-medium border-b-2 border-primary-600' 
                    : 'text-dune-700 hover:text-primary-600'
                }`}
              >
                Mentorship
              </Link>
            </li>
            {isAuthenticated && (
              <>
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
              </>
            )}
          </ul>
        </nav>

        {/* Right side with cart and user dropdown */}
        <div className="flex items-center space-x-4 flex-shrink-0">
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
          
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <UserCircleIcon className="h-5 w-5 text-primary-600" />
                </div>
                <span className="hidden md:block text-sm font-medium text-dune-700">
                  {session.user?.name || session.user?.email}
                </span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-10 overflow-hidden">
                  <div className="py-1">
                    <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
                      Signed in as {session.user?.email}
                    </div>
                    
                    <Link
                      href="/dashboard"
                      className="flex items-center px-4 py-2 text-sm text-dune-700 hover:bg-primary-50 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <ChartBarIcon className="h-4 w-4 mr-3" />
                      Dashboard
                    </Link>
                    
                    <Link
                      href="/wallets"
                      className="flex items-center px-4 py-2 text-sm text-dune-700 hover:bg-primary-50 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                      </svg>
                      Wallets
                    </Link>
                    
                    <Link
                      href="/ebooks"
                      className="flex items-center px-4 py-2 text-sm text-dune-700 hover:bg-primary-50 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <BookOpenIcon className="h-4 w-4 mr-3" />
                      My Library
                    </Link>
                    
                    <div className="border-t border-gray-100 my-1"></div>
                    
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-dune-700 hover:bg-primary-50 transition-colors"
                    >
                      <ArrowRightStartOnRectangleIcon className="h-4 w-4 mr-3" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                Sign In
              </button>
            </Link>
          )}
          
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
          <Link href="/ebooks" className="text-dune-700 hover:text-primary-600 transition py-1">
            Ebooks
          </Link>
          <Link href="/mentorship" className="text-dune-700 hover:text-primary-600 transition py-1">
            Mentorship
          </Link>
          {isAuthenticated && (
            <>
              <Link href="/dashboard" className="text-dune-700 hover:text-primary-600 transition py-1">
                Dashboard
              </Link>
              <Link href="/wallets" className="text-dune-700 hover:text-primary-600 transition py-1">
                Wallets
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;