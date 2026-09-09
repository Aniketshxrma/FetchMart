import express from 'express';
import { Newsletter } from '../models/Newsletter.js';
import { getDbStatus } from '../config/db.js';
import { memoryStore } from '../data/seedData.js';

const router = express.Router();

// POST /api/newsletter - Subscribe email to newsletter
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    const cleanEmail = email.trim().toLowerCase();

    if (getDbStatus()) {
      const existing = await Newsletter.findOne({ email: cleanEmail });
      if (existing) {
        return res.json({ success: true, message: 'You are already subscribed to FetchMart offers!' });
      }
      await Newsletter.create({ email: cleanEmail });
      return res.status(201).json({
        success: true,
        message: '🎉 Awesome! You are now subscribed to exclusive FetchMart offers and updates.'
      });
    }

    const existsInMem = memoryStore.newsletters.some(n => n.email === cleanEmail);
    if (existsInMem) {
      return res.json({ success: true, message: 'You are already subscribed to FetchMart offers!' });
    }

    memoryStore.newsletters.push({ email: cleanEmail, subscribedAt: new Date(), isActive: true });
    return res.status(201).json({
      success: true,
      message: '🎉 Awesome! You are now subscribed to exclusive FetchMart offers and updates.'
    });
  } catch (error) {
    console.error('Newsletter error:', error);
    res.status(500).json({ success: false, message: 'Failed to subscribe email', error: error.message });
  }
});

// GET /api/newsletter - List subscribers
router.get('/', async (req, res) => {
  try {
    if (getDbStatus()) {
      const subs = await Newsletter.find();
      return res.json({ success: true, count: subs.length, data: subs });
    }
    return res.json({ success: true, count: memoryStore.newsletters.length, data: memoryStore.newsletters });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
