const db = require('../models');
const jwt = require('jsonwebtoken');
const { sequelize } = require('../models');

const userID = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const id = decodedToken.userId;
    return id;
}

exports.likePost = (req, res, next) => {
    const postID = req.params.id;
    db.Like.findOne({
        where: { userId: userID(req), postId: postID}
    })
    .then(like => {
        if (like) {
            console.log(like)
            db.Like.destroy({
                where: { userId: userID(req), postId: postID }
            })
            .then(() => res.status(200).json({message: "Le like a été supprimé !"}))
            .catch((error) => res.status(400).json({error}))
            db.Post.update(
                { likes: sequelize.literal('likes - 1') },
                { where: { id: postID }}
            )
            .then(() => res.status(201).json({message:"+1 like !"}))
            .catch(error => res.status(400).json({error}))
        } else {
            db.Like.create({
                userId: userID(req),
                postId: postID,
                rate: 1
            })
            .then(() => res.status(201).json({message: "Le like a été ajouté !"}))
            .catch((error) => res.status(400).json({error}))
            // Sur la table Post, on incrémente la colonne likes de 1
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
