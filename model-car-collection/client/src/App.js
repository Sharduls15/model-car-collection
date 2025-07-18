import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddCar from './pages/AddCar';
import CarList from './pages/CarList';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddCar />} />
        <Route path="/cars" element={<CarList />} />
      </Routes>
    </Router>
  );
};

export default App;
