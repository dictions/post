'use strict';

/**
 * Module Dependencies
 */
    var async = require('async');
        var Q = require('q'); 
   var social = require('./social');
var authority = require('./authority');
var config = require('../../../config/rank');

var urls = [
  'www.theverge.com/2014/9/5/6109407/moto-360-price-release-date',
  'www.vice.com/en_uk/read/this-girl-designed-porn-banners-for-a-living',
  'authenticff.com',
  'devdocs.io',
  'evernote.com',
  'https://www.duolingo.com/',
];


/**
 * Ze Magic
 * FACTORS: Date, Social, Authority
 * @return promise of Integer
 */
var getMetric = function(url, date) {

  var deferred = Q.defer();

  var now = new Date();
  var date = new Date(date);
  var milliseconds = (now.getTime() - date.getTime()) / 60 / 60;

  /**
   * This is how we treat time. We're using a hill slope to give hot 
   * stories weight, but not too much. There is a slow downward slope for
   * 1.5 hours, then a dramatic drop until about 3.5 hours, then it slows down 
   * again. THIS CAN BE CHANGED -> returns ~ 0-100
   */
  var timeScore = (10 + ( -10 / ( 1 + Math.pow(10, ((Math.log(100) - (milliseconds / 1000)))) ) ) ) * 10;

  // After we fetch scores, do final calculation
  Q.all([social.getMetric(url), authority.getMetric(url)])
  .then(function(data){
    var metric = (data[0] * config.social) + (data[1] * config.authority);
    // All metrics along same curve
    deferred.resolve(metric * timeScore);
  });

  return deferred.promise;

};


/**
 * Expose
 */
exports.getMetric = getMetric;