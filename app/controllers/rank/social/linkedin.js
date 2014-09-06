'use strict';

/**
 * Module Dependencies
 */
      var Q = require('q');
var request = require('request');
var sConfig = require('../../../../config/social');
   var util = require('../../util');



/**
 * Build the Linkedin URL
 */
var buildURL = function(url){
  return sConfig.linkedinAPI + '?url=' + util.url.sanatize(url) + '&format=json';
};


/**
 * Make a request to Linkedin
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

    // I can't find any success/failure prop on Linkedin's API
    deferred.resolve(data);

    return false;

  });

  return deferred.promise;
};

/**
 * Expose
 */
exports.getData = getData;