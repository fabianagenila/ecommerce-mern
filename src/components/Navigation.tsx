import React from 'react';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

interface NavigationProps {
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export function Navigation({ 
  isCartOpen, 
  setIsCartOpen, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}: NavigationProps) {
  const cartItems = useCartStore((state) => state.items);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">ShopHub</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-64 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-600 hover:text-blue-600"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}