const Membre = require("../models/Membre"); // Corrige l'importation du modèle

const isUserAdmin = async (req, res, next) => {
    try {
        // Vérifie si l'ID utilisateur est présent dans la requête
        if (!req.userId) {
            return res.status(400).json({
                message: "ID utilisateur manquant dans la requête.",
            });
        }

        // Recherche l'utilisateur par son ID
        const user = await Membre.findByPk(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable.",
            });
        }

        // Vérifie si l'utilisateur a le rôle admin
        if (user.status !== "admin") {
            return res.status(403).json({
                message: "Permissions insuffisantes. Accès réservé aux administrateurs.",
            });
        }

        // Passe au middleware ou à la route suivante
        next();
    } catch (error) {
        console.error("Erreur dans le middleware isUserAdmin:", error);
        return res.status(500).json({
            message: "Erreur serveur.",
            error: error.message,
        });
    }
};

module.exports = isUserAdmin; // Corrige l'exportation
