const express = require('express');
const router = express.Router();

const tokenValidation = require('../middleware/tokenValidation');
const dataTypeValidation = require('../middleware/dataTypeVerification');
// const { getEventSchema } = require('../middleware/schemas/getEventSchema');
const getEventController = require('../controllers/getEventControllers/getEventByRoom');
const getRoomsByTimeSlot = require('../controllers/getEventControllers/getRoomsByTimeSlot');
// const { getEventTimeSlotSchema } = require('../middleware/schemas/getEventTimeSlotSchema'); // à adapter selon ton projet

// Récupérer tous les évènements d'une salle
router.get('/:campus/:salle', tokenValidation, async (req, res) => {
    try {
        const { campus, salle } = req.params;
        const events = await getEventController(campus, salle);

        if (!events || events.length === 0) {
            return res.status(404).json({ message: 'Aucun évènement trouvé pour ce campus et cette salle.' });
        }

        return res.status(200).json({
            message: 'Evènements récupérés avec succès',
            data: events.map(event => ({
                id: event.id,
                cours: event.title,
                group: event.group,
                date: event.date,
                startTime: event.startTime,
                endTime: event.endTime,
                status: event.status,
                campus: event.campus,
                salle: event.salle
            }))
        });

    } catch (error) {
        console.error('Erreur lors de la récupération des évènements:', error);
        return res.status(500).json({
            message: 'Erreur lors de la récupération des évènements',
            error: error.message
        });
    }
});

// Récupérer les salles disponibles pour un créneau horaire donné
router.post('/TimeSlot/:campusId', 
    tokenValidation, 
    // dataTypeValidation(getEventTimeSlotSchema),
    async (req, res) => {
        try {
            const campusId = req.params.campusId;
            const timeSlot = req.body.timeSlot;

            const salles = await getRoomsByTimeSlot(campusId, timeSlot);

            if (!salles || salles.length === 0) {
                return res.status(404).json({ message: 'Aucune salle disponible pour ce créneau horaire.' });
            }

            return res.status(200).json({
                message: 'Salles récupérées avec succès',
                data: salles
            });

        } catch (error) {
            console.error('Erreur lors de la récupération des salles par créneau horaire:', error);
            return res.status(500).json({
                message: 'Erreur lors de la récupération des salles',
                error: error.message
            });
        }
    }
);

module.exports = router;
