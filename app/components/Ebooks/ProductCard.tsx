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

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
          <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {product.category}
          </span>
        </div>
        
        <p className="text-gray-500 text-sm line-clamp-2 mb-3">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
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
          <span className="ml-2 text-sm text-gray-500">
            {product.rating} ({product.reviewCount})
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
            <div className="text-xs text-green-600 font-medium mt-1">
              Directly supports the author
            </div>
          </div>
          
          <button 
            onClick={() => addToCart(product)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition font-medium"
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