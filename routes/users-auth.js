var express 		= require('express');
var error   		= require('./error');
var users           = require('./users');
var router  		= express.Router()


/*
  * User apis 
  */


router.post('/sign_up_user' 
  , users.signUpUser
  , error);

router.post('/login_user' 
  , users.loginUser
  , error);

module.exports = router