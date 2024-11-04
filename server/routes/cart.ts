import { Router } from 'express';
import { db } from '../db/init';
import { z } from 'zod';

const router = Router();

// Schema for cart item validation
const cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive()
});

// Get cart items
router.get('/', (req, res) => {
  const cartItems = db.prepare(`
    SELECT ci.*, p.name, p.price, p.image
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
  `).all();
  
  res.json(cartItems);
});

// Add item to cart
router.post('/', (req, res) => {
  try {
    const { productId, quantity } = cartItemSchema.parse(req.body);
    
    // Check if product exists and has enough stock
    const product = db.prepare('SELECT stock FROM products WHERE id = ?').get(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Not enough stock' });
    }

    // Add to cart
    const result = db.prepare(`
      INSERT INTO cart_items (product_id, quantity)
      VALUES (?, ?)
    `).run(productId, quantity);

    res.status(201).json({ id: result.lastInsertRowid });
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
});

// Update cart item quantity
router.put('/:id', (req, res) => {
  try {
    const { quantity } = cartItemSchema.parse(req.body);
    
    db.prepare(`
      UPDATE cart_items
      SET quantity = ?
      WHERE id = ?
    `).run(quantity, req.params.id);

    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
});

// Remove item from cart
router.delete('/:id', (req, res) => {
  db.prepare('DELETE FROM cart_items WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

export { router as cartRouter };