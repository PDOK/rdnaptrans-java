/**
 * Created by veerr on 13-2-2017.
 */

'use strict';

module.exports = {
  entry: {
    index: './index.js'
  },
  output: {
    path: './dist/',
    filename: '[name].js'
  },
  node: {
    fs: 'empty'
  }
};
