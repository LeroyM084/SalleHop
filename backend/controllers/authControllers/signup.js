const bcrypt = require('bcrypt');
const { user } = require('../../models');

const singupController = async (req) => {
    const {first_name, last_name, email, password} = req.body;
    // On vérifie que toutes les données sont présentes. 
    if (!first_name || !last_name || !email || !password) {
        throw new Error('Tous les champs sont requis.');
    }


    // On vérifie si l'utilisateur existe déjà
    const existingUser = await user.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('Un utilisateur avec cet email existe déjà.');
    }

    // On hache le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // On crée l'utilisateur
    const newUser = await user.create({
        first_name,
        last_name,
        email,
        password: hashedPassword
    });

    // On retourne l'utilisateur créé
    return {
        id: newUser.id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt
    };
}