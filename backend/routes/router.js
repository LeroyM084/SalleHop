const express = require('express');
const router = express.Router();
// On définit un router de routeur, et chaque route aura son propre chemin

router.use('/auth', require('./authRouter')); // /api/users/"Routes présentes dans authRouter.js" 
router.use('/profile', require('./profileRouter')) // /api/profile/"routes dans le routeur"