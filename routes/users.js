/**
 * @module Users
 */


/*
 * Module dependencies
 */

var constants      = require('./constants');
var utils          = require('./commonfunctions');

exports.signUpUser     	= signUpUser;
exports.loginUser       = loginUser;

/**
 *
 * [POST] '/users-auth/sign_up_user'<br>
 * API to send otp via twilio, <br>Request body requires following parameters:
 * @param {string} phone_no - mobile of the user
 * @param {string} country_code - country code of country
 * @return {JSON} Response body contains simple json object.
 *
 */

function signUpUser(req, res) {
  var handlerInfo = {
    "apiModule": "Users",
    "apiHandler": "signUpUser"
  };
  var firstName		= req.body.firstName;
  var lastName		= req.body.lastName;


  if(utils.checkBlank([firstName,lastName])) {
    return res.send(constants.parameterMissingResponse);
  }

 
  res.send({
	  	"log":"Success"
	  });
   

}


/**
 *
 * [POST] '/users-auth/login_user'<br>
 * API to verify otp via twilio, <br>Request body requires following parameters:
 * @param {string} otp - otp sent to mobile
 * @return {JSON} Response body contains simple json object.
 *
 */

function loginUser(req, res) {
  var handlerInfo = {
    "apiModule": "Users",
    "apiHandler": "loginUser"
  };
  
res.send({
	  	"log":"Success"
	  });
   

}