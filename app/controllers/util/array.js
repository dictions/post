'use strict';

/**
 * Module Exports
 */



var urls = [
  'www.theverge.com/2014/9/5/6109407/moto-360-price-release-date',
  'www.vice.com/en_uk/read/this-girl-designed-porn-banners-for-a-living',
  'authenticff.com',
  'devdocs.io',
  'evernote.com',
  'https://www.duolingo.com/',
];

/**
 * Create an indexed Object from an array
 * @return Object
 */
var indexObject = function(array){

  var obj = {};

  for (var i = 0; i<array.length; i++) {
    obj[array[i]] = i + 1;
  }

  return obj;

};


/**
 * Expose 
 */
exports.indexObject = indexObject;