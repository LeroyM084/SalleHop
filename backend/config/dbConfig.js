require('dotenv').config();
const { Sequelize } = require('sequelize');

// Crée une instance de Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nom de la base de données
  process.env.DB_USER, // Utilisateur
  process.env.DB_PASSWORD, // Mot de passe
  {
    host: process.env.DB_HOST, // Hôte (localhost par exemple)
    dialect: 'postgres', // Type de SGBD
    port: process.env.DB_PORT, // Port (par défaut 5432 pour PostgreSQL)
    logging: false, // Désactive les logs SQL dans la console (à activer si besoin de debug)
  }
);

module.exports = sequelize;
