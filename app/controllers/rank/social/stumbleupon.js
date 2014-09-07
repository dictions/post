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
 * Parse return from Stumbleupon API and return metric
 * @return Number
 */
var parseMetric = function(obj){

  // Handle Error ;)
  if (obj == null) {
    throw 'Error parsing return';
    return 0;
  } else {
    return obj.views;
  }
}


/**
 * Make API call and return important metric
 * @return Q promise of Number
 */
var getMetric = function(url){

  var deferred = Q.defer();

  getData(url).then(function(data){

    // Handle error 
    if (data == null) {
      deferred.reject(null);
    } else {
      deferred.resolve(parseMetric(data));
    }

  })

  return deferred.promise;

};

/**
 * Expose data
 */
exports.getData = getData;
exports.getMetric = getMetric;