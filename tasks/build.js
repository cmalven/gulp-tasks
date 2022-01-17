const gulp = require('gulp');
const { rev, revClear } = require('./rev');
const base = require('./base');
const images = require('./images');
const svg = require('./svg');

//
//   Build
//
//////////////////////////////////////////////////////////////////////

/*
Base tasks + tasks that should be run on production
*/

module.exports = gulp.series(
  base,
  images,
  svg,
  revClear,
  rev,
  function(done) {
    done();
  },
);

module.exports.displayName = 'build';
