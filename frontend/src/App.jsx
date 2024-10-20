import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/dashboard';
import CreateCV from './pages/createcv';
import Login from './pages/login';
import Register from './pages/Register';
import Navigation from './pages/navigation';
import EditCV from './pages/editcv';
import PrivateRoute from './pages/privateroute';
import Profil from './pages/profil';
import CVDetails from './pages/cvdetails';

function App() {
  return (
    <Router>
  <Navigation />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route
      path="/dashboard"
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    />
    <Route path="/cvs/:id" element={<CVDetails />} /> 
    <Route
      path="/create-cv"
      element={
        <PrivateRoute>
          <CreateCV />
        </PrivateRoute>
      }
    />
    <Route
      path="/edit-cv/:id"
      element={
        <PrivateRoute>
          <EditCV />
        </PrivateRoute>
      }
    />
    <Route
      path="/profil"
      element={
        <PrivateRoute>
          <Profil />
        </PrivateRoute>
      }
    />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Routes>
</Router>
  );
}

export default App;
