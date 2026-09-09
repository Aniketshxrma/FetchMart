import express from 'express';
import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { getDbStatus } from '../config/db.js';
import { memoryStore } from '../data/seedData.js';

const router = express.Router();

// Helper to reliably find user by ID or Email
const findUserByIdOrEmail = async (identifier) => {
  if (!identifier) return null;
  const clean = identifier.toString().trim();
  if (getDbStatus()) {
    if (clean.includes('@')) {
      return await User.findOne({ email: clean.toLowerCase() });
    }
    if (mongoose.Types.ObjectId.isValid(clean)) {
      const u = await User.findById(clean);
      if (u) return u;
    }
    // Fallback search
    return await User.findOne({ email: clean.toLowerCase() });
  }
  return memoryStore.users.find(
    (u) =>
      u.id === clean ||
      u._id === clean ||
      (u.email && u.email.toLowerCase() === clean.toLowerCase())
  );
};

// Helper to sanitize user output
const sanitizeUser = (user) => {
  const u = user.toObject ? user.toObject() : { ...user };
  delete u.password;
  return {
    id: u._id?.toString() || u.id,
    _id: u._id?.toString() || u.id,
    name: u.name,
    email: u.email,
    phone: u.phone || '',
    dateOfBirth: u.dateOfBirth || '14 May 2005',
    gender: u.gender || 'Male',
    avatar: u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    addresses: u.addresses || [],
    wishlist: u.wishlist || [],
    cart: u.cart || [],
    coupons: u.coupons || [
      { code: 'FETCH10', discountPercent: 10, title: 'Welcome Discount', description: '10% off on your orders' },
      { code: 'SUPER60', discountPercent: 60, title: 'Flash Deal 60%', description: 'Up to 60% off on select tech' },
      { code: 'FREESHIP', discountPercent: 100, title: 'Free Express Delivery', description: 'Free shipping on orders above ₹999' }
    ],
    notifications: u.notifications || [
      { title: 'Welcome to FetchMart', message: 'Your account is active. Enjoy exclusive shopping perks!', date: new Date(), read: false }
    ],
    createdAt: u.createdAt || new Date()
  };
};

// 1. POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, dateOfBirth, gender } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();

    if (getDbStatus()) {
      const existing = await User.findOne({ email: cleanEmail });
      if (existing) {
        return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
      }

      const newUser = await User.create({
        name: name.trim(),
        email: cleanEmail,
        password, // Plain text for simplicity in demo or hash if bcrypt configured
        phone: phone ? phone.trim() : '+91 98765 43210',
        dateOfBirth: dateOfBirth || '14 May 2005',
        gender: gender || 'Male',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        addresses: [
          {
            label: 'Home',
            street: '123, Green Park Avenue, Malviya Nagar',
            city: 'New Delhi',
            state: 'Delhi',
            pincode: '110017',
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

      return res.status(201).json({
        success: true,
        message: 'Account created successfully in MongoDB!',
        user: sanitizeUser(newUser)
      });
    }

    // In-memory fallback
    const exists = memoryStore.users.find(u => u.email === cleanEmail);
    if (exists) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    const mockUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      password,
      phone: phone || '+91 98765 43210',
      dateOfBirth: dateOfBirth || '14 May 2005',
      gender: gender || 'Male',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      addresses: [
        {
          _id: `addr-${Date.now()}`,
          label: 'Home',
          street: '123, Green Park Avenue, Malviya Nagar',
          city: 'New Delhi',
          state: 'Delhi',
          pincode: '110017',
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
        { title: 'Welcome to FetchMart!', message: 'Thanks for signing up.', date: new Date(), read: false }
      ]
    };

    memoryStore.users.push(mockUser);
    return res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      user: sanitizeUser(mockUser)
    });
  } catch (error) {
    console.error('Auth register error:', error);
    res.status(500).json({ success: false, message: 'Failed to register account', error: error.message });
  }
});

// 2. POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both email and password.' });
    }

    const cleanEmail = email.trim().toLowerCase();

    if (getDbStatus()) {
      const user = await User.findOne({ email: cleanEmail });
      if (!user || user.password !== password) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }

      return res.json({
        success: true,
        message: `Welcome back, ${user.name}!`,
        user: sanitizeUser(user)
      });
    }

    // In-memory fallback
    const user = memoryStore.users.find(u => u.email === cleanEmail);
    if (!user || user.password !== password) {
      // Auto-create or login demo user if password matches demo123
      if (password === 'password123' || password === 'demo' || password === 'demo123') {
        const demoUser = {
          id: `usr-${cleanEmail.replace(/[^a-zA-Z0-9]/g, '')}`,
          name: cleanEmail.split('@')[0] ? (cleanEmail.split('@')[0].charAt(0).toUpperCase() + cleanEmail.split('@')[0].slice(1)) : 'Aniket Rana',
          email: cleanEmail,
          phone: '+91 98765 43210',
          dateOfBirth: '14 May 2005',
          gender: 'Male',
          addresses: [
            {
              _id: 'addr-default',
              label: 'Home',
              street: '123, Green Park Avenue, Malviya Nagar',
              city: 'New Delhi',
              state: 'Delhi',
              pincode: '110017',
              country: 'India',
              isDefault: true
            }
          ],
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          wishlist: [],
          cart: [],
          coupons: [
            { code: 'FETCH10', discountPercent: 10, title: 'Welcome Discount', description: '10% off on your orders' },
            { code: 'SUPER60', discountPercent: 60, title: 'Flash Deal 60%', description: 'Up to 60% off on select tech' },
            { code: 'FREESHIP', discountPercent: 100, title: 'Free Express Delivery', description: 'Free shipping on orders above ₹999' }
          ]
        };
        return res.json({
          success: true,
          message: `Welcome back, ${demoUser.name}!`,
          user: sanitizeUser(demoUser)
        });
      }
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    return res.json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      user: sanitizeUser(user)
    });
  } catch (error) {
    console.error('Auth login error:', error);
    res.status(500).json({ success: false, message: 'Login failed', error: error.message });
  }
});

// 3. GET /api/auth/profile/:identifier (ID or Email)
router.get('/profile/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    const user = await findUserByIdOrEmail(identifier);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user: sanitizeUser(user) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching profile', error: error.message });
  }
});

// 4. PUT /api/auth/profile/:id - Update personal details
router.put('/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, dateOfBirth, gender, avatar } = req.body;

    const user = await findUserByIdOrEmail(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    if (name) user.name = name.trim();
    if (phone !== undefined) user.phone = phone.trim();
    if (dateOfBirth !== undefined) user.dateOfBirth = dateOfBirth.trim();
    if (gender !== undefined) user.gender = gender.trim();
    if (avatar !== undefined) user.avatar = avatar.trim();

    if (user.save) {
      await user.save();
    }

    return res.json({ success: true, message: 'Profile updated successfully!', user: sanitizeUser(user) });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ success: false, message: 'Failed to update profile', error: error.message });
  }
});

// 5. POST /api/auth/address/:userId - Add a new address
router.post('/address/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { label, street, city, state, pincode, country, isDefault } = req.body;

    if (!street || !city || !state || !pincode) {
      return res.status(400).json({ success: false, message: 'Street, city, state, and pincode are required.' });
    }

    const user = await findUserByIdOrEmail(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const newAddressObj = {
      label: label || 'Home',
      street: street.trim(),
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
      country: country || 'India',
      isDefault: !!isDefault
    };

    if (isDefault) {
      user.addresses.forEach(a => { a.isDefault = false; });
    }

    if (!user.save) {
      newAddressObj._id = `addr-${Date.now()}`;
    }

    user.addresses.push(newAddressObj);

    if (user.save) {
      await user.save();
    }

    return res.json({ success: true, message: 'Address added successfully!', user: sanitizeUser(user) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add address', error: error.message });
  }
});

// 6. PUT /api/auth/address/:userId/:addressId - Set Default or Update Address
router.put('/address/:userId/:addressId', async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const { label, street, city, state, pincode, country, isDefault } = req.body;

    const user = await findUserByIdOrEmail(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    let address = null;
    if (user.addresses.id) {
      address = user.addresses.id(addressId);
    }
    if (!address) {
      address = user.addresses.find(a => (a._id?.toString() === addressId || a.id === addressId));
    }

    if (!address) return res.status(404).json({ success: false, message: 'Address not found' });

    if (label !== undefined) address.label = label;
    if (street !== undefined) address.street = street;
    if (city !== undefined) address.city = city;
    if (state !== undefined) address.state = state;
    if (pincode !== undefined) address.pincode = pincode;
    if (country !== undefined) address.country = country;

    if (isDefault) {
      user.addresses.forEach(a => { a.isDefault = false; });
      address.isDefault = true;
    }

    if (user.save) {
      await user.save();
    }

    return res.json({ success: true, message: 'Address updated successfully!', user: sanitizeUser(user) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update address', error: error.message });
  }
});

// 7. DELETE /api/auth/address/:userId/:addressId - Delete address
router.delete('/address/:userId/:addressId', async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    const user = await findUserByIdOrEmail(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (user.addresses.pull) {
      user.addresses.pull({ _id: addressId });
    } else {
      user.addresses = user.addresses.filter(a => a._id !== addressId && a.id !== addressId);
    }

    if (user.addresses.length > 0 && !user.addresses.some(a => a.isDefault)) {
      user.addresses[0].isDefault = true;
    }

    if (user.save) {
      await user.save();
    }

    return res.json({ success: true, message: 'Address deleted successfully!', user: sanitizeUser(user) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete address', error: error.message });
  }
});

// 8. POST /api/auth/sync-cart/:userId - Sync user's cart to MongoDB Atlas
router.post('/sync-cart/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { cart } = req.body;

    const user = await findUserByIdOrEmail(userId);
    if (user) {
      user.cart = cart || [];
      if (user.save) {
        await user.save();
      }
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 9. POST /api/auth/sync-wishlist/:userId - Sync user's wishlist to MongoDB Atlas
router.post('/sync-wishlist/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { wishlist } = req.body;

    const user = await findUserByIdOrEmail(userId);
    if (user) {
      user.wishlist = wishlist || [];
      if (user.save) {
        await user.save();
      }
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
