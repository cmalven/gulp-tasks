const path = require('path');
const webpack = require('webpack');
const util = require('util');
const UglifyJsPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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

    entry: global.GULP_CONFIG.scripts.entries.reduce(function(result, name) {
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
      alias: {},
      extensions: ['.js'],
    },

    resolveLoader: {
      modules: [
        __dirname + '/../node_modules',
        path.resolve('./node_modules'),
      ],
    },

    devtool: ENV === DEV ? 'eval-cheap-source-map': false,

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(glsl|frag|vert)$/,
          exclude: /node_modules/,
          use: ['raw-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          loader: 'swc-loader',
        },
      ].concat(global.GULP_CONFIG.scripts.webpack?.rules ?? []),
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


  // ---------------------------------------------------------------
  // Modify Config
  // ---------------------------------------------------------------

  /*
  The entire webpack config can be customized by setting a function
  on `global.GULP_CONFIG.scripts.webpack` that receives the webpack
  config and returns the modified config.
  */

  const modifyConfig = global.GULP_CONFIG.scripts.webpack || function(config) {
    return config;
  };


  // ---------------------------------------------------------------
  // Webpack
  // ---------------------------------------------------------------

  webpack(modifyConfig(webpackConfig), function(err, stats) {
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
