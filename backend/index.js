const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const cvRoutes = require('./routes/cvRoutes'); // Importez les routes CV

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes de Test
app.get('/', (req, res) => {
  res.send('API Générateur de CV');
});

// Utilisation des routes d'authentification
app.use('/api/users', userRoutes);
app.use('/api/cvs', cvRoutes); // Ajoutez les routes CV ici

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connecté à MongoDB');
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erreur de connexion à MongoDB:', err.message);
  });
