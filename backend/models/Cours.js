const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Cours = sequelize.define('cours', {
    identifiant: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombre_heures_total: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'cours',
    timestamps: false,
    freezeTableName: true
  });

  Cours.associate = (models) => {
    // Un cours correspond à un groupe (1,n vers 1,n)
    Cours.belongsToMany(models.groupe, {
      through: models.Correspondre,
      foreignKey: 'cours_id',
      otherKey: 'groupe_id'
    });
    
    // Un cours définit des créneaux (1,n vers 0,1)
    Cours.belongsToMany(models.creneau, {
      through: models.Definir,
      foreignKey: 'cours_id',
      otherKey: 'creneau_id'
    });
    
    // Un cours est enseigné par des utilisateurs (0,n vers 0,n)
    Cours.belongsToMany(models.utilisateur, {
      through: models.Enseigner,
      foreignKey: 'cours_id',
      otherKey: 'utilisateur_id'
    });
  };

  return Cours;
};