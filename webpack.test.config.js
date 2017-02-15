/**
 * Created by veerr on 13-2-2017.
 */

'use strict';

module.exports = {
  entry: {
    index: './index.js',
    mainTest: './test/server/indexTest.js',
    GrdFileTest: './test/server/lib/GrdFileTest.js'
  },
  output: {
    path: './test/browser/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  node: {
    fs: 'empty'
  }
};
