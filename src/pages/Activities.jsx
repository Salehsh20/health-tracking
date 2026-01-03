import React, { useState, useEffect } from 'react';
import { activitiesAPI } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [activityName, setActivityName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await activitiesAPI.getAll();
      if (response.success) {
        setActivities(response.activities);
      }
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (activityName.trim() === '') {
      alert('Please enter an activity name');
      return;
    }

    setLoading(true);

    try {
      const response = await activitiesAPI.create({
        name: activityName,
        description: description,
        date: date
      });

      if (response.success) {
        await fetchActivities();
        setActivityName('');
        setDescription('');
        setDate(new Date().toISOString().split('T')[0]);
      } else {
        alert('Failed to create activity');
      }
    } catch (error) {
      console.error('Error creating activity:', error);
      alert('Failed to create activity');
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this activity?')) {
      return;
    }

    try {
      const response = await activitiesAPI.delete(id);
      if (response.success) {
        await fetchActivities();
      } else {
        alert('Failed to delete activity');
      }
    } catch (error) {
      console.error('Error deleting activity:', error);
      alert('Failed to delete activity');
    }
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

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Adding...' : 'Add Activity'}
          </button>
        </form>
      </div>

      <div className="list-container">
        <h3>Your Activities</h3>
        {activities.length === 0 ? (
          <p className="empty-message">No activities logged yet. Start by adding one above!</p>
        ) : (
          <div className="items-list">
            {activities.map((activity) => (
              <div key={activity.id} className="item-card">
                <div className="item-header">
                  <h4>{activity.name}</h4>
                  <button onClick={() => handleDelete(activity.id)} className="delete-btn">Delete</button>
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
