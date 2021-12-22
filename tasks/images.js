const gulp = require('gulp');
const squoosh = require('gulp-libsquoosh');

//
//   Images
//
//////////////////////////////////////////////////////////////////////

/*
Lossless optimization of image files
*/

module.exports = function() {
  return gulp.src([
    global.GULP_CONFIG.paths.imageSrc + '**/*.jpg',
    global.GULP_CONFIG.paths.imageSrc + '**/*.png',
    global.GULP_CONFIG.paths.imageSrc + '**/*.gif',
  ])
    .pipe(squoosh())
    .pipe(gulp.dest(global.GULP_CONFIG.paths.imageDist));
};
