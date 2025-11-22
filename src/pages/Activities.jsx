import React, { useState } from 'react';

function Activities({ activities, setActivities }) {
  const [activityName, setActivityName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (activityName.trim() === '') {
      alert('Please enter an activity name');
      return;
    }

    const newActivity = {
      name: activityName,
      description: description,
      date: date
    };

    setActivities([...activities, newActivity]);
    
    // Reset form
    setActivityName('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleDelete = (index) => {
    const newActivities = activities.filter((_, i) => i !== index);
    setActivities(newActivities);
  };

  return (
    <div className="page">
      <h2>Daily Activities</h2>
      <p className="page-description">Track your daily activities and habits</p>

      <div className="form-container">
        <h3>Log New Activity</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Activity Name:</label>
            <input
              type="text"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
              placeholder="e.g., Morning walk, Reading"
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details about your activity"
              rows="3"
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

          <button type="submit" className="submit-btn">Add Activity</button>
        </form>
      </div>

      <div className="list-container">
        <h3>Your Activities</h3>
        {activities.length === 0 ? (
          <p className="empty-message">No activities logged yet. Start by adding one above!</p>
        ) : (
          <div className="items-list">
            {activities.map((activity, index) => (
              <div key={index} className="item-card">
                <div className="item-header">
                  <h4>{activity.name}</h4>
                  <button onClick={() => handleDelete(index)} className="delete-btn">Delete</button>
                </div>
                <p>{activity.description}</p>
                <p className="item-date">Date: {new Date(activity.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Activities;
