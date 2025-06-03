const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Contenir = sequelize.define('Contenir', {
    campus_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'campus',
        key: 'identifiant'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    salle_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'salle',
        key: 'identifiant'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  }, {
    tableName: 'Contenir',
    timestamps: false,
    freezeTableName: true
  });

  Contenir.associate = (models) => {
    Contenir.belongsTo(models.campus, { foreignKey: 'campus_id' });
    Contenir.belongsTo(models.salle, { foreignKey: 'salle_id' });
  };

  return Contenir;
};
