const addEvent = require('../controllers/addEventControllers/addEvent');

const router = require('express').Router();
const tokenValidation = require('../middleware/tokenValidation');
const dataTypeValidation = require('../middleware/dataTypeVerification');

// SCHEMAS 
// const { addEventSchema } = require('../middleware/schemas/addEventSchema');

// This file defines a route to add a new event. With or without reccurency. 
// It does that by calling the right controller function based on the request body.

router.post('/newEvent', 
    tokenValidation, 
    // dataTypeValidation(addEventSchema),
    async(req,res) => {
        try {
            const userId = req.userId;
            const eventData = req.body;

            if(!eventData || !eventData.coursLabel || !eventData.roomNumber || !eventData.timeSlot || !eventData.groupName || !eventData.recurrence) {
                return res.status(400).json({ message: 'Données manquantes pour la création de l\'évènement.' });
        }
            if(eventData.recurrence.status === false){
                eventData.recurrence = null;
                result = await addEvent(eventData, userId)
            } else if(eventData.recurrence.status === true) {
                result = await addEventReccurency(eventData, userId)
            } else {
                return res.status(400).json({ message: 'Statut de récurrence invalide.' });
            }

            if (!result) {
                return res.status(500).json({ message: 'Erreur lors de la création de l\'évènement.' });
            }

            return res.status(201).json({ message: 'Evènement créé avec succès.' });
    } catch(error) {
        console.error('Erreur lors de la création de l\'évènement:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur.', error: error.message });
    }
    });

module.exports = router;