const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
  utilisateurId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  prénom: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  experiencesPédagogiques: [
    {
      diplôme: String,
      institution: String,
      dateObtention: Date,
    },
  ],
  experiencesProfessionnelles: [
    {
      poste: String,
      entreprise: String,
      dateDébut: Date,
      dateFin: Date,
    },
  ],
  visibilité: {
    type: Boolean,
    default: true,
  },
  dateCréation: {
    type: Date,
    default: Date.now,
  },
  dateModification: {
    type: Date,
    default: Date.now,
  },
});

const CV = mongoose.model('CV', cvSchema);

module.exports = CV;
