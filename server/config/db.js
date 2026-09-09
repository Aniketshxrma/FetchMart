import mongoose from 'mongoose';
import dns from 'dns';
import { Product } from '../models/Product.js';
import { User } from '../models/User.js';
import { Newsletter } from '../models/Newsletter.js';
import { curatedCatalog } from '../data/seedData.js';

// Fix Windows Node.js querySrv ECONNREFUSED issue with Atlas SRV DNS records
// (Only run on Windows locally, avoid overriding cloud container DNS on Linux/Render)
if (process.platform === 'win32') {
  try {
    dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
    if (typeof dns.setDefaultResultOrder === 'function') {
      dns.setDefaultResultOrder('ipv4first');
    }
  } catch (e) {
    // Ignore if not permitted
  }
}

let isConnected = false;
let lastDbError = null;

// Auto-seed initial data to MongoDB Atlas if collections are empty
export const autoSeedDatabase = async () => {
  try {
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('🌱 Populating MongoDB Atlas with initial product catalog...');
      const formattedCatalog = curatedCatalog.map((p) => {
        const item = { ...p };
        // Remove custom mock string _id so Mongo assigns valid ObjectIds or keeps consistent
        delete item._id;
        return item;
      });
      await Product.insertMany(formattedCatalog);
      console.log(`✅ Successfully seeded ${formattedCatalog.length} products to MongoDB Atlas!`);
    }

    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('🌱 Creating default demo user in MongoDB Atlas...');
      await User.create({
        name: 'Aniket Sharma',
        email: 'aniket@fetchmart.in',
        password: 'password123',
        phone: '+91 98765 43210',
        dateOfBirth: '14 May 2005',
        gender: 'Male',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        addresses: [
          {
            label: 'Home',
            street: 'Main Bazaar Road, Near Bus Stand',
            city: 'Kangra',
            state: 'Himachal Pradesh',
            pincode: '176001',
            country: 'India',
            isDefault: true
          }
        ],
        wishlist: [],
        cart: [],
        coupons: [
          { code: 'FETCH10', discountPercent: 10, title: 'Welcome Discount', description: '10% off on your orders' },
          { code: 'SUPER60', discountPercent: 60, title: 'Flash Deal 60%', description: 'Up to 60% off on select tech' },
          { code: 'FREESHIP', discountPercent: 100, title: 'Free Express Delivery', description: 'Free shipping on orders above ₹999' }
        ],
        notifications: [
          { title: 'Welcome to FetchMart!', message: 'Thanks for signing up. Enjoy 10% instant discount with code FETCH10.', date: new Date(), read: false }
        ]
      });
      console.log('✅ Default demo user created in MongoDB Atlas!');
    }

    const newsletterCount = await Newsletter.countDocuments();
    if (newsletterCount === 0) {
      await Newsletter.create({
        email: 'demo@fetchmart.in',
        subscribedAt: new Date(),
        isActive: true
      });
    }
  } catch (seedErr) {
    console.warn('⚠️  Auto-seed warning:', seedErr.message);
  }
};

export const connectDB = async () => {
  const rawURI = process.env.MONGODB_URI || process.env.MONGO_URI || process.env.DATABASE_URL;
  const mongoURI = rawURI ? rawURI.trim().replace(/^['"]|['"]$/g, '') : '';

  if (!mongoURI || mongoURI.includes('<username>') || mongoURI.includes('<db_password>')) {
    const reason = !mongoURI ? 'MONGODB_URI environment variable is missing or empty' : 'MONGODB_URI contains unreplaced placeholder values';
    console.log(`ℹ️  ${reason}. Running in In-Memory fallback mode.`);
    lastDbError = reason;
    return false;
  }

  try {
    const conn = await mongoose.connect(mongoURI, {
      dbName: 'fetchmart',
      serverSelectionTimeoutMS: 10000,
    });
    isConnected = true;
    lastDbError = null;
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host} (Database: ${conn.connection.name})`);
    
    // Automatically seed data if needed so database and collections appear in Atlas immediately
    await autoSeedDatabase();
    return true;
  } catch (error) {
    lastDbError = error.message;
    console.warn(`⚠️  MongoDB Connection Warning: ${error.message}. Running in In-Memory fallback mode.`);
    isConnected = false;
    return false;
  }
};

export const getDbStatus = () => isConnected;
export const getDbError = () => lastDbError;


