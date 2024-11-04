import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductGrid } from './components/ProductGrid';
import { Cart } from './components/Cart';
import { products } from './data/products';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <Hero />

      <CategoryFilter
        products={products}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <ProductGrid 
        products={products}
        selectedCategory={selectedCategory}
      />

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={() => setIsCartOpen(false)} 
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2">
                <X className="w-6 h-6" />
              </button>
            </div>
            <Cart />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <CategoryFilter
              products={products}
              selectedCategory={selectedCategory}
              onCategoryChange={(category) => {
                setSelectedCategory(category);
                setIsMobileMenuOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;