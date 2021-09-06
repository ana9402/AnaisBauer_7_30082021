const db = require('../models');
const fs = require('fs');

// ROUTES ----------
exports.createPost = (req, res, next) => {
    let imgUrl;
    if (!req.file) {
        imgUrl = null;
    } else {
        imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    db.Post.create({
        title: req.body.title,
        content: req.body.content,
        media: imgUrl,
        user_id: req.body.userId
    })
    .then(() => res.status(201).json({message: "Le nouveau post a bien été créé !"}))
    .catch(error => res.status(400).json({error}));
}