import React from 'react';

function Home() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to HealthTrack</h1>
        <p className="hero-subtitle">Your Personal Fitness and Wellness Companion</p>
        <p className="hero-description">
          Track your daily activities, monitor your meals, log your workouts, and see your progress over time.
        </p>
      </div>

      <div className="features-section">
        <h2>What You Can Do</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">📝</div>
            <h3>Track Activities</h3>
            <p>Log your daily activities and habits to stay organized</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🍽️</div>
            <h3>Monitor Meals</h3>
            <p>Keep track of your meals and calorie intake</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">💪</div>
            <h3>Log Workouts</h3>
            <p>Record your exercise routines and duration</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📈</div>
            <h3>View Progress</h3>
            <p>See your weekly stats and achievements</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Start Your Wellness Journey Today</h2>
        <p>Use the navigation above to begin tracking your health and fitness goals!</p>
      </div>
    </div>
  );
}

export default Home;
