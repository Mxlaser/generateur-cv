import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css'; 

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Bienvenue sur le Générateur de CV</h1>
        <p className="home-description">
          Créez, modifiez et partagez vos CV facilement en ligne. Rejoignez-nous dès maintenant pour commencer à gérer vos CV en toute simplicité.
        </p>
        <div className="home-buttons">
          <Link to="/login" className="home-button login-button">
            Se connecter
          </Link>
          <Link to="/register" className="home-button register-button">
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
