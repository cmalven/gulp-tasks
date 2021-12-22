# Gulp Tasks

> Common reusable tasks for Gulp.


## Install

```shell
npm i -D @malven/gulp-tasks
```


## Setup

You'll store your custom Gulp configuration in a `gulpfile.js` that looks something like this:

```js
const { series, parallel } = require('gulp');
const { images, svg } = require('@malven/gulp-tasks');

global.GULP_CONFIG = {
  paths: {
    dist: 'web/dist/',
    templateSrc: 'templates/',
    imageSrc: 'src/images/',
    imageDist: 'web/dist/images/',
  },
};

// Export tasks that you'd like to run directly
exports.images = images;
exports.svg = svg;

// Export default task
exports.default = series(
  parallel(
    images,
    svg,
  ),
  function(done) {
    done();
  },
);
```

The specific values required in `global.GULP_CONFIG` will depend on which tasks you're using.

### Task Configuration

```js
global.GULP_CONFIG = {
  paths: {
    // All tasks
    dist: 'web/dist/',
    
    // Images
    imageSrc: 'src/images/',
    imageDist: 'web/dist/images/',
    
    // SVG
    templateSrc: 'templates/',
    imageSrc: 'src/images/',
  }
}
```

## Use

Use Gulp the same way you normally would:

```shell
npx gulp

# or

npx gulp images
```