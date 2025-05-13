const Membre = require('../models/Membre'); // On importe le modèle Membre

const addMembre = async (req, res) => {
    const { nom, prenom, email, idCampus, password } = req.body; // On récupère les données du corps de la requête

    try {
        User.create({
            nom,
            prenom,
            email,
            idCampus,
            motdepasse: password, // On hash le mot de passe
        })
        .then((user) => {
            res.status(201).json({ message: 'Utilisateur créé avec succès', user }); // On renvoie l'utilisateur créé
        })
        .catch((error) => {
            console.error('Erreur lors de la création de l\'utilisateur:', error); // On affiche l'erreur dans la console
            res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur' }); // On renvoie une erreur 500
        });
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error); // On affiche l'erreur dans la console
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur' }); // On renvoie une erreur 500
    }
};

module.exports = addMembre; // On exporte la fonction pour l'utiliser dans d'autres fichiers