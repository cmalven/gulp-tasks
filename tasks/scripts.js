const path = require('path');
const webpack = require('webpack');
const util = require('util');
const UglifyJsPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
require('core-js/stable');

//
//   Scripts : Bundle
//
//////////////////////////////////////////////////////////////////////

/*
Bundles javascript files.
*/

module.exports = function(done) {
  const DEV = 'development';
  const ENV = process.env.NODE_ENV ? process.env.NODE_ENV : DEV;

  //---------------------------------------------------------------
  // Plugins
  //---------------------------------------------------------------
  let plugins = [

  ];

  // Bundle analyzer if requested
  if (process.env.ANALYZE_BUNDLE === 'true') {
    plugins = plugins.concat([
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }),
    ]);
  }


  //---------------------------------------------------------------
  // Config
  //---------------------------------------------------------------

  const webpackConfig = {
    mode: ENV,

    entry: global.GULP_CONFIG.scripts.entryFiles.reduce(function(result, name) {
      result[name] = path.resolve('./' + global.GULP_CONFIG.paths.scriptSrc + name);
      return result;
    }, {}),

    output: {
      path: path.resolve('./' + global.GULP_CONFIG.paths.scriptDist),
      filename: '[name].bundle.js',
      publicPath: global.GULP_CONFIG.paths.scriptPublic,
      chunkFilename: '[name].[contenthash].bundle.js',
    },

    resolve: {
      modules: [
        path.resolve('./node_modules'),
        path.resolve('./' + global.GULP_CONFIG.paths.scriptSrc + 'vendor'),
      ],
    },

    devtool: ENV === DEV ? 'eval-cheap-source-map': false,

    module: {
      rules: [
        {
          test: /\.(glsl|frag|vert)$/,
          exclude: /node_modules/,
          use: [
            'raw-loader',
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },

    optimization: {
      minimizer: ENV === DEV
        ? []
        : [new UglifyJsPlugin()],
      splitChunks: {
        cacheGroups: {
          default: false,
          defaultVendors: false,
        },
      },
    },

    plugins: plugins,
  };


  //---------------------------------------------------------------
  // Webpack
  //---------------------------------------------------------------

  webpack(webpackConfig, function(err, stats) {
    console.log(err);
    if (err) throw new util.PluginError('webpack', err);

    if (global.browsersync) global.browsersync.reload({ once: true });

    // Stats
    const log = function(stats) {
      util.log('[webpack]', stats.toString({
        chunks: false,
        colors: true,
        version: false,
        hash: false,
        maxModules: 0,
        modulesSort: '!size',
      }));
    };
    log(stats);

    done();
  });
};

module.exports.displayName = 'scripts';
