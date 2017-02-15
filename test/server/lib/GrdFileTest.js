/**
 * Created by veerr on 8-2-2017.
 */
/* eslint-env mocha */

'use strict';

const fs = require('fs');
const path = require('path');
const GrdFile = require('../../../src/lib/GrdFile');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

describe('GrdFile', () => {
  it('rejects a file that is not a valid grid file', () => {
    const grdFile = new GrdFile('./test/resources/nogrid.txt');
    return grdFile.should.be.rejectedWith(Error, 'not a valid grd file');
  });

/*
  it('reads from XHR as from fs.readfile', () => {
    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    const filePath = './test/resources/rdnaptrans/nlgeo04.grd';
    const expected = fs.readFileSync(filePath);

    const xhrReq = new XMLHttpRequest();
    xhrReq.open('GET', filePath, false);
    // xhrReq.responseType = 'arraybuffer';
    xhrReq.send();

    expected.should.deep.equal(xhrReq.response);
  });
*/

  it('reads the x offset grid file header', () => {
    const grdFile = new GrdFile('./test/resources/rdnaptrans/x2c.grd');
    return grdFile.then(data => {
      console.log(data.header);
      return data.header.should.deep.equal({
        sizeX: 310,
        sizeY: 343,
        minX: -8000.0,
        maxX: 301000.0,
        minY: 288000.0,
        maxY: 630000.0,
        minValue: -0.17173554003238678,
        maxValue: 0.22832782566547394,
        stepSizeX: 1000.0,
        stepSizeY: 1000.0,
        safeMinX: -7000.0,
        safeMaxX: 300000.0,
        safeMinY: 289000.0,
        safeMaxY: 629000.0
      })
    });
  });
});
