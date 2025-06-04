const db = require('../models');

async function syncDatabase() {
  try {
    console.log('🔄 Début de la synchronisation de la base de données...');
    
    // Test de la connexion
    await db.sequelize.authenticate();
    console.log('✅ Connexion à la base de données établie avec succès.');
    
    // Synchronisation des modèles
    // force: true -> supprime et recrée toutes les tables (ATTENTION: perte de données!)
    // alter: true -> modifie les tables existantes pour correspondre aux modèles
    // Sans options -> crée seulement les tables qui n'existent pas
    
    await db.sequelize.sync({ 
      force: true,  // Mettre à true pour recréer toutes les tables (DANGER!)
      alter: false    // Mettre à true pour modifier les tables existantes
    });
    
    console.log('✅ Synchronisation terminée avec succès!');
    console.log('📋 Tables créées/synchronisées:');
    
    // Afficher la liste des modèles synchronisés
    Object.keys(db).forEach(modelName => {
      if (modelName !== 'sequelize' && modelName !== 'Sequelize') {
        console.log(`   - ${modelName}`);
      }
    });
    
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation:', error);
    process.exit(1);
  } finally {
    // Fermer la connexion
    await db.sequelize.close();
    console.log('🔒 Connexion à la base de données fermée.');
    process.exit(0);
  }
}

// Exécuter le script
syncDatabase();