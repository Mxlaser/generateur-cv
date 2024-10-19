import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import PrivateRoute from './components/privateRoute';
import Register from './pages/register';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Route publique pour la page d'accueil */}
          <Route path="/" element={<Home />} />
          
          {/* Route publique pour la page de connexion */}
          <Route path="/login" element={<Login />} />

          {/* Route protégée par PrivateRoute pour le tableau de bord */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
