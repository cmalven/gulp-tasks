//
//   Reload Browser
//
//////////////////////////////////////////////////////////////////////

/*
A generic task to reload the browser when another task is complete
*/

module.exports = function(done) {
  if (global.browsersync) global.browsersync.reload();
  done();
};

module.exports.displayName = 'reload';
