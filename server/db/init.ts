import Database from 'better-sqlite3';
import { products } from '../../src/data/products';

const db = new Database('ecommerce.db');

export function initializeDatabase() {
  // Create products table
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT,
      image TEXT,
      category TEXT NOT NULL,
      rating REAL,
      stock INTEGER NOT NULL
    )
  `);

  // Create cart table
  db.exec(`
    CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      FOREIGN KEY (product_id) REFERENCES products (id)
    )
  `);

  // Insert sample products if table is empty
  const count = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
  
  if (count.count === 0) {
    const insert = db.prepare(`
      INSERT INTO products (id, name, price, description, image, category, rating, stock)
      VALUES (@id, @name, @price, @description, @image, @category, @rating, @stock)
    `);

    products.forEach((product) => {
      insert.run(product);
    });
  }
}

export { db };