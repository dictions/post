'use strict';

/**
 * Module Dependencies
 */
var _ = require('lodash');



/**
 * Module Exports
 */
module.exports = _.extend(
  require(__dirname + '/../config/env/all.js'),
  require(__dirname + '/../config/env/' + process.env.NODE_ENV + '.js') || {},
	require(__dirname + '/../config/env/local.js')
);