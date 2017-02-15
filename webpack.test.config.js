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
  node: {
    fs: 'empty'
  }
};
