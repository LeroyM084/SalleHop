const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Salle = sequelize.define('salle', {
        identifiant: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        campus_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'campus',
                key: 'identifiant'
            }
        }
    }, {
        tableName: 'salle',
        timestamps: false,
        freezeTableName: true
    });

    Salle.associate = (models) => {
        Salle.belongsTo(models.campus, {
            foreignKey: 'campus_id'
        });

        Salle.belongsToMany(models.creneau, {
            through: models.Definir,
            foreignKey: 'salle_id',
            otherKey: 'creneau_id'
        });
    };

    return Salle;
};
