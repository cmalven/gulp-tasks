const browsersync = require('browser-sync');

//
//   BrowserSync
//
//////////////////////////////////////////////////////////////////////

/*
Refreshes browser on file changes and syncs scroll/clicks between devices.
*/

module.exports = function(done) {
  if (typeof global.GULP_CONFIG.browsersync === 'undefined') return done();

  const options = {
    port: global.GULP_CONFIG.browsersync.port,
    open: false,
    ui: false,
  };

  if (global.GULP_CONFIG.browsersync.useProxy) {
    options.proxy = global.GULP_CONFIG.browsersync.proxyUrl;
  } else {
    options.server = {
      baseDir: global.GULP_CONFIG.browsersync.serverBaseDir,
    };
  }

  // Initialize BrowserSync
  global.browsersync = browsersync.create();
  global.browsersync.init(options, done);
};

module.exports.displayName = 'browsersync';
