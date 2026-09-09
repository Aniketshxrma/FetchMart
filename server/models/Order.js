import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.Mixed,
    default: 'prod-item',
  },
  id: mongoose.Schema.Types.Mixed,
  cartItemId: String,
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: Number,
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  image: {
    type: String,
  },
  category: String,
  selectedColor: String,
  selectedSize: String,
}, { _id: false });

const orderSchema = new mongoose.Schema({
  trackingId: {
    type: String,
    required: true,
    unique: true,
  },
  items: [orderItemSchema],
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, default: 'India' },
  },
  payment: {
    method: { type: String, required: true }, // 'UPI', 'Card', 'NetBanking', 'COD'
    status: { type: String, default: 'Paid' },
    transactionId: String,
  },
  pricing: {
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    shippingFee: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, required: true },
  },
  status: {
    type: String,
    enum: ['Order Placed', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Order Placed',
  },
  statusTimeline: [{
    status: String,
    timestamp: { type: Date, default: Date.now },
    message: String,
  }],
  estimatedDeliveryDate: {
    type: Date,
  }
}, {
  timestamps: true,
});

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
