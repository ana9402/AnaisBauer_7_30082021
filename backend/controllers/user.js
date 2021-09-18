const db = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// ROUTES ----------
const userID = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const id = decodedToken.userId;
    return id;
}

// Regex de l'adresse email
const emailRegex = (email) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

// Inscription d'un utilisateur ---
exports.signup = (req, res, next) => {
    // On recherche dans la BDD si l'adresse email existe déjà
    db.User.findOne({
        where: {email: req.body.email}
    })
    .then(user => {
        console.log(user)
        // Si un utilisateur est déjà inscrit avec cette adresse
        if (user) {
            return res.status(401).json({error: "L'utilisateur existe déjà !"});
        } 
        // Si aucun utilisateur n'est inscrit avec cette adresse
        else {
            // Si le format de l'adresse email n'est pas valide
            if (!emailRegex(req.body.email)) {
                res.status(400).json({message: "Le format de l'adresse email n'est pas valide."})
            } 
            // Si le format de l'adresse email est valide
            else {
                bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    // On enregistre l'utilisateur dans la BDD
                    db.User.create({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        password: hash,
                        profilePicture: 'http://localhost:3000/images/unknown.jpeg'
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
    // On vérifie que l'utilisateur existe bien dans la BDD
    db.User.findOne({
        where: {email: req.body.email}
    })
    .then(user => {
        // Si l'utilisateur n'existe pas
        if(!user) {
            return res.status(401).json({error: "Utilisateur non trouvé !"});
        }
        // On compare le hash de la BDD
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            // Si le hash ne correspond pas 
            if (!valid) {
                return res.status(401).json({error: "Mot de passe incorrect!"});
            } 
            // Si le hash correspond
            else {
                res.status(200).json({
                    userId: user.id,
                    token: jwt.sign(
                        {userId: user.id},
                        process.env.TOKEN,
                        {expiresIn: '24h'}
                    ),
                    userAdmin: user.isAdmin
                })
            }
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
}

// Supprimer un utilisateur ---
exports.deleteUser = (req, res, next) => {
    // On cherche dans la BDD si l'utilisateur existe
    db.User.findOne({
        where: {id: req.params.id}
    })
    .then(user => {
        // Si l'utilisateur existe
        if (user) {
            // On recherche l'utilisateur à l'origine de la requête
            db.User.findOne({
                where: {id: userID(req)}
            })
            .then(admin => {
                // Si l'utilisateur veut supprimer son propre compte ou est un admin
                if(user.id === admin.id || admin.isAdmin === true) {
                    // On supprime l'utilisateur
                    db.User.destroy({
                        where: {id: req.params.id}
                    })
                    .then(() => res.status(200).json({message: "L'utilisateur a bien été supprimé !"}))
                    .catch(error => res.status(400).json({error}));
                }
                // Si l'utilisateur n'est pas autorisé à supprimer ce compte 
                else {
                    res.status(403).json({message: "Vous n'êtes pas autorisé(e) à supprimer cet utilisateur."})
                }
            })
            .catch(error => res.status(500).json({error}))
        } 
        // Si l'utilisateur n'existe pas
        else {
            res.status(404).json({message: "L'utilisateur n'existe pas."})
        }
    })
    .catch(error => res.status(500).json({error}))
}

// Modifier un profil utilisateur ---
exports.editUser = (req, res, next) => {
    // On cherche l'utilisateur dont l'id est présent dans les paramètres de requête
    db.User.findOne({
        where: {id: req.params.id}
    })
    .then(user => {
        // Si l'utilisateur existe
        if (user) {
            // On cherche l'utilisateur à l'origine de la requête
            db.User.findOne({
                where: {id: userID(req)}
            })
            .then(admin => {
                // Si l'utilisateur veut modifier son propre compte ou s'il est un admin
                if (user.id === userID(req) || admin.isAdmin === true) {
                    let imgUrl;
                    // Si aucun fichier n'est chargé
                    if (!req.file) {
                        if(user.profilePicture == null) {
                            imgUrl = 'http://localhost:3000/images/unknown.jpeg'
                        } else {
                            imgUrl = user.profilePicture
                        }
                    } else {
                        imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                    }
                    // On met à jour les données de l'utilisateur
                    db.User.update(
                        {firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        department: req.body.department,
                        profilePicture: imgUrl}, 
                        {where: {id: req.params.id},
    
                    })
                    .then(() => res.status(201).json({message: "Le profil utilisateur a bien été modifié !"}))
                    .catch(error => res.status(400).json({error}))
                } 
                // Si l'utilisateur n'a pas l'autorisation de modifier le profil
                else {
                    res.status(403).json({message: "Vous n'êtes pas autorisé(e) à modifier ce profil"})
                }
            })
            .catch(error => res.status(500).json({error}))
            
        } 
        // Si l'utilisateur n'existe pas
        else {
            res.status(404).json({message: "L'utilisateur n'existe pas."})
        }
    })
    .catch(error => res.status(500).json({error}))
}

// Afficher tous les utilisateurs ---
exports.getAllUsers = (req, res, next) => {
    db.User.findAll({
        attributes: ['id', 'firstname', 'lastname', 'email', 'department', 'profilePicture', 'createdAt']
    })
    .then(user => res.status(200).json({user}))
    .catch(error => { res.status(500).json({error})})
}


// Afficher un utilisateur ---
exports.getOneUser = (req, res, next) => {
    db.User.findOne({
        where: {id: req.params.id},
        attributes: ['id', 'firstname', 'lastname', 'email', 'department', 'profilePicture', 'createdAt']
    })
    .then(user => res.status(200).json(user))
    .catch(error => { res.status(500).json({error})})
}