const gulp = require('gulp');
const sharp = require('sharp');
const through2 = require('through2');
const buffer = require('vinyl-buffer');

//
//   Images
//
//////////////////////////////////////////////////////////////////////

/*
Optimization of image files with Sharp
*/

module.exports = function() {
  return gulp.src([
    global.GULP_CONFIG.paths.imageSrc + '**/*.jpg',
    global.GULP_CONFIG.paths.imageSrc + '**/*.png',
    // Sharp does not support GIF images, omitting them from here.
  ])
    .pipe(buffer())
    .pipe(through2.obj(async function (file, _, cb) {
      if (!file.isBuffer()) {
        return cb(null, file);
      }

      try {
          file.contents = await sharp(file.contents)
            .resize({
                width: 3000,
                withoutEnlargement: true
            })  // Adjust as needed
            .jpeg({
                quality: 70,
            })
            .png({
                quality: 70,
            })
            .toBuffer();
        cb(null, file);
      } catch (err) {
        cb(new gutil.PluginError('Sharp error:', err));
      }
    }))
    .pipe(gulp.dest(global.GULP_CONFIG.paths.imageDist));
};

module.exports.displayName = 'images';