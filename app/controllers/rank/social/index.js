'use strict';

/**
 * Module Dependencies
 */
      var async = require('async');
          var Q = require('q');
          var _ = require('lodash');
var stumbleupon = require('./stumbleupon');
   var facebook = require('./facebook');
   var linkedin = require('./linkedin');
  var pinterest = require('./pinterest');
    var twitter = require('./twitter');


/**
 * Pull Social Metrics Asynchronously 
 * @return Q promise of object containing all metrics
 */
var socialMetric = function(url){

  var deferred = Q.defer();

  // Pull from all social APIs
  async.parallel({
    facebook: function(callback){
      facebook.getMetric(url).then(function(metric){
        if (metric == null) {
          callback('Error requesting metric', null);
        } else if (metric == parseInt(metric)) {
          callback(null, metric);
        }
      });
    },
    twitter: function(callback){
      twitter.getMetric(url).then(function(metric){
        if (metric == null) {
          callback('Error requesting metric', null);
        } else if (metric == parseInt(metric)) {
          callback(null, metric);
        }
      });
    },
    pinterest: function(callback){
      pinterest.getMetric(url).then(function(metric){
        if (metric == null) {
          callback('Error requesting metric', null);
        } else if (metric == parseInt(metric)) {
          callback(null, metric);
        }
      });
    },
    linkedin: function(callback){
      linkedin.getMetric(url).then(function(metric){
        if (metric == null) {
          callback('Error requesting metric', null);
        } else if (metric == parseInt(metric)) {
          callback(null, metric);
        }
      });
    },
    stumbleupon: function(callback){
      stumbleupon.getMetric(url).then(function(metric){
        if (metric == null) {
          callback('Error requesting metric', null);
        } else if (metric == parseInt(metric)) {
          callback(null, metric);
        }
      });
    },
  },
  // Create Social Metric Object
  function(err, results) {
    if (err) {
      throw err;
      deferred.reject(null);
    } else {
      deferred.resolve(results);
    }
  });

  return deferred.promise;

};

/**
 * Expose socialMetric()
 */
//exports.socialMetric = socialMetric;