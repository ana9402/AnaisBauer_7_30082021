const db = require('../models');
const jwt = require('jsonwebtoken');
const { sequelize } = require('../models');

const userID = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const id = decodedToken.userId;
    return id;
}

// Liker un post -----
exports.likePost = (req, res, next) => {
    const postID = req.params.id;
    // On cherche si l'utilisateur a déjà liké ce post
    db.Like.findOne({
        where: { userId: userID(req), postId: postID}
    })
    .then(like => {
        // Si l'utilisateur a déjà liké ce post
        if (like) {
            console.log(like)
            // On supprime le like existant dans la table Like
            db.Like.destroy({
                where: { userId: userID(req), postId: postID }
            })
            .then(() => res.status(200).json({message: "Le like a été supprimé !"}))
            .catch((error) => res.status(400).json({error}))
            // On décrémente de 1 la colonne likes du post
            db.Post.update(
                { likes: sequelize.literal('likes - 1') },
                { where: { id: postID }}
            )
            .then(() => res.status(201).json({message:"+1 like !"}))
            .catch(error => res.status(400).json({error}))
        } 
        // Si l'utilisateur n'a pas encore liké ce post
        else {
            // On enregistre le like dans la table Like
            db.Like.create({
                userId: userID(req),
                postId: postID
            })
            .then(() => res.status(201).json({message: "Le like a été ajouté !"}))
            .catch((error) => res.status(400).json({error}))
            // On incrémente de 1 la colonne likes du post
            db.Post.update(
                { likes: sequelize.literal('likes + 1') },
                { where: { id: postID }}
            )
            .then(() => res.status(201).json({message:"+1 like !"}))
            .catch(error => res.status(400).json({error}))
        }
    })
    .catch((error) => res.status(500).json({error}));
}

// Afficher le like d'un utilisateur sur le post -----
exports.getOneLike = (req, res, next) => {
    db.Like.findOne({
        where: {userId: userID(req), postId: req.params.id}
    })
    .then(like => {
        if (like) {
            res.status(200).json(like)
        } else {
            return;
        }
    })
    .catch(error => res.status(404).json({error}))
}

// Afficher tous les likes d'un post -----
exports.getAllLikes = (req, res, next) => {
    db.Like.findAll({
        where: {postId: req.params.id},
    })
    .then(likes => res.status(200).json(likes))
    .catch(error => res.status(404).json({error}))
}