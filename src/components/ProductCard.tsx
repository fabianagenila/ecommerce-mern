import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types/product';
import { useCartStore } from '../store/cartStore';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">${product.price}</span>
          <button
            onClick={() => addItem(product)}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}