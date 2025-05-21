import dotenv from 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from "./config/db.js"
import authRoutes from "./routes/auth.routes.js"
import bookRoutes from './routes/book.routes.js';
import reviewRoutes from './routes/review.routes.js';
import { errorHandler } from './middleware/error.middleware.js';


// Connect to database
connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api', reviewRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});