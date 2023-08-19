const UserModel = require("../models/users");
const mongoose = require('../db/db');

//create api
exports.createUser = async (req, res) =>{
  try{
    const userData = req.body;
    const newUser = new UserModel(userData);
    await newUser.save();
    res.status(201).json({ message: 'User created successfully.', user: newUser });
  }catch (error) {
    res.status(500).json({ error: 'An error Occured while creating user.'});
  }
};

//Get APi

exports.getUserById = async (req, res) =>{
  try{
    const userId = req.params.userId;
    const user = await UserModel.findById(userId);

    if(!user){
      return res.status(404).json({error: 'User not found.'});
    }

    res.json(user);
  }catch (error) {
    res.status(500).json({error: 'An error occured while fetching User.'});
  }
};
