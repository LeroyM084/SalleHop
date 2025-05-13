const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig'); // Importer la configuration de la connexion Sequelize

// Ce fichier définit le modèle Membre entre sequelize et la base de données.
// Définir le modèle Membre
const Membre = sequelize.define('Membre', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    status:{
        type: DataTypes.ENUM('formateur', 'admin', 'etudiant'),
        allowNull: false,
        defaultValue: 'formateur',
    },
    idCampus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'campus',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
    },
    motdepasse: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    }, {
    tableName: 'membre', // Nom de la table dans la base de données
    timestamps: false, // Désactiver les timestamps automatiques
})

module.exports = Membre; // Exporter le modèle pour l'utiliser dans d'autres fichiers