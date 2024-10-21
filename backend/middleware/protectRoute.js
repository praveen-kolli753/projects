// middleware/protectRoute.js
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin'); // Ensure the path is correct based on your directory structure

const protectRoute = async (req, res, next) => {
  let token;

  // Check if authorization header exists
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Get token from header

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');

      // Get the admin details from the database, excluding the password
      req.user = await Admin.findById(decoded.id).select('-password');

      // Ensure that user exists
      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      next(); // Proceed to the next middleware or route
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'No token provided, authorization denied' });
  }
};

module.exports = protectRoute;
