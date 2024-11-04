import React from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export function Cart() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center py-4 border-b">
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-cover rounded"
          />
          <div className="flex-1 ml-4">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-600">${item.price}</p>
            <div className="flex items-center mt-2">
              <select
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                className="border rounded p-1"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="p-2 text-gray-400 hover:text-red-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ))}
      <div className="mt-4 text-right">
        <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Checkout
        </button>
      </div>
    </div>
  );
}