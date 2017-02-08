/**
 * Created by veerr on 8-2-2017.
 */
/* eslint-env mocha */

'use strict';

const path = require('path');
const GrdFile = require('../../lib/GrdFile');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

describe('GrdFile', () => {
  it('rejects a file that is not a valid grid file', () => {
    const grdFile = new GrdFile(path.join(__dirname, '/resources/nogrid.txt'));
    return grdFile.should.be.rejectedWith(Error, 'not a valid grd file');
  });

  it('reads a grid file', () => {
    const grdFile = new GrdFile(path.join(__dirname, '/../../resources/rdnaptrans/x2c.grd'));
    return grdFile.then(data => data.header.should.equal('blah'));
  });
});
