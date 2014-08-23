'use strict';

/**
 * Module Dependencies
 */
var express = require('express');
   var path = require('path');

/**
 * Config
 */
var ROOT = path.normalize(__dirname + '/..');
var ASSETS = ROOT + '/public/assets';


/**
 * Exports
 */
module.exports = function(app){

  // Static File directory
  app.use(express.static(ASSETS));

};