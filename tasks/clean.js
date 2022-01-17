const del = require('del');

//
//   Clean
//
//////////////////////////////////////////////////////////////////////

/*
Clears all distribution directories
*/

module.exports = function() {
  return del(global.GULP_CONFIG.paths.dist);
};

module.exports.displayName = 'clean';
