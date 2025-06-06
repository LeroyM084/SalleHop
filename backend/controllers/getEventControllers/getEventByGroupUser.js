const { groupe, utilisateur, creneau, Definir, cours, salle, campus, ecole, Appartenir, Correspondre } = require('../../models');
const { Op } = require('sequelize');

// Trouve le groupe d'un utilisateur
const getGroupByUserId = async (userId) => {
    const groupLink = await Appartenir.findOne({
        where: { utilisateur_id: userId },
    });
    if (!groupLink) throw new Error('Groupe non trouvé pour l\'utilisateur');
    const group = await groupe.findByPk(groupLink.groupe_id);
    if (!group) throw new Error('Groupe inexistant');
    return group;
};

// Récupère tous les événements (créneaux) du groupe de l'utilisateur pour une semaine donnée
const getEventByUserGroup = async (userId, date = new Date()) => {
    try {
        // 1. Récupérer le groupe de l'utilisateur
        const groupLink = await Appartenir.findOne({
            where: { utilisateur_id: userId }
        });
        if (!groupLink) return [];

        // 2. Récupérer les cours du groupe
        const coursCorrespondances = await Correspondre.findAll({
            where: { groupe_id: groupLink.groupe_id }
        });
        const coursIds = coursCorrespondances.map(c => c.cours_id);
        if (!coursIds.length) return [];

        // 3. Définir la période
        const startOfWeek = new Date(date);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        // 4. Récupérer les définitions de créneaux pour ces cours
        const definitions = await Definir.findAll({
            where: {
                cours_id: { [Op.in]: coursIds }
            }
        });

        // 5. Pour chaque définition, récupérer les données associées
        const events = await Promise.all(definitions.map(async def => {
            // Récupérer le créneau
            const eventCreneau = await creneau.findOne({
                where: {
                    identifiant: def.creneau_id,
                    date: { [Op.between]: [startOfWeek, endOfWeek] }
                }
            });
            if (!eventCreneau) return null;

            // Récupérer le cours
            const eventCours = await cours.findByPk(def.cours_id);
            if (!eventCours) return null;

            // Récupérer la salle et son campus
            const eventSalle = await salle.findByPk(def.salle_id);
            if (!eventSalle) return null;

            const eventCampus = await campus.findByPk(eventSalle.campus_id);
            if (!eventCampus) return null;

            // Construire l'objet événement
            return {
                id: eventCreneau.identifiant,
                date: eventCreneau.date,
                heure_debut: eventCreneau.heure_debut,
                heure_fin: eventCreneau.heure_fin,
                status: eventCreneau.status,
                cours: {
                    id: eventCours.identifiant,
                    nom: eventCours.nom,
                    nombre_heures_total: eventCours.nombre_heures_total
                },
                salle: {
                    id: eventSalle.identifiant,
                    nom: eventSalle.nom,
                    campus: {
                        id: eventCampus.identifiant,
                        nom: eventCampus.nom,
                        adresse: eventCampus.adresse
                    }
                }
            };
        }));

        // 6. Filtrer les événements null et retourner le résultat
        return events.filter(Boolean);

    } catch (error) {
        console.error('Error in getEventByUserGroup:', error);
        return [];
    }
};

module.exports = { getGroupByUserId, getEventByUserGroup };


