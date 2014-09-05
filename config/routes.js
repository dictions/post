'use strict';

/**
 * Module Dependencies
 */
var index = require('../app/controllers/routes/index');

module.exports = function(app) {
  app.get('/', index.index);
};