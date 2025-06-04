const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config(); // Charger les variables d'environnement

const JWT_KEY = process.env.JWT_SECRET;

const createToken = (id) => {
    return JWT.sign({ id }, JWT_KEY, { expiresIn: '1h' }); // Générer un token
};

module.exports = createToken;