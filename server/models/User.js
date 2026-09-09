import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  label: { type: String, default: 'Home' }, // 'Home', 'Work', 'Other'
  street: { type: String, default: '' },
  city: { type: String, default: '' },
  state: { type: String, default: '' },
  pincode: { type: String, default: '' },
  country: { type: String, default: 'India' },
  isDefault: { type: Boolean, default: false }
}, { _id: true });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: '',
    trim: true,
  },
  dateOfBirth: {
    type: String,
    default: '',
  },
  gender: {
    type: String,
    default: 'Male',
  },
  avatar: {
    type: String,
    default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  addresses: [addressSchema],
  wishlist: [{
    _id: false,
    id: mongoose.Schema.Types.Mixed,
    productId: mongoose.Schema.Types.Mixed,
    title: { type: String, default: '' },
    price: { type: Number, default: 0 },
    originalPrice: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    discountPercentage: { type: Number, default: 0 },
    image: { type: String, default: '' },
    images: [String],
    category: { type: String, default: 'General' },
    rating: mongoose.Schema.Types.Mixed,
    reviewsCount: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true },
    stock: { type: Number, default: 20 },
    badge: { type: String, default: '' },
    description: { type: String, default: '' },
    brand: { type: String, default: 'FetchMart' },
    specs: mongoose.Schema.Types.Mixed
  }],
  cart: [{
    _id: false,
    id: mongoose.Schema.Types.Mixed,
    productId: mongoose.Schema.Types.Mixed,
    cartItemId: { type: String, default: '' },
    title: { type: String, default: '' },
    price: { type: Number, default: 0 },
    originalPrice: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    discountPercentage: { type: Number, default: 0 },
    image: { type: String, default: '' },
    images: [String],
    category: { type: String, default: 'General' },
    quantity: { type: Number, default: 1 },
    selectedColor: { type: String, default: '' },
    selectedSize: { type: String, default: '' },
    rating: mongoose.Schema.Types.Mixed,
    badge: { type: String, default: '' },
    description: { type: String, default: '' },
    brand: { type: String, default: 'FetchMart' }
  }],
  coupons: [{
    _id: false,
    code: String,
    discountPercent: Number,
    flatDiscount: Number,
    title: String,
    description: String,
    minOrder: Number
  }],
  notifications: [{
    _id: false,
    title: String,
    message: String,
    date: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }
  }]
}, {
  timestamps: true,
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
