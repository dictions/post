'use strict';

/**
 * Module Dependencies
 */
      var Q = require('q');
var request = require('request');
var aConfig = require('../../../../config/authority');
   var util = require('../../util');


/**
 * Build the Alexa URL
 */
var buildURL = function(url){
  return aConfig.alexaAPI + '?cli=10&url=' + util.url.domain(url);
};


/**
 * Make a request to Alexa
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

    // If we have a success, resolve the promise
    if (body.length > 0) {
      deferred.resolve(body);
    } else {
      deferred.reject(null);
    }

    return false;

  });

  return deferred.promise;
};

/**
 * Parse return from Facebook API and return metric
 * @return Number
 */
var parseMetric = function(xml){

  // Grab the Alexa Rank string from XML response
  var reachString = xml.match(/<REACH.+/)[0];
  var rank = reachString.split("\"")[1];

  // Handle Error ;)
  if (rank == parseInt(rank)) {
    return parseInt(rank);
  } else {
    throw 'Error parsing return';
    return null;
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
 * Expose
 */
exports.getData = getData;
exports.getMetric = getMetric;