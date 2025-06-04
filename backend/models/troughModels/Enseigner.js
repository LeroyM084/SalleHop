const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Enseigner = sequelize.define('Enseigner', {
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
    cours_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'cours',
        key: 'identifiant'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  }, {
    tableName: 'Enseigner',
    timestamps: false,
    freezeTableName: true
  });

  Enseigner.associate = (models) => {
    Enseigner.belongsTo(models.utilisateur, { foreignKey: 'utilisateur_id' });
    Enseigner.belongsTo(models.cours, { foreignKey: 'cours_id' });
  };

  return Enseigner;
};
