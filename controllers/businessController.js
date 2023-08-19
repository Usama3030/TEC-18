
const BusinessModel = require("../models/business");
const mongoose = require('../db/db');



// Controller to create a new business
exports.createBusiness = async (req, res) => {
  try {
    const businessData = req.body;
    const newBusiness = new BusinessModel(businessData);
    await newBusiness.save();
    res.status(201).json({ message: 'Business created successfully.', business: newBusiness });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the business.' });
  }
};

// Controller to get a business by ID
exports.getBusinessById = async (req, res) => {
  try {
    const businessId = req.params.businessId;
    const business = await BusinessModel.findById(businessId);
    
    if (!business) {
      return res.status(404).json({ error: 'Business not found.' });
    }
    
    res.json(business);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the business.' });
  }
};



