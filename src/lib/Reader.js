/**
 * Created by veerr on 25-1-2017.
 */

'use strict';

const binary = require('bops');

class Reader {
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
    const node = typeof window !== 'object';

    if (node) { // The browser has a window object, but Node.js does not
      /* eslint global-require: 0 */
      const fs = require('fs');
      this.read = function (filePath) {
        return new Promise((resolve, reject) => {
          fs.readFile(filePath, (err, buffer) => {
            if (err) return reject(err);
            return resolve(binary.from(buffer));
          });
        });
      };
    } else {
      this.read = function (filePath) {
        return new Promise((resolve, reject) => {
          try {
            const xhrReq = new XMLHttpRequest();
            xhrReq.open('GET', filePath);
            xhrReq.responseType = 'arraybuffer';
            xhrReq.send();
            xhrReq.onreadystatechange = () => {
              if (xhrReq.readyState === XMLHttpRequest.DONE && xhrReq.status === 200) {

                if (xhrReq.response === 'NOT FOUND') {
                  return reject(new Error(`Resource ${filePath} not found`));
                }

                const buffer = xhrReq.response;
                const dataview = new DataView(buffer);
                const ints = new Uint8Array(buffer.byteLength);

                for (let i = 0; i < ints.length; i++) {
                  ints[i] = dataview.getUint8(i);
                }
                return resolve(ints);
              }
            };
          } catch (err) {
            reject(err);
          }
        });
      };
    }
  }

  static readShort(buffer, offset) {
    return binary.readUInt16LE(buffer, offset);
  }

  static readDouble(buffer, offset) {
    return binary.readDoubleLE(buffer, offset);
  }
}

module.exports = Reader;
