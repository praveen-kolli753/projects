// Update your loginmodels.js file

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileDetails: {
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    middleName: { type: String, default: null },
    college: { type: String, default: null },
    gender: { type: String, default: null }
  },
  enrolledCourses: [{
    name: { type: String, required: true },
    currentDay: { type: Number, default: 1 },
    percentage: { type: Number, default: 0 }
  }],
  completedCourses: [{ type: String, default: [] }],
  requestedCourses: [{ type: String, default: [] }]
});

module.exports = mongoose.model('User', userSchema);