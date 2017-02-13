/**
 * Created by veerr on 13-2-2017.
 */
module.exports = {
  entry: {
    mainTest: './test/server/indexTest.js'
  },
  output: {
    path: './test/browser/',
    filename: '[name].js'
  }
};
