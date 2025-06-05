const router = require  ('express').Router();
const addData = require('../controllers/backoffice/addData');

// This file defines a route to add data to the database for backoffice purposes.
// This isn't supposed to stay in production

//@TODO: 
// Changer le nom de chaque toure, appeller le bon controlleur dans le fichier controller/backoffice/addData.js


router.post('/addData', async (req, res) => {
    try {
        const data = req.body;
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ message: 'Aucune donnée fournie.' });
        }
        const result = await addData(data);
        if(!result.status === 'ok'){
            return res.status(500).json({message : "Erreur du controlleur", error : result.error});
        } 
        
        return res.status(201).json({ message: 'Utilisateur ajouté avec succès.' });
    } catch(error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur.', error: error.message });
    }
});
