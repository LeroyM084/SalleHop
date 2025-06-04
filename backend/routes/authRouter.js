const { user } = require('../models');
const express = require('express');
const router = express.Router();

const signupController = require('../controllers/authControllers/signup');
const loginController = require('../controllers/authControllers/login');
const tokenValidation = require('../middleware/tokenValidation');
const dataTypeValidation = require('../middleware/dataTypeVerification');
const createToken = require('../middleware/tokenCreation');

const { signUpSchema, loginSchema } = require('../middleware/schemas/');

// routes pour l'inscruption ( non protégée par token ).

router.post('/signup', 
    dataTypeValidation(signUpSchema),
    async (req, res) => {
        try {
            // On utilise un controller pour gérer la logique de l'inscription. 
            // Plutot que de le coder en dur dans le routeur.
            const result = await signupController(req);
            const userData = {
                id: result.id,
                first_name: result.first_name,
                last_name: result.last_name,
                email: result.email,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt,
                token: createToken(result.id, result.email) // On lui envoie un token JWT.
            };


            return res.status(201).json({
                message: 'Inscription réussie',
                data: userData
            });
        } catch(error) {
            console.error('Erreur lors de l\'inscription:', error);
            return res.status(500).json({
                message: 'Erreur lors de l\'inscription',
                error: error.message
            });
        }
    });


router.post('/login', 
    dataTypeValidation(loginSchema),
    async(req,res)=>{
    try {
        // On utilise un controller pour gérer la logique de la connexion.
        const result = await loginController(req);
        const userData = {
            id: result.id,
            first_name: result.first_name,
            last_name: result.last_name,
            email: result.email,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
            token: createToken(result.id, result.email) // On lui envoie un token JWT.
        };

        console.log(result.id) // -- DEBUG
        console.log(userData)

        return res.status(200).json({
            message: 'Connexion réussie',
            data: userData
        });
    } catch(error) {
        console.error('Erreur lors de la connexion:', error);
        return res.status(500).json({
            message: 'Erreur lors de la connexion',
            error: error.message
        });
    }
})

module.exports = router;
