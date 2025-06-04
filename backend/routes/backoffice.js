const router = require('express').Router();
const {
    addUser,
    addSalle,
    addGroupe,
    addCours,
    addCreneau,
    addCampus,
    addEcole,
    addRole
} = require('../controllers/backoffice/addData');

// Route pour ajouter un utilisateur
router.post('/addUser', async (req, res) => {
    try {
        const newUser = await addUser(req.body);
        return res.status(201).json({ message: 'Utilisateur ajouté avec succès.', data: newUser });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur.', error: error.message });
    }
});

// Route pour ajouter une salle
router.post('/addSalle', async (req, res) => {
    try {
        const newSalle = await addSalle(req.body);
        return res.status(201).json({ message: 'Salle ajoutée avec succès.', data: newSalle });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la salle:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur.', error: error.message });
    }
});

// Route pour ajouter un groupe
router.post('/addGroupe', async (req, res) => {
    try {
        const newGroupe = await addGroupe(req.body);
        return res.status(201).json({ message: 'Groupe ajouté avec succès.', data: newGroupe });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du groupe:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur.', error: error.message });
    }
});

// Route pour ajouter un cours
router.post('/addCours', async (req, res) => {
    try {
        const newCours = await addCours(req.body);
        return res.status(201).json({ message: 'Cours ajouté avec succès.', data: newCours });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du cours:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur.', error: error.message });
    }
});

// Route pour ajouter un créneau
router.post('/addCreneau', async (req, res) => {
    try {
        const newCreneau = await addCreneau(req.body);
        return res.status(201).json({ message: 'Créneau ajouté avec succès.', data: newCreneau });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du créneau:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur.', error: error.message });
    }
});

// Route pour ajouter un campus
router.post('/addCampus', async (req, res) => {
    try {
        const newCampus = await addCampus(req.body);
        return res.status(201).json({ message: 'Campus ajouté avec succès.', data: newCampus });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du campus:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur.', error: error.message });
    }
});

// Route pour ajouter une école
router.post('/addEcole', async (req, res) => {
    try {
        const newEcole = await addEcole(req.body);
        return res.status(201).json({ message: 'École ajoutée avec succès.', data: newEcole });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'école:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur.', error: error.message });
    }
});

// Route pour ajouter un rôle
router.post('/addRole', async (req, res) => {
    try {
        const newRole = await addRole(req.body);
        return res.status(201).json({ message: 'Rôle ajouté avec succès.', data: newRole });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du rôle:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur.', error: error.message });
    }
});

module.exports = router;

