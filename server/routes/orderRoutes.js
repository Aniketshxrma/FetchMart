import express from 'express';
import { Order } from '../models/Order.js';
import { getDbStatus } from '../config/db.js';
import { memoryStore } from '../data/seedData.js';

const router = express.Router();

// Generate human-readable tracking ID (e.g. FM-849201)
const generateTrackingId = () => {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `FM-${num}`;
};

// POST /api/orders - Create new order
router.post('/', async (req, res) => {
  try {
    const {
      items,
      customer,
      shippingAddress,
      payment,
      pricing
    } = req.body;

    if (!items || !items.length || !customer || !shippingAddress) {
      return res.status(400).json({ success: false, message: 'Missing required order details' });
    }

    const trackingId = generateTrackingId();
    const estDelivery = new Date();
    estDelivery.setDate(estDelivery.getDate() + 3);

    const orderData = {
      trackingId,
      items,
      customer,
      shippingAddress,
      payment: {
        method: payment?.method || 'UPI',
        status: payment?.status || 'Paid',
        transactionId: payment?.transactionId || `TXN-${Date.now()}`
      },
      pricing: {
        subtotal: pricing?.subtotal || 0,
        discount: pricing?.discount || 0,
        shippingFee: pricing?.shippingFee || 0,
        tax: pricing?.tax || 0,
        total: pricing?.total || 0
      },
      status: 'Order Placed',
      statusTimeline: [
        {
          status: 'Order Placed',
          timestamp: new Date(),
          message: 'Order received and verified successfully.'
        }
      ],
      estimatedDeliveryDate: estDelivery,
      createdAt: new Date()
    };

    if (getDbStatus()) {
      const newOrder = await Order.create(orderData);
      return res.status(201).json({
        success: true,
        message: 'Order placed successfully!',
        order: newOrder,
        trackingId: newOrder.trackingId
      });
    }

    // Save to memory store fallback
    memoryStore.orders.push(orderData);
    return res.status(201).json({
      success: true,
      message: 'Order placed successfully (In-Memory mode)!',
      order: orderData,
      trackingId: orderData.trackingId
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, message: 'Failed to create order', error: error.message });
  }
});

// GET /api/orders/track/:trackingId - Track order status
router.get('/track/:trackingId', async (req, res) => {
  try {
    const { trackingId } = req.params;
    const cleanId = trackingId.trim().toUpperCase();

    let foundOrder = null;

    if (getDbStatus()) {
      foundOrder = await Order.findOne({ trackingId: cleanId });
    }

    if (!foundOrder) {
      foundOrder = memoryStore.orders.find(o => o.trackingId.toUpperCase() === cleanId);
    }

    if (!foundOrder) {
      // Return a simulated mock tracking status if testing arbitrary ID
      const dummyTimeline = [
        { status: 'Order Placed', timestamp: new Date(Date.now() - 3600000 * 24), message: 'Order placed and confirmed.' },
        { status: 'Confirmed', timestamp: new Date(Date.now() - 3600000 * 18), message: 'Payment verified & order packaged.' },
        { status: 'Shipped', timestamp: new Date(Date.now() - 3600000 * 6), message: 'Dispatched via Express Courier.' },
        { status: 'Out for Delivery', timestamp: new Date(), message: 'Courier is out for delivery in Kangra.' }
      ];

      return res.json({
        success: true,
        isSimulated: true,
        order: {
          trackingId: cleanId,
          status: 'Out for Delivery',
          customer: { name: 'Customer', city: 'Kangra, HP' },
          estimatedDeliveryDate: new Date(Date.now() + 86400000),
          statusTimeline: dummyTimeline,
          items: [{ title: 'FetchMart Premium Order Items', quantity: 1, price: 2499 }]
        }
      });
    }

    return res.json({ success: true, order: foundOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving order tracking', error: error.message });
  }
});

// GET /api/orders/user/:email - Get order history by email
router.get('/user/:email', async (req, res) => {
  try {
    const { email } = req.params;
    let userOrders = [];

    if (getDbStatus()) {
      userOrders = await Order.find({ 'customer.email': email.toLowerCase() }).sort({ createdAt: -1 });
    } else {
      userOrders = memoryStore.orders.filter(o => o.customer.email.toLowerCase() === email.toLowerCase());
    }

    res.json({ success: true, count: userOrders.length, orders: userOrders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user orders', error: error.message });
  }
});

export default router;
