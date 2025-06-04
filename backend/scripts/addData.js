// Ce script permet d'ajouter automatiquement des données de test à la base de données PSQL
// Les données sont prédéfinies et sont impossible à rentrer manuellement ( normalement ). 
// Toutes les données de tests peuvent être supprimées via le script ./deleteData.js

const bcrypt = require('bcrypt');
const {
  sequelize,
  utilisateur,
  ecole,
  groupe,
  campus,
  salle,
  cours,
  creneau,
  role
} = require('../models');
const {
  Definir,
  Appartenir,
  Avoir,
  Enseigner,
  Correspondre,
  Etre,
  EtreRattache,
  Contenir
} = require('../models');

async function addTestData() {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base OK.');

    // Campus
    const campusTest = await campus.create({
      nom: 'CAMPUS_TEST',
      adresse: '123 rue Test, 75000 Paris'
    });

    // Ecole
    const ecoleTest = await ecole.create({
      nom: 'ECOLE_TEST'
    });

    // Lier Ecole et Campus
    await EtreRattache.create({
      campus_id: campusTest.identifiant,
      ecole_id: ecoleTest.identifiant
    });

    // Groupe
    const groupeTest = await groupe.create({
      nom: 'GROUPE_TEST',
      est_etudiant: true,
      ecole_id: ecoleTest.identifiant
    });

    // Salle
    const salleTest = await salle.create({
      nom: 'SALLE_TEST',
      campus_id: campusTest.identifiant
    });

    // Lier Salle et Campus (Contenir)
    await Contenir.create({
      campus_id: campusTest.identifiant,
      salle_id: salleTest.identifiant
    });

    // Utilisateur
    const userTest = await utilisateur.create({
      nom: 'DUPONT',
      prenom: 'Jean',
      email: 'jean.dupont@test.com',
      mot_de_passe: await bcrypt.hash('password123', 10)
    });

    // Role
    const roleTest = await role.create({
      nom_role: 'ADMIN'
    });

    // Lier Utilisateur et Role (Etre)
    await Etre.create({
      utilisateur_id: userTest.identifiant,
      role_id: roleTest.identifiant
    });

    // Cours
    const coursTest = await cours.create({
      nom: 'COURS_TEST',
      nombre_heures_total: 20
    });

    // Lier Groupe et Cours (Correspondre)
    await Correspondre.create({
      groupe_id: groupeTest.identifiant,
      cours_id: coursTest.identifiant
    });

    // Lier Utilisateur et Groupe (Appartenir)
    await Appartenir.create({
      utilisateur_id: userTest.identifiant,
      groupe_id: groupeTest.identifiant,
      ecole_id: ecoleTest.identifiant
    });

    // Lier Utilisateur et Cours (Enseigner)
    await Enseigner.create({
      utilisateur_id: userTest.identifiant,
      cours_id: coursTest.identifiant
    });

    // Creneau 1
    const creneauTest1 = await creneau.create({
      date: new Date('2025-06-01'),
      heure_debut: '10:00:00',
      heure_fin: '12:00:00',
      status: 'en attente'
    });

    // Creneau 2 (pour tester plusieurs réservations)
    const creneauTest2 = await creneau.create({
      date: new Date('2025-06-02'),
      heure_debut: '14:00:00',
      heure_fin: '16:00:00',
      status: 'en attente'
    });

    // Lier tout dans Definir (creneau, salle, cours, groupe)
    await Definir.create({
      creneau_id: creneauTest1.identifiant,
      salle_id: salleTest.identifiant,
      cours_id: coursTest.identifiant,
      groupe_id: groupeTest.identifiant,
      user_id: userTest.identifiant
    });

    await Definir.create({
      creneau_id: creneauTest2.identifiant,
      salle_id: salleTest.identifiant,
      cours_id: coursTest.identifiant,
      groupe_id: groupeTest.identifiant,
      user_id: userTest.identifiant
    });

    console.log('✅ Données de test ajoutées et reliées avec succès !');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erreur lors de l\'ajout des données :', err);
    process.exit(1);
  }
}

addTestData();

