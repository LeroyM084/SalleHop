const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Campus = sequelize.define('campus', {
        identifiant: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        adresse: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'campus',
        timestamps: false,
        freezeTableName: true
    });

    Campus.associate = (models) => {
        Campus.belongsToMany(models.ecole, {
            through: models.EtreRattache,
            foreignKey: 'campus_id',
            otherKey: 'ecole_id'
        });

        Campus.hasMany(models.salle, {
            foreignKey: 'campus_id'
        });
    };

    return Campus;
};
