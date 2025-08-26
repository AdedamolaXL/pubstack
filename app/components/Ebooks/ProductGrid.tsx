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
    name: 'Milk and Honey',
    price: 6.99,
    description: 'A collection of haunting short stories exploring memory and loss',
    category: 'Mystery',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&h=400&q=80',
    author: 'J.K. Storyweaver',
    format: 'PDF, EPUB',
    pages: 184,
    rating: 4.9,
    reviewCount: 127,
  },
  {
    id: '2',
    name: 'The Two Towers',
    price: 9.99,
    description: 'A novel about time, family secrets, and the art of healing',
    category: 'Novel',
    image: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?auto=format&fit=crop&w=600&h=400&q=80',
    author: 'J.K. Storyweaver',
    format: 'PDF, EPUB, MOBI',
    pages: 342,
    rating: 4.8,
    reviewCount: 89,
  },
  {
    id: '3',
    name: 'Soul Is A River',
    price: 4.99,
    description: 'A coming-of-age story set in a small coastal town',
    category: 'Novella',
    image: 'https://images.unsplash.com/photo-1511108690759-009324a90311?auto=format&fit=crop&w=600&h=400&q=80',
    author: 'J.K. Storyweaver',
    format: 'PDF, EPUB',
    pages: 112,
    rating: 4.7,
    reviewCount: 64
  },
  {
    id: '4',
    name: 'Chronicles Of Narnia',
    price: 7.99,
    description: 'A speculative fiction collection exploring possible futures',
    category: 'Sci-Fi',
    image: 'https://images.unsplash.com/photo-1629992101753-56d196c8aabb?auto=format&fit=crop&w=600&h=400&q=80',
    author: 'J.K. Storyweaver',
    format: 'PDF, EPUB',
    pages: 256,
    rating: 4.6,
    reviewCount: 103
  },
  {
    id: '5',
    name: 'The Christmas Wish',
    price: 5.99,
    description: 'Poetry collection tracing the emotional journey through a year',
    category: 'Poetry',
    image: 'https://images.unsplash.com/photo-1702505020684-25200aaa70e9?auto=format&fit=crop&w=600&h=400&q=80',
    author: 'J.K. Storyweaver',
    format: 'PDF',
    pages: 96,
    rating: 4.8,
    reviewCount: 78
  },
  {
    id: '6',
    name: 'How To Read The Wilderness',
    price: 8.99,
    description: 'A mystery novel set in the world of classical music',
    category: 'Mystery',
    image: 'https://images.unsplash.com/photo-1686126070034-b468759def4e?auto=format&fit=crop&w=600&h=400&q=80',
    author: 'J.K. Storyweaver',
    format: 'PDF, EPUB, MOBI',
    pages: 298,
    rating: 4.7,
    reviewCount: 142,
  },
  {
    id: '7',
    name: 'The Green Witch',
    price: 6.49,
    description: 'A guide to creative writing and finding your authentic voice',
    category: 'Non-Fiction',
    image: 'https://images.unsplash.com/photo-1607773709386-632c2987bdd2?auto=format&fit=crop&w=600&h=400&q=80',
    author: 'J.K. Storyweaver',
    format: 'PDF, EPUB',
    pages: 210,
    rating: 4.9,
    reviewCount: 56
  },
  {
    id: '8',
    name: 'The Fine Print',
    price: 5.49,
    description: 'A guide to creative writing and finding your authentic voice',
    category: 'Romance',
    image: 'https://images.unsplash.com/photo-1711185898226-beea7eee0611?auto=format&fit=crop&w=600&h=400&q=80',
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
        <button className="px-4 py-2 bg-primary-500 text-white rounded-full text-sm hover:bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
          All Works
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 text-dune-700 rounded-full text-sm hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
          Novels
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 text-dune-700 rounded-full text-sm hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
          Short Stories
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 text-dune-700 rounded-full text-sm hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
          Poetry
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 text-dune-700 rounded-full text-sm hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
          Non-Fiction
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-dune-600 mb-6">
          Want to read more? Subscribe to my newsletter for exclusive content and early access to new works.
        </p>
        <button className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
          Subscribe to Newsletter
        </button>
      </div>
    </div>
  );
};

export default ProductGrid;