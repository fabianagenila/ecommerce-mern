import { Router } from 'express';
import { db } from '../db/init';

const router = Router();

// Get all categories
router.get('/', (req, res) => {
  const categories = db.prepare(`
    SELECT DISTINCT category
    FROM products
    ORDER BY category
  `).all();
  
  res.json(categories);
});

// Get products count by category
router.get('/stats', (req, res) => {
  const stats = db.prepare(`
    SELECT category, COUNT(*) as count
    FROM products
    GROUP BY category
  `).all();
  
  res.json(stats);
});

export { router as categoriesRouter };