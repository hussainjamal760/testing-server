const express = require('express');
const router = express.Router();
const User = require('../models/user');

// POST /api/users - create a new user
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      // duplicate key error
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
