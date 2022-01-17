const gulp = require('gulp');
const del = require('del');
const gulpRev = require('gulp-rev');
const replace = require('gulp-replace');

//
//   Rev
//
//////////////////////////////////////////////////////////////////////

/*
Adds revision hash to assets and stores hashes in a manifest file
*/

const rev = function() {
  return gulp.src([
    global.GULP_CONFIG.paths.styleDist + '**/*.css',
    global.GULP_CONFIG.paths.scriptDist + '**/*.js',
  ], { base: './' })
    .pipe(gulpRev())
    .pipe(gulp.dest('.'))
    .pipe(gulpRev.manifest())
    .pipe(replace(global.GULP_CONFIG.paths.dist, ''))
    .pipe(gulp.dest(global.GULP_CONFIG.paths.dist));
};
rev.displayName = 'rev';

const revClear = function() {
  return del([global.GULP_CONFIG.paths.dist + 'rev-manifest.json']);
};
revClear.displayName = 'rev:clear';

module.exports = {
  rev,
  revClear,
};
