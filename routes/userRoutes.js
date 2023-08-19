const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// User Routes


router.post('/user', userController.createUser);
router.get('/user/:userId', userController.getUserById);


module.exports = router;
