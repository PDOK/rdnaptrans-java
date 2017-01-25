/**
 * Created by veerr on 25-1-2017.
 */

'use strict';

let reader;

/**
 * The reader object is created as a polymorphic Promise,
 * able to read either from a local file system (Node.js)
 * or from a location served over http (browser). This
 * allows the rdnaptrans module to be used in either environment,
 * as it requires the grid files under ./resources to be
 * available.
 */
if (typeof XMLHttpRequest !== 'function') {
  /* eslint global-require: 0 */
  const fs = require('fs');
  reader = function (filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      });
    });
  };
} else if (typeof fetch !== 'function') {
  const fetch = require('fetch');
  reader = fetch;
} else {
  reader = fetch;
}

module.exports = reader;
