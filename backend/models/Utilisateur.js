const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Utilisateur = sequelize.define('utilisateur', {
        identifiant: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        mot_de_passe: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'utilisateur',
        timestamps: false,
        freezeTableName: true
    });

    Utilisateur.associate = (models) => {
        Utilisateur.belongsToMany(models.groupe, {
            through: models.Appartenir,
            foreignKey: 'utilisateur_id',
            otherKey: 'groupe_id'
        });

        Utilisateur.belongsToMany(models.role, {
            through: models.Etre,
            foreignKey: 'utilisateur_id',
            otherKey: 'role_id'
        });

        Utilisateur.belongsToMany(models.cours, {
            through: models.Enseigner,
            foreignKey: 'utilisateur_id',
            otherKey: 'cours_id'
        });
    };

    return Utilisateur;
};
