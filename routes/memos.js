var express = require('express');
var router = express.Router();

var auth = require('../controllers/auth');
var memoController = require('../controllers/memoController');

// Route to get all user
router.get('/', auth.allUser, memoController.get);

// Route to create new user
router.post('/', auth.allUser, memoController.create);

// Route to get one user
router.get('/:id', auth.authUser, memoController.getOne);

// Route to update user data
router.put('/:id', auth.authUser, memoController.update);

// Route to remove user data
router.delete('/:id', auth.authUser, memoController.remove);

module.exports = router;