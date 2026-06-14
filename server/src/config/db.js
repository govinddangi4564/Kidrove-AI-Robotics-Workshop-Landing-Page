const mongoose = require('mongoose');

let isInMemory = false;
const inMemoryStore = [];

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.warn('⚠️ MONGODB_URI is not set in environment variables.');
    console.warn('⚠️ Server will fall back to In-Memory storage array.');
    isInMemory = true;
    return;
  }

  try {
    // Setting connection timeout options for rapid fallback
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    isInMemory = false;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn('⚠️ Falling back to In-Memory storage array.');
    isInMemory = true;
  }
};

module.exports = {
  connectDB,
  getStorageMode: () => (isInMemory ? 'in-memory' : 'mongodb'),
  inMemoryStore,
};
