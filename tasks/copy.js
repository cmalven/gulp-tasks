const gulp = require('gulp');

//
//   Copy
//
//////////////////////////////////////////////////////////////////////

/*
Copies additional files to dist
*/

module.exports = function(done) {
  const src = [];

  if (!global.GULP_CONFIG.paths.distCopyPaths.length) return done();

  global.GULP_CONFIG.paths.distCopyPaths.forEach(function(path) {
    src.push(path + '**/*');
  });

  return gulp.src(src)
    .pipe(gulp.dest(global.GULP_CONFIG.paths.dist));
};

module.exports.displayName = 'copy';
