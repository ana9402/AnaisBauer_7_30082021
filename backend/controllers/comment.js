const db = require('../models');
const jwt = require('jsonwebtoken');

const userID = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const id = decodedToken.userId;
    return id;

}

exports.createComment = (req, res, next) => {
    db.Comment.create({
        content: req.body.content,
        userId: userID(req),
        postId: req.params.id
    })
    .then(() => res.status(200).json({message: "Commentaire ajouté !"}))
    .catch((error) => res.status(403).json({error}))
}

exports.getAllComments = (req, res, next) => {
    db.Comment.findAll({
        attributes: ['id', 'content', 'userId', 'postId', 'createdAt'],
        order: [
            ['createdAt', 'DESC']
        ],
        include: [
            {
                model: db.User,
                attributes: ['id', 'firstname', 'lastname', 'profilePicture']
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