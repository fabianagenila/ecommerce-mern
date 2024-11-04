import { Router } from 'express';
import { db } from '../db/init';
import { z } from 'zod';

const router = Router();

// Schema for product validation
const productSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  description: z.string(),
  image: z.string().url(),
  category: z.string().min(1),
  rating: z.number().min(0).max(5),
  stock: z.number().int().min(0)
});

// Get all products
router.get('/', (req, res) => {
  const products = db.prepare('SELECT * FROM products').all();
  res.json(products);
});

// Get product by ID
router.get('/:id', (req, res) => {
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
});

// Get products by category
router.get('/category/:category', (req, res) => {
  const products = db.prepare('SELECT * FROM products WHERE category = ?').all(req.params.category);
  res.json(products);
});

export { router as productsRouter };