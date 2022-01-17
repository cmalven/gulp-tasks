const gulp = require('gulp');

//
//   Scripts: Copy
//
//////////////////////////////////////////////////////////////////////

/*
Copies script files from src to dist
*/

module.exports = function() {
  const scriptSrc = [];

  global.GULP_CONFIG.paths.scriptCopyPaths.forEach(function(path) {
    scriptSrc.push(global.GULP_CONFIG.paths.scriptSrc + path + '**/*.js');
  });

  return gulp.src(scriptSrc)
    .pipe(gulp.dest(global.GULP_CONFIG.paths.scriptDist));
};

module.exports.displayName = 'scripts:copy';
