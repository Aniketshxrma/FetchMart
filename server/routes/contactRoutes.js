import express from 'express';
import { Contact } from '../models/Contact.js';
import { getDbStatus } from '../config/db.js';
import { memoryStore } from '../data/seedData.js';

const router = express.Router();

// POST /api/contact - Submit contact query
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
    }

    const contactData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      subject: subject.trim(),
      message: message.trim(),
      status: 'New',
      createdAt: new Date(),
    };

    if (getDbStatus()) {
      const saved = await Contact.create(contactData);
      return res.status(201).json({
        success: true,
        message: 'Thank you for reaching out! Our team will get back to you within 24 hours.',
        data: saved
      });
    }

    memoryStore.contacts.push(contactData);
    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Our team will get back to you within 24 hours.',
      data: contactData
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit contact message', error: error.message });
  }
});

// GET /api/contact - View submissions
router.get('/', async (req, res) => {
  try {
    if (getDbStatus()) {
      const messages = await Contact.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: messages.length, data: messages });
    }
    return res.json({ success: true, count: memoryStore.contacts.length, data: memoryStore.contacts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
