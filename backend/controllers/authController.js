/**
 * Authentication Controller
 * Handles login and token generation
 */

const { generateToken } = require('../middleware/auth');

// Simple API key-based authentication for demo
// In production, this would use a proper user database
const API_KEYS = {
  'demo-key-123': { userId: 1, name: 'Demo User' },
  'admin-key-456': { userId: 2, name: 'Admin User' }
};

/**
 * Login/Authenticate endpoint
 * Generates JWT token from API key
 */
const login = async (req, res) => {
  try {
    const { apiKey } = req.body;

    if (!apiKey) {
      return res.status(400).json({
        error: 'API key required',
        message: 'Please provide an API key in the request body.'
      });
    }

    // Check if API key is valid
    const user = API_KEYS[apiKey];
    if (!user) {
      return res.status(401).json({
        error: 'Invalid API key',
        message: 'The provided API key is not valid.'
      });
    }

    // Generate JWT token
    const token = generateToken(user.userId);

    res.json({
      message: 'Authentication successful',
      token,
      user: {
        id: user.userId,
        name: user.name
      },
      expiresIn: '24h'
    });
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).json({
      error: 'Authentication failed',
      message: 'An error occurred during authentication.'
    });
  }
};

/**
 * Verify token endpoint
 */
const verifyToken = async (req, res) => {
  try {
    // If we reach here, token is valid (authenticate middleware passed)
    res.json({
      message: 'Token is valid',
      user: req.user
    });
  } catch (error) {
    res.status(500).json({
      error: 'Token verification failed'
    });
  }
};

module.exports = {
  login,
  verifyToken
};

