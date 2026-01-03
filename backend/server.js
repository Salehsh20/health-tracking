import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './config/database.js';

// Import routes
import authRoutes from './routes/auth.js';
import activityRoutes from './routes/activities.js';
import mealRoutes from './routes/meals.js';
import exerciseRoutes from './routes/exercises.js';
import adminRoutes from './routes/admin.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
testConnection();

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'HealthTrack API - Phase 2',
    version: '1.0.0',
    status: 'Running'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server is running on port ${PORT}`);
  console.log(`📍 API URL: http://localhost:${PORT}`);
  console.log(`📚 API Documentation:`);
  console.log(`   - POST /api/auth/signup - Register new user`);
  console.log(`   - POST /api/auth/login - User login`);
  console.log(`   - GET  /api/auth/profile - Get user profile`);
  console.log(`   - GET  /api/activities - Get all activities`);
  console.log(`   - POST /api/activities - Create activity`);
  console.log(`   - GET  /api/meals - Get all meals`);
  console.log(`   - POST /api/meals - Create meal`);
  console.log(`   - GET  /api/exercises - Get all exercises`);
  console.log(`   - POST /api/exercises - Create exercise`);
  console.log(`\n✓ Press Ctrl+C to stop\n`);
});
