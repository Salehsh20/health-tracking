import { body, validationResult } from 'express-validator';
import pool from '../config/database.js';

// Validation rules
export const exerciseValidation = [
  body('name').trim().notEmpty().withMessage('Exercise name is required'),
  body('type').isIn(['Cardio', 'Strength', 'Flexibility', 'Sports']).withMessage('Invalid exercise type'),
  body('duration').isInt({ min: 1 }).withMessage('Duration must be at least 1 minute'),
  body('date').isDate().withMessage('Valid date is required')
];

// Get all exercises for user
export const getExercises = async (req, res) => {
  try {
    const [exercises] = await pool.query(
      'SELECT * FROM exercises WHERE user_id = ? ORDER BY date DESC',
      [req.userId]
    );

    res.json({
      success: true,
      exercises
    });
  } catch (error) {
    console.error('Get exercises error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Create new exercise
export const createExercise = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { name, type, duration, date } = req.body;

    const [result] = await pool.query(
      'INSERT INTO exercises (user_id, name, type, duration, date) VALUES (?, ?, ?, ?, ?)',
      [req.userId, name, type, duration, date]
    );

    res.status(201).json({
      success: true,
      message: 'Exercise created successfully',
      exercise: {
        id: result.insertId,
        user_id: req.userId,
        name,
        type,
        duration,
        date
      }
    });
  } catch (error) {
    console.error('Create exercise error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Update exercise
export const updateExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, duration, date } = req.body;

    const [exercises] = await pool.query(
      'SELECT * FROM exercises WHERE id = ? AND user_id = ?',
      [id, req.userId]
    );

    if (exercises.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Exercise not found' 
      });
    }

    await pool.query(
      'UPDATE exercises SET name = ?, type = ?, duration = ?, date = ? WHERE id = ? AND user_id = ?',
      [name, type, duration, date, id, req.userId]
    );

    res.json({
      success: true,
      message: 'Exercise updated successfully'
    });
  } catch (error) {
    console.error('Update exercise error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Delete exercise
export const deleteExercise = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      'DELETE FROM exercises WHERE id = ? AND user_id = ?',
      [id, req.userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Exercise not found' 
      });
    }

    res.json({
      success: true,
      message: 'Exercise deleted successfully'
    });
  } catch (error) {
    console.error('Delete exercise error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};
