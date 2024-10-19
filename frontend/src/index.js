import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/styles/index.css'; // Optionnel, si tu as des styles globaux
import App from './App.jsx';

// Sélectionner la div avec l'id 'root' dans le fichier index.html
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
