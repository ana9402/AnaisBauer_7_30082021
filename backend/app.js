// IMPORTATIONS ----------
const express = require('express');
const db = require("./models");
const helmet = require('helmet');
const userRoutes = require('./routes/user')

// Connexion à la BDD
db.sequelize.authenticate()
.then(() => {
    console.log('Connexion à MySQL réussie !')
})
.catch((err) => {
    console.log('Erreur : ' + err)
})

// CREATION DE L'APPLICATION EXPRESS ----------
const app = express();

// Activation de la protection Helmet
app.use(helmet());

// Gestion du CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

// Création des routes
app.use('/api/users', userRoutes)

// EXPORTATIONS ----------
module.exports = app;