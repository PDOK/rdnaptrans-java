/**
 * Created by veerr on 13-2-2017.
 */

'use strict';

const webpack = require('webpack');

console.log(__dirname);
module.exports = {
  entry: {
    index: './index.js',
    mainTest: './test/server/indexTest.js',
    GrdFileTest: './test/server/lib/GrdFileTest.js'
  },
  output: {
    path: './dist/',
    filename: '[name].js'
  },
  node: {
    fs: 'empty'
  }
};
