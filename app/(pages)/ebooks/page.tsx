import Header from '@/app/components/Header';
import ProductGrid from '@/app/components/Ebooks/ProductGrid';
import { Footer } from '@/app/components/Footer';
import { UserCircleIcon } from '@heroicons/react/24/solid';

export default function Catalog() {
  return (
    <div className="min-h-screen bg-white">
      <Header activeLink="ebooks" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Author Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="relative mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 border-4 border-white shadow-lg flex items-center justify-center">
              <UserCircleIcon className="h-20 w-20 text-primary-600" />
            </div>
          </div>
          <h1 className="text-4xl font-serif font-bold text-dune-900 mb-2">My Creative Works</h1>
          <p className="text-xl text-dune-700 max-w-2xl">
            Explore my collection of stories, novels, and creative pieces. Each purchase directly supports my writing journey.
          </p>
          <div className="mt-4 flex items-center space-x-2 text-sm text-dune-500">
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