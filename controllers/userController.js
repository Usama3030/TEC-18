
const User = require('../models/users');
const Business = require('../models/business');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // Import jwt library
const nodemailer = require("nodemailer");
const crypto = require('crypto'); // Import crypto library

// Generate a random secret key for JWT signing
const tokenSecretKey = crypto.randomBytes(64).toString('hex');
console.log('Generated Secret Key:', tokenSecretKey);

const mailgun = require('mailgun-js')({
  apiKey: '67014088d315cf79e7be791d6630113a-f0e50a42-c8d897b6',
  domain: 'sandbox3de5fce710b94d3d9615b047bb4bc6fc.mailgun.org',
});

// ...

const verifyUserToken = (token) => {
  try {
    const decoded = jwt.verify(token, tokenSecretKey);
    return { isValid: true, user_id: decoded.user_id };
  } catch (error) {
    return { isValid: false, error: error.message };
  }
};

exports.verifyUser = async (req, res) => {
  const { token } = req.params;
  const verificationResult = verifyUserToken(token);

  if (verificationResult.isValid) {
    try {
      const user = await User.findById(verificationResult.user_id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Update user status as verified
      user.isVerified = true;
      await user.save();

       // Generate a login token and log in the user
       const loginToken = jwt.sign({ user_id: user._id }, tokenSecretKey, { expiresIn: '1h' });

       res.redirect(`https://localhost:3000/api/login?token=${loginToken}`);

      res.status(200).json({ message: 'Account verified successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(400).json({ error: verificationResult.error });
  }
};

const sendVerifyEmail = async (name, email, user_id) => {
  try {
    const token = jwt.sign({ user_id }, tokenSecretKey, { expiresIn: '24h' });

    const data = {
      from: 'usamabajwa3030@gmail.com', // Sender email address
      to: email,
      subject: 'Verify Your Account',
      text: `Hello ${name},\n\nClick the following link to verify your account: https://your-verification-link/${token}`,
    };
    
    mailgun.messages().send(data, (error, body) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', body);
      }
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

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

    sendVerifyEmail(req.body.name, req.body.email, savedUser._id );
    
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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
    const loginToken = jwt.sign({ user_id: user._id }, tokenSecretKey);
    //const loginToken = jwt.sign({ user_id: user._id }, tokenSecretKey, { expiresIn: '1h' });

    // Construct the user details to return
    const userDetails = {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: loginToken
    };

    res.status(200).json({ message: 'Login successful', user: userDetails });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
