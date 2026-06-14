const express = require('express');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const { connectDB, getStorageMode, inMemoryStore } = require('./config/db');
const Enquiry = require('./models/Enquiry');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Initialize DB Connection
connectDB();

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    storageMode: getStorageMode(),
    ...(getStorageMode() === 'in-memory' ? { recordCount: inMemoryStore.length } : {})
  });
});

// POST /api/enquiry
app.post(
  '/api/enquiry',
  [
    body('name')
      .trim()
      .notEmpty().withMessage('Name is required')
      .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Invalid email address')
      .normalizeEmail(),
    body('phone')
      .trim()
      .notEmpty().withMessage('Phone number is required')
      .isNumeric().withMessage('Phone number must contain numbers only')
      .isLength({ min: 10, max: 10 }).withMessage('Phone number must be exactly 10 digits')
      .matches(/^[6-9]\d{9}$/).withMessage('Invalid Indian mobile number (must start with 6-9)')
  ],
  async (req, res) => {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((err) => ({
          field: err.path || err.param,
          message: err.msg,
        })),
      });
    }

    const { name, email, phone } = req.body;

    try {
      const storageMode = getStorageMode();
      let savedData;

      if (storageMode === 'mongodb') {
        const newEnquiry = new Enquiry({ name, email, phone });
        savedData = await newEnquiry.save();
      } else {
        // Fallback store
        savedData = {
          name,
          email,
          phone,
          createdAt: new Date(),
          source: 'workshop-landing',
        };
        inMemoryStore.push(savedData);
      }

      console.log(`✨ Enquiry processed [${storageMode}]:`, { name, email, phone });

      return res.status(201).json({
        success: true,
        message: 'Enquiry received successfully',
        data: {
          name: savedData.name,
          email: savedData.email,
          phone: savedData.phone,
        },
      });
    } catch (error) {
      console.error('❌ Error handling enquiry:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error while saving enquiry',
      });
    }
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} [Storage Mode: ${getStorageMode()}]`);
});
