const { creneau, cours, salle } = require('../../models');
const { Op } = require('sequelize');

const getEventByRoom = async (campusId, roomId) => {
    try {
        const events = await creneau.findAll({
            include: [
                {
                    model: cours,
                    attributes: ['identifiant', 'nom']
                },
                {
                    model: salle,
                    attributes: ['identifiant', 'nom', 'campus_id'],
                    where: { identifiant: roomId, campus_id: campusId }
                }
            ],
            where: {
                status: { [Op.not]: 'refusé' }
            }
        });

        return events;
    } catch (error) {
        console.error('Erreur lors de la récupération des évènements par salle:', error);
        throw error;
    }
}

module.exports = getEventByRoom;