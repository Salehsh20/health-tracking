import pool from '../config/database.js';

// Get all users (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    console.log('Admin - Getting all users');
    const [users] = await pool.query(
      'SELECT id, username, email, role, full_name, created_at FROM users ORDER BY created_at DESC'
    );

    console.log('Admin - Found users:', users.length);
    res.json({
      success: true,
      users
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Get user statistics (Admin only)
export const getUserStats = async (req, res) => {
  try {
    console.log('Admin - Getting user stats');
    const [userCount] = await pool.query('SELECT COUNT(*) as count FROM users');
    const [activityCount] = await pool.query('SELECT COUNT(*) as count FROM activities');
    const [mealCount] = await pool.query('SELECT COUNT(*) as count FROM meals');
    const [exerciseCount] = await pool.query('SELECT COUNT(*) as count FROM exercises');
    
    const [recentUsers] = await pool.query(
      'SELECT username, email, created_at FROM users ORDER BY created_at DESC LIMIT 5'
    );

    const stats = {
      totalUsers: userCount[0].count,
      totalActivities: activityCount[0].count,
      totalMeals: mealCount[0].count,
      totalExercises: exerciseCount[0].count,
      recentUsers
    };

    console.log('Admin - Stats:', stats);
    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Delete user (Admin only)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent admin from deleting themselves
    if (parseInt(id) === req.userId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot delete your own account' 
      });
    }

    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Update user role (Admin only)
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid role' 
      });
    }

    // Prevent admin from changing their own role
    if (parseInt(id) === req.userId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot change your own role' 
      });
    }

    const [result] = await pool.query(
      'UPDATE users SET role = ? WHERE id = ?',
      [role, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      message: 'User role updated successfully'
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};
