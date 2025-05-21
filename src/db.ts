import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGODB_URI as string;

    if (!uri) {
      throw new Error(
        'MONGODB_URI is not defined in the environment variables'
      );
    }

    await mongoose.connect(uri);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectDB;
