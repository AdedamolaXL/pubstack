'use client';

import Image from 'next/image'
import { Product } from '@/app/components/Ebooks/ProductGrid';
import { StarIcon } from '@heroicons/react/24/solid';
import { useCart } from '@/app/context/CardContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const cartProduct = {
      ...product,
      type: 'ebook' as const
    };
    addToCart(cartProduct);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="relative w-full h-48">
        <Image 
          src={product.image} 
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-dune-900 line-clamp-2">{product.name}</h3>
          <span className="bg-primary-100 text-primary-800 text-xs font-medium px-3.5 py-1.5 rounded">
            {product.category}
          </span>
        </div>
        
        <p className="text-dune-700 text-sm line-clamp-2 mb-3">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-dune-500 mb-3">
          <span>{product.format}</span>
          <span>{product.pages} pages</span>
        </div>
        
        <div className="flex items-center mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-dune-500">
            {product.rating} ({product.reviewCount})
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-dune-900">${product.price.toFixed(2)}</span>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="px-2 py-2 bg-primary-500 text-white rounded-lg text-sm hover:bg-primary-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;