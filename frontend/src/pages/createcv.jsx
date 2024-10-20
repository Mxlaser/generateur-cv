import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/createcv.css'; 

function CreateCV() {
  const [cvData, setCvData] = useState({
    nom: '',
    prénom: '',
    description: '',
    experiencesPédagogiques: [{ diplôme: '', institution: '', dateObtention: '' }],
    experiencesProfessionnelles: [{ poste: '', entreprise: '', dateDébut: '', dateFin: '' }],
    visibilité: true,
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCvData({ ...cvData, [e.target.name]: e.target.value });
  };

  const handlePédagogiqueChange = (index, e) => {
    const newExperiences = [...cvData.experiencesPédagogiques];
    newExperiences[index][e.target.name] = e.target.value;
    setCvData({ ...cvData, experiencesPédagogiques: newExperiences });
  };

  const handleProfessionnelleChange = (index, e) => {
    const newExperiences = [...cvData.experiencesProfessionnelles];
    newExperiences[index][e.target.name] = e.target.value;
    setCvData({ ...cvData, experiencesProfessionnelles: newExperiences });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!cvData.nom || !cvData.prénom || !cvData.description) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
  
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/cvs', cvData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('CV créé avec succès !');
      navigate('/dashboard');
    } catch (error) {
      console.error('Erreur lors de la création du CV', error);
      alert('Une erreur est survenue lors de la création du CV.');
    }
  };
  

  return (
    <div className="page-container-cv">
      <h2 className="page-title">Créer un CV</h2>
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
        
        <h3>Expériences Pédagogiques</h3>
        {cvData.experiencesPédagogiques.map((experience, index) => (
          <div key={index}>
            <label>Diplôme :</label>
            <input type="text" name="diplôme" value={experience.diplôme} onChange={(e) => handlePédagogiqueChange(index, e)} required />
            <label>Institution :</label>
            <input type="text" name="institution" value={experience.institution} onChange={(e) => handlePédagogiqueChange(index, e)} required />
            <label>Date d'Obtention :</label>
            <input type="date" name="dateObtention" value={experience.dateObtention} onChange={(e) => handlePédagogiqueChange(index, e)} required />
          </div>
        ))}

        <h3>Expériences Professionnelles</h3>
        {cvData.experiencesProfessionnelles.map((experience, index) => (
          <div key={index}>
            <label>Poste :</label>
            <input type="text" name="poste" value={experience.poste} onChange={(e) => handleProfessionnelleChange(index, e)} required />
            <label>Entreprise :</label>
            <input type="text" name="entreprise" value={experience.entreprise} onChange={(e) => handleProfessionnelleChange(index, e)} required />
            <label>Date de Début :</label>
            <input type="date" name="dateDébut" value={experience.dateDébut} onChange={(e) => handleProfessionnelleChange(index, e)} required />
            <label>Date de Fin :</label>
            <input type="date" name="dateFin" value={experience.dateFin} onChange={(e) => handleProfessionnelleChange(index, e)} />
          </div>
        ))}

        <button type="submit">Créer CV</button>
      </form>
    </div>
  );
}

export default CreateCV;
