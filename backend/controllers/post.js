const db = require('../models');
const fs = require('fs');

// ROUTES ----------

// Créer un post
exports.createPost = (req, res, next) => {
    let imgUrl;
    if (!req.file) {
        imgUrl = null;
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

// Modifier un post
exports.modifyPost = (req, res, next) => {
    let imgUrl;
    if (!req.file) {
        imgUrl = null;
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
}

// Supprimer un post
exports.deletePost = (req, res, next) => {
    db.Post.findOne({
        where: {id: req.params.id}
    })
    .then(post => {
        const filename = post.media.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            db.Post.destroy({
                subQuery: false,
                where: {id: req.params.id}
            })
            .then(() => res.status(200).json({message: "Post supprimé !"}))
            .catch(error => res.status(400).json({error}));
        })
    })
    .catch(error => res.status(500).json({error}));
}

// Afficher tous les posts
exports.getAllPosts = (req, res, next) => {
    db.Post.findAll({
        attributes: ['id', 'title', 'media', 'likes', 'dislikes', 'createdAt'],
        order: [
            ['createdAt', 'DESC']
        ],
        include: [
            {
                model: db.User,
                attributes: ["id", "firstname", "lastname", "email", "profilePicture", "isAdmin"]
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

// Afficher un post
exports.getOnePost = (req, res, next) => {
    db.Post.findOne({
        attributes: ['id', 'title', 'media', 'likes', 'dislikes', 'createdAt'],
        include: [
            {
                model: db.User,
                attributes: ["id", "firstname", "lastname", "email", "profilePicture", "isAdmin"]
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