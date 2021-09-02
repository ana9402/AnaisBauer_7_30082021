// IMPORTATIONS
const express = require('express');
const app = express();

const db = require("./models");

// Synchronisation des modèles à la BDD
db.sequelize.sync()
.then(() => {
    console.log('Connexion à MySQL réussie !')
})
.catch((err) => {
    console.log('Erreur : ' + err)
})

// Gestion du CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// EXPORTATIONS
module.exports = app;