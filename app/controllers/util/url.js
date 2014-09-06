'use strict';

/**
 * Add HTTP if a web protocol isn't found
 * @return string
 */
var addProtocol = function(url) {
  if (!/^(f|ht)tps?\:\/\//.test(url)) {
    url = "http://" + url;
  }
  return url;
};

/**
 * Validate URL
 * @return boolean
 */
var validUrl = function(url){
  if (/\b((ht|f)tps?):\/\/?[a-z0-9]+(?:[-.][a-z0-9]+)*\.[a-z]{2,5}(?::[0-9]{1,5})?(?:\/\S*)?$/.test(url)) {
    return true;
  } else {
    return false;
  }
};

/**
 * Sanatize URL for use with social count APIs
 * @return string or null
 */
var sanatizeUrl = function(url){
  
  if (!url) {
    throw 'Cannot sanatize URL';
    return null;
  }

  // Do our best to sanatize URL
  var escapedUrl = encodeURI(addProtocol(url));

  // Return URL if valid
  // Throw error and return null if not;
  if (validUrl(escapedUrl)) {
    return escapedUrl;
  } else {
    throw 'Invalid URL';
    return null;
  }

};

/**
 * Expose
 */
exports.sanatize = sanatizeUrl;