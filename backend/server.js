const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Import CORS
const loginRoutes = require('./routes/loginroutes');
const courseRoutes=require('./routes/courseroutes')
// Initialize the app
const app = express();

// Enable CORS for all routes
app.use(cors());  // Use CORS middleware

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection string (hardcoded)
// const MONGO_URI = 'mongodb+srv://pavan:12345@yearly-project.45f67.mongodb.net/?retryWrites=true&w=majority&appName=yearly-project';
const MONGO_URI ='mongodb://localhost:27017/project'
// JWT secret key (hardcoded)
const JWT_SECRET = 'your_hardcoded_jwt_secret_key';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', loginRoutes);
app.use('/api',courseRoutes)
// Make JWT secret accessible globally
app.locals.JWT_SECRET = JWT_SECRET;

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
