'use strict';

/**
 * Module Dependencies
 */
var social = require('./social');

social.facebook.getData('http://google.com')
.then(function(data){console.log(data)});