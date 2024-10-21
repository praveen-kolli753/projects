const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  courseName: {
    type: String,
    required: true,
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'Admin', // Reference to the Admin model
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  whatYouWillLearn: {
    type: [String],
    required: true,
  },
  courseIncludes: {
    type: [String],
    required: true,
  },
  content: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Course', CourseSchema);
