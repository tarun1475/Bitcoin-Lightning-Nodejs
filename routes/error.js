"use strict";

var env = process.env.NODE_ENV || 'production';
var logging = require('./logging');
var constants = require('./constants');

/**
 * Generic middleware to handle error in APIs
 * @param err
 * @param req
 * @param res
 * @param next
 */
module.exports = function(err, req, res, next) {
  var code = err.status || constants.responseFlags.INTERNAL_SERVER_ERR;
  var handlerInfo = {
    "apiModule": "Error",
    "apiHandler": "err"
  };
  var response = {
    "error": err,
  };
  if(err.data)
    response.data = err.data;
  if(err.url)
    response.url  = err.url;
  if(code >= constants.responseFlags.INTERNAL_SERVER_ERR) {
    logging.warn(handlerInfo, err.stack);
  }

  if(env.toLowerCase() == "production") {
    if(code == constants.responseFlags.INTERNAL_SERVER_ERR) {
      response.error = "An unexpected error has occured.";
    }
    response.stack = undefined;
  }
  res.status(code).json(response);
}; 
