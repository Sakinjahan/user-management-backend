import mongoose from 'mongoose';
import { logger } from '../utils/logger';

const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.MONGODB_URI) {
      logger.error('MONGODB_URI environment variable is required but not provided');
      throw new Error('MONGODB_URI environment variable is required');
    }
    
    logger.info('Attempting to connect to MongoDB...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    logger.info(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    logger.error(`❌ Database connection error: ${error.message}`);
    logger.error(`Connection string: ${process.env.MONGODB_URI ? 'Provided' : 'Missing'}`);
    throw error;
  }
};

export default connectDB;