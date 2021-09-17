const db = require('../models');
const jwt = require('jsonwebtoken');

const userID = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const id = decodedToken.userId;
    return id;
}

// Créer un commentaire -----
exports.createComment = (req, res, next) => {
    db.Comment.create({
        content: req.body.content,
        userId: userID(req),
        postId: req.params.id
    })
    .then(() => res.status(200).json({message: "Commentaire ajouté !"}))
    .catch((error) => res.status(403).json({error}))
}

// Modifier un commentaire -----
exports.editComment = (req, res, next) => {
    db.Comment.findOne({
        where: {id: req.params.id, postId: req.params.postId, 
        }
    })
    .then(comment => {
        if (comment) {
            db.User.findOne({
                where: {id: userID(req)},
            })
            .then(user => {
                if (comment.userId === userID(req) || user.isAdmin === true) {
                    db.Comment.update(
                        {content: req.body.content},
                        {where: {id: req.params.id}}
                    )
                    .then(() => res.status(201).json({message: 'Le commentaire a bien été mis à jour !'}))
                    .catch(error => res.status(400).json({error}))
                } else {
                    res.status(403).json({erreur: "Vous n'êtes pas autorisé(e) à modifier ce commentaire !"})
                }
            })
            .catch(error => res.status(500).json({error}))
        } else {
            res.status(404).json({erreur: 'Commentaire introuvable !'})
        }
    })
    .catch(error => res.status(500).json({error}))
}

// Supprimer un commentaire -----
exports.deleteComment = (req, res, next) => {
    db.Comment.findOne({
        where: {id: req.params.id}
    })
    .then(() => {
        db.Comment.destroy({
            where: {id: req.params.id}
        })
        .then(() => res.status(200).json({message: "Commentaire supprimé !"}))
        .catch((error) => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
}

// Afficher tous les commentaires d'un post -----
exports.getAllComments = (req, res, next) => {
    db.Comment.findAll({
        attributes: ['id', 'content', 'userId', 'postId', 'createdAt'],
        order: [
            ['createdAt', 'DESC']
        ],
        include: [
            {
                model: db.User,
                attributes: ['id', 'firstname', 'lastname', 'department', 'profilePicture']
            },
            {
                model: db.Post,
                attributes: ['id']
            }
        ],
        where: {postId: req.params.id}
    })
    .then((comments) => {
        res.status(200).json(comments)
    })
    .catch((error) => {
        res.status(400).json({error})
    })
}

// Afficher un commentaire -----
exports.getOneComment = (req, res, next) => {
    db.Comment.findOne({
        where: {id: req.params.id, postId: req.params.postId},
        include: [
            {
                model: db.Post,
            }
        ]
    })
    .then(comment => {
        if (comment) {
            res.status(200).json(comment)
        } else {
            res.status(404).json({erreur: 'Commentaire introuvable !'})
        }
    })
    .catch(error => res.status(500).json({error}))
}