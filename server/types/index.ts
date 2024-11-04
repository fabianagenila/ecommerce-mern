export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  stock: number;
}

export interface CartItem {
  id: number;
  product_id: string;
  quantity: number;
  name?: string;
  price?: number;
  image?: string;
}