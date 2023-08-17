const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// User Routes

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);

// Create a route for creating users
router.post("/create-user", userController.createUser);

// Create a route for fetching users
router.get('/get-user', async (req, res) => {
    try {
      const users = await userController.getUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
  });

  // Create a route for updating a user
router.put('/:userId', async (req, res) => {
    const { userId } = req.params;
    const updateData = req.body;
  
    try {
      const updatedUser = await userController.updateUser(userId, updateData);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the user.' });
    }
  });

  // Create a route for deleting a user
router.delete('/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const deletedUser = await userController.deleteUser(userId);
      res.json(deletedUser);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the user.' });
    }
  });


module.exports = router;
