/**
 * Created by veerr on 13-2-2017.
 */

'use strict';

module.exports = (config) => {
  config.set({
    frameworks: ['mocha'],
    proxies: {
      '/test/resources/': '/base/test/resources/',
      '/resources/rdnaptrans/': '/base/test/resources/rdnaptrans/'
    },
    files: [
      'test/browser/*.js',
      {
        pattern: 'test/resources/nogrid.txt',
        watched: false,
        included: false,
        served: true,
        nocache: false
      },
      {
        pattern: 'test/resources/rdnaptrans/*',
        watched: false,
        included: false,
        served: true,
        nocache: false
      }
    ]
  });
};
