const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const commentCtrl = require('../controllers/comment')
const likeCtrl = require('../controllers/like');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// ROUTES ----------
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.editPost);
router.delete('/:id', auth, multer, postCtrl.deletePost);
router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);

router.post('/:id/comments', auth, commentCtrl.createComment);
router.delete('/:id/comments/:id', auth, commentCtrl.deleteComment);
router.get('/:id/comments', auth, commentCtrl.getAllComments);

router.post('/:id/likes', auth, likeCtrl.likePost);
router.get('/:id/likes', auth, likeCtrl.getAllLikes);
router.get('/:id/like', auth, likeCtrl.getOneLike);
module.exports = router;