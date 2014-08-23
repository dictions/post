'use strict';

/**
 * Module Dependencies
 */
var index = require('../app/controllers/index');

module.exports = function(app) {
  app.get('/', index.index);
};