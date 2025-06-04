// Ce script permet de supprimer toutes les données de test de la base de données PSQL
// Les données ont été ajoutées via le script ./addData.js

const { sequelize, utilisateur, ecole, groupe, campus, salle, cours, creneau, role } = require('../models');

async function deleteTestData() {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base OK.');

    // Supprimer les associations (si nécessaire selon tes tables de jointure)
    // Exemple : await Appartenir.destroy({ where: { ... } });

    // Supprimer les créneaux de test
    await creneau.destroy({
      where: {
        date: new Date('2025-06-01'),
        heure_debut: '10:00:00',
        heure_fin: '12:00:00'
      }
    });

    // Supprimer les cours de test
    await cours.destroy({
      where: { nom: 'COURS_TEST_SPECIAL' }
    });

    // Supprimer les rôles de test
    await role.destroy({
      where: { nom_role: 'ROLE_TEST_SPECIAL' }
    });

    // Supprimer les utilisateurs de test
    await utilisateur.destroy({
      where: {
        nom: 'UTILISATEUR_TEST',
        prenom: 'SPECIAL',
        email: 'special_test@example.com'
      }
    });

    // Supprimer les salles de test
    await salle.destroy({
      where: { nom: 'SALLE_TEST_SPECIAL' }
    });

    // Supprimer les groupes de test
    await groupe.destroy({
      where: { nom: 'GROUPE_TEST_SPECIAL' }
    });

    // Supprimer les écoles de test
    await ecole.destroy({
      where: { nom: 'ECOLE_TEST_SPECIAL' }
    });

    // Supprimer les campus de test
    await campus.destroy({
      where: { nom: 'CAMPUS_TEST_SPECIAL' }
    });

    console.log('✅ Données de test supprimées avec succès !');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erreur lors de la suppression des données :', err);
    process.exit(1);
  }
}

deleteTestData();

