var path = require('path');
var webpack = require('webpack');

module.exports = function(config) {
  config.set({

    files: [
      // all files ending in "test"
      'test/**/*.spec.js'
      // each file acts as entry point for the webpack configuration
    ],

    // frameworks to use
    frameworks: ['mocha', 'expect'],

    preprocessors: {
      // only specify one entry point
      // and require all tests in there
      'test/**/*.spec.js': ['webpack']
    },

    // reporters: ['spec'],

    webpack: {
      // webpack configuration
      module: {
          loaders: [
              {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel?presets[]=es2015'
              },
              {
                test: /\.js$/,
                include: /node_modules\/framework-concept/,
                loader: 'babel?presets[]=es2015'
              },
              {
                test: /\.js$/,
                include: /node_modules\/PatchIt/,
                loader: 'babel?presets[]=es2015'
              },
              {
                  test: /\.html$/,
                  loader: 'html',
                  exclude: /node_modules/
              }
          ]
      },
      resolve: {
        root: path.resolve(__dirname),
        extensions: ['', '.js', '.html'],
        alias: {
          flight: 'node_modules/framework-concept/flight',
          PatchIt: 'node_modules/PatchIt',
          components: 'src/components',
          domain: 'src/domain',
          events: 'src/events',
          namespace: 'src/namespace',
          repositories: 'src/repositories',
        }
      }
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      noInfo: true
    },

    customLaunchers: {
      chrome_without_security: {
        base: 'Chrome',
        flags: ['--disable-web-security']
      },
      sauce_chrome_win: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'windows'
      }
    },

    plugins: [
        require("karma-chrome-launcher"),
        require("karma-webpack"),
        require("karma-mocha"),
        require("karma-expect"),
    ],

    browsers: ['Chrome']
  });
};
