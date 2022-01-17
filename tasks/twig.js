const gulp = require('gulp');
const twig = require('gulp-twig');
const twigMarkdown = require('twig-markdown');
const htmlmin = require('gulp-htmlmin');

//
//   Twig
//
//////////////////////////////////////////////////////////////////////

/*
Compiles templates using twig
*/

module.exports = function(done) {
  function swallowError(error) {
    console.log(error.toString()); // eslint-disable-line
    this.emit('end');
  }

  if (!global.GULP_CONFIG.twig?.enable ?? true) return done();

  let stream = gulp.src([
    global.GULP_CONFIG.paths.templateSrc + '**/[^_]*.twig',
    '!' + global.GULP_CONFIG.paths.templateSrc + '**/_*/[^_]*.twig',
    '!' + global.GULP_CONFIG.paths.templateSrc + '**/_*/**/[^_]*.twig',
  ])
    .pipe(twig({
      base: global.GULP_CONFIG.paths.templateSrc,
      data: {
        env: global.GULP_CONFIG.env,
        // Anything defined in `content` will be available in Twig at `{{ content.foo }}`
        // You can also define additional keys that will be available in Twig.
        // For instance, `siteName: 'My Site'` would be available at `{{ siteName }}`
        content: {},
      },
      extend: (Twig) => {
        // Add Markdown support
        twigMarkdown(Twig);
      },
    }))
    .on('error', swallowError)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(global.GULP_CONFIG.paths.templateDist));

  if (global.browsersync) {
    stream = stream.pipe(global.browsersync.reload({ stream: true, once: true }));
  }

  return stream;
};

module.exports.displayName = 'twig';
