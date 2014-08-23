'use strict';

/**
 * Module Dependencies
 */
var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

exports.index = function(req, res) {
  res.sendfile(rootPath + '/public/index.html');
};