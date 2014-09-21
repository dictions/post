'use strict';

/**
 * Module Dependencies
 */
     var async = require('async');
         var Q = require('q'); 
   var request = require('request');
      var util = require('../util');
var FeedParser = require('feedparser');


/**
 * Make a request to RSS feed and return data
 */
var getFeed = function(url) {

  if (!url) {
    throw 'Cannot fetch without a URL';
    return false;
  }

  var url = util.url.sanatize(url);
  var deferred = Q.defer();


  var req = request(url, {timeout: 10000, pool: false});
  req.setMaxListeners(50);
  // Some feeds do not respond without user-agent and accept headers.
  req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36')
  req.setHeader('accept', 'text/html,application/xhtml+xml');

  var feedparser = new FeedParser();

  // Set up feed
  var feed = {};
  feed.meta = {};
  feed.items = [];


  /**
   * Set up handlers
   */
  req.on('error', function (error) {
    throw error;
    deferred.reject(error);
  });

  req.on('response', function (res) {
    var stream = this;
    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
    stream.pipe(feedparser);
  });

  // lol
  feedparser.on('error', function(error) {
    throw error;
    deferred.reject(error);
  });

  /**
   * Feedparser gets a readable stream
   */
  feedparser.on('readable', function() {
    var stream = this
    var item;

    // Give meta to feed object
    feed.meta = this.meta;

    // Add items to the array
    while (item = stream.read()) {
      feed.items.push(item);
    }
  });

  // When we done, do the do
  feedparser.on('end', function(){
    deferred.resolve(feed);
  });

  return deferred.promise;

};


/**
 * Expose
 */
exports.getFeed = getFeed;