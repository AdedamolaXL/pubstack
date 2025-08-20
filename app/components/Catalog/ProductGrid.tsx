import ProductCard from '@/app/components/Catalog/ProductCard';

// Product data type
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
}

// Mock product data with actual image URLs
const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 1.29,
    description: 'Premium noise-cancelling headphones with 30hr battery life',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=400&q=80',
    rating: 4.7,
    reviewCount: 342
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 1.99,
    description: 'Track your workouts, heart rate, and sleep patterns',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&h=400&q=80',
    rating: 4.5,
    reviewCount: 218
  },
  {
    id: '3',
    name: 'Premium Coffee Maker',
    price: 8.99,
    description: 'Brew barista-quality coffee at home in minutes',
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&h=400&q=80',
    rating: 4.8,
    reviewCount: 167
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    price: 2.49,
    description: 'Lumbar support for all-day comfort during work',
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=600&h=400&q=80',
    rating: 4.6,
    reviewCount: 89
  },
  {
    id: '5',
    name: 'Waterproof Backpack',
    price: 5.99,
    description: 'Durable, weather-resistant backpack for all adventures',
    category: 'Travel',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&h=400&q=80',
    rating: 4.4,
    reviewCount: 124
  },
  {
    id: '6',
    name: 'Wireless Charging Pad',
    price: 2.99,
    description: 'Fast wireless charging for all Qi-compatible devices',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1587033411394-45d55b1265e3?auto=format&fit=crop&w=600&h=400&q=80',
    rating: 4.3,
    reviewCount: 276
  },
  {
    id: '7',
    name: 'Stainless Steel Cookware Set',
    price: 1.79,
    description: '10-piece professional cookware set for your kitchen',
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1594489573454-3a9e7b2c4ed3?auto=format&fit=crop&w=600&h=400&q=80',
    rating: 4.9,
    reviewCount: 95
  },
  {
    id: '8',
    name: 'Yoga Mat & Accessories Kit',
    price: 4.99,
    description: 'Eco-friendly mat with included blocks and strap',
    category: 'Fitness',
    image: 'https://images.unsplash.com/photo-1576675466969-38eeae4b41f3?auto=format&fit=crop&w=600&h=400&q=80',
    rating: 4.7,
    reviewCount: 187
  }
];

const ProductGrid = () => {
  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm">
          All Products
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50">
          Electronics
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50">
          Home & Kitchen
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50">
          Fitness
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50">
          Furniture
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <div className="mt-12 flex justify-center">
        <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-indigo-600 hover:bg-gray-50 transition font-medium">
          Load More Products
        </button>
      </div>
    </div>
  );
};

export default ProductGrid;
