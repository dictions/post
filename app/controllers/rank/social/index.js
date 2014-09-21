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
 * @return Q promise of Integer
 */
var getMetric = function(url){

  var deferred = Q.defer();

  // Pull from all social APIs
  async.parallel([
    function(callback){
      facebook.getMetric(url).then(function(metric){
        if (metric == null) {
          callback('Error requesting metric', null);
        } else if (metric == parseInt(metric)) {
          callback(null, metric);
        }
      });
    },
    function(callback){
      twitter.getMetric(url).then(function(metric){
        if (metric == null) {
          callback('Error requesting metric', null);
        } else if (metric == parseInt(metric)) {
          callback(null, metric);
        }
      });
    },
    function(callback){
      pinterest.getMetric(url).then(function(metric){
        if (metric == null) {
          callback('Error requesting metric', null);
        } else if (metric == parseInt(metric)) {
          callback(null, metric);
        }
      });
    },
    function(callback){
      linkedin.getMetric(url).then(function(metric){
        if (metric == null) {
          callback('Error requesting metric', null);
        } else if (metric == parseInt(metric)) {
          callback(null, metric);
        }
      });
    },
    function(callback){
      stumbleupon.getMetric(url).then(function(metric){
        if (metric == null) {
          callback('Error requesting metric', null);
        } else if (metric == parseInt(metric)) {
          callback(null, metric);
        }
      });
    }
  ],
  // Create Social Metric Object
  function(err, results) {
    if (err) {
      throw err;
      deferred.reject(null);
    } else {
      var total = _.reduce(results, function(a, b){return a+b})
      deferred.resolve(total);
    }
  });

  return deferred.promise;

};

/**
 * Expose
 */
exports.getMetric = getMetric;