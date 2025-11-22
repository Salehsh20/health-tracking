import React, { useState } from 'react';

function Exercise({ exercises, setExercises }) {
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseType, setExerciseType] = useState('Cardio');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (exerciseName.trim() === '' || duration === '') {
      alert('Please fill in all required fields');
      return;
    }

    const newExercise = {
      name: exerciseName,
      type: exerciseType,
      duration: duration,
      date: date
    };

    setExercises([...exercises, newExercise]);
    
    // Reset form
    setExerciseName('');
    setExerciseType('Cardio');
    setDuration('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleDelete = (index) => {
    const newExercises = exercises.filter((_, i) => i !== index);
    setExercises(newExercises);
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

          <button type="submit" className="submit-btn">Add Exercise</button>
        </form>
      </div>

      <div className="list-container">
        <h3>Your Exercise Routines</h3>
        {exercises.length === 0 ? (
          <p className="empty-message">No exercises logged yet. Start your fitness journey!</p>
        ) : (
          <div className="items-list">
            {exercises.map((exercise, index) => (
              <div key={index} className="item-card">
                <div className="item-header">
                  <h4>{exercise.name}</h4>
                  <button onClick={() => handleDelete(index)} className="delete-btn">Delete</button>
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
