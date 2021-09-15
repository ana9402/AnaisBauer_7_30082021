const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

// ROUTES ----------
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/', auth, userCtrl.getAllUsers)
router.get('/:id', auth, userCtrl.getOneUser)

// EXPORTATIONS ----------
module.exports = router;