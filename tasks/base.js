const gulp = require('gulp');
const clean = require('./clean');
const templates = require('./templates');
const { revClear } = require('./rev');

//
//   Base
//
//////////////////////////////////////////////////////////////////////

/*
The baseline tasks to get things going.
*/

module.exports = gulp.series(
  clean,
  revClear,
  gulp.parallel(
    templates,
  // 'twig',
  // 'scripts:bundle',
  // 'styles',
  // 'styles:copy',
  // 'styles:lint',
  // 'scripts:copy',
  // 'copy',
  ),
  function(done) {
    done();
  },
);

module.exports.displayName = 'base';
