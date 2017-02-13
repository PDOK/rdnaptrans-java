/**
 * Created by veerr on 13-2-2017.
 */

'use strict';

module.exports = (config) => {
  config.set({
    frameworks: ['mocha'],
    proxies: {
      '/resources/': '/base/test/browser/resources/'
    },
    files: [
      'test/browser/*Test.js',
      {
        pattern: 'test/browser/resources/rdnaptrans/*.grd',
        watched: false,
        included: false,
        served: true,
        nocache: false
      }
    ]
  });
};
