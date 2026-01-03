import jwt from 'jsonwebtoken';
import pool from '../config/database.js';

export const adminMiddleware = async (req, res, next) => {
  try {
    console.log('Admin middleware - Checking authorization');
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      console.log('Admin middleware - No token provided');
      return res.status(401).json({ 
        success: false, 
        message: 'No authentication token, access denied' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    console.log('Admin middleware - User ID:', req.userId);

    // Check if user is admin
    const [users] = await pool.query(
      'SELECT role FROM users WHERE id = ?',
      [req.userId]
    );

    console.log('Admin middleware - User role:', users[0]?.role);

    if (users.length === 0 || users[0].role !== 'admin') {
      console.log('Admin middleware - Access denied, not admin');
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Admin privileges required.' 
      });
    }

    console.log('Admin middleware - Access granted');
    next();
  } catch (error) {
    console.error('Admin middleware - Error:', error.message);
    res.status(401).json({ 
      success: false, 
      message: 'Token is invalid or expired' 
    });
  }
};
