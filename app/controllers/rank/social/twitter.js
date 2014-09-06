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


getData('http://google.com').then(function(data){console.log(data)});

/**
 * Expose data
 */
exports.getData = getData;