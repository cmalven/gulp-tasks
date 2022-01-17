const gulp = require('gulp');
const twig = require('./twig');
const scripts = require('./scripts');
const styles = require('./styles');
const scriptsCopy = require('./scripts_copy');
const { revClear } = require('./rev');
const images = require('./images');
const svg = require('./svg');
const reload = require('./reload');

//
//   Watch
//
//////////////////////////////////////////////////////////////////////

/*
Runs tasks when files change
*/

module.exports = function(done) {
  // Styles
  gulp.watch([
    global.GULP_CONFIG.paths.styleSrc + '**/*.scss',
  ], gulp.series(styles, revClear));

  // Scripts
  gulp.watch([
    global.GULP_CONFIG.paths.scriptSrc + '**/*.js',
    global.GULP_CONFIG.paths.scriptSrc + '**/*.glsl',
  ], gulp.series(scripts, scriptsCopy, revClear));

  // Twig
  gulp.watch([
    global.GULP_CONFIG.paths.templateSrc + '**/*.twig',
  ], gulp.series(twig));

  // Images
  gulp.watch([
    global.GULP_CONFIG.paths.imageSrc + '**/*',
  ], gulp.series(images, svg, reload));

  done();
};

module.exports.displayName = 'watch';
