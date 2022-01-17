const gulp = require('gulp');
const sassGlob = require('gulp-sass-glob');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const importCss = require('postcss-import');
const cssnano = require('cssnano');

//
//   Styles
//
//////////////////////////////////////////////////////////////////////

/*
Preprocesses stylesheets using Sass + PostCSS.
*/

module.exports = function() {
  const postCssProcessors = [
    importCss(),
    autoprefixer(),
    cssnano(),
  ];

  let stream = gulp.src(global.GULP_CONFIG.styles.entries.map(file => {
    return global.GULP_CONFIG.paths.styleSrc + file + '.scss';
  }))
    .pipe(sassGlob())
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: ['./node_modules'],
    }).on('error', function(error) {
      sass.logError.call(this, error);
    }))
    .pipe(postcss(postCssProcessors, {}))
    .pipe(gulp.dest(global.GULP_CONFIG.paths.styleDist));

  if (global.browsersync) {
    stream = stream.pipe(global.browsersync.stream());
  }

  return stream;
};

module.exports.displayName = 'styles';
