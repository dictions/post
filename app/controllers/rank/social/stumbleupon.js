'use strict';

/**
 * Module Dependencies
 */
      var Q = require('q');
var request = require('request');
var sConfig = require('../../../../config/social');
   var util = require('../../util');


/**
 * Build the Stumble Upon URL
 */
var buildURL = function(url){
  return sConfig.stumbleuponAPI + '?url=' + util.url.sanatize(url);
};


/**
 * Make a request to Stumble Upon
 * @return Q promise of null or data
 */
var getData = function(url){

  if (!url) {
    throw 'Cannot fetch without a URL';
    return false;
  }

  var url = buildURL(url);
  var deferred = Q.defer();

  // Pass Return JSON to 
  request(url, function(err, res, body){

    // Deal with error
    if (err) deferred.reject(err);

    var data = JSON.parse(body);

    // If we have a success, resolve the promise
    if (data.success) {
      deferred.resolve(data.result);
    } else {
      deferred.reject(null);
    }

    return false;

  });

  return deferred.promise;
};


/**
 * Expose data
 */
exports.getData = getData;