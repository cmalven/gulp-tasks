const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite');
const del = require('del');

//
//   SVG
//
//////////////////////////////////////////////////////////////////////

/*
Lossless optimization of svg files
*/

const defaultSVGO = [
  { cleanupIDs: false },
  { collapseGroups: false },
  { mergePaths: false },
  { moveElemsAttrsToGroup: false },
  { moveGroupAttrsToElems: false },
  { removeUselessStrokeAndFill: false },
  { removeViewBox: false },
];

function clean() {
  return del(global.GULP_CONFIG.paths.templateSrc + '_svg/');
}

function icon() {
  return gulp.src([
    global.GULP_CONFIG.paths.imageSrc + 'svg/icon/**/*.svg',
  ])
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: 'icon.symbol.svg',
        },
        inline: true,
      },
      shape: {
        id: {
          generator: function(name) {
            return name.replace('.svg', '');
          },
        },
        transform: [
          { svgo: {
            plugins: [
              { removeAttrs: { attrs: ['opacity'] } },
              { convertColors: { currentColor: true } },
            ].concat(defaultSVGO),
          } },
        ],
      },
    }))
    .pipe(gulp.dest(global.GULP_CONFIG.paths.templateSrc + '_svg/'));
}

function full() {
  return gulp.src([
    global.GULP_CONFIG.paths.imageSrc + 'svg/full/**/*.svg',
  ])
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: 'full.symbol.svg',
        },
        inline: true,
      },
      shape: {
        id: {
          generator: function(name) {
            return name.replace('.svg', '');
          },
        },
        transform: [
          { svgo: {
            plugins: [].concat(defaultSVGO),
          } },
        ],
      },
    }))
    .pipe(gulp.dest(global.GULP_CONFIG.paths.templateSrc + '_svg/'));
}

function inline() {
  return gulp.src([
    global.GULP_CONFIG.paths.imageSrc + 'svg/inline/**/*.svg',
  ])
    .pipe(svgSprite({
      shape: {
        dest: 'inline',
        transform: [
          { svgo: {
            plugins: [].concat(defaultSVGO),
          } },
        ],
      },
      // Comment out if you'd like to avoid possible ID collisions
      svg: {
        namespaceIDs: false,
      },
    }))
    .pipe(gulp.dest(global.GULP_CONFIG.paths.templateSrc + '_svg/'));
}

module.exports = gulp.series(
  clean,
  gulp.parallel(
    icon,
    full,
    inline,
  ),
  function(done) {
    done();
  },
);
