const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EtreRattache = sequelize.define('EtreRattache', {
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
    tableName: 'EtreRattache',
    timestamps: false,
    freezeTableName: true
  });

  EtreRattache.associate = (models) => {
    EtreRattache.belongsTo(models.campus, { foreignKey: 'campus_id' });
    EtreRattache.belongsTo(models.ecole, { foreignKey: 'ecole_id' });
  };

  return EtreRattache;
};
