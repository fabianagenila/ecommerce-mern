import React from 'react';
import { Product } from '../types/product';

interface CategoryFilterProps {
  products: Product[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ 
  products, 
  selectedCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  const categories = ['All', ...new Set(products.map(product => product.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}