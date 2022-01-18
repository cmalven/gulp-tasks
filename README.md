# Gulp Tasks

> Common reusable tasks for Gulp.


## Install

```shell
npm i -D @malven/gulp-tasks
```


## Setup

You'll store your custom Gulp configuration in a `gulpfile.js` that looks something like this:

```js
const { defaultTask, build } = require('@malven/gulp-tasks');

global.GULP_CONFIG = {
  env: 'dev',

  paths: {
    dist: 'dist/',

    styleSrc: 'src/styles/',
    styleDist: 'dist/styles/',

    scriptSrc: 'src/scripts/',
    scriptDist: 'dist/scripts/',
    scriptPublic: '/scripts/',

    templateSrc: 'src/templates/',
    templateDist: 'dist/',

    imageSrc: 'src/images/',
    imageDist: 'dist/images/',

    styleCopyPaths: [],
    scriptCopyPaths: [],
    distCopyPaths: [],
  },

  browsersync: {
    port: 3500,
    useProxy: true,
    proxyUrl: 'http://my-site-url.test',
    serverBaseDir: 'dist/',
  },

  scripts: {
    entries: [
      'main',
    ],
  },

  styles: {
    entries: [
      'main',
    ],
  },

  twig: {
    enable: false,
  },
};

module.exports = {
  default: defaultTask,
  build,
};

```

The specific values required in `global.GULP_CONFIG` will depend on which tasks you're using.

## Use

Use Gulp the same way you normally would:

```shell
npx gulp

# or

npx gulp images
```