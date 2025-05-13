const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config(); // Charger les variables d'environnement

const JWT_KEY = process.env.JWT_SECRET;

const createToken = (id, email) => {
    return JWT.sign({ id, email }, JWT_KEY, { expiresIn: '1h' }); // Générer un token
};

module.exports = createToken;