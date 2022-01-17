const gulp = require('gulp');

//
//   Styles: Copy
//
//////////////////////////////////////////////////////////////////////

/*
Copies style files from src to dist
*/

module.exports = function(done) {
  const styleSrc = [];

  global.GULP_CONFIG.paths.styleCopyPaths.forEach(function(path) {
    styleSrc.push(global.GULP_CONFIG.paths.styleSrc + path + '*');
  });

  if (!styleSrc.length) return done();

  return gulp.src(styleSrc)
    .pipe(gulp.dest(global.GULP_CONFIG.paths.styleDist));
};

module.exports.displayName = 'styles:copy';
