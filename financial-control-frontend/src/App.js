import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Register from './components/register';
import Login from './components/login';
import Home from './components/home';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Protegendo a rota home com o PrivateRoute */}
        <Route path="/home" element={<PrivateRoute />}>
          <Route path="" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
