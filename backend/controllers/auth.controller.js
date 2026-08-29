const { USERS, verifyPassword, generateToken, verifyToken } = require('../database/users.db');

/**
 * Handle staff login
 * POST /api/auth/login
 */
function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = USERS.find(u => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password. Please verify your credentials.'
      });
    }

    const isMatch = verifyPassword(password, user.salt, user.hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password. Please verify your credentials.'
      });
    }

    // Generate secure token
    const token = generateToken(user);

    return res.json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Error during authentication login:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during authentication.'
    });
  }
}

/**
 * Verify active token
 * GET /api/auth/verify
 */
function verifySession(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'No authorization token provided.'
    });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: 'Session has expired or is invalid. Please log in again.'
    });
  }

  const user = USERS.find(u => u.id === decoded.id);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'User account not found.'
    });
  }

  return res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    }
  });
}

/**
 * Get available CRM users for task assignment
 * GET /api/auth/users
 */
function getTeamUsers(req, res) {
  const list = USERS.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    avatar: u.avatar
  }));

  return res.json({
    success: true,
    data: list
  });
}

module.exports = {
  login,
  verifySession,
  getTeamUsers
};
