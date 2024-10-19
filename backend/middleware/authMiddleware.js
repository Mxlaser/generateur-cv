const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé' });
  }

  try {
    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ajouter les informations de l'utilisateur au req pour les utiliser dans les routes protégées
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalide', error: err.message });
  }
};

module.exports = authMiddleware;
