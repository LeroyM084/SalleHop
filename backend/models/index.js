const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../config/dbConfig');

const db = {};

// Charger les modèles du dossier courant
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize);
    db[model.name] = model;
  });

// Charger les modèles du sous-dossier liaison
const liaisonDir = path.join(__dirname, 'troughModels');
if (fs.existsSync(liaisonDir)) {
  fs.readdirSync(liaisonDir)
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
      const model = require(path.join(liaisonDir, file))(sequelize);
      db[model.name] = model;
    });
}

// Créer les associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
