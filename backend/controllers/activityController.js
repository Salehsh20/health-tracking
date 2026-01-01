import { body, validationResult } from 'express-validator';
import pool from '../config/database.js';

// Validation rules
export const activityValidation = [
  body('name').trim().notEmpty().withMessage('Activity name is required'),
  body('description').optional().trim(),
  body('date').isDate().withMessage('Valid date is required')
];

// Get all activities for user
export const getActivities = async (req, res) => {
  try {
    const [activities] = await pool.query(
      'SELECT * FROM activities WHERE user_id = ? ORDER BY date DESC',
      [req.userId]
    );

    res.json({
      success: true,
      activities
    });
  } catch (error) {
    console.error('Get activities error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Create new activity
export const createActivity = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { name, description, date } = req.body;

    const [result] = await pool.query(
      'INSERT INTO activities (user_id, name, description, date) VALUES (?, ?, ?, ?)',
      [req.userId, name, description || null, date]
    );

    res.status(201).json({
      success: true,
      message: 'Activity created successfully',
      activity: {
        id: result.insertId,
        user_id: req.userId,
        name,
        description,
        date
      }
    });
  } catch (error) {
    console.error('Create activity error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Update activity
export const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, date } = req.body;

    // Check if activity belongs to user
    const [activities] = await pool.query(
      'SELECT * FROM activities WHERE id = ? AND user_id = ?',
      [id, req.userId]
    );

    if (activities.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Activity not found' 
      });
    }

    await pool.query(
      'UPDATE activities SET name = ?, description = ?, date = ? WHERE id = ? AND user_id = ?',
      [name, description || null, date, id, req.userId]
    );

    res.json({
      success: true,
      message: 'Activity updated successfully'
    });
  } catch (error) {
    console.error('Update activity error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Delete activity
export const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      'DELETE FROM activities WHERE id = ? AND user_id = ?',
      [id, req.userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Activity not found' 
      });
    }

    res.json({
      success: true,
      message: 'Activity deleted successfully'
    });
  } catch (error) {
    console.error('Delete activity error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};
