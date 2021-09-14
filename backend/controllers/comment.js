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