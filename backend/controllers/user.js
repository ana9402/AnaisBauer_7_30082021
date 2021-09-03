const db = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// ROUTES ----------

// Regex de l'adresse email
const emailRegex = (email) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

// Inscription d'un utilisateur ---
exports.signup = (req, res, next) => {
    db.Users.findOne({
        where: {email: req.body.email}
    })
    .then(user => {
        console.log(user)
        if (user) {
            return res.status(401).json({error: "L'utilisateur existe déjà !"});
        } else {
            // Vérification de la conformité de l'adresse email
            if (!emailRegex(req.body.email)) {
                res.status(400).json({message: "Le format de l'adresse email n'est pas valide."})
            } else {
                bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    db.Users.create({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        password: hash
                    })
                    .then(() => res.status(201).json(
                        {message: "Le nouvel utilisateur a bien été créé !"}
                    ))
                    .catch(error => res.status(500).json({error}))
                })
                .catch(error => res.status(500).json({error}));
            }
        }
    })
    .catch(error => res.status(500).json({error}));
    
}

// Inscription d'un utilisateur ---
exports.login = (req, res, next) => {
    db.Users.findOne({
        where: {email: req.body.email}
    })
    .then(user => {
        console.log(user)
        if(!user) {
            return res.status(401).json({error: "Utilisateur non trouvé !"});
        }
        
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({error: "Mot de passe incorrect!"});
            } else {
                res.status(200).json({
                    userId: user.id,
                    token: jwt.sign(
                        {userId: user.id},
                        process.env.TOKEN,
                        {expiresIn: '24h'}
                    )
                })
            }
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
}