'use strict';

module.exports = {
  facebookAPI: 'https://graph.facebook.com/fql?q=SELECT url, normalized_url, share_count, like_count, comment_count, total_count,commentsbox_count, comments_fbid, click_count FROM link_stat WHERE ',
  twitterAPI: '',
  pinterestAPI: '',
  linkedinAPI: '',
  stumbleuponAPI: 'http://www.stumbleupon.com/services/1.01/badge.getinfo'
};