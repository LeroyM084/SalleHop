const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig'); // Importer la configuration de la connexion Sequelize

// Ce fichier définit le modèle reservation entre sequelize et la base de données.
// id, idsalle, idpromo, idmembre, date, heuredebut, heurefin, statut


const Reservation = sequelize.define('Reservation', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idSalle: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'salle',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
    },
    idPromo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'promo',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
    },
    idMembre: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'membre',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    heureDebut: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    heureFin: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    statut: {
        type: DataTypes.ENUM('valide', 'annule', 'en attente'),
        allowNull: false,
        defaultValue: 'en attente',
    },
}, {
    tableName: 'reservation', // Nom de la table dans la base de données
    timestamps: false, // Désactiver les timestamps automatiques
})

module.exports = Reservation; // Exporter le modèle pour l'utiliser dans d'autres fichiers
