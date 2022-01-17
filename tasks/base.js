const gulp = require('gulp');
const clean = require('./clean');
const templates = require('./templates');
const twig = require('./twig');
const scripts = require('./scripts');
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
    twig,
    scripts,
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
