const { DataTypes } = require('sequelize')


module.exports = (sequelize) => {
  const Role = sequelize.define('role', {
    identifiant: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom_role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'role',
    timestamps: false,
    freezeTableName: true
  });

  Role.associate = (models) => {
    // Un rôle est attribué à des utilisateurs (1,n vers 1,n)
    Role.belongsToMany(models.utilisateur, {
      through: models.Etre,
      foreignKey: 'role_id',
      otherKey: 'utilisateur_id'
    });
  };

  return Role;
};