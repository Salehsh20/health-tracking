import React from 'react';

function Navbar({ currentPage, setCurrentPage }) {
  return (
    <div className="navbar-container">
     
      <nav className="navbar">
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
      </nav>
    </div>
  );
}

export default Navbar;
