const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post(
  '/register',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({
          success: false,
          message: 'User already exists'
        });
      }

      // Create user
      user = new User({
        name,
        email,
        password
      });

      // Save user to database
      await user.save();

      // Create token
      const token = user.getSignedJwtToken();

      res.status(201).json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        success: false,
        message: 'Server Error'
      });
    }
  }
);

// @route   POST api/users/login
// @desc    Login user & get token
// @access  Public
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists()
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email }).select('+password');

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Check if password matches
      const isMatch = await user.matchPassword(password);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Create token
      const token = user.getSignedJwtToken();

      res.json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        success: false,
        message: 'Server Error'
      });
    }
  }
);

// @route   GET api/users/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({
      success: true,
      data: user
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

// @route   PUT api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  const { name, email } = req.body;

  // Build user object
  const userFields = {};
  if (name) userFields.name = name;
  if (email) userFields.email = email;

  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: userFields },
      { new: true }
    );

    res.json({
      success: true,
      data: user
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

// @route   PUT api/users/password
// @desc    Update password
// @access  Private
router.put(
  '/password',
  [
    protect,
    body('currentPassword', 'Current password is required').exists(),
    body('newPassword', 'New password must be at least 6 characters').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('+password');

      // Check current password
      const isMatch = await user.matchPassword(req.body.currentPassword);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Current password is incorrect'
        });
      }

      // Set new password
      user.password = req.body.newPassword;
      await user.save();

      res.json({
        success: true,
        message: 'Password updated successfully'
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        success: false,
        message: 'Server Error'
      });
    }
  }
);

module.exports = router;