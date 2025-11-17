import mongoose from 'mongoose';
import env from './env.js';

const connectDB = async () => {
  try {
    const mongoURI = env.MONGODB_URI || 'mongodb://localhost:27017/vehicle-management';
    
    const connection = await mongoose.connect(mongoURI);

    console.log(`MongoDB Connected: ${connection.connection.host}`);
    
    return connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;