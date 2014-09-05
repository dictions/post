'use strict';

/**
 * Module Dependencies
 */
var Q = require('q');
var request = require('request');
var sConfig = require('../../../../config/social');


/**
 * Build the Stumble Upon URL
 */
var buildURL = function(url){
  return sConfig.stumbleuponAPI + '?url=' + url;
};

/**
 * Make a request to Stumble Upon
 * @return Q promise of null or data
 */
var getData = function(url){

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
 * Return a promise for Stumble Upon Views Count
 * @return Q promise
 */
var getViews = function(url){

  var deferred = Q.defer();

  getData(url)
  .then(function(data){
    if (data) {
      deferred.resolve(data.views);
    } else {
      deferred.reject(null);
    }
  });

  return deferred.promise;

};


/**
 * Expose getViews();
 */
exports.getViews = getViews;