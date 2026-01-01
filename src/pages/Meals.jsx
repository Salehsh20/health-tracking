import React, { useState, useEffect } from 'react';
import { mealsAPI } from '../utils/api';

function Meals() {
  const [meals, setMeals] = useState([]);
  const [mealName, setMealName] = useState('');
  const [mealType, setMealType] = useState('Breakfast');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await mealsAPI.getAll();
      if (response.success) {
        setMeals(response.meals);
      }
    } catch (error) {
      console.error('Failed to fetch meals:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (mealName.trim() === '' || calories === '') {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const response = await mealsAPI.create({
        name: mealName,
        type: mealType,
        calories: parseInt(calories),
        date: date
      });

      if (response.success) {
        await fetchMeals();
        setMealName('');
        setMealType('Breakfast');
        setCalories('');
        setDate(new Date().toISOString().split('T')[0]);
      } else {
        alert('Failed to create meal');
      }
    } catch (error) {
      console.error('Error creating meal:', error);
      alert('Failed to create meal');
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this meal?')) {
      return;
    }

    try {
      const response = await mealsAPI.delete(id);
      if (response.success) {
        await fetchMeals();
      } else {
        alert('Failed to delete meal');
      }
    } catch (error) {
      console.error('Error deleting meal:', error);
      alert('Failed to delete meal');
    }
  };

  return (
    <div className="page">
      <h2>Meal Tracker</h2>
      <p className="page-description">Log your daily meals and track your nutrition</p>

      <div className="form-container">
        <h3>Log New Meal</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Meal Name:</label>
            <input
              type="text"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              placeholder="e.g., Chicken Salad, Oatmeal"
            />
          </div>

          <div className="form-group">
            <label>Meal Type:</label>
            <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
            </select>
          </div>

          <div className="form-group">
            <label>Calories:</label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="e.g., 350"
            />
          </div>

          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Adding...' : 'Add Meal'}
          </button>
        </form>
      </div>

      <div className="list-container">
        <h3>Your Meals</h3>
        {meals.length === 0 ? (
          <p className="empty-message">No meals logged yet. Start tracking your nutrition!</p>
        ) : (
          <div className="items-list">
            {meals.map((meal) => (
              <div key={meal.id} className="item-card">
                <div className="item-header">
                  <h4>{meal.name}</h4>
                  <button onClick={() => handleDelete(meal.id)} className="delete-btn">Delete</button>
                </div>
                <p><strong>Type:</strong> {meal.type}</p>
                <p><strong>Calories:</strong> {meal.calories} cal</p>
                <p className="item-date">Date: {new Date(meal.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Meals;
