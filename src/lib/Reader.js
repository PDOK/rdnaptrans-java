/**
 * Created by veerr on 25-1-2017.
 */

'use strict';

class reader {
  /**
   * Constructor
   * The read() function on the reader class is instantiated as a polymorphic Promise,
   * able to read either from a local file system (Node.js)
   * or from a location served over http (browser). This
   * allows the rdnaptrans module to be used in either environment,
   * as it requires the grid files under ./resources to be
   * available.
   * @param src a file or url path string
   */
  constructor() {
    if (typeof window !== 'object') { // The browser has a window object, but Node.js does not
      /* eslint global-require: 0 */
      const fs = require('fs');
      this.read = function (filePath) {
        return new Promise((resolve, reject) => {
          fs.readFile(filePath, (err, buffer) => {
            if (err) return reject(err);
            return resolve(buffer);
          });
        });
      };
    } else {
      this.read = function (filePath) {
        return new Promise((resolve, reject) => {
          const xhrReq = new XMLHttpRequest();
          xhrReq.open('GET', filePath, false);
          // xhrReq.responseType = 'arraybuffer';
          xhrReq.send();
          console.log(JSON.stringify(xhrReq.response));
          return resolve(xhrReq.response);
        });
      };
    }
  }
}

module.exports = reader;
