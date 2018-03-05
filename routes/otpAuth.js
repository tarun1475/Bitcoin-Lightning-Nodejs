/**
 * @module otp auth
 */


/*
 * Module dependencies
 */

var authy          = require('authy')('OZEiIbzs3JzcxZO91U23q1U63mR64xRu');
var request        = require("request");
var constants      = require('./constants');
var utils          = require('./commonfunctions');

exports.sendOtp     	= sendOtp;
exports.verifyOtp       = verifyOtp;

/**
 *
 * [POST] '/bittmax-auth/send_otp'<br>
 * API to send otp via twilio, <br>Request body requires following parameters:
 * @param {string} phone_no - mobile of the user
 * @param {string} country_code - country code of country
 * @return {JSON} Response body contains simple json object.
 *
 */

function sendOtp(req, res) {
  var handlerInfo = {
    "apiModule": "otpAuth",
    "apiHandler": "sendOtp"
  };
  var phone_no 		= req.body.phone_no;
  var country_code  = req.body.country_code;

  if(utils.checkBlank([phone_no,country_code])) {
    return res.send(constants.parameterMissingResponse);
  }

 
 // // check if user already exists
 //  var dupQuery = "SELECT * FROM tb_users WHERE  user_phone = ? ";
 //  var tt = connection.query(dupQuery, [phone_no], function(dupErr, dupData) {
 //    logging.logDatabaseQuery(handlerInfo, "checking duplicate user", dupErr, dupData);
 //    if(dupErr) {
 //      return res.send({
 //        "log": "Internal server error",
 //        "flag": constants.responseFlags.ACTION_FAILED
 //      });
 //    }
 //    if(dupData.length > 0) {
 //      return res.send({
 //        "log": "A user already exists with this phone",
 //        "flag": constants.responseFlags.ACTION_FAILED
 //      });
 //    }


   //hardcoded email for twilio send otp api
   var email = 'tarunkumargupta14@gmail.com';

	authy.register_user(email, phone_no,country_code, function (err, result) {
	    // res = {user: {id: 1337}} where 1337 = ID given to use, store this someplace

	var options = { method: 'GET',
	  url: 'https://api.authy.com/protected/json/sms/'+result.user.id,
	  qs: { api_key: 'OZEiIbzs3JzcxZO91U23q1U63mR64xRu' },
	  headers: 
	   { 
	   	'cache-control': 'no-cache',
	    'content-type': 'application/json' },
	  body: 
	   { email: email,
	     phone: phone_no,
	     countryCode: country_code },
	  json: true };

	request(options, function (error, response, body) {
	  if (error) throw new Error(error);
	  res.send({
	  	"log":"Successfully sent otp",
	  	"flag": constants.responseFlags.ACTION_COMPLETE,
	  	"auth_id":result.user.id,
	  	"result":body
	  });
	});

});
// });

}


/**
 *
 * [POST] '/bittmax-auth/verify_otp'<br>
 * API to verify otp via twilio, <br>Request body requires following parameters:
 * @param {string} otp - otp sent to mobile
 * @return {JSON} Response body contains simple json object.
 *
 */

function verifyOtp(req, res) {
  var handlerInfo = {
    "apiModule": "otpAuth",
    "apiHandler": "verifyOtp"
  };
  var otp 		= req.body.otp;
  var auth_id	= req.body.auth_id;

  var options = { method: 'GET',
	  url: 'https://api.authy.com/protected/json/verify/'+otp+'/'+auth_id,
	  qs: { api_key: 'OZEiIbzs3JzcxZO91U23q1U63mR64xRu' },
	  headers: 
	   { 'postman-token': '0cb2cf93-23a7-1f63-37bf-bd7720819535',
	     'cache-control': 'no-cache',
	     'content-type': 'application/json' },
	  json: true };

	request(options, function (error, response, body) {
	  if (error) throw new Error(error);
	  if(!(body.success)){
	  	return res.send({
	  	"log":"Invalid otp",
	  	"flag": constants.responseFlags.ACTION_FAILED,
	  	"result":body
	  });
	  }
	  res.send({
	  	"log":"Successfully verfied otp",
	  	"flag": constants.responseFlags.ACTION_COMPLETE,
	  	"result":body
	  });
	});


}