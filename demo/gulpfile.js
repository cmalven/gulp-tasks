require('dotenv').config();
const { defaultTask, build } = require('@malven/gulp-tasks');

//
//   Config
//
//////////////////////////////////////////////////////////////////////

global.GULP_CONFIG = {
  env: process.env.NODE_ENV === 'production' ? 'production' : 'dev',

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

    styleCopyPaths: [

    ],

    scriptCopyPaths: [
      'vendor',
    ],

    distCopyPaths: [
      'src/templates/web/',
    ],
  },

  browsersync: {
    port: 3030,
    useProxy: false,
    proxyUrl: process.env.BROWSERSYNC_PROXY_URL || process.env.SITE_URL || undefined,
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
    enable: true,
  },
};

// Export tasks
module.exports = {
  default: defaultTask,
  build,
};

