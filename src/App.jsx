import React, { useState } from 'react';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Activities from './pages/Activities';
import Meals from './pages/Meals';
import Exercise from './pages/Exercise';
import Progress from './pages/Progress';
import Login from './pages/Login';
import Signup from './pages/Signup';

function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [authPage, setAuthPage] = useState('login');

  if (loading) {
    return (
      <div className="loading-screen">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="App">
        {authPage === 'login' ? (
          <Login onSwitchToSignup={() => setAuthPage('signup')} />
        ) : (
          <Signup onSwitchToLogin={() => setAuthPage('login')} />
        )}
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'activities':
        return <Activities />;
      case 'meals':
        return <Meals />;
      case 'exercise':
        return <Exercise />;
      case 'progress':
        return <Progress />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="content">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
