const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Creneau = sequelize.define('creneau', {
    identifiant: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    heure_debut: {
      type: DataTypes.TIME,
      allowNull: false
    },
    heure_fin: {
      type: DataTypes.TIME,
      allowNull: false
    },
    status : {
      type: DataTypes.STRING,
      // N'accepte que les valeurs suivantes : 'validé', 'en attente', 'refusé'
      // Permet de savoir si le créneau est validé, en attente ou refusé
      validate: {
        isIn: [['validé', 'en attente', 'refusé']]
      },
      allowNull: false,
      defaultValue: 'en attente'
    },
  }, {
    tableName: 'creneau',
    timestamps: false,
    freezeTableName: true
  });

  Creneau.associate = (models) => {
    // Un créneau est défini par un cours (0,1 vers 1,n)
    Creneau.belongsToMany(models.cours, {
      through: models.Definir,
      foreignKey: 'creneau_id',
      otherKey: 'cours_id'
    });
    
    // Un créneau a lieu dans une salle (1,n vers 1,1)
    Creneau.belongsToMany(models.salle, {
      through: models.Definir,
      foreignKey: 'creneau_id',
      otherKey: 'salle_id'
    });
  };

  return Creneau;
};