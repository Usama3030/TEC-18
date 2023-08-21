const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// User Routes


router.post('/u', userController.registerUser);


module.exports = router;
