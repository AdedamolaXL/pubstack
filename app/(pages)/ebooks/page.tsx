import { Metadata } from 'next';
import Header from '@/app/components/Header';
import ProductGrid from '@/app/components/Ebooks/ProductGrid';
import { Footer } from '@/app/components/Footer';
import CartDrawer from '@/app/components/Ebooks/CartDrawer';
import { redirect } from 'next/navigation';
import Image from 'next/image';

export default function Catalog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header activeLink="ebooks" />
      <CartDrawer />
      
      <main className="container mx-auto px-4 py-8">
        {/* Author Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <Image
            src="/author-avatar.jpg"
            width={120}
            height={120}
            alt="Author"
            className="rounded-full mb-6 border-4 border-white shadow-lg"
          />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Creative Works</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Explore my collection of stories, novels, and creative pieces. Each purchase directly supports my writing journey.
          </p>
          <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500">
            <span>📚 12 Published Works</span>
            <span>•</span>
            <span>⭐ 4.8 Average Rating</span>
            <span>•</span>
            <span>❤️ 1,247 Readers</span>
          </div>
        </div>
        
        <ProductGrid />
      </main>
      
      <Footer />
    </div>
  );
}