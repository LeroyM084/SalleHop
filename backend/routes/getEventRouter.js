const express = require('express');
const router = express.Router();

const tokenValidation = require('../middleware/tokenValidation');
const dataTypeValidation = require('../middleware/dataTypeVerification');
// const { getEventSchema } = require('../middleware/schemas/getEventSchema');
const getEventController = require('../controllers/getEventControllers/getEventByRoom');
const getRoomsByTimeSlot = require('../controllers/getEventControllers/getRoomsByTimeSlot');
// const { getEventTimeSlotSchema } = require('../middleware/schemas/getEventTimeSlotSchema'); // à adapter selon ton projet
const { getEventByUserGroup } = require('../controllers/getEventControllers/getEventByGroupUser');


// Récupérer tous les évènements relié au groupe de l'utilisateur. 
router.get('/events', 
    tokenValidation, 
    async (req, res) => {
        console.log('1. Route /events appelée par l\'utilisateur:', req.userId);
        try {
            const userId = req.userId;
            console.log('2. Appel de getEventByUserGroup avec userId:', userId);
            
            const events = await getEventByUserGroup(userId);
            console.log('3. Résultat de getEventByUserGroup:', 
                events ? `${events.length} événements trouvés` : 'undefined');

            if (!events || events.length === 0) {
                console.log('4a. Aucun événement trouvé');
                return res.status(404).json({ message: 'Aucun évènement trouvé pour ce groupe.' });
            }

            console.log('4b. Construction de la réponse pour', events.length, 'événements');
            const mappedEvents = events.map(event => {
                console.log('5. Mapping de l\'événement:', event?.id || event?.identifiant);
                return {
                    id: event?.id || event?.identifiant,
                    date: event?.date,
                    heure_debut: event?.heure_debut,
                    heure_fin: event?.heure_fin,
                    status: event?.status,
                    cours: event?.cours || (event?.Definir?.cours ? {
                        id: event.Definir.cours.identifiant,
                        nom: event.Definir.cours.nom,
                        nombre_heures_total: event.Definir.cours.nombre_heures_total
                    } : null),
                    salle: event?.salle || (event?.Definir?.salle ? {
                        id: event.Definir.salle.identifiant,
                        nom: event.Definir.salle.nom,
                        campus: event.Definir.salle.campus ? {
                            id: event.Definir.salle.campus.identifiant,
                            nom: event.Definir.salle.campus.nom,
                            adresse: event.Definir.salle.campus.adresse
                        } : null
                    } : null)
                };
            });
            console.log('6. Envoi de la réponse avec', mappedEvents.length, 'événements');

            return res.status(200).json({
                message: 'Evènements récupérés avec succès',
                data: mappedEvents
            });
        } catch(error){
            console.error('7. ERREUR:', error);
            return res.status(500).json({
                message: 'Erreur lors de la récupération des évènements du groupe',
                error: error.message
            });
        }
    }
);

// Récupérer les évènements d'une salle sur une journée 
router.get('/salle/:salle', 
    tokenValidation, 
    // dataTypeValidation(getEventSchema),
    async(req,res)=> {
        try{
            const salleId = req.params;
            const date = req.body.date;

            if(!date){
                return res.status(400).json({ message: 'Date manquante pour la récupération des évènements.' });
            }

            // @ TODO: Appeler le controleur, faire un catch. Pourquoi pas un index dans la BDD
        } catch(error) {
            console.error('Erreur lors de la récupération des évènements de la salle:', error);
            return res.status(500).json({
                message: 'Erreur lors de la récupération des évènements de la salle',
                error: error.message
            });
    }}
);


// Récupérer tous les évènements d'une salle
router.get('/:campus/:salle', tokenValidation, async (req, res) => {
    try {
        const { campus, salle } = req.params;
        const events = await getEventController(campus, salle);

        console.log(JSON.stringify(events, null, 2));

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
