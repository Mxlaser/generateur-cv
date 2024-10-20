import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css'; 

function Dashboard() {
  const [cvs, setCvs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCvs = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/cvs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCvs(response.data);
    };
    fetchCvs();
  }, []);

  const filteredCvs = cvs.filter(cv => 
    cv.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fonction pour rediriger vers la page de détails du CV
  const handleViewDetails = (id) => {
    navigate(`/cvs/${id}`);
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Mes CV</h2>
      <input
        type="text"
        placeholder="Rechercher par nom"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredCvs.map((cv) => (
          <li key={cv._id} className="cv-card">
            <h3>{cv.nom} {cv.prénom}</h3>
            <p>{cv.description}</p>
            <button onClick={() => handleViewDetails(cv._id)} className="view-details-button">
              Voir les détails
            </button>
          </li>
        ))}
      </ul>
    </div>
  );  
}

export default Dashboard;
