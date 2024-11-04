import express from 'express';
import cors from 'cors';
import { productsRouter } from './routes/products';
import { cartRouter } from './routes/cart';
import { categoriesRouter } from './routes/categories';
import { initializeDatabase } from './db/init';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Initialize database
initializeDatabase();

// Routes
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/categories', categoriesRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});