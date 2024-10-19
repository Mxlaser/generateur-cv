import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/index.css'; 

function Dashboard() {
  const [cvs, setCvs] = useState([]);

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

  return (
    <div className="page-container">
      <h2 className="page-title">Mes CV</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cvs.map((cv) => (
          <li key={cv._id} style={{ marginBottom: '20px' }}>
            <div className="cv-card">
              <h3>{cv.nom} {cv.prénom}</h3>
              <p>{cv.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
