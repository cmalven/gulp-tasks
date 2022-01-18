const gulp = require('gulp');
const base = require('./base');
const watch = require('./watch');
const browsersync = require('./browsersync');
const images = require('./images');
const svg = require('./svg');
const reload = require('./reload');

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
    watch,
    browsersync,
    images,
    svg,
  ),
  reload,
  function(done) {
    done();
  },
);

module.exports.displayName = 'default';