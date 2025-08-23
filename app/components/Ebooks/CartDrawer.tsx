'use client';

import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { useCart } from '@/app/context/CardContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CartDrawer = () => {
  const { 
    isCartOpen, 
    closeCart, 
    cartItems, 
    cartTotal, 
    cartCount,
    removeFromCart,
    updateQuantity,
    clearCart
  } = useCart();

  const router = useRouter();

  return (
    <div 
      className={`fixed inset-0 z-50 overflow-hidden transition-opacity ${
        isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity ${
          isCartOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeCart}
      />
      
      {/* Cart panel */}
      <div 
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <ShoppingCartIcon className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-lg font-semibold">Your eBook Cart</h2>
              <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded-full">
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button 
              onClick={closeCart}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close cart"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          {/* Cart items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <ShoppingCartIcon className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">
                  Start browsing to add eBooks to your cart
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                >
                  Browse eBooks
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex border-b pb-4">
                    <div className="relative w-16 h-20 rounded-md overflow-hidden bg-gray-100">
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-900 line-clamp-2">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <p className="text-gray-500 text-sm mt-1">${item.price.toFixed(2)}</p>
                      <p className="text-xs text-gray-400 mt-1">eBook</p>
                      
                      <div className="mt-2 flex items-center">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-l-md hover:bg-gray-200"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-10 h-8 flex items-center justify-center bg-gray-50 text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-r-md hover:bg-gray-200"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-4 bg-gray-50">
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${cartTotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between mb-6 text-lg">
                <span>Total</span>
                <span className="font-bold">${cartTotal.toFixed(2)}</span>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={() => {
                    closeCart();
                    router.push('/checkout');
                  }}
                  className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium mt-2"
                >
                  Proceed to Checkout
                </button>
                
                <button
                  onClick={clearCart}
                  className="w-full flex items-center justify-center text-red-600 py-2 hover:text-red-700 transition font-medium"
                >
                  <TrashIcon className="h-5 w-5 mr-1" />
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;