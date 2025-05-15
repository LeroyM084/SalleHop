const express = require('express');
const router = express.Router();
const Membre = require('../models/Membre');
const Campus = require('../models/Campus');
const validate = require('../middleware/dataTypeVerification');
const { changePasswordSchema, profileSchema } = require('../middleware/schemas/profileSchema')
const bcrypt = require('bcrypt');
const tokenValidation = require('../middleware/tokenValidation'); // On importe le middleware de validation du token

// Ce fichier définit les routes pour les informations du profil de l'utilisateur. 

router.get('/profile', 
    tokenValidation, // On utilise le middleware de validation du token
    async (req, res) => {
    try {
        const userId = req.userId; // On récupère l'ID de l'utilisateur à partir du token
        const user = await Membre.findByPk(userId); // On cherche l'utilisateur dans la base de données

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json({
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            campusName: user.campus.nom,
            status: user.status,
        });
    } catch (error) {
        console.error('Erreur lors de la récupération du profil:', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du profil' });
    }
}
);

router.put('/profile',
    tokenValidation, // On utilise le middleware de validation du token
    validate(profileSchema),
    async (req, res) => {
    try {
        const userId = req.userId; // On récupère l'ID de l'utilisateur à partir du token
        const { nom, prenom, email, campusName } = req.body; // On récupère les données du corps de la requête

        const user = await Membre.findByPk(userId); // On cherche l'utilisateur dans la base de données

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const NewIdCampus = await Campus.findOne({ where : { nom : campusName}}).then(campus=> campus.id);

        //  if(newFoo exists) => user.foo = newFoo
        // else => user.foo = user.foo
        user.nom = nom ? nom : user.nom;
        user.prenom = prenom ? prenom : user.prenom;
        user.email = email ? email : user.email;
        user.idCampus = campusName ? NewIdCampus : user.idCampus

        await user.save(); // On sauvegarde les modifications

        res.status(200).json({ message: 'Profil mis à jour avec succès' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du profil:', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du profil' });
    }
}
);

router.put('/profile/password',
    tokenValidation, // On utilise le middleware de validation du token
    validate(changePasswordSchema),
    async (req, res) => {
    try {
        const userId = req.userId; // On récupère l'ID de l'utilisateur à partir du token
        const { oldMotDePasse, motDePasse } = req.body; // On récupère le mot de passe du corps de la requête

        const user = await Membre.findByPk(userId); // On cherche l'utilisateur dans la base de données

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // On vérifie bien qu'il connait le mot de passe actuel avant d'en changer. 
        const isOldMotDePasseCorrect = await bcrypt.compare(oldMotDePasse, user.motdepasse)
        if (!isOldMotDePasseCorrect){
            return res.status(404).json({message : 'Ancien mot de passe incorrect.'})
        }

        user.motdepasse = await bcrypt.hash(motdepasse, 10) // On hashe et met à jour le mot de passe de l'utilisateur
        await user.save(); // On sauvegarde les modifications

        res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du mot de passe:', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du mot de passe' });
    }
}
);

router.get('/profile/name', tokenValidation, 
    async(res) => {
        const userId = req.userId;
        try{
            const membre = await Membre.findByPk(userId, {
            attributes: ['nom', 'prenom']
            });

            const { nom, prenom } = membre || { nom: null, prenom: null };

            if(! nom || !prenom){
                return res.status(404).json({error : 'non trouvé'})
            }

            return res.status(200).json({
                'nom' : nom,
                'prenom' : prenom
            })


        } catch(error) {
            return res.status(500).json({
                error : 'Erreur serveur', error
            })
        }

        
    }
)

/*
@TODO 
Route oublier mot de passe (/profile/passwordForget)
-> Envoie un mail avec un mot de passe provisoire, le hashe et le range dans la base de données
-> Renvoie l'user sur la page de changement de mot de passe 
 */

module.exports = router