const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Appartenir = sequelize.define('Appartenir', {
    utilisateur_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'utilisateur',
        key: 'identifiant'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    ecole_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'ecole',
        key: 'identifiant'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  }, {
    tableName: 'Appartenir',
    timestamps: false,
    freezeTableName: true
  });

  Appartenir.associate = (models) => {
    Appartenir.belongsTo(models.utilisateur, { foreignKey: 'utilisateur_id' });
    Appartenir.belongsTo(models.ecole, { foreignKey: 'ecole_id' });
  };

  return Appartenir;
};
