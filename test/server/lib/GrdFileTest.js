/**
 * Created by veerr on 8-2-2017.
 */
/* eslint-env mocha */

'use strict';

const path = require('path');
const GrdFile = require('../../src/lib/GrdFile');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

describe('GrdFile', () => {
  it('rejects a file that is not a valid grid file', () => {
    const grdFile = new GrdFile(path.join(__dirname, '/resources/nogrid.txt'));
    return grdFile.should.be.rejectedWith(Error, 'not a valid grd file');
  });

  it('reads the x offset grid file header', () => {
    const grdFile = new GrdFile(path.join(__dirname, '/../../src/resources/rdnaptrans/x2c.grd'));
    return grdFile.then(data => data.header.should.deep.equal({
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
    }));
  });
});
