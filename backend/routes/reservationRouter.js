const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const Reservation = require('../models/Reservation');
const Membre = require('../models/Membre');
const Promo = require('../models/Promo');
const Salle = require('../models/Salle');
const isUserAdmin = require('../middleware/isUserAdmin');
const tokenValidation = require('../middleware/tokenValidation');

// Récupérer les réservations futures d’un utilisateur
router.get('/mesReservations', tokenValidation, async (req, res) => {
    const userId = req.userId;
    console.log('ICIIIIIIIIIII', userId) // -- DEBUG
    if (!userId) return res.status(404).json({ message: 'Utilisateur introuvable' });

    try {
        const aujourdHui = new Date();

        const reservations = await Reservation.findAll({
            where: {
                idMembre: userId,
            }
        });

        const reservationsJson = reservations.map(r => r.toJSON());

        if (!reservationsJson.length) {
            return res.status(404).json({ message: 'Aucune réservation trouvée.' });
        }

        return res.status(200).json({
            message: 'Réservations récupérées avec succès.',
            reservations: reservationsJson
        });

    } catch (error) {
        return res.status(500).json({ message: 'Erreur serveur', details: error.message });
    }
});

// Récupérer les réservations futures du campus de l'utilisateur
router.get('/campusResa', tokenValidation, async (req, res) => {
    const userId = req.userId;
    if (!userId) return res.status(404).json({ message: 'Utilisateur introuvable' });

    try {
        const user = await Membre.findByPk(userId);
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        const aujourdHui = new Date();

        const reservations = await Reservation.findAll({
            where: {
                idCampus: user.idCampus,
                date: { [Op.gte]: aujourdHui }
            }
        });

        if (!reservations.length) {
            return res.status(404).json({ message: 'Aucune réservation trouvée pour ce campus.' });
        }

        const reservationsJson = reservations.map(r => r.toJSON());

        return res.status(200).json({
            message: 'Réservations récupérées.',
            reservations: reservationsJson
        });

    } catch (error) {
        return res.status(500).json({ message: 'Erreur serveur', details: error.message });
    }
});

// Créer une nouvelle réservation
router.post('/newReservation', tokenValidation, async (req, res) => {
    const userId = req.userId;
    const { idSalle, idPromo, date, heureDebut, heureFin } = req.body;

    if (!userId || !idSalle || !idPromo || !date || !heureDebut || !heureFin) {
        return res.status(400).json({ message: 'Requête incomplète' });
    }

    try {
        const user = await Membre.findByPk(userId);
        const salle = await Salle.findByPk(idSalle);
        const promo = await Promo.findByPk(idPromo);

        if (!user || !salle || !promo) {
            return res.status(404).json({ message: 'Utilisateur, salle ou promo introuvable' });
        }

        const nouvelleReservation = await Reservation.create({
            idSalle,
            idPromo,
            idMembre: userId,
            date,
            heureDebut,
            heureFin,
            idCampus: user.idCampus
        });

        return res.status(201).json({
            message: 'Réservation enregistrée.',
            reservation: nouvelleReservation
        });

    } catch (error) {
        return res.status(500).json({ message: 'Erreur serveur', details: error.message });
    }
});

// Récupérer les réservations en attente pour l’admin
router.get('/resaEnAttente', tokenValidation, isUserAdmin, async (req, res) => {
    const userId = req.userId;
    if (!userId) return res.status(400).json({ message: 'Utilisateur introuvable' });

    try {
        const user = await Membre.findByPk(userId);
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        const reservations = await Reservation.findAll({
            where: {
                idCampus: user.idCampus,
                status: 'En attente'
            }
        });

        const reservationsJson = reservations.map(r => r.toJSON());

        return res.status(200).json({
            message: 'Réservations en attente récupérées.',
            reservations: reservationsJson
        });

    } catch (error) {
        return res.status(500).json({ message: 'Erreur serveur', details: error.message });
    }
});

// Modifier le statut d'une réservation
router.put('/resaEnAttente/:idReservation', tokenValidation, isUserAdmin, async (req, res) => {
    const reservationId = req.params.idReservation;
    const userId = req.userId;
    const { newState } = req.body;

    if (!userId || !reservationId || !newState) {
        return res.status(400).json({ message: 'Requête invalide' });
    }

    try {
        const reservation = await Reservation.findByPk(reservationId);
        if (!reservation) {
            return res.status(404).json({ message: 'Réservation introuvable' });
        }

        if (reservation.status !== 'En attente') {
            return res.status(405).json({ message: 'La réservation a déjà été traitée' });
        }

        if (!['Accepté', 'Refusé'].includes(newState)) {
            return res.status(400).json({ message: 'Statut invalide' });
        }

        await reservation.update({ status: newState });

        return res.status(200).json({
            message: 'Statut mis à jour.',
            reservation
        });

    } catch (error) {
        return res.status(500).json({ message: 'Erreur serveur', details: error.message });
    }
});

module.exports = router;
