const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const CV = require('../models/CV');

const router = express.Router();

// Créer un nouveau CV
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { nom, prénom, description, experiencesPédagogiques, experiencesProfessionnelles, visibilité } = req.body;
    const nouveauCV = new CV({
      utilisateurId: req.user.userId,
      nom,
      prénom,
      description,
      experiencesPédagogiques,
      experiencesProfessionnelles,
      visibilité,
    });

    await nouveauCV.save();
    res.status(201).json(nouveauCV);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création du CV', error: err.message });
  }
});

// Obtenir tous les CV visibles
router.get('/', async (req, res) => {
  try {
    const cvs = await CV.find({ visibilité: true });
    res.json(cvs);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des CV', error: err.message });
  }
});

// Obtenir un CV par ID
router.get('/:id', async (req, res) => {
  try {
    const cv = await CV.findById(req.params.id);
    if (!cv || !cv.visibilité) {
      return res.status(404).json({ message: 'CV non trouvé ou non visible' });
    }
    res.json(cv);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération du CV', error: err.message });
  }
});

// Modifier un CV
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { nom, prénom, description, experiencesPédagogiques, experiencesProfessionnelles, visibilité } = req.body;
    const cv = await CV.findByIdAndUpdate(
      req.params.id,
      { nom, prénom, description, experiencesPédagogiques, experiencesProfessionnelles, visibilité, dateModification: Date.now() },
      { new: true, runValidators: true } // renvoie le CV mis à jour
    );

    if (!cv) {
      return res.status(404).json({ message: 'CV non trouvé' });
    }
    res.json(cv);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la modification du CV', error: err.message });
  }
});

// Supprimer un CV
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const cv = await CV.findByIdAndDelete(req.params.id);
    if (!cv) {
      return res.status(404).json({ message: 'CV non trouvé' });
    }
    res.status(204).send(); // No Content
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression du CV', error: err.message });
  }
});

module.exports = router;
