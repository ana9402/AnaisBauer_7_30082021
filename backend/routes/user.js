const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const passwordValidation = require('../middleware/passwordValidation')

// ROUTES ----------
router.post('/signup', passwordValidation, userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id', auth, multer, userCtrl.editUser);
router.delete('/:id', auth, multer, userCtrl.deleteUser);
router.get('/', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.getOneUser);

// EXPORTATIONS ----------
module.exports = router;