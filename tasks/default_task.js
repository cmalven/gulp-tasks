const gulp = require('gulp');
const base = require('./base');
const watch = require('./watch');
const browsersync = require('./browsersync');
const images = require('./images');
const svg = require('./svg');

//
//   Default
//
//////////////////////////////////////////////////////////////////////

/*
The default task during development
*/

module.exports = gulp.series(
  base,
  gulp.parallel(
    images,
    svg,
  ),
  browsersync,
  watch,
);

module.exports.displayName = 'default';