const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig'); // Importer la configuration de la connexion Sequelize

// Ce fichier définit le modèle Campus pour la table "membre" dans la base de données.

const Campus = sequelize.define('Campus', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    adresse: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Campus; // Exporter le modèle pour l'utiliser dans d'autres fichiers