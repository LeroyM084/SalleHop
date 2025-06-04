const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Avoir = sequelize.define('Avoir', {
    utilisateur_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'ecole',
        key: 'identifiant'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    ecole_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'campus',
        key: 'identifiant'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  }, {
    tableName: 'Avoir',
    timestamps: false,
    freezeTableName: true
  });

  Avoir.associate = (models) => {
    Avoir.belongsTo(models.ecole, { foreignKey: 'ecole_id' });
    Avoir.belongsTo(models.campus, { foreignKey: 'campus_id' });
  };

  return Avoir;
};
