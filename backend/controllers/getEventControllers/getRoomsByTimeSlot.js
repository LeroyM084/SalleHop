const { creneau, campus, salle, Definir } = require('../../models');
const { Op } = require('sequelize');

const getRoomsByTimeSlot = async (campusId, timeSlot) => {
    const { startTime, endTime, date } = timeSlot;
    

    if (!startTime || !endTime || !date) {
        throw new Error('Le créneau horaire doit contenir une heure de début, une heure de fin et une date.');
    }

    try {
        const campusRecord = await campus.findByPk(campusId);
        if (!campusRecord) {
            throw new Error('Campus non trouvé.');
        }

        const sallesCampus = await salle.findAll({
            where: { campus_id: campusId },
            attributes: ['identifiant', 'nom']
        });

        if (!sallesCampus || sallesCampus.length === 0) {
            throw new Error('Aucune salle trouvée pour ce campus.');
        }

        const sallesOccupees = await Definir.findAll({
            attributes: ['salle_id'],
            include: [{
                model: creneau,
                where: {
                    date,
                    heure_debut: { [Op.lt]: endTime },
                    heure_fin: { [Op.gt]: startTime },
                    status: { [Op.ne]: 'refusé' }
                },
                attributes: []
            }],
            raw: true
        });

        const salleOccupeeIds = sallesOccupees.map(item => item.salle_id);

        const sallesLibres = await salle.findAll({
            where: {
                campus_id: campusId,
                identifiant: {
                    [Op.notIn]: salleOccupeeIds.length > 0 ? salleOccupeeIds : [0]
                }
            }
        });

        return sallesLibres;

    } catch (error) {
        console.error('Erreur lors de la récupération des salles:', error);
        throw error;
    }
};

module.exports = getRoomsByTimeSlot;
