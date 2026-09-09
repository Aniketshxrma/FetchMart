import dotenv from 'dotenv';
import dns from 'dns';
import mongoose from 'mongoose';
import { Product } from '../models/Product.js';
import { User } from '../models/User.js';
import { Newsletter } from '../models/Newsletter.js';
import { curatedCatalog } from '../data/seedData.js';

dotenv.config();

try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
  if (typeof dns.setDefaultResultOrder === 'function') {
    dns.setDefaultResultOrder('ipv4first');
  }
} catch (e) {
  // Ignore
}

async function runSeed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ Error: MONGODB_URI is not set in .env');
    process.exit(1);
  }

  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(uri, { dbName: 'fetchmart', serverSelectionTimeoutMS: 15000 });
  console.log(' Connected to database:', mongoose.connection.name);

  console.log('Clearing existing products in database...');
  await Product.deleteMany({});

  console.log(`Inserting ${curatedCatalog.length} curated products...`);
  const formattedCatalog = curatedCatalog.map((p) => {
    const item = { ...p };
    delete item._id;
    return item;
  });
  await Product.insertMany(formattedCatalog);
  console.log(`✅ Products successfully seeded! Total: ${formattedCatalog.length}`);

  const userExists = await User.findOne({ email: 'aniket@fetchmart.in' });
  if (!userExists) {
    console.log('Creating demo user...');
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
    console.log('✅ Demo user created!');
  }

  const newsletterExists = await Newsletter.findOne({ email: 'demo@fetchmart.in' });
  if (!newsletterExists) {
    await Newsletter.create({
      email: 'demo@fetchmart.in',
      subscribedAt: new Date(),
      isActive: true
    });
  }

  console.log('🎉 MongoDB Atlas database is completely initialized and populated!');
  await mongoose.disconnect();
  process.exit(0);
}

runSeed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
