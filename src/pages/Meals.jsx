import React, { useState } from 'react';

function Meals({ meals, setMeals }) {
  const [mealName, setMealName] = useState('');
  const [mealType, setMealType] = useState('Breakfast');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (mealName.trim() === '' || calories === '') {
      alert('Please fill in all required fields');
      return;
    }

    const newMeal = {
      name: mealName,
      type: mealType,
      calories: calories,
      date: date
    };

    setMeals([...meals, newMeal]);
    
    // Reset form
    setMealName('');
    setMealType('Breakfast');
    setCalories('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleDelete = (index) => {
    const newMeals = meals.filter((_, i) => i !== index);
    setMeals(newMeals);
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

          <button type="submit" className="submit-btn">Add Meal</button>
        </form>
      </div>

      <div className="list-container">
        <h3>Your Meals</h3>
        {meals.length === 0 ? (
          <p className="empty-message">No meals logged yet. Start tracking your nutrition!</p>
        ) : (
          <div className="items-list">
            {meals.map((meal, index) => (
              <div key={index} className="item-card">
                <div className="item-header">
                  <h4>{meal.name}</h4>
                  <button onClick={() => handleDelete(index)} className="delete-btn">Delete</button>
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
