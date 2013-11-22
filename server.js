/**
 * Module dependencies.
 */
var express = require('express'),
    fs = require('fs'),
    passport = require('passport'),
    logger = require('mean-logger');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

//Load configurations
//if test env, load example file
var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env],
    auth = require('./config/middlewares/authorization'),
    mongoose = require('mongoose')
    user = require('connect-roles');

console.log("NODE_ENV: ", process.env.NODE_ENV);

//Bootstrap db connection
var db = mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || config.db);

//Bootstrap models
var models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function(file) {
    require(models_path + '/' + file);
});

//bootstrap passport config
require('./config/passport')(passport, config);

var app = express();

//express settings
require('./config/express')(app, config, passport, user);

//Connect Roles Configuration
require('./config/middlewares/roles')(user);

//Bootstrap routes
require('./config/routes')(app, passport, auth, user);

//Start the app by listening on <port>
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express app started on port ' + port);

//Initializing logger 
logger.init(app, passport, mongoose);

//expose app
exports = module.exports = app;