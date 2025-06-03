const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Correspondre = sequelize.define('Correspondre', {
    groupe_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'groupe',
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
    tableName: 'Correspondre',
    timestamps: false,
    freezeTableName: true
  });

  Correspondre.associate = (models) => {
    Correspondre.belongsTo(models.groupe, { foreignKey: 'groupe_id' });
    Correspondre.belongsTo(models.cours, { foreignKey: 'cours_id' });
  };

  return Correspondre;
};
