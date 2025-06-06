const { utilisateur, salle, groupe, creneau, cours, Definir } = require('../../models');
const { Op } = require('sequelize');

const addEvent = async(eventData, userId) => {
    console.log('addEvent called with eventData:', eventData, 'and userId:', userId);
    try {
        // Vérifier si l'utilisateur existe
        const user = await utilisateur.findByPk(userId);
        if (!user) {
            console.log('UTILISATEUR ID RECUES : ', userId);
            throw new Error('Utilisateur non trouvé.');
        }

        // Vérifier si la salle existe
        const room = await salle.findOne({
            where: { nom : eventData.roomNumber }
        });
        if (!room) {
            throw new Error('Salle non trouvée.');
        }

        // Vérifier si le groupe existe
        const group = await groupe.findOne({
            where: { nom: eventData.groupName } // Utiliser le nom au lieu de l'identifiant
        });
        if (!group) {
            throw new Error('Groupe non trouvé.');
        }

        // Vérifier si le cours existe
        const course = await cours.findOne({
            where: { nom: eventData.coursLabel } // Utiliser le nom au lieu de l'identifiant
        });
        if (!course) {
            throw new Error('Cours non trouvé.');
        }

        // Créer le créneau horaire
        const newCreneau = await creneau.create({
            date: eventData.timeSlot.date,
            heure_debut: eventData.timeSlot.startTime,
            heure_fin: eventData.timeSlot.endTime,
            status: 'en attente'
        });
        
        // On relie ensuite tout ça dans la table définir.  // -- DEBUG
        const newEvent = await Definir.create({
            user_id: userId,
            salle_id: room.identifiant,
            groupe_id: group.identifiant,
            creneau_id: newCreneau.identifiant,
            cours_id: course.identifiant
        });

        if(newEvent){
            console.log('Nouvel évènement créé avec succès:', newEvent);
        }

        return result = {
            status : 'ok',
            message: 'Evènement ajouté avec succès.',
            newEvent
        }
} catch (error) 
{
        console.error('Erreur lors de l\'ajout de l\'évènement:', error);
        throw error;
    }};

module.exports = addEvent;
    