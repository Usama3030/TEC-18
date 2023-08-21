
const User = require('../models/users');
const Business = require('../models/business');

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
