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
  return sConfig.twitterAPI + 'urls/count.json?url=' + util.url.sanatize(url);
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

    // If we have an error, deal
    // There isn't a success property on 
    // Twitter API
    if (data.hasOwnProperty('error')) {
      deferred.reject(data.error);
    } else {
      deferred.resolve(data);
    }

    return false;

  });

  return deferred.promise;
};


/**
 * Parse return from Twitter API and return metric
 * @return Number
 */
var parseMetric = function(obj){

  // Handle Error ;)
  if (obj == null) {
    throw 'Error parsing return';
    return 0;
  } else {
    return obj.count;
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