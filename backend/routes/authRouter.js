const express = require('express'); // On importe express
const router = express.Router(); // Et on définit que les routes utilisés seront dans un router
const Membre = require('../models/Membre'); // On importe les modèles nécéssaires uniquement 
const Campus = require('../models/Campus');
const bcrypt = require('bcrypt'); // On importe bcrypt pour le hashage des mots de passes
const jwt = require('jsonwebtoken'); // On importe jsonwebtoken pour la création de token
const { Op } = require('sequelize'); // On importe Op pour les requêtes sequelize
const addMembre = require('../controllers/userCreation'); // On importe le contrôleur pour la création d'un utilisateur
const createToken = require('../middleware/tokenCreation'); // On importe le middleware pour la création de token
const { signUpSchema, loginSchema } = require('../middleware/schemas/authSchemas'); // On importe le middleware de validation
const validate = require('../middleware/dataTypeVerification')


router.post('/signup', 
    validate(signUpSchema), // On utilise le middleware de validation pour vérifier les données
    async (req, res) => {
    const { nom, prenom, email, campusName, motdepasse } = req.body;
    try {
        if (!nom || !prenom || !email || !campusName || !motdepasse) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }

        const campus = await Campus.findOne({ where: { nom: campusName } });
        if (!campus) {
            return res.status(400).json({ message: 'Campus non trouvé' });
        }

        const existingUser = await Membre.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Utilisateur déjà existant' });
        }

        const hashedPassword = await bcrypt.hash(motdepasse, 10);
        const newUser = await addMembre(nom, prenom, email, campus.id, hashedPassword);

        const token = createToken(newUser.id, newUser.email);
        res.status(201).json({
            token,
            user: {
                id: newUser.id,
                nom: newUser.nom,
                prenom: newUser.prenom,
                email: newUser.email,
                status: newUser.status,
            },
        });
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de l\'inscription' });
    }
});

router.post('/login', 
    validate(loginSchema), // On utilise le middleware de validation pour vérifier les données
    async (req, res) => {
    const { email, motdepasse } = req.body;

    try {
        if (!email || !motdepasse) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }

        const user = await Membre.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        const isPasswordValid = await bcrypt.compare(motdepasse, user.motdepasse);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        const token = createToken(user.id, user.email);
        res.status(200).json({
            token,
            user: {
                id: user.id,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                status: user.status,
            },
        });
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la connexion' });
    }
});

module.export = router
