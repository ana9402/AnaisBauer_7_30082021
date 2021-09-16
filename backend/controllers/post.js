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
    if (!req.file) {
        return;
    } else {
        imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
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
        db.User.findOne({
            where: {id: userID(req)}
        })
        .then(user => {
            if (post.User.id === userID(req) || user.isAdmin === true ) {
                let imgUrl;
                if (!req.file) {
                    if (post.media == null) {
                        imgUrl = null;
                    } else {
                        imgUrl = post.media
                    }
                    
                } else {
                    imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                }
                db.Post.update(
                    {title: req.body.title,
                    media: imgUrl,
                    userId: req.body.userId},
                    { where: {id: req.params.id}}
                )
                .then(() => res.status(201).json({message: "Le post a bien été modifié !"}))
                .catch(error => res.status(400).json({error}))
            } else {
                res.status(403).json({erreur: "Vous n'êtes pas autorisé(e) à modifier ce post !"})
            }
        })
        .catch(error => res.status(500).json({error}))

    })
    .catch(error => res.status(500).json({error}))
}

// Supprimer un post -----
exports.deletePost = (req, res, next) => {
    // On recherche le post dont l'id est dans les paramètres de la requête
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
            db.User.findOne({
                where: {id: userID(req)}
            })
            .then(admin => {
                if (post.userId == userID(req) || admin.isAdmin === true) {
                    const filename = post.media.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                        db.Post.destroy({
                            where: {id: req.params.id}
                        })
                        .then(() => res.status(200).json({message: "Post supprimé !"}))
                        .catch(error => res.status(400).json({error}));
                    })
                } else {
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
        attributes: ['id', 'title', 'media', 'likes', 'dislikes', 'createdAt'],
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
            }
        ]
    })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({error}));
}

// Afficher un post -----
exports.getOnePost = (req, res, next) => {
    db.Post.findOne({
        attributes: ['id', 'title', 'media', 'likes', 'dislikes', 'createdAt'],
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