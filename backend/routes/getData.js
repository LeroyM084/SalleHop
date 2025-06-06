const router = require('express').Router();
const tokenValidation = require('../middleware/tokenValidation');   
const { groupe, cours, salle } = require('../models');

router.get('/getData', 
    tokenValidation,
    async (req, res) => {  // Ajout du paramètre 'req'
        try { 
            // Renommage des variables pour éviter la collision
            const coursData = await cours.findAll();
            const salleData = await salle.findAll();
            const groupeData = await groupe.findAll();

            const data = {
                cours: coursData,
                salle: salleData,
                groupe: groupeData
            };

            return res.status(200).json({
                message: 'Données récupérées avec succès',
                data: data
            });
        } catch(error) {
            console.error('Erreur lors de la récupération des données:', error);
            return res.status(500).json({
                message: 'Erreur interne du serveur.',
                error: error.message
            });
        }
    }
);

module.exports = router;