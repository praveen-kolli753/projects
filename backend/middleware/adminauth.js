const jwt = require('jsonwebtoken');
const Admin = require('../models/admin'); // Make sure this path matches your admin model location

const adminAuth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    
    // Check if user is an admin
    const admin = await Admin.findById(decoded.id);
    if (!admin || (admin.role !== 'admin' && admin.role !== 'main_admin')) {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }

    // Add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = adminAuth;