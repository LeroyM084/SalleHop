const router = require  ('express').Router();
const addData = require('../controllers/backoffice/addData');

// This file defines a route to add data to the database for backoffice purposes.
// This isn't supposed to stay in production

//@TODO: 
// Changer le nom de chaque toure, appeller le bon controlleur dans le fichier controller/backoffice/addData.js


router.post('/addUser', async (req, res) => {
    try {
        // APPEL LE CONTROLLER ICI 
        // Et renvoyer un 201, dans chaque route 
        return res.status(201).json({ message: 'Utilisateur ajouté avec succès.' });
    } catch(error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur.', error: error.message });
    }
});


router.post('/addUser', async (req, res) => {
    try {
        // APPEL LE CONTROLLER ICI 
    } catch(error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur.', error: error.message });
    }
});


router.post('/addUser', async (req, res) => {
    try {
        // APPEL LE CONTROLLER ICI 
    } catch(error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur.', error: error.message });
    }
});

router.post('/addUser', async (req, res) => {
    try {
        // APPEL LE CONTROLLER ICI 
    } catch(error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur.', error: error.message });
    }
});

router.post('/addUser', async (req, res) => {
    try {
        // APPEL LE CONTROLLER ICI 
    } catch(error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur.', error: error.message });
    }
});

router.post('/addUser', async (req, res) => {
    try {
        // APPEL LE CONTROLLER ICI 
    } catch(error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur.', error: error.message });
    }
});

router.post('/addUser', async (req, res) => {
    try {
        // APPEL LE CONTROLLER ICI 
    } catch(error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur.', error: error.message });
    }
});

router.post('/addUser', async (req, res) => {
    try {
        // APPEL LE CONTROLLER ICI 
    } catch(error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur.', error: error.message });
    }
});

