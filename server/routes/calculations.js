const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Calculation = require('../models/Calculation');
const { protect } = require('../middleware/auth');

// @route   GET api/calculations
// @desc    Get all calculations for a user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const calculations = await Calculation.find({ user: req.user.id }).sort({
      createdAt: -1
    });

    res.json({
      success: true,
      count: calculations.length,
      data: calculations
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

// @route   GET api/calculations/:id
// @desc    Get calculation by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const calculation = await Calculation.findById(req.params.id);

    if (!calculation) {
      return res.status(404).json({
        success: false,
        message: 'Calculation not found'
      });
    }

    // Make sure user owns calculation
    if (calculation.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this calculation'
      });
    }

    res.json({
      success: true,
      data: calculation
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Calculation not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

// @route   POST api/calculations
// @desc    Create a calculation
// @access  Private
router.post(
  '/',
  [
    protect,
    [
      body('type', 'Type is required').not().isEmpty(),
      body('title', 'Title is required').not().isEmpty(),
      body('parameters', 'Parameters are required').not().isEmpty(),
      body('results', 'Results are required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { type, title, parameters, results } = req.body;

    try {
      // Create calculation
      const newCalculation = new Calculation({
        type,
        title,
        parameters,
        results,
        user: req.user.id
      });

      const calculation = await newCalculation.save();

      res.status(201).json({
        success: true,
        data: calculation
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

// @route   PUT api/calculations/:id
// @desc    Update a calculation
// @access  Private
router.put('/:id', protect, async (req, res) => {
  const { type, title, parameters, results } = req.body;

  // Build calculation object
  const calculationFields = {};
  if (type) calculationFields.type = type;
  if (title) calculationFields.title = title;
  if (parameters) calculationFields.parameters = parameters;
  if (results) calculationFields.results = results;

  try {
    let calculation = await Calculation.findById(req.params.id);

    if (!calculation) {
      return res.status(404).json({
        success: false,
        message: 'Calculation not found'
      });
    }

    // Make sure user owns calculation
    if (calculation.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this calculation'
      });
    }

    calculation = await Calculation.findByIdAndUpdate(
      req.params.id,
      { $set: calculationFields },
      { new: true }
    );

    res.json({
      success: true,
      data: calculation
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Calculation not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

// @route   DELETE api/calculations/:id
// @desc    Delete a calculation
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const calculation = await Calculation.findById(req.params.id);

    if (!calculation) {
      return res.status(404).json({
        success: false,
        message: 'Calculation not found'
      });
    }

    // Make sure user owns calculation
    if (calculation.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this calculation'
      });
    }

    await Calculation.deleteOne({ _id: req.params.id });

    res.json({
      success: true,
      message: 'Calculation removed'
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Calculation not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

// @route   GET api/calculations/type/:type
// @desc    Get calculations by type
// @access  Private
router.get('/type/:type', protect, async (req, res) => {
  try {
    const calculations = await Calculation.find({
      user: req.user.id,
      type: req.params.type
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: calculations.length,
      data: calculations
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

module.exports = router;