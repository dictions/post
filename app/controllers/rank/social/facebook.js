'use strict';

/**
 * Module Dependencies
 */
      var Q = require('q');
var request = require('request');
var sConfig = require('../../../../config/social');
   var util = require('../../util');


/**
 * Build the Facebook URL
 */
var buildURL = function(url){
  return sConfig.facebookAPI + '?q=SELECT url, normalized_url, share_count, like_count, comment_count, total_count,commentsbox_count, comments_fbid, click_count FROM link_stat WHERE url=\'' + util.url.sanatize(url) + '\'';
};


/**
 * Make a request to Facebook
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
    if (data.data.length > 0) {
      deferred.resolve(data.data[0]);
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
var parseMetric = function(obj){

  // Handle Error ;)
  if (obj == null) {
    throw 'Error parsing return';
    return 0;
  } else {
    return obj.total_count;
  }
}


/**
 * Make API call and return important metric
 * @return Number
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