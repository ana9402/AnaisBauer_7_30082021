const db = require('../models');
const fs = require('fs');
const jwt = require('jsonwebtoken');

// ROUTES ----------
const userID = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const id = decodedToken.userId;
    return id;
}

// Créer un post -----
exports.createPost = (req, res, next) => {
    let imgUrl;
    // Si aucune image n'est intégrée
    if (!req.file) {
        return;
    } 
    // Si une image est intégrée
    else {
        imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    // On crée le post dans la BDD
    db.Post.create({
        title: req.body.title,
        media: imgUrl,
        userId: req.body.userId
    })
    .then(() => res.status(201).json({message: "Le nouveau post a bien été créé !"}))
    .catch(error => res.status(400).json({error}));
}

// Modifier un post -----
exports.editPost = (req, res, next) => {
    // On cherche le post passé en paramètre de requête
    db.Post.findOne({
        where: {id: req.params.id},
        include: [
            {
                model: db.User,
                attributes: ["id", "firstname", "lastname", "email", "department", "profilePicture", "isAdmin"]
            },
        ]
    })
    .then(post => {
        // Si le post existe
        if (post) {
            // On recherche l'utilisateur à l'origine de la requête
            db.User.findOne({
                where: {id: userID(req)}
            })
            .then(user => {
                // Si l'utilisateur est le créateur du post ou est un admin
                if (post.User.id === userID(req) || user.isAdmin === true ) {
                    let imgUrl;
                    // Si aucune image n'est chargée
                    if (!req.file) {
                        if (post.media == null) {
                            imgUrl = null;
                        } else {
                            imgUrl = post.media
                        }
                        
                    } 
                    // Si une image est chargée
                    else {
                        imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                    }
                    // On met à jour le post
                    db.Post.update(
                        {title: req.body.title,
                        media: imgUrl,
                        userId: req.body.userId},
                        { where: {id: req.params.id}}
                    )
                    .then(() => res.status(201).json({message: "Le post a bien été modifié !"}))
                    .catch(error => res.status(400).json({error}))
                } 
                // Si l'utilisateur n'est pas autorisé à modifier le post
                else {
                    res.status(403).json({erreur: "Vous n'êtes pas autorisé(e) à modifier ce post !"})
                }
            })
            .catch(error => res.status(500).json({error}))
        }
        // Si le post n'existe pas
        else {
            res.status(404).json({erreur: 'Post introuvable !'})
        }
    })
    .catch(error => res.status(500).json({error}))
}

// Supprimer un post -----
exports.deletePost = (req, res, next) => {
    // On recherche le post passé en paramètre de requête
    db.Post.findOne({
        where: {id: req.params.id},
        include: [
            {
                model: db.User,
                attributes: ["id", "firstname", "lastname", "email", "department", "profilePicture", "isAdmin"]
            },
        ]
    })
    .then(post => {
        // Si le post existe
        if (post) {
            // On recherche l'utilisateur à l'origine de la requête
            db.User.findOne({
                where: {id: userID(req)}
            })
            .then(admin => {
                // Si l'utilisateur est le créateur du post ou est un admin
                if (post.userId == userID(req) || admin.isAdmin === true) {
                    const filename = post.media.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                        // On supprime le post de la BDD
                        db.Post.destroy({
                            where: {id: req.params.id}
                        })
                        .then(() => res.status(200).json({message: "Post supprimé !"}))
                        .catch(error => res.status(400).json({error}));
                    })
                } 
                // Si l'utilisateur n'est pas autorisé à supprimer le post
                else {
                    res.status(403).json({message: "Vous n'êtes pas autorisé(e) à supprimer ce post !"})
                }
            })
            .catch(error => res.status(500).json({error}))
        }
        // Si le post n'existe pas 
        else {
            res.status(404).json({erreur: "Le post n'existe pas!"})
        }
    })
    .catch(error => res.status(500).json({error}));
}

// Afficher tous les posts -----
exports.getAllPosts = (req, res, next) => {
    db.Post.findAll({
        attributes: ['id', 'title', 'media', 'createdAt'],
        order: [
            ['createdAt', 'DESC']
        ],
        include: [
            {
                model: db.User,
                attributes: ["id", "firstname", "lastname", "email", "department", "profilePicture", "isAdmin"]
            },
            {
                model: db.Like,
                attributes: ["userId"]
            },
            {
                model: db.Comment,
                attributes: ['id', "postId"]
            }
        ]
    })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({error}));
}

exports.getPostsByUserId = (req, res, next) => {
    db.Post.findAll({
        where: {userId: req.params.userId},
        attributes: ['id', 'title', 'media', 'createdAt'],
        order: [
            ['createdAt', 'DESC']
        ],
        include: [
            {
                model: db.User,
                attributes: ["id", "firstname", "lastname", "email", "department", "profilePicture", "isAdmin"]
            },
            {
                model: db.Like,
                attributes: ["userId"]
            },
            {
                model: db.Comment,
                attributes: ['id', "postId"]
            }
        ]
    })
    .then(posts => {
        if (posts.length >= 1) {
            res.status(200).json(posts)
        } else {
            res.status(404).json({message: "Pas de publication à afficher."})
        }
    })
    .catch(error => res.status(400).json({error}));
}

// Afficher un post -----
exports.getOnePost = (req, res, next) => {
    db.Post.findOne({
        attributes: ['id', 'title', 'media', 'createdAt'],
        include: [
            {
                model: db.User,
                attributes: ["id", "firstname", "lastname", "email", "department", "profilePicture", "isAdmin"]
            },
            {
                model: db.Like,
                attributes: ["userId"]
            }
        ],
        where: {id: req.params.id}
    })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({error}));
}