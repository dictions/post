'use strict';

/**
 * Modules Dependencies
 */
var express = require('express');


/**
 * Configuration
 */

// Set the node enviornment variable if not set before
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log('NODE_ENV \t' + process.env.NODE_ENV);

// Initializing system variables 
var config = require('./config/config');
// Start the app by listening on <port>
var PORT = process.env.PORT || config.port;


/**
 * Init and configure Express
 */
var app = express();

// Express settings
require('./config/express')(app);
// Routes
require('./config/routes')(app);


/**
 * Expose App
 */
exports = module.exports = {
  init: function(){
    app.listen(PORT);
    console.log('Express \t127.0.0.1:' + PORT);
  },
};