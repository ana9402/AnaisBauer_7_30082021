const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// ROUTES ----------
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id', auth, multer, userCtrl.modifyUser)
router.get('/', auth, userCtrl.getAllUsers)
router.get('/:id', auth, userCtrl.getOneUser)

// EXPORTATIONS ----------
module.exports = router;