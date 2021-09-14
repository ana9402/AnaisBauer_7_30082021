const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const commentCtrl = require('../controllers/comment')
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// ROUTES ----------
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, multer, postCtrl.deletePost);
router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);

router.post('/:id/comments', auth, commentCtrl.createComment);
router.get('/:id/comments', auth, commentCtrl.getAllComments)

module.exports = router;