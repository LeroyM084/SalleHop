const { utilisateur, salle, groupe, cours, creneau, campus, ecole, role } = require('../../models');

// Fonction pour ajouter un utilisateur
const addUser = async (userData) => {
    try {
        const newUser = await utilisateur.create(userData);
        return newUser;
    } catch (error) {
        throw new Error(`Erreur lors de l'ajout de l'utilisateur: ${error.message}`);
    }
};

// Fonction pour ajouter une salle
const addSalle = async (salleData) => {
    try {
        const newSalle = await salle.create(salleData);
        return newSalle;
    } catch (error) {
        throw new Error(`Erreur lors de l'ajout de la salle: ${error.message}`);
    }
};

// Fonction pour ajouter un groupe
const addGroupe = async (groupeData) => {
    try {
        const newGroupe = await groupe.create(groupeData);
        return newGroupe;
    } catch (error) {
        throw new Error(`Erreur lors de l'ajout du groupe: ${error.message}`);
    }
};

// Fonction pour ajouter un cours
const addCours = async (coursData) => {
    try {
        const newCours = await cours.create(coursData);
        return newCours;
    } catch (error) {
        throw new Error(`Erreur lors de l'ajout du cours: ${error.message}`);
    }
};

// Fonction pour ajouter un créneau
const addCreneau = async (creneauData) => {
    try {
        const newCreneau = await creneau.create(creneauData);
        return newCreneau;
    } catch (error) {
        throw new Error(`Erreur lors de l'ajout du créneau: ${error.message}`);
    }
};

// Fonction pour ajouter un campus
const addCampus = async (campusData) => {
    try {
        const newCampus = await campus.create(campusData);
        return newCampus;
    } catch (error) {
        throw new Error(`Erreur lors de l'ajout du campus: ${error.message}`);
    }
};

// Fonction pour ajouter une école
const addEcole = async (ecoleData) => {
    try {
        const newEcole = await ecole.create(ecoleData);
        return newEcole;
    } catch (error) {
        throw new Error(`Erreur lors de l'ajout de l'école: ${error.message}`);
    }
};

// Fonction pour ajouter un rôle
const addRole = async (roleData) => {
    try {
        const newRole = await role.create(roleData);
        return newRole;
    } catch (error) {
        throw new Error(`Erreur lors de l'ajout du rôle: ${error.message}`);
    }
};

module.exports = {
    addUser,
    addSalle,
    addGroupe,
    addCours,
    addCreneau,
    addCampus,
    addEcole,
    addRole
};