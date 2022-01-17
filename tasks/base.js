const gulp = require('gulp');
const clean = require('./clean');

//
//   Base
//
//////////////////////////////////////////////////////////////////////

/*
The baseline tasks to get things going.
*/

module.exports = gulp.series(
  clean,
  // 'rev:clear',
  // gulp.parallel(
  // 'templates',
  // 'twig',
  // 'scripts:bundle',
  // 'styles',
  // 'styles:copy',
  // 'styles:lint',
  // 'scripts:copy',
  // 'copy',
  // ),
  function(done) {
    done();
  },
);

module.exports.displayName = 'base';
