const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: '*', // <- remplace par ton vrai port front
}));
app.use(express.json());

const mainRouter = require('./routes/router');

const PORT = 3000 // port de base, peut changer -- DEBUG

app.use(express.json());
app.use('/api', mainRouter);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Bienvenue sur /' });
});

module.exports = app;
