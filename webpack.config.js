/**
 * Created by veerr on 13-2-2017.
 */

'use strict';

const webpack = require('webpack');

console.log(__dirname);
module.exports = {
  entry: {
    mainTest: './test/server/indexTest.js'
  },
  output: {
    path: './test/browser/',
    filename: '[name].js'
  },
  node: {
    fs: 'empty'
  }
};
