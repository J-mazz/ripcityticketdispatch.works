const mongoose = require('mongoose');

// Load environment variables
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://doadmin:7c195P84CqA6Nf2a@db-mongo-nyc-888-9dab7096.mongo.ondigitalocean.com/ripcitytickets?retryWrites=true&w=majority&ssl=true&authSource=admin';

console.log('🔍 Testing MongoDB connection...');
console.log('URI:', MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));

mongoose.connect(MONGODB_URI, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 15000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 15000,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  console.log('Database name:', mongoose.connection.db.databaseName);
  console.log('Connection state:', mongoose.connection.readyState);
  
  // Test a simple operation
  return mongoose.connection.db.admin().ping();
})
.then(() => {
  console.log('✅ Database ping successful');
  process.exit(0);
})
.catch(err => {
  console.error('❌ MongoDB connection failed:', err.message);
  console.error('Error code:', err.code);
  console.error('Error name:', err.name);
  if (err.reason) {
    console.error('Reason:', err.reason);
  }
  process.exit(1);
});

// Handle connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});
