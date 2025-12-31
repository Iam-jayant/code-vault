import mongoose from 'mongoose';

let isConnected = false;

/**
 * MongoDB connection singleton
 * Ensures single connection instance across the application
 */
export async function connectDB(): Promise<typeof mongoose> {
  if (isConnected) {
    console.log('[MongoDB] Using existing connection');
    return mongoose;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('[MongoDB] MONGODB_URI environment variable is not set');
  }

  try {
    console.log('[MongoDB] Connecting to database...');
    
    const connection = await mongoose.connect(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
    });

    isConnected = true;
    console.log('[MongoDB] Connected successfully');
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('[MongoDB] Connection error:', err);
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.log('[MongoDB] Disconnected');
      isConnected = false;
    });

    return connection;
  } catch (error) {
    console.error('[MongoDB] Failed to connect:', error);
    isConnected = false;
    throw error;
  }
}

/**
 * Disconnect from MongoDB
 */
export async function disconnectDB(): Promise<void> {
  if (!isConnected) {
    return;
  }

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log('[MongoDB] Disconnected successfully');
  } catch (error) {
    console.error('[MongoDB] Error disconnecting:', error);
    throw error;
  }
}

/**
 * Check if database is connected
 */
export function isDBConnected(): boolean {
  return isConnected && mongoose.connection.readyState === 1;
}
