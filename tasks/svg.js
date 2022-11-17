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

const defaultSVGO = (overrides = {}) => {
  return [
    {
      name: 'preset-default',
      params: {
        overrides: Object.assign({}, {
          cleanupIDs: false,
          collapseGroups: false,
          mergePaths: false,
          moveElemsAttrsToGroup: false,
          moveGroupAttrsToElems: false,
          removeUselessStrokeAndFill: false,
          removeViewBox: false,
        }, overrides),
      },
    },
  ]
}

const renameSvg = (name) => {
  return name.replace('.svg', '');
}

function clean() {
  return del([
    global.GULP_CONFIG.paths.imageDist + 'svg/',
    global.GULP_CONFIG.paths.templateSrc + '_svg/'
  ]);
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
          generator: renameSvg,
        },
        transform: [
          { svgo: {
            plugins: defaultSVGO(
              { convertColors: { currentColor: true } }
            ).concat([
              { name: 'removeAttrs', params: { attrs: '(opacity)' } },
            ]),
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
          generator: renameSvg,
        },
        transform: [
          { svgo: {
            plugins: defaultSVGO().concat([]),
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
            plugins: defaultSVGO().concat([]),
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

function copy() {
  return gulp.src([
    global.GULP_CONFIG.paths.imageSrc + 'svg/**/*.svg',
  ])
    .pipe(svgSprite({
      shape: {
        dest: global.GULP_CONFIG.paths.imageDist + 'svg/',
        id: {
          generator: renameSvg,
        },
        transform: [{
          svgo: {
            plugins: defaultSVGO().concat([]),
          }
        }],
      },
    }))
    .pipe(gulp.dest('./'));
}

module.exports = gulp.series(
  clean,
  gulp.parallel(
    icon,
    full,
    inline,
    copy,
  ),
  function(done) {
    done();
  },
);

module.exports.displayName = 'svg';
