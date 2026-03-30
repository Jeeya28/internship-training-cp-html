const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const authMiddlware = require('../middleware/auth');

//public routes
router.post('/register',authController.register);
router.post('/login',authController.login);
router.post('/forgot-password',authController.forgotPassword);
router.post('/reset-password',authController.resetPassword)

//Private routes
router.get('/me',authMiddlware,authController.getMe);

module.exports = router;
