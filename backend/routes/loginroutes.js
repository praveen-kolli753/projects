const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/loginmodels');
const Admin = require('../models/admin');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
// Function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role || 'user' },
    process.env.JWT_SECRET || 'your_jwt_secret',
    { expiresIn: '1h' }
  );
};

// ===========================
// User Signup
// ===========================
router.post('/user-signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ===========================
// User Login   
// ===========================
router.post('/user-login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({ token, role: user.role || 'user' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ===========================
// Admin Signup
// ===========================
router.post('/admin-signup', async (req, res) => {
  const { username, email, password, adminCode } = req.body;

  // Verify admin code (use secure method in production)
  if (adminCode !== process.env.ADMIN_CODE) {
    return res.status(400).json({ message: 'Invalid admin code' });
  }

  try {
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    admin = new Admin({ username, email, password: hashedPassword, role: 'admin' });
    await admin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// ===========================
// Admin Login
// ===========================
router.post('/admin-login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email, role: 'admin' });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(admin);
    res.json({ token, role: admin.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ===========================
// Main Admin Signup
// ===========================
router.post('/main-admin-signup', async (req, res) => {
  const { username, email, password, mainAdminCode } = req.body;

  // Verify main admin code (use secure method in production)
  if (mainAdminCode !== process.env.MAIN_ADMIN_CODE) {
    return res.status(400).json({ message: 'Invalid main admin code' });
  }

  try {
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ message: 'Main admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    admin = new Admin({ username, email, password: hashedPassword, role: 'main_admin' });
    await admin.save();
    res.status(201).json({ message: 'Main admin registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// ===========================
// Main Admin Login
// ===========================
router.post('/main-admin-login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email, role: 'main_admin' });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(admin);
    res.json({ token, role: admin.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});




router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ profileDetails: user.profileDetails });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update User Profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { firstName, middleName, lastName, college, gender } = req.body;
console.log(req.body)
    const updatedProfile = {
      firstName,
      middleName,
      lastName,
      college,
      gender, 
    };   

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profileDetails: updatedProfile },
      { new: true }
    );

    res.json({ message: 'Profile updated successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/user/courses', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      enrolledCourses: user.enrolledCourses,
      completedCourses: user.completedCourses,
      requestedCourses: user.requestedCourses
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
