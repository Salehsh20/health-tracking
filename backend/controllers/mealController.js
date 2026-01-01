import { body, validationResult } from 'express-validator';
import pool from '../config/database.js';

// Validation rules
export const mealValidation = [
  body('name').trim().notEmpty().withMessage('Meal name is required'),
  body('type').isIn(['Breakfast', 'Lunch', 'Dinner', 'Snack']).withMessage('Invalid meal type'),
  body('calories').isInt({ min: 0 }).withMessage('Calories must be a positive number'),
  body('date').isDate().withMessage('Valid date is required')
];

// Get all meals for user
export const getMeals = async (req, res) => {
  try {
    const [meals] = await pool.query(
      'SELECT * FROM meals WHERE user_id = ? ORDER BY date DESC',
      [req.userId]
    );

    res.json({
      success: true,
      meals
    });
  } catch (error) {
    console.error('Get meals error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Create new meal
export const createMeal = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { name, type, calories, date } = req.body;

    const [result] = await pool.query(
      'INSERT INTO meals (user_id, name, type, calories, date) VALUES (?, ?, ?, ?, ?)',
      [req.userId, name, type, calories, date]
    );

    res.status(201).json({
      success: true,
      message: 'Meal created successfully',
      meal: {
        id: result.insertId,
        user_id: req.userId,
        name,
        type,
        calories,
        date
      }
    });
  } catch (error) {
    console.error('Create meal error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Update meal
export const updateMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, calories, date } = req.body;

    const [meals] = await pool.query(
      'SELECT * FROM meals WHERE id = ? AND user_id = ?',
      [id, req.userId]
    );

    if (meals.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Meal not found' 
      });
    }

    await pool.query(
      'UPDATE meals SET name = ?, type = ?, calories = ?, date = ? WHERE id = ? AND user_id = ?',
      [name, type, calories, date, id, req.userId]
    );

    res.json({
      success: true,
      message: 'Meal updated successfully'
    });
  } catch (error) {
    console.error('Update meal error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Delete meal
export const deleteMeal = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      'DELETE FROM meals WHERE id = ? AND user_id = ?',
      [id, req.userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Meal not found' 
      });
    }

    res.json({
      success: true,
      message: 'Meal deleted successfully'
    });
  } catch (error) {
    console.error('Delete meal error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};
