import React from 'react';
import { useAuth } from '../context/AuthContext';

function Navbar({ currentPage, setCurrentPage }) {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>HealthTrack</h1>
        {user && <span className="user-info">Hi, {user.username}!</span>}
      </div>
      
      <div className="navbar-nav">
        <button 
          className={currentPage === 'home' ? 'nav-btn active' : 'nav-btn'} 
          onClick={() => setCurrentPage('home')}
        >
          <span className="nav-icon"></span>
          <span className="nav-text">Home</span>
        </button>
        <button 
          className={currentPage === 'activities' ? 'nav-btn active' : 'nav-btn'} 
          onClick={() => setCurrentPage('activities')}
        >
          <span className="nav-icon"></span>
          <span className="nav-text">Activities</span>
        </button>
        <button 
          className={currentPage === 'meals' ? 'nav-btn active' : 'nav-btn'} 
          onClick={() => setCurrentPage('meals')}
        >
          <span className="nav-icon"></span>
          <span className="nav-text">Meals</span>
        </button>
        <button 
          className={currentPage === 'exercise' ? 'nav-btn active' : 'nav-btn'} 
          onClick={() => setCurrentPage('exercise')}
        >
          <span className="nav-icon"></span>
          <span className="nav-text">Exercise</span>
        </button>
        <button 
          className={currentPage === 'progress' ? 'nav-btn active' : 'nav-btn'} 
          onClick={() => setCurrentPage('progress')}
        >
          <span className="nav-icon"></span>
          <span className="nav-text">Progress</span>
        </button>
        <button 
          className='nav-btn logout-btn' 
          onClick={logout}
        >
          <span className="nav-icon"></span>
          <span className="nav-text">Logout</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
