var express = require('express');
var router = express.Router();

var auth = require('../controllers/auth');
var userController = require('../controllers/userController');

// Route to get all user
router.get('/', auth.allUser, userController.get);

// Route to create new user
router.post('/', auth.allUser, userController.create);

// Route to get one user
router.get('/:id', auth.authUser, userController.getOne);

// Route to update user data
router.put('/:id', auth.authUser, userController.update);

// Route to remove user data
router.delete('/:id', auth.authUser, userController.remove);

module.exports = router;