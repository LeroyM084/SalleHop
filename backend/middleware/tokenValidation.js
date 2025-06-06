// Ce fichier contient la fonction de validation du token JWT reçues. 
const dotenv = require('dotenv');
dotenv.config(); // Charger les variables d'environnement
const JWT_KEY = process.env.JWT_SECRET; 
const jwt = require('jsonwebtoken');


// Middleware de vérification du token
async function verificationToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ error: 'Token manquant ou invalide' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    req.userId = decoded.id;
    console.log("Middleware executé ! Id trouvé : ", req.userId); // -- DEBUG
    console.log('Route appelée:', req.path);
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token invalide ou expiré' });
  }
}

module.exports = verificationToken;