var express 		= require('express');
var error   		= require('./error');
var otpAuth         = require('./otpAuth');
var router  		= express.Router()


/*
  * OTP apis 
  */


router.post('/send_otp'
  , otpAuth.sendOtp
  , error);

router.post('/verify_otp'
  , otpAuth.verifyOtp
  , error);

module.exports = router