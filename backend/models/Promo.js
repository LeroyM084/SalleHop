const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig'); // Importer la configuration de la connexion Sequelize

// Ce fichier définit le modèle Promo entre sequelize et la base de données.

const Promo = sequelize.define('Promo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idCampus:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'campus',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
    },
    nbEleves:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'promo', // Nom de la table dans la base de données
    timestamps: false, // Désactiver les timestamps automatiques
})
    

module.exports = Promo; // Exporter le modèle pour l'utiliser dans d'autres fichiers