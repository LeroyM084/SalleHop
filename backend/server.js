const express = require('express');
const app = express();
const cors = require('cors');
const mainRouter = require('./routes/router');

const PORT = 3000 // port de base, peut changer -- DEBUG

app.use(cors())
app.use(express.json());
app.use('/api', mainRouter);

app.get('/', async(req,res)=>{
    return res.status(200).json({
        message : 'Bienvenue sur /' // -- DEBUG
    })
})

module.exports = app;