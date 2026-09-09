import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    default: function() {
      return Math.round(this.price * 1.35);
    }
  },
  discountPercentage: {
    type: Number,
    default: function() {
      if (this.originalPrice && this.originalPrice > this.price) {
        return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
      }
      return 25;
    }
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
  }],
  rating: {
    rate: {
      type: Number,
      default: 4.4,
    },
    count: {
      type: Number,
      default: 120,
    }
  },
  isPopular: {
    type: Boolean,
    default: false,
  },
  badge: {
    type: String,
    default: '',
  },
  stock: {
    type: Number,
    default: 45,
  },
  colors: [{
    type: String,
  }],
  sizes: [{
    type: String,
  }],
  features: [{
    type: String,
  }],
  specs: {
    type: Map,
    of: String,
    default: {},
  }
}, {
  timestamps: true,
});

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
