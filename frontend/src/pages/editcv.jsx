import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/createcv.css'; 

function EditCV() {
    const { id } = useParams();
    const [cvData, setCvData] = useState({
      nom: '',
      prénom: '',
      description: '',
      experiencesPédagogiques: [{ diplôme: '', institution: '', dateObtention: '' }],
      experiencesProfessionnelles: [{ poste: '', entreprise: '', dateDébut: '', dateFin: '' }],
      visibilité: true,
    });
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchCv = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.get(`http://localhost:5000/api/cvs/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCvData(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération du CV', error);
        }
      };
      fetchCv();
    }, [id]);
  
    const handleChange = (e) => {
      setCvData({ ...cvData, [e.target.name]: e.target.value });
    };
  
    // Gérer les changements pour les expériences pédagogiques
    const handleEducationChange = (index, field, value) => {
      const newEducation = [...cvData.experiencesPédagogiques];
      newEducation[index][field] = value;
      setCvData({ ...cvData, experiencesPédagogiques: newEducation });
    };
  
    // Gérer les changements pour les expériences professionnelles
    const handleWorkChange = (index, field, value) => {
      const newWork = [...cvData.experiencesProfessionnelles];
      newWork[index][field] = value;
      setCvData({ ...cvData, experiencesProfessionnelles: newWork });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');
  
      try {
        await axios.put(`http://localhost:5000/api/cvs/${id}`, cvData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        navigate('/dashboard'); // Rediriger vers le tableau de bord après modification
      } catch (error) {
        console.error('Erreur lors de la modification du CV', error);
      }
    };
  
    return (
      <div className="page-container">
        <h2 className="page-title">Modifier CV</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nom :</label>
            <input type="text" name="nom" value={cvData.nom} onChange={handleChange} required />
          </div>
          <div>
            <label>Prénom :</label>
            <input type="text" name="prénom" value={cvData.prénom} onChange={handleChange} required />
          </div>
          <div>
            <label>Description :</label>
            <textarea name="description" value={cvData.description} onChange={handleChange} required></textarea>
          </div>
  
          {/* Section pour les expériences pédagogiques */}
          <h3>Expériences Pédagogiques</h3>
          {cvData.experiencesPédagogiques.map((exp, index) => (
            <div key={index}>
              <div>
                <label>Diplôme :</label>
                <input
                  type="text"
                  value={exp.diplôme}
                  onChange={(e) => handleEducationChange(index, 'diplôme', e.target.value)}
                />
              </div>
              <div>
                <label>Institution :</label>
                <input
                  type="text"
                  value={exp.institution}
                  onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                />
              </div>
              <div>
                <label>Date d'obtention :</label>
                <input
                  type="date"
                  value={exp.dateObtention ? exp.dateObtention.split('T')[0] : ''}
                  onChange={(e) => handleEducationChange(index, 'dateObtention', e.target.value)}
                />
              </div>
            </div>
          ))}
  
          {/* Section pour les expériences professionnelles */}
          <h3>Expériences Professionnelles</h3>
          {cvData.experiencesProfessionnelles.map((exp, index) => (
            <div key={index}>
              <div>
                <label>Poste :</label>
                <input
                  type="text"
                  value={exp.poste}
                  onChange={(e) => handleWorkChange(index, 'poste', e.target.value)}
                />
              </div>
              <div>
                <label>Entreprise :</label>
                <input
                  type="text"
                  value={exp.entreprise}
                  onChange={(e) => handleWorkChange(index, 'entreprise', e.target.value)}
                />
              </div>
              <div>
                <label>Date de début :</label>
                <input
                  type="date"
                  value={exp.dateDébut ? exp.dateDébut.split('T')[0] : ''}
                  onChange={(e) => handleWorkChange(index, 'dateDébut', e.target.value)}
                />
              </div>
              <div>
                <label>Date de fin :</label>
                <input
                  type="date"
                  value={exp.dateFin ? exp.dateFin.split('T')[0] : ''}
                  onChange={(e) => handleWorkChange(index, 'dateFin', e.target.value)}
                />
              </div>
            </div>
          ))}
  
          <button type="submit">Mettre à jour</button>
        </form>
      </div>
    );
  }

export default EditCV;
