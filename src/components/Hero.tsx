import React from 'react';

export function Hero() {
  return (
    <div className="relative bg-blue-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="md:w-2/3">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Shop the Future Today
          </h1>
          <p className="text-xl mb-8">
            Discover amazing products at unbeatable prices
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}