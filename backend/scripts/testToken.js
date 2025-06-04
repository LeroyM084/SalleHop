const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config(); // Charger les variables d'environnement

const JWT_KEY = process.env.JWT_SECRET; // Clé secrète pour signer le token
const createToken = require('../middleware/tokenCreation'); // Importer la fonction de création de token


const fake_userId = '12345';

const JWT_TOKEN = createToken(fake_userId);

const userId_after_decoding = jwt.verify(JWT_TOKEN, JWT_KEY).id;

if (userId_after_decoding === fake_userId) {
    console.log('Token validé avec succès !');
}
else {
    console.log('Échec de la validation du token.');
}

