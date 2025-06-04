const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Definir = sequelize.define('Definir', {
    salle_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'salle',
        key: 'identifiant'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
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
    },
    creneau_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'creneau',
        key: 'identifiant'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'utilisateur',
        key: 'identifiant'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }
  }, {
    tableName: 'Definir',
    timestamps: false,
    freezeTableName: true
  });

  Definir.associate = (models) => {
    Definir.belongsTo(models.salle, { foreignKey: 'salle_id' });
    Definir.belongsTo(models.groupe, { foreignKey: 'groupe_id' });
    Definir.belongsTo(models.cours, { foreignKey: 'cours_id' });
    Definir.belongsTo(models.creneau, { foreignKey: 'creneau_id' });
    Definir.belongsTo(models.utilisateur, { foreignKey: 'user_id' });
  };

  return Definir;
};
