const UserModel = require("../models/users");
const mongoose = require('../db/db');

const signup = async (req, res) => {
 /* try {
    const { name, email, password } = req.body;
    const user = await userModel.create({ name, email, password });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error signing up" });
  }*/
  console.log("hi i am signup")
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    // You can implement your signin logic here
    
    res.json({ message: "Signin successful" });
  } catch (error) {
    res.status(500).json({ message: "Error signing in" });
  }
};

  const createUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
       const newUser = new UserModel({
      name,
      password,
      email,
    });
    
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "An error occurred while saving the user." });
  }
  };
  


  async function getUsers() {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }


  async function deleteUser(userId) {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(userId);
      return deletedUser;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }



  async function updateUser(userId, updateData) {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }



module.exports = { signup, signin, createUser, getUsers, updateUser, deleteUser };
