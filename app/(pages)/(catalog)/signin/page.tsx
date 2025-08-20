import { Metadata } from 'next';
import Header from '@/app/components/Header';
import ProductGrid from '@/app/components/Catalog/ProductGrid';
import Footer from '@/app/components/Footer';
import CartDrawer from '@/app/components/Catalog/CartDrawer';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'CryptoCommerce | Gasless USDC Checkout',
  description: 'Web2-like checkout experience with gasless USDC payments',
};

export default function Catalog() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header activeLink="products" />
      <CartDrawer />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Featured Products</h1>
          <p className="text-gray-600 mt-2">
            Shop with gasless USDC payments - no crypto wallet needed
          </p>
        </div>
        
        <ProductGrid />
      </main>
      
      <Footer />
    </div>
    
  );
}