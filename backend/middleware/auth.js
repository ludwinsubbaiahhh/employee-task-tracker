/**
 * Authentication Middleware
 * JWT-based authentication for protected routes
 */

const jwt = require('jsonwebtoken');

// In production, this should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

/**
 * Generate JWT token
 */
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * Verify JWT token middleware
 * Protects routes that require authentication
 */
const authenticate = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'No token provided. Please include Authorization header.'
      });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : authHeader;

    if (!token) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'Invalid token format. Use: Bearer <token>'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Invalid token',
        message: 'The provided token is invalid or malformed.'
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expired',
        message: 'The token has expired. Please login again.'
      });
    }
    return res.status(500).json({
      error: 'Authentication error',
      message: 'An error occurred during authentication.'
    });
  }
};

/**
 * Optional authentication - doesn't fail if no token
 * Useful for public endpoints that can show more data if authenticated
 */
const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.startsWith('Bearer ') 
        ? authHeader.slice(7) 
        : authHeader;
      
      if (token) {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
      }
    }
  } catch (error) {
    // Silently fail for optional auth
  }
  next();
};

module.exports = {
  generateToken,
  authenticate,
  optionalAuth,
  JWT_SECRET
};

