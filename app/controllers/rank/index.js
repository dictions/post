'use strict';

/**
 * Module Dependencies
 */
    var async = require('async');
        var Q = require('q'); 
   var social = require('./social');
var authority = require('./authority');

var urls = [
  'www.theverge.com/2014/9/5/6109407/moto-360-price-release-date',
  'www.vice.com/en_uk/read/this-girl-designed-porn-banners-for-a-living',
  'authenticff.com',
  'devdocs.io',
  'evernote.com',
  'https://www.duolingo.com/',
];



/**
 * Rank URLs by social activity metrics
 * Requires an array of URLs
 * @return array
 */
var socialRank = function(urls){

  if (!urls) {
    throw 'Calling socialRank requires an array of URLs as an argument';
    return false;
  }; 

}

socialRank(urls);