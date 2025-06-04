// Ce script permet d'ajouter automatiquement des données de test à la base de données PSQL
// Les données sont prédéfinies et sont impossible à rentrer manuellement ( normalement ). 
// Toutes les données de tests peuvent être supprimées via le script ./deleteData.js

const bcrypt = require('bcrypt');
const { sequelize, utilisateur, ecole, groupe, campus, salle, cours, creneau, role } = require('../models');

// Ajoute aussi les modèles de jointure si besoin
const { Definir, Appartenir, Avoir, Enseigner, Correspondre } = require('../models');

async function addTestData() {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base OK.');

    // Ajout Campus
    const campusTest = await campus.create({
      nom: 'CAMPUS_TEST_SPECIAL',
      adresse: '1 rue du Test, 75000 Paris'
    });

    // Ajout Ecole
    const ecoleTest = await ecole.create({
      nom: 'ECOLE_TEST_SPECIAL'
    });

    // Ajout Groupe
    const groupeTest = await groupe.create({
      nom: 'GROUPE_TEST_SPECIAL',
      est_etudiant: true,
      ecole_id: ecoleTest.identifiant
    });

    // Ajout Salle
    const salleTest = await salle.create({
      nom: 'SALLE_TEST_SPECIAL',
      campus_id: campusTest.identifiant
    });

    // Ajout Utilisateur
    const userTest = await utilisateur.create({
      nom: 'UTILISATEUR_TEST',
      prenom: 'SPECIAL',
      email: 'special_test@example.com',
      mot_de_passe: await bcrypt.hash('password123', 10)
    });

    // Ajout Role
    const roleTest = await role.create({
      nom_role: 'ROLE_TEST_SPECIAL'
    });

    // Ajout Cours
    const coursTest = await cours.create({
      nom: 'COURS_TEST_SPECIAL',
      nombre_heures_total: 42
    });

    // Ajout Creneau
    const creneauTest = await creneau.create({
      date: new Date('2025-06-01'),
      heure_debut: '10:00:00',
      heure_fin: '12:00:00'
    });

    // Table de jointure : Definir (creneau, salle, cours, groupe)
    await Definir.create({
      creneau_id: creneauTest.identifiant,
      salle_id: salleTest.identifiant,
      cours_id: coursTest.identifiant,
      groupe_id: groupeTest.identifiant
    });

    // Table de jointure : Appartenir (utilisateur, groupe, ecole)
    await Appartenir.create({
      utilisateur_id: userTest.identifiant,
      groupe_id: groupeTest.identifiant,
      ecole_id: ecoleTest.identifiant
    });

    // Table de jointure : Avoir (utilisateur, role)
    await Avoir.create({
      utilisateur_id: userTest.identifiant,
      role_id: roleTest.identifiant
    });

    // Table de jointure : Enseigner (utilisateur, cours)
    await Enseigner.create({
      utilisateur_id: userTest.identifiant,
      cours_id: coursTest.identifiant
    });

    // Table de jointure : Correspondre (groupe, cours)
    await Correspondre.create({
      groupe_id: groupeTest.identifiant,
      cours_id: coursTest.identifiant
    });

    console.log('✅ Données de test ajoutées et reliées avec succès !');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erreur lors de l\'ajout des données :', err);
    process.exit(1);
  }
}

addTestData();

