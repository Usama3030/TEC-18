
const User = require('../models/users');
const Business = require('../models/business');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');


exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, businessName, roles } = req.body;

    const business = await Business.findOne({ name: businessName });
    if (!business) {
      return res.status(406).json({ error: 'Business not found' });
    }

    const newUser = new User({
      name,
      email,
      password,
      businesses: [{
        business: business._id,
        roles,
      }],
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// Login route
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Construct the user details to return
    const userDetails = {
      _id: user._id,
      name: user.name,
      email: user.email
    };

    res.status(200).json({ message: 'Login successful', user: userDetails });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
