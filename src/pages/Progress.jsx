import React, { useState, useEffect } from 'react';
import { activitiesAPI, mealsAPI, exercisesAPI } from '../utils/api';

function Progress() {
  const [activities, setActivities] = useState([]);
  const [meals, setMeals] = useState([]);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [activitiesRes, mealsRes, exercisesRes] = await Promise.all([
        activitiesAPI.getAll(),
        mealsAPI.getAll(),
        exercisesAPI.getAll()
      ]);

      if (activitiesRes.success) setActivities(activitiesRes.activities);
      if (mealsRes.success) setMeals(mealsRes.meals);
      if (exercisesRes.success) setExercises(exercisesRes.exercises);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };
  // Calculate weekly statistics
  const getWeeklyData = () => {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const weekActivities = activities.filter(a => {
      const activityDate = new Date(a.date);
      return activityDate >= weekAgo && activityDate <= today;
    });

    const weekMeals = meals.filter(m => {
      const mealDate = new Date(m.date);
      return mealDate >= weekAgo && mealDate <= today;
    });

    const weekExercises = exercises.filter(e => {
      const exerciseDate = new Date(e.date);
      return exerciseDate >= weekAgo && exerciseDate <= today;
    });

    return { weekActivities, weekMeals, weekExercises };
  };

  const { weekActivities, weekMeals, weekExercises } = getWeeklyData();
  
  const weeklyCalories = weekMeals.reduce((sum, meal) => sum + Number(meal.calories), 0);
  const weeklyExerciseTime = weekExercises.reduce((sum, ex) => sum + Number(ex.duration), 0);
  const avgDailyCalories = Math.round(weeklyCalories / 7);
  const avgDailyExercise = Math.round(weeklyExerciseTime / 7);

  return (
    <div className="page">
      <h2>Progress Tracker</h2>
      <p className="page-description">View your weekly progress and achievements</p>

      <div className="progress-container">
        <h3>This Week's Summary</h3>
        
        <div className="progress-stats">
          <div className="progress-card">
            <h4>Activities</h4>
            <p className="progress-number">{weekActivities.length}</p>
            <p className="progress-label">logged this week</p>
          </div>

          <div className="progress-card">
            <h4>Meals</h4>
            <p className="progress-number">{weekMeals.length}</p>
            <p className="progress-label">logged this week</p>
          </div>

          <div className="progress-card">
            <h4>Workouts</h4>
            <p className="progress-number">{weekExercises.length}</p>
            <p className="progress-label">completed this week</p>
          </div>
        </div>

        <div className="progress-stats">
          <div className="progress-card">
            <h4>Total Calories</h4>
            <p className="progress-number">{weeklyCalories}</p>
            <p className="progress-label">consumed this week</p>
          </div>

          <div className="progress-card">
            <h4>Exercise Time</h4>
            <p className="progress-number">{weeklyExerciseTime}</p>
            <p className="progress-label">minutes this week</p>
          </div>

          <div className="progress-card">
            <h4>Avg Daily Calories</h4>
            <p className="progress-number">{avgDailyCalories}</p>
            <p className="progress-label">per day</p>
          </div>
        </div>

        <div className="progress-insights">
          <h3>Insights</h3>
          <ul className="insights-list">
            {weekActivities.length >= 5 && (
              <li className="insight-positive">Great job! You've been very active this week! 🎉</li>
            )}
            {weekExercises.length >= 3 && (
              <li className="insight-positive">You're meeting the recommended exercise goal! 💪</li>
            )}
            {weeklyExerciseTime >= 150 && (
              <li className="insight-positive">Excellent! You've exceeded 150 minutes of exercise! ⭐</li>
            )}
            {weekActivities.length === 0 && weekMeals.length === 0 && weekExercises.length === 0 && (
              <li className="insight-neutral">Start logging your activities to see your progress!</li>
            )}
            {weekActivities.length < 3 && weekActivities.length > 0 && (
              <li className="insight-neutral">Try to log more activities throughout the week.</li>
            )}
            {avgDailyExercise < 30 && weekExercises.length > 0 && (
              <li className="insight-neutral">Aim for at least 30 minutes of exercise daily.</li>
            )}
          </ul>
        </div>

        <div className="total-summary">
          <h3>All Time Totals</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-label">Total Activities:</span>
              <span className="summary-value">{activities.length}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Total Meals:</span>
              <span className="summary-value">{meals.length}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Total Workouts:</span>
              <span className="summary-value">{exercises.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progress;
