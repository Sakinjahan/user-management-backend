import mongoose from 'mongoose';
import { logger } from '../utils/logger';

const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.MONGODB_URI) {
      logger.error('MONGODB_URI environment variable is required but not provided');
      throw new Error('MONGODB_URI environment variable is required');
    }
    
    logger.info('Attempting to connect to MongoDB...');
    logger.info(`Connection string format: ${process.env.MONGODB_URI.includes('mongodb+srv://') ? '✅ Valid SRV' : '❌ Invalid format'}`);
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    logger.info(`✅ MongoDB Connected Successfully!`);
    logger.info(`Host: ${conn.connection.host}`);
    logger.info(`Database: ${conn.connection.name}`);
  } catch (error: any) {
    logger.error(`❌ Database connection FAILED: ${error.message}`);
    logger.error(`Error code: ${error.code || 'N/A'}`);
    logger.error(`Error reason: ${error.reason || 'Unknown'}`);
    logger.error(`Connection string provided: ${process.env.MONGODB_URI ? 'YES' : 'NO'}`);
    throw error;
  }
};

export default connectDB;
