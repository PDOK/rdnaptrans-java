/**
 * Created by veerr on 13-2-2017.
 */

'use strict';

module.exports = {
  entry: [
    'babel-polyfill',
    './index.js',
    './test/server/indexTest.js',
    './test/server/lib/GrdFileTest.js'
  ],
  output: {
    path: './test/browser/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0']
        }
      }
    ]
  },
  node: {
    fs: 'empty'
  }
};
