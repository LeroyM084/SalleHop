const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Ecole = sequelize.define('ecole', {
        identifiant: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'ecole',
        timestamps: false,
        freezeTableName: true
    });

    Ecole.associate = (models) => {
        Ecole.hasMany(models.groupe, {
            foreignKey: 'ecole_id'
        });

        Ecole.belongsToMany(models.campus, {
            through: models.EtreRattache,
            foreignKey: 'ecole_id',
            otherKey: 'campus_id'
        });
    };

    return Ecole;
};
