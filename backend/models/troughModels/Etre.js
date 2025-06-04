const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Etre = sequelize.define('Etre', {
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
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'role',
        key: 'identifiant'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  }, {
    tableName: 'Etre',
    timestamps: false,
    freezeTableName: true
  });

  Etre.associate = (models) => {
    Etre.belongsTo(models.utilisateur, { foreignKey: 'utilisateur_id' });
    Etre.belongsTo(models.role, { foreignKey: 'role_id' });
  };

  return Etre;
};
