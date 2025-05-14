const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig'); // Importer la configuration de la connexion Sequelize

// Ce fichier définit le modèle salle entre la base de données et le sequelize. 

const Salle = sequelize.define('Salle', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_campus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'campus',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
    },
    numSalle: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'salle',
    timestamps: false, // Désactiver les timestamps automatiques
});

module.exports = Salle;