const db = require('../dbConfig');
const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const Membre = require('../models/Membre')
const Promo = require('../models/Promo')
const Salle = require('../models/Salle')
const tokenValidation = require('../middleware/tokenValidation')
const { Op } = require('sequelize') // Permet de faire des opérations dans les requetes sequelize


router.get('/mesReservations', 
    tokenValidation,
    async(res) => {
    const userId = res.userId
    if(!userId){
        return res.status(404).json({
            message : 'Utilisateur introuvable'
        })
    }

    try {
        todayDate = new Date();
        const reservationsFutures = await Reservation.findAll({
            where : {
                idMembre : userId, 
                date : {
                    [Op.gte] : todayDate
                }
            }
        })

        const cleanReservationsFutures = reservationsFutures.map(r => r.toJSON())

        if(!cleanReservationsFutures){
            return res.status(404).json({
                error : "Pas de réservations trouvés."
            })
        }

        return res.status(200).json({
            message : 'Données récupérés !',
            reservation : cleanReservationsFutures
        })


    } catch(error) {
        return res.status(500).json({
            error : 'Erreur serveur', error
        })
    }
})

router.get('/campusResa',
    tokenValidation, 
    // validate(schema),
    async(req,res) => {
        const userId = req.userId 
        if(!userId){
            return res.status(404).json({
                error : 'utilisateur non trouvé ! ', error
            })
        }

        const user = await Membre.findByPk(userId)

        if(!user){
            return res.status(404).json({
                error : 'utilisateur non trouvé ! ', error
        })};
    
        const campusId = user.CampusId 

        const todayDate = new Date();
        const reservationsFutures = await Reservation.findAll({
            where : {
                idCampus : campusId,
                date : {
                    [Op.gte] : todayDate
                }
            }
        });

        if(!reservationsFutures){
            return res.status(404).json({
                message : "Aucune réservation trouvé", error
            })
        };

        const cleanReservationsFutures = reservationsFutures.map(r => r.toJSON());

        return res.status(200).json({
            message : 'Réservations trouvés',
            reservationsFutures : cleanReservationsFutures
        })
        

    }
)

router.post('/newReservation', 
    tokenValidation, 
    // validate(schema)
    async(req, res)=>{
        const userId = req.userId;
        const { idSalle, idPromo, date, heureDebut, heureFin} = req.body

        if(!userId || !idSalle || !idPromo || !date || !heureDebut || !heureFin ){
            return res.status(400).json({
                error : 'Bas request !', error
            })
        }

        const existUser = await Membre.findByPk(userId);
        const existSalle = await Salle.findByPk(idSalle);
        const existPromo = await Promo.findByPk(idPromo);

        if (!existUser || !existSalle || !existPromo ){
            return res.status(404).json({
                error : 'Une des données est incorrecte', error
            })
        }

        const campusId = existUser.idCampus

        const newReservation = await Reservation.create({
            // idSalle, idPromo, idMembre, date, heure debut, heure fin, idCampus 
            idSalle : idSalle,
            idPromo : idPromo, 
            idMembre : userId, 
            date : date, 
            heureDebut : heureDebut,
            heureFin : heureFin,
            idCampus : campusId
        })

        return res.status(201).json({
            message : 'Réservation enregistré.',
            reservation : newReservation
        })
    }
)

router.get('/resaEnAttente', 
    tokenValidation, 
    // validate(schema),
    isUserAdmin,
    async(req,res)=>{
        const userId = req.userId
        try{
        if(!userId){
            return res.status(400).json({
                message : 'Utilisateur introuvable !'
            })
        }

        const campusId = user.campusId

        const resas = await Reservation.findAll({
            where : {
                campusId : campusId,
                status : 'En attente'
            }
        })

        const cleanResas = resas.map(r => r.toJSON())
        return res.status(200).json({
            message : "Données trouvés",
            resas : cleanResas,
        })
    } catch(error) {
        return res.status(500).json({
            error : "Erreur serveur", error
        })
    }
}
)

campus.put('/resaEnAttente/:idReservation', 
    tokenValidation, 
    //validate(schema),
    isUserAdmin, 
    async(req,res)=>{
        const id = req.params.idReservation
        const userId = req.userId
        const newState = req.body.newState 

        if(!userId || !id || !newState){
            return res.status(400).json({
                error : "Bad request perso !", error
            })
        }

        const reservation = await Reservation.findByPk(id);

        if (!reservation){
            return res.status(404).json({
                error : "réservation introuvable", error
            })
        }

        const isReservationEnAttente = reservation.status;
        if(isReservationEnAttente !== 'En attente'){
            res.status(405).json({
                error : "La réservation à déjà été validé", error
            })
        }

        if(newState !== "Accepté" && newState !== "Refusé"){
            res.status(400).json({
                message : "Mauvais status -> Bad request", error
            })
        }

        try {
        reservation.update({
            status : newState
        })

        return res.status(200).json({
            message : "Réservation mis à jour",
            reservation
        })
    } catch(error){
        return res.status(500).json({
            error : "Erreur serveur", error
        })
    }
    }
)

module.exports = router 