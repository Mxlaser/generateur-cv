import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navigation.css';

function Navigation() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprimer le token du localStorage
    localStorage.removeItem('token');
    // Rediriger l'utilisateur vers la page de connexion
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">Générateur de CV</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Accueil</Link>
        </li>
        {token ? (
          <>
            <li>
              <Link to="/dashboard">Tableau de Bord</Link>
            </li>
            <li>
              <Link to="/create-cv">Créer un CV</Link>
            </li>
            <li>
              <Link to="/profil">Mon Profil</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">Déconnexion</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Se connecter</Link>
            </li>
            <li>
              <Link to="/register">S'inscrire</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
