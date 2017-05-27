var express = require('express');
var router = express.Router();

var auth = require('../controllers/auth');
var memoController = require('../controllers/memoController');

// Route to get all memo
router.get('/', auth.allUser, memoController.get);

// Route to create new memo
router.post('/', auth.allUser, memoController.create);

// Route to get one memo
router.get('/:id', auth.allUser, memoController.getOne);

// Route to update memo data
router.put('/:id', auth.allUser, memoController.update);

// Route to remove memo data
router.delete('/:id', auth.allUser, memoController.remove);

module.exports = router;