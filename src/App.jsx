import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Activities from './pages/Activities';
import Meals from './pages/Meals';
import Exercise from './pages/Exercise';
import Progress from './pages/Progress';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activities, setActivities] = useState([]);
  const [meals, setMeals] = useState([]);
  const [exercises, setExercises] = useState([]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'activities':
        return <Activities activities={activities} setActivities={setActivities} />;
      case 'meals':
        return <Meals meals={meals} setMeals={setMeals} />;
      case 'exercise':
        return <Exercise exercises={exercises} setExercises={setExercises} />;
      case 'progress':
        return <Progress activities={activities} meals={meals} exercises={exercises} />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <Header />
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="content">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
}

export default App;
