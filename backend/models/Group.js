const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Groupe = sequelize.define('groupe', {
        identifiant: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        est_etudiant: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        tableName: 'groupe',
        timestamps: false,
        freezeTableName: true
    });

    Groupe.associate = (models) => {
        Groupe.belongsToMany(models.utilisateur, {
            through: models.Appartenir,
            foreignKey: 'groupe_id',
            otherKey: 'utilisateur_id'
        });

        Groupe.belongsTo(models.ecole, {
            foreignKey: 'ecole_id'
        });

        Groupe.belongsToMany(models.cours, {
            through: models.Correspondre,
            foreignKey: 'groupe_id',
            otherKey: 'cours_id'
        });
    };

    return Groupe;
};
