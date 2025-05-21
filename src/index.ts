import express, { Application } from 'express';
import dotenv from 'dotenv';
import connectDB from './db';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Parse JSON request body
app.use(express.json());

// Define authentication routes
app.use('/auth', authRoutes);

// Define user routes
app.use('/user', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
