const gulp = require('gulp');

//
//   Templates
//
//////////////////////////////////////////////////////////////////////

/*
Reloads the browser on changes to templates
*/

module.exports = function() {
  let stream = gulp.src([
    global.GULP_CONFIG.paths.templateSrc + '**/*.html',
    global.GULP_CONFIG.paths.templateSrc + '**/*.php',
    global.GULP_CONFIG.paths.templateSrc + '**/*.twig',
  ]);

  if (global.browsersync) {
    stream = stream.pipe(global.browsersync.reload({ stream: true, once: true }));
  }

  return stream;
};

module.exports.displayName = 'templates';
