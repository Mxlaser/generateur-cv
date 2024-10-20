import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/profil.css'; 
import { useNavigate } from 'react-router-dom';

function Profil() {
    const [cvs, setCvs] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
        const fetchUserCvs = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found. User might not be logged in.');
                return;
            }
            try {
                const response = await axios.get('http://localhost:5000/api/cvs/users', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('Fetched CVs:', response.data);
                setCvs(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des CV de l\'utilisateur', error);
            }
        };

        fetchUserCvs();
    }, []);
  
    const handleVisibilityToggle = async (id, currentVisibility) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found. User might not be logged in.');
            return;
        }
        console.log(`Toggling visibility for CV ID: ${id}, currentVisibility: ${currentVisibility}`);
        try {
            const response = await axios.put(
                `http://localhost:5000/api/cvs/${id}`,
                { visibilité: !currentVisibility },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('Response from server:', response.data);

            setCvs((prevCvs) =>
                prevCvs.map((cv) =>
                    cv._id === id ? { ...cv, visibilité: response.data.visibilité } : cv
                )
            );
        } catch (error) {
            console.error('Erreur lors de la modification de la visibilité', error);
        }
    };
  
    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found. User might not be logged in.');
            return;
        }
        try {
            await axios.delete(`http://localhost:5000/api/cvs/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCvs((prevCvs) => prevCvs.filter((cv) => cv._id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression du CV', error);
        }
    };
  
    const handleEdit = (id) => {
        navigate(`/edit-cv/${id}`);
    };
  
    return (
        <div className="page-container-profil">
            <h2 className="page-title">Mon Profil - Mes CV</h2>
            <ul>
                {cvs.map((cv) => (
                    <li key={cv._id} className="cv-card">
                        <h3>{cv.nom} {cv.prénom}</h3>
                        <p>{cv.description}</p>
                        <div className="cv-visibility">
                            <span>Visibilité : {cv.visibilité ? 'Visible' : 'Caché'}</span>
                            <button onClick={() => {
                                console.log(`Button clicked for CV ID: ${cv._id}`);
                                handleVisibilityToggle(cv._id, cv.visibilité);
                            }}>
                                Rendre {cv.visibilité ? 'Caché' : 'Visible'}
                            </button>
                            <button onClick={() => handleEdit(cv._id)} className="edit-button">Modifier</button>
                            <button onClick={() => handleDelete(cv._id)} className="delete-button">Supprimer</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Profil;
