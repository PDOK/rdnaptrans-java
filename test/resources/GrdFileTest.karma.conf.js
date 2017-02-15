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
      '../*Test.js',
      {
        pattern: './resources/rdnaptrans/*.grd',
        watched: false,
        included: false,
        served: true,
        nocache: false
      }
    ]
  });
};
