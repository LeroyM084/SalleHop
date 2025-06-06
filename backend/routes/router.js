const express = require('express');
const router = express.Router();
// On définit un router de routeur, et chaque route aura son propre chemin

router.use('/auth', require('./authRouter'));
router.use('/backoffice', require('./backoffice')); // /api/backoffice/"Routes présentes dans backoffice.js"
router.use('/addEvents', require('./addEventRouter')); // /api/events/"Routes présentes dans addEventRouter.js"
router.use('/events', require('./getEventRouter')); // /api/Events/"Routes présentes dans getEventRouter.js"
router.use('/data', require('./getData')); // /api/data/"Routes présentes dans dataRouter.js"

//router.use('/auth', require('./authRouter')); // /api/users/"Routes présentes dans authRouter.js" 
//router.use('/profile', require('./profileRouter')) // /api/profile/"routes dans le routeur"
//router.use('/reservations', require('./reservationRouter')) // /api/reservations/'routes'

router.get('/', async(req,res)=>{
    return res.status(200).json({
        message : "Bienvenue sur l'API de SalleHOP" // -- DEBUG
    })
})

module.exports = router;