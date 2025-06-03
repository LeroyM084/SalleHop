const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: '*', // <- remplace par ton vrai port front

}));
app.use(express.json());

const mainRouter = require('./routes/router');
app.use('/api', mainRouter);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Bienvenue sur /' });
});

module.exports = app;
