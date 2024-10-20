const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const CV = require('../models/CV');
const User = require('../models/User');

const router = express.Router();

router.get('/users', authMiddleware, async (req, res) => {
  try {
    const cvs = await CV.find({ utilisateurId: req.user.userId });
    res.json(cvs);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des CV', error: err.message });
  }
});

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

router.get('/', async (req, res) => {
  try {
    const cvs = await CV.find({ visibilité: true });
    res.json(cvs);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des CV', error: err.message });
  }
});

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

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { nom, prénom, description, experiencesPédagogiques, experiencesProfessionnelles, visibilité } = req.body;
    const cv = await CV.findByIdAndUpdate(
      req.params.id,
      { nom, prénom, description, experiencesPédagogiques, experiencesProfessionnelles, visibilité, dateModification: Date.now() },
      { new: true, runValidators: true }
    );

    if (!cv) {
      return res.status(404).json({ message: 'CV non trouvé' });
    }
    res.json(cv);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la modification du CV', error: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const cv = await CV.findByIdAndDelete(req.params.id);
    if (!cv) {
      return res.status(404).json({ message: 'CV non trouvé' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression du CV', error: err.message });
  }
});

router.post('/:id/recommendations', authMiddleware, async (req, res) => {
  const cvId = req.params.id;
  const { commentaire } = req.body;

  try {
    const utilisateurId = req.user.userId;
    const utilisateur = await User.findById(utilisateurId);

    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const nouvelleRecommandation = {
      utilisateurNom: utilisateur.nom,
      commentaire,
      date: new Date(),
    };

    const cv = await CV.findById(cvId);
    if (!cv) {
      return res.status(404).json({ message: "CV non trouvé" });
    }

    cv.recommandations.push(nouvelleRecommandation);
    await cv.save();

    res.status(201).json({ message: "Recommandation ajoutée avec succès", recommandation: nouvelleRecommandation });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l'ajout de la recommandation", error: err.message });
  }
});

module.exports = router;
