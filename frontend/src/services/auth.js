/**
 * Authentication Service
 * Handles JWT token management for API requests
 */

const TOKEN_KEY = 'employee_tracker_token';

/**
 * Get stored authentication token
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Store authentication token
 */
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Remove authentication token
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Login and get token
 */
export const login = async (apiKey) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apiKey }),
    });

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    const data = await response.json();
    setToken(data.token);
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Auto-login with default API key for development
 * In production, this should be removed and users should login manually
 */
export const autoLogin = async () => {
  // Only auto-login if not already authenticated
  if (isAuthenticated()) {
    return getToken();
  }

  try {
    // Use default demo key for development
    const data = await login('demo-key-123');
    return data.token;
  } catch (error) {
    console.warn('Auto-login failed, some operations may not work:', error);
    return null;
  }
};

