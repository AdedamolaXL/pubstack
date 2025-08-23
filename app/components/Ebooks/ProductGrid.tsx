import ProductCard from '@/app/components/Ebooks/ProductCard';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  format: string
  category: string;
  author: string
  image: string;
  pages: number
  rating: number;
  reviewCount: number;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Whispers of the Forgotten',
    price: 6.99,
    description: 'A collection of haunting short stories exploring memory and loss',
    category: 'Short Stories',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&h=400&q=80',
    author: 'J.K. Storyweaver',
    format: 'PDF, EPUB',
    pages: 184,
    rating: 4.9,
    reviewCount: 127,
  },
  {
    id: '2',
    name: 'The Clockmaker\'s Daughter',
    price: 9.99,
    description: 'A novel about time, family secrets, and the art of healing',
    category: 'Novel',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&h=400&q=80',
    author: 'J.K. Storyweaver',
    format: 'PDF, EPUB, MOBI',
    pages: 342,
    rating: 4.8,
    reviewCount: 89,
  },
  {
    id: '3',
    name: 'Beneath the Willow Tree',
    price: 4.99,
    description: 'A coming-of-age story set in a small coastal town',
    category: 'Novella',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&h=400&q=80',
    author: 'J.K. Storyweaver',
    format: 'PDF, EPUB',
    pages: 112,
    rating: 4.7,
    reviewCount: 64
  },
  {
    id: '4',
    name: 'Echoes of Tomorrow',
    price: 7.99,
    description: 'A speculative fiction collection exploring possible futures',
    category: 'Science Fiction',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&h=400&q=80',
    author: 'J.K. Storyweaver',
    format: 'PDF, EPUB',
    pages: 256,
    rating: 4.6,
    reviewCount: 103
  },
  {
    id: '5',
    name: 'Seasons of the Heart',
    price: 5.99,
    description: 'Poetry collection tracing the emotional journey through a year',
    category: 'Poetry',
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&h=400&q=80',
    author: 'J.K. Storyweaver',
    format: 'PDF',
    pages: 96,
    rating: 4.8,
    reviewCount: 78
  },
  {
    id: '6',
    name: 'The Silent Symphony',
    price: 8.99,
    description: 'A mystery novel set in the world of classical music',
    category: 'Mystery',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=600&h=400&q=80',
    author: 'J.K. Storyweaver',
    format: 'PDF, EPUB, MOBI',
    pages: 298,
    rating: 4.7,
    reviewCount: 142,
  },
  {
    id: '7',
    name: 'Writing from the Soul',
    price: 6.49,
    description: 'A guide to creative writing and finding your authentic voice',
    category: 'Non-Fiction',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&h=400&q=80',
    author: 'J.K. Storyweaver',
    format: 'PDF, EPUB',
    pages: 210,
    rating: 4.9,
    reviewCount: 56
  },
  {
    id: '8',
    name: 'Moonlight Sonata',
    price: 7.49,
    description: 'A romantic tale of love and second chances',
    category: 'Romance',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=400&q=80',
    author: 'J.K. Storyweaver',
    format: 'PDF, EPUB',
    pages: 275,
    rating: 4.5,
    reviewCount: 91
  }
];

const ProductGrid = () => {
  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm">
          All Works
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50">
          Novels
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50">
          Short Stories
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50">
          Poetry
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50">
          Non-Fiction
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-6">
          Want to read more? Subscribe to my newsletter for exclusive content and early access to new works.
        </p>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
          Subscribe to Newsletter
        </button>
      </div>
    </div>
  );
};

export default ProductGrid;