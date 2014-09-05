'use strict';

/**
 * Module Dependencies
 */
      var async = require('async');
          var Q = require('q');
var stumbleupon = require('./stumbleupon');
   var facebook = require('./facebook');

// var socialRank = function(url){

//   var deferred = Q.defer();

//   async.parallel({
//     stumbleuponViews: function(callback){
//       stumbleupon.getData(url).then(function(data){
//         callback(null, data.views);
//       });
//     },
//     facebookShares: function(callback){
//       facebook.getData(url).then(function(data){
//         callback(null, data.share_count);
//       });
//     }
//   },
//   function(err, results) {
//     if (err) deferred.reject(null);
//     deferred.resolve(results);
//   });

//   return deferred.promise;

// };

/**
 * Expose socialRank()
 */
//exports.socialRank = socialRank;