var express = require('express');
var router = express.Router();

const userController = require('../controllers/usersController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create-user', userController.createUser)

router.post('/login', userController.login)

router.post('/add-to-cart', userController.addToCart)

router.get('/single-user/:userID', userController.singleUser)

module.exports = router;
