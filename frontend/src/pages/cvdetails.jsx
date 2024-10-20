import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/CVDetails.css';

function CVDetails() {
  const { id } = useParams();
  const [cv, setCv] = useState(null);
  const [recommandations, setRecommandations] = useState([]);
  const [nouvelleRecommandation, setNouvelleRecommandation] = useState('');

  useEffect(() => {
    const fetchCv = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("Utilisateur non authentifié");
        return;
      }
      
      try {
        const response = await axios.get(`http://localhost:5000/api/cvs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCv(response.data);
        setRecommandations(response.data.recommandations);
      } catch (error) {
        console.error('Erreur lors de la récupération du CV', error);
      }
    };

    fetchCv();
  }, [id]);

  const ajouterRecommandation = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Utilisateur non authentifié");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/cvs/${id}/recommendations`,
        { commentaire: nouvelleRecommandation },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        setRecommandations([...recommandations, response.data.recommandation]);
        setNouvelleRecommandation('');
      } else {
        console.error("Erreur lors de l'ajout de la recommandation", response);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la recommandation", error);
    }
  };

  if (!cv) {
    return <p>Chargement des détails du CV...</p>;
  }

  return (
    <div className="cv-details-container">
      <h2>Détails du CV de {cv.nom} {cv.prénom}</h2>
      <p>Description : {cv.description}</p>

      <h3>Expériences Pédagogiques</h3>
      <ul>
        {cv.experiencesPédagogiques.map((exp, index) => (
          <li key={index}>
            <p>Diplôme : {exp.diplôme}</p>
            <p>Institution : {exp.institution}</p>
            <p>Date d'obtention : {new Date(exp.dateObtention).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>

      <h3>Expériences Professionnelles</h3>
      <ul>
        {cv.experiencesProfessionnelles.map((exp, index) => (
          <li key={index}>
            <p>Poste : {exp.poste}</p>
            <p>Entreprise : {exp.entreprise}</p>
            <p>Date de début : {new Date(exp.dateDébut).toLocaleDateString()}</p>
            <p>Date de fin : {exp.dateFin ? new Date(exp.dateFin).toLocaleDateString() : 'En cours'}</p>
          </li>
        ))}
      </ul>

      <h3>Recommandations</h3>
      <ul>
        {recommandations.map((rec, index) => (
          <li key={index}>
            <p><strong>{rec.utilisateurNom || 'Anonyme'} :</strong> {rec.commentaire}</p>
            <p>Date : {new Date(rec.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>

      <div className="nouvelle-recommandation">
        <textarea
          value={nouvelleRecommandation}
          onChange={(e) => setNouvelleRecommandation(e.target.value)}
          placeholder="Ajouter une recommandation"
        />
        <button onClick={ajouterRecommandation}>Ajouter</button>
      </div>
    </div>
  );
}

export default CVDetails;
