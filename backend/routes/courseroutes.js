// routes/courseroutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const protectRoute = require('../middleware/protectRoute'); // Import the protectRoute middleware
const User = require('../models/loginmodels');
// Set up multer for memory storage (to use Base64 strings)
const storage = multer.memoryStorage(); // Use memory storage for multer
const upload = multer({ storage });

// Create a new course
router.post('/add-course', protectRoute, upload.single('image'), async (req, res) => {
    try {
        const { courseName, whatYouWillLearn, courseIncludes, content } = req.body;

        // Validate required fields
        if (!courseName || !req.file) {
            return res.status(400).json({ message: 'Course name and image are required.' });
        }

        // Parse JSON fields from form submission
        const parsedWhatYouWillLearn = JSON.parse(whatYouWillLearn);
        const parsedCourseIncludes = JSON.parse(courseIncludes);
        const parsedContent = JSON.parse(content);

        // Prepare admin details
        const adminDetails = {
            adminId: req.user._id, // Get the admin ID from the authenticated user
            email: req.user.email,
            username: req.user.username // Assuming your Admin model has a username field
        };

        // Convert image to Base64 string
        const imageBase64 = req.file.buffer.toString('base64'); // Convert buffer to Base64 string

        // Create a dynamic collection with the course name
        const dynamicCollectionName = `course_${courseName.replace(/\s+/g, '_').toLowerCase()}`;
        const dynamicCollection = mongoose.connection.db.collection(dynamicCollectionName);

        // Insert admin details at index 0
        await dynamicCollection.insertOne({ index: 0, adminDetails });

        // Insert course details at index 1
        await dynamicCollection.insertOne({
            index: 1,
            courseName,
            image: imageBase64, // Store the Base64 string instead of file name
            whatYouWillLearn: parsedWhatYouWillLearn,
            courseIncludes: parsedCourseIncludes,
            content: parsedContent,
        });

        res.status(201).json({ message: `Course '${courseName}' created successfully with a new collection.` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get all courses (to display in the Course List)
router.get('/courses', async (req, res) => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        const courseCollections = collections.filter(collection => collection.name.startsWith('course_'));
        
        // Map collections to a simpler structure
        const courses = await Promise.all(courseCollections.map(async (collection) => {
            const courseDetails = await mongoose.connection.db.collection(collection.name).findOne({ index: 1 });
            return {
                collectionName: collection.name.replace('course_', '').replace(/_/g, ' '), // Remove 'course_' prefix and replace '_' with spaces
                image: courseDetails.image // Assuming you store Base64 string for the image
            };
        }));

        res.status(200).json(courses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Fetch course details based on courseName
router.get('/courses/:courseName', async (req, res) => {
    const courseName = req.params.courseName;
    const dynamicCollectionName = `course_${courseName.replace(/\s+/g, '_').toLowerCase()}`;
    
    try {
        const dynamicCollection = mongoose.connection.db.collection(dynamicCollectionName);
        const courseDetails = await dynamicCollection.find({}).toArray();

        // Respond with the course details
        res.status(200).json(courseDetails);
    } catch (error) {
        console.error('Error fetching course details:', error);
        res.status(500).json({ message: 'Error fetching course details' });
    }
});





































// Get all courses (to display in the Course List)
router.get('/admin/courses', protectRoute, async (req, res) => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        const courseCollections = collections.filter(collection => collection.name.startsWith('course_'));
        
        // Get the logged-in admin's ID
        const loggedInAdminId = req.user._id.toString();

        // Map collections to a simpler structure
        const courses = await Promise.all(courseCollections.map(async (collection) => {
            const adminDetails = await mongoose.connection.db.collection(collection.name).findOne({ index: 0 });
            const courseDetails = await mongoose.connection.db.collection(collection.name).findOne({ index: 1 });
            
            // Check if the logged-in admin is the course creator
            if (adminDetails?.adminDetails?.adminId?.toString() === loggedInAdminId) {
                return {
                    collectionName: collection.name.replace('course_', '').replace(/_/g, ' '), // Clean up course name
                    image: courseDetails.image, // Assuming Base64 string for the image
                    courseName: courseDetails.courseName,
                    adminId: adminDetails?.adminDetails?.adminId
                };
            }
        }));

        // Filter out undefined entries (where the admin is not the creator)
        const filteredCourses = courses.filter(course => course !== undefined);

        res.status(200).json(filteredCourses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});




// routes/courseroutes.js
router.get('/admin', protectRoute, async (req, res) => {
    try {
        // Fetch all collections where the adminId matches the logged-in admin
        const adminCourses = await mongoose.connection.db.listCollections().toArray();
        
        const filteredCourses = [];
        for (const collection of adminCourses) {
            if (collection.name.startsWith('course_')) {
                const courseCollection = mongoose.connection.db.collection(collection.name);
                const adminDetails = await courseCollection.findOne({ index: 0 });
                if (adminDetails && adminDetails.adminDetails.adminId === req.user._id.toString()) {
                    const courseData = await courseCollection.findOne({ index: 1 });
                    filteredCourses.push(courseData);
                }
            }
        }

        res.json(filteredCourses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/courses/:courseName/content', protectRoute, async (req, res) => {
    try {
      const courseName = req.params.courseName;
      const { dayNumber, youtubeLinks, resourceLinks, colabLinks, feedbackLinks, quizLinks } = req.body;
  
      // Validate input
      if (!dayNumber || !youtubeLinks.length || !resourceLinks.length || 
          !colabLinks.length || !feedbackLinks.length || !quizLinks.length) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const dynamicCollectionName = `course_${courseName.replace(/\s+/g, '_').toLowerCase()}`;
      const dynamicCollection = mongoose.connection.db.collection(dynamicCollectionName);
  
      // Verify admin permissions
      const adminDetails = await dynamicCollection.findOne({ index: 0 });
      if (adminDetails.adminDetails.adminId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Unauthorized to modify this course' });
      }
  
      // Check if content for this day already exists
      const existingDay = await dynamicCollection.findOne({ 
        index: { $gte: 2 }, 
        dayNumber: parseInt(dayNumber) 
      });
  
      if (existingDay) {
        return res.status(400).json({ message: `Content for Day ${dayNumber} already exists` });
      }
  
      // Get next index
      const lastDocument = await dynamicCollection.find({})
        .sort({ index: -1 })
        .limit(1)
        .toArray();
  
      const newIndex = (lastDocument[0]?.index || 1) + 1;
  
      // Insert new content with description for YouTube links
      await dynamicCollection.insertOne({
        index: newIndex,
        dayNumber: parseInt(dayNumber),
        youtubeLinks,  // Contains both link and description
        resourceLinks,
        colabLinks,
        feedbackLinks,
        quizLinks,
        addedAt: new Date()
      });
  
      res.status(201).json({ message: 'Content added successfully' });
    } catch (error) {
      console.error('Error adding content:', error);
      res.status(500).json({ message: 'Error adding content', error: error.message });
    }
  });












  router.post('/enroll', async (req, res) => {
    try {
        const { courseName, email } = req.body;

        console.log('Enrolling user:', email, 'in course:', courseName);

        const user = await User.findOne({ email: email });

        if (!user) {
            console.log('User not found:', email);
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user is already enrolled
        if (user.enrolledCourses.some(course => course.name === courseName)) {
            console.log('User already enrolled in course:', courseName);
            return res.status(400).json({ message: 'You are already enrolled in this course' });
        }

        // Add the course to enrolledCourses
        user.enrolledCourses.push({
            name: courseName,
            currentDay: 1,
            percentage: 0
        });

        console.log('Saving updated user:', user);

        await user.save();

        console.log('Enrollment successful');

        res.status(200).json({ message: 'Successfully enrolled in the course' });
    } catch (error) {
        console.error('Error enrolling in course:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
module.exports = router;
