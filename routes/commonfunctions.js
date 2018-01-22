/**
 * @module Commonfunctions
 */
/////////////////////////////////////////////////////////////////////////
// REQUIRED MODULES
/////////////////////////////////////////////////////////////////////////

var request        = require('request');
var constants      = require('./constants');
var logging        = require('./logging');
var otpAuth        = require('./otpAuth');


exports.checkBlank       = checkBlank;
exports.logRequest       = logRequest;

/**
 * Function to check missing parameters in the API.
 * @param arr
 * @returns {number}
 */
function checkBlank(arr)
{
    var arrlength = arr.length;
    for (var i = 0; i < arrlength; i++)
    {
        if (arr[i] === '' || arr[i] === "" || arr[i] == undefined)
        {
            console.log("<<<< BLANK PARAMETER AT INDEX :"+i+">>>>"+arr[i]);
            return 1;
            break;
        }

    }

    return 0;
}

/**
 * middleware to log request in database
 * @param req {OBJECT} request of API
 * @param res {OBJECT} response object that would be returned
 * @param next {FUNCTION} next middleware function to be called
 */
function logRequest(req, res, next) {
  var handlerInfo = {
    "apiModule": "commonfunctions",
    "apiHandler": "logRequest"
  };
  var requestData = "";
  if(req.method === "POST") {
    requestData = JSON.stringify(req.body);
  }
  else if(req.method === "GET") {
    requestData = JSON.stringify(req.query);
  }

  var data = [req.url, requestData, req.token || "NA", req.connection.remoteAddress];
  var insertLog = "INSERT INTO tb_app_api_logs "+
    "(api_name, request, requested_by, logged_on, ip_address) "+
    "VALUES(?, ?, ?, NOW(), ?)";

    
  var tt= connection.query(insertLog, data, function(err, insRes) {
    console.log(tt.sql);
    logging.logDatabaseQuery(handlerInfo, "insert api log", err, insRes, tt.sql);
    if(err) {
      console.log(err);
      logging.error("Error while inserting logs", err);
    }
    next();
  });
}