require('dotenv').config(); // Charger les variables d'environnement
const sequelize = require('./dbConfig'); // Importer la configuration de la connexion Sequelize

const testerConnexion = async () => {
  try {
    // Tester la connexion à la base de données
    await sequelize.authenticate();
    console.log('Connexion réussie à la BDD ✅');
  } catch (err) {
    console.error('❌ Erreur de connexion à la BDD :', err.message);
  } finally {
    // Fermer la connexion après le test
    await sequelize.close();
  }
};

testerConnexion();
