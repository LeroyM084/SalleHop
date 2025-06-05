const { utilisateur, salle, groupe, cours, creneau, ecole, campus } = require('../../models');
const { Definir, Appartenir, Avoir, Contenir, Correspondre, Enseigner, Etre, EtreRattache } = require('../../models');
const bcrypt = require('bcrypt');

// Fonctions d'insertion par table
const addUser = async (data) => utilisateur.create({
    nom: data.nom,
    prenom: data.prenom,
    email: data.email,
    mot_de_passe: await bcrypt.hash(data.mot_de_passe, 10)
});

const addEcole = async (data) => ecole.create({ nom: data.nom });

const addCampus = async (data) => campus.create({ nom: data.nom, adresse: data.adresse });

const addSalle = async (data) => salle.create({ nom: data.nom, campus_id: data.campus_id });

const addGroupe = async (data) => groupe.create({ nom: data.nom, est_etudiant: data.est_etudiant, ecole_id: data.ecole_id });

const addCours = async (data) => cours.create({ nom: data.nom, nombre_heures_total: data.nombre_heures_total });

const addCreneau = async (data) => creneau.create({
    date: data.date,
    heure_debut: data.heure_debut,
    heure_fin: data.heure_fin,
    status: data.status || 'en attente'
});

const addRole = async (data) => {
    await role.create({nom_role : data.nom_role});
}

// Fonction principale
const addData = async (jsonData) => {
    try {
        // Map des fonctions d'insertion
        const insertFunctions = {
            role : addRole,
            utilisateur: addUser,
            ecole: addEcole,
            campus: addCampus,
            salle: addSalle,
            groupe: addGroupe,
            cours: addCours,
            creneau: addCreneau
        };

        // Stocke les objets créés
        const created = {};

        // Création des entités
        for (const key of Object.keys(jsonData)) {
            if (insertFunctions[key]) {
                created[key] = await insertFunctions[key](jsonData[key]);
            }
        }

        // Associations automatiques selon les modèles
        // Ecole <-> Campus
        if (created.ecole && created.campus) {
            await EtreRattache.create({
                ecole_id: created.ecole.identifiant,
                campus_id: created.campus.identifiant
            });
        }
        // Groupe <-> Ecole
        if (created.groupe && created.ecole) {
            await created.groupe.setEcole(created.ecole);
        }
        // Salle <-> Campus
        if (created.salle && created.campus) {
            await created.salle.setCampus(created.campus);
        }
        // Groupe <-> Utilisateur
        if (created.groupe && created.utilisateur) {
            await Appartenir.create({
                groupe_id: created.groupe.identifiant,
                utilisateur_id: created.utilisateur.identifiant
            });
        }
        // Groupe <-> Cours
        if (created.groupe && created.cours) {
            await Correspondre.create({
                groupe_id: created.groupe.identifiant,
                cours_id: created.cours.identifiant
            });
        }
        // Cours <-> Creneau
        if (created.cours && created.creneau) {
            await Definir.create({
                cours_id: created.cours.identifiant,
                creneau_id: created.creneau.identifiant
            });
        }
        // Salle <-> Creneau
        if (created.salle && created.creneau) {
            await Definir.create({
                salle_id: created.salle.identifiant,
                creneau_id: created.creneau.identifiant
            });
        }
        // Cours <-> Utilisateur (Enseignant)
        if (created.cours && created.utilisateur) {
            await Enseigner.create({
                cours_id: created.cours.identifiant,
                utilisateur_id: created.utilisateur.identifiant
            });
        }

        return { status: 'ok', created };
    } catch (error) {
        return { status: 'error', error: error.message || error };
    }
};

module.exports = addData