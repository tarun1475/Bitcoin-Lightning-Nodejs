/*
 * Module dependencies.
 */

process.env.NODE_CONFIG_DIR = __dirname + '/config/';
config                  = require('config');
var express             = require('express');
var http                = require('http');
var https               = require('https');
var bodyParser          = require('body-parser');
var fs                  = require('fs');
var cors                = require('cors');
var logger              = require('morgan');
var multer              = require('multer');
var favicon             = require('serve-favicon');
var error               = require('./routes/error');
var users               = require('./routes/users');
var utils               = require('./routes/commonfunctions');
var bittmaxAuth        = require('./routes/bittmax-auth');
var usersAuth          = require('./routes/users-auth');
var app                 = express();

connection              = undefined;
require('./routes/mysqlLib');

// var options = {
//   key : fs.readFileSync(__dirname + '/certs/bittmax.com.key.pem'),
//   cert: fs.readFileSync(__dirname + '/certs/bittmax.com.crt.pem')
// };

// all environments
app.set('port', process.env.PORT || config.get('port') || 4013);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/exchange_auth/documentation', express.static(__dirname+'/docs'));
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

/////////////////////////////////////////////////////////////
// APIs for HearBeat
/////////////////////////////////////////////////////////////
// API to check if connection is alive or not
app.get('/heartbeat', function(req, res, next) {
  connection.query(
    'SELECT 1 FROM DUAL WHERE 1 = 1', function(err, result) {
    if(err) {
      console.log(err);
      return res.status(500).send('Internal server Error!');
    }
    res.send('Fuck Off Ripple!');
  });
});

// For storing data on server


app.get('/', function(req, res) {
  res.send('Fuck off Ripple!');
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/uploads/');
    },
    filename: function (req, file, cb) {
        var fileName = file.originalname.replace(/[|&;$%@"<>()+,' '?]/g, "");
        cb(null, fileName);
    }
});
var upload = multer({storage: storage});

//All Routes for Handling different operations

app.use('/bittmax-auth', bittmaxAuth);

app.use('/users-auth', usersAuth);









/**
 * To change the port, please edit the configuration file
 * @type {https.Server}
 */


/*
var httpServer = https.createServer(options, app).listen(app.get('port'), function()  {
  console.log('Express server listening on port ' + app.get('port'));
});
*/

var httpServer = http.createServer(app).listen(app.get('port'), function()  {
  console.log('Express server listening on port ' + app.get('port'));
});
