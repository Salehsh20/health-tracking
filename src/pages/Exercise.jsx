import React, { useState, useEffect } from 'react';
import { exercisesAPI } from '../utils/api';

function Exercise() {
  const [exercises, setExercises] = useState([]);
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseType, setExerciseType] = useState('Cardio');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const response = await exercisesAPI.getAll();
      if (response.success) {
        setExercises(response.exercises);
      }
    } catch (error) {
      console.error('Failed to fetch exercises:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (exerciseName.trim() === '' || duration === '') {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const response = await exercisesAPI.create({
        name: exerciseName,
        type: exerciseType,
        duration: parseInt(duration),
        date: date
      });

      if (response.success) {
        await fetchExercises();
        setExerciseName('');
        setExerciseType('Cardio');
        setDuration('');
        setDate(new Date().toISOString().split('T')[0]);
      } else {
        alert('Failed to create exercise');
      }
    } catch (error) {
      console.error('Error creating exercise:', error);
      alert('Failed to create exercise');
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this exercise?')) {
      return;
    }

    try {
      const response = await exercisesAPI.delete(id);
      if (response.success) {
        await fetchExercises();
      } else {
        alert('Failed to delete exercise');
      }
    } catch (error) {
      console.error('Error deleting exercise:', error);
      alert('Failed to delete exercise');
    }
  };

  return (
    <div className="page">
      <h2>Exercise Tracker</h2>
      <p className="page-description">Log your workout routines and stay active</p>

      <div className="form-container">
        <h3>Log New Exercise</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Exercise Name:</label>
            <input
              type="text"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              placeholder="e.g., Running, Yoga, Swimming"
            />
          </div>

          <div className="form-group">
            <label>Exercise Type:</label>
            <select value={exerciseType} onChange={(e) => setExerciseType(e.target.value)}>
              <option value="Cardio">Cardio</option>
              <option value="Strength">Strength</option>
              <option value="Flexibility">Flexibility</option>
              <option value="Sports">Sports</option>
            </select>
          </div>

          <div className="form-group">
            <label>Duration (minutes):</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g., 30"
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
            {loading ? 'Adding...' : 'Add Exercise'}
          </button>
        </form>
      </div>

      <div className="list-container">
        <h3>Your Exercise Routines</h3>
        {exercises.length === 0 ? (
          <p className="empty-message">No exercises logged yet. Start your fitness journey!</p>
        ) : (
          <div className="items-list">
            {exercises.map((exercise) => (
              <div key={exercise.id} className="item-card">
                <div className="item-header">
                  <h4>{exercise.name}</h4>
                  <button onClick={() => handleDelete(exercise.id)} className="delete-btn">Delete</button>
                </div>
                <p><strong>Type:</strong> {exercise.type}</p>
                <p><strong>Duration:</strong> {exercise.duration} minutes</p>
                <p className="item-date">Date: {new Date(exercise.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Exercise;
