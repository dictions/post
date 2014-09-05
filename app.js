'use strict';

// Clear terminal
process.stdout.write('\u001B[2J\u001B[0;0f');

// Set the node enviornment variable if not set before
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Modules Dependencies
 */
 var config = require('./config/config');
var express = require('express');
 var colors = require('colors');

/**
 * Configuration
 */

// Set log colors
colors.setTheme({
  prompt: 'green',
  error: 'red',
  help: 'yellow',
})

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
    console.log('[NODE_ENV] '.green + process.env.NODE_ENV.prompt);
    app.listen(PORT);
    console.log('[Express] Listening to 127.0.0.1:'.prompt + (PORT + '').prompt);
  },
};