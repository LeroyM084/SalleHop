const sequelize = require('sequelize');
const Campus = require('../models/Campus');
const express = require('express');
const router = express.Router();
const isUserAdmin = require('../middleware/isUserAdmin')

// const {schemas} = require('../middleware/schemas/campusSchema')
const validate = require('../middleware/dataTypeVerification');
const tokenValidation = require('../midleware/tokenValidation');

// Ce fichier définit les routes liés au campus

router.get('/campusList', 
    tokenValidation,
    async(req, res) => {
        const idMembre = req.userId;
        try {
            const campusList = await Campus.findAll();
            return res.status(200).json({
                campusList: campusList,
                message:"Liste des campus inscrit sur NOM " // -- DEBUG 
            })
        } catch(error) {
            return res.status(500).json({message : "Erreur serveur", error})
        }
    }
)

router.post('/newCampus',
    tokenValidation, 
    isUserAdmin,
    async(req, res) => {
        const userid = req.userId
        const isUserAdmin = await Membre.findByPk(userId)
        const { campusName, campusAdresse } = req.body;
        try {
            const newCampus = await Campus.create(
                nom = campusName,
                adresse = adresse
            )

            return res.status(200).json({ message : "Campus ajouté avec succès"})
        } catch(error) {
            return res.status(500).json({erreur : "erreur serveur", error})
        }
    }
)

moduel.export()
