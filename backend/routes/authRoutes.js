/**
 * Authentication Routes
 */

const express = require('express');
const router = express.Router();
const { login, verifyToken } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

// Public endpoint - login to get token
router.post('/login', login);

// Protected endpoint - verify token
router.get('/verify', authenticate, verifyToken);

module.exports = router;

