'use strict';

/**
 * Module Dependencies
 */
var social = require('./social');

social.stumbleupon.getViews('http://google.com')
.then(function(views){console.log(views)});