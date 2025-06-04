const bcrypt = require('bcrypt');
const { utilisateur } = require('../../models');

const loginController = async (req) => {
    const { email, password } = req.body;

    // On vérifie que toutes les données sont présentes.
    if (!email || !password) {
        throw new Error('Tous les champs sont requis.');
    }

    // On vérifie si l'utilisateur existe déjà
    const existingUser = await utilisateur.findOne({ where: { email } });
    if (!existingUser) {
        throw new Error('Utilisateur introuvable.');
    }

    // On vérifie le mot de passe
    const isPasswordValid = await bcrypt.compare(password, existingUser.mot_de_passe);
    if (!isPasswordValid) {
        throw new Error('Mot de passe incorrect.');
    }

    // On retourne l'utilisateur trouvé
    return {
        id: existingUser.id,
        first_name: existingUser.first_name,
        last_name: existingUser.last_name,
        email: existingUser.email,
        createdAt: existingUser.createdAt,
        updatedAt: existingUser.updatedAt
    };
}

module.exports = loginController;