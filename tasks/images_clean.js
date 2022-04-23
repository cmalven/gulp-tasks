const del = require('del');

//
//   Images: Clean
//
//////////////////////////////////////////////////////////////////////

/*
Clears image distribution directory
*/

module.exports = function() {
  return del(global.GULP_CONFIG.paths.imageDist);
};

module.exports.displayName = 'images:clean';
