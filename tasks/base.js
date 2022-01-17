const gulp = require('gulp');
const clean = require('./clean');
const templates = require('./templates');
const twig = require('./twig');
const scripts = require('./scripts');
const styles = require('./styles');
const copy = require('./copy');
const stylesCopy = require('./styles_copy');
const scriptsCopy = require('./scripts_copy');
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
    styles,
    stylesCopy,
    scriptsCopy,
    copy,
  ),
  function(done) {
    done();
  },
);

module.exports.displayName = 'base';
