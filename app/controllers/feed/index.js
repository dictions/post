'use strict';

/**
 * Module Dependencies
 */
     var async = require('async');
         var Q = require('q'); 
      var rank = require('../rank');
       var rss = require('../rss');

/**
 * Return processed feed with just the metadata
 * and ranking information
 * @return Q promise of array
 */
var getFeed = function(url){

  if (!url) {
    throw 'Cannot fetch without a URL';
    return false;
  }

  var deferred = Q.defer();

  var processedFeed = {};
  processedFeed.items = [];

  // Give us back just the important info
  rss.getFeed(url).then(function(feed){

    processedFeed.meta = feed.meta;

    var rankPromises = [];

    // Loop through the items and get their rank metric
    for (var i = 0; i < feed.items.length; i++) {
      rankPromises.push(rank.getMetric(feed.items[i].link, feed.items[i].pubDate));
    }

    

    // When all that is done, resolve the promise
    Q.all(rankPromises).then(function(rankArray){
      
      for (var a = 0; a < feed.items.length; a++) {
        processedFeed.items.push({
          title: feed.items[a].title,
          link: feed.items[a].link,
          date: feed.items[a].pubDate,
          author: feed.items[a].author,
          rank: rankArray[a]
        });
      }

      deferred.resolve(processedFeed);

    });

  });

  return deferred.promise;

};

getFeed('http://www.huffingtonpost.com/feeds/index.xml').then(function(data){console.log(data)});