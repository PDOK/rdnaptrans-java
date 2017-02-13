/**
 * Created by veerr on 8-2-2017.
 */

/* eslint-env mocha */

'use strict';

const path = require('path');
const Reader = require('../../src/lib/Reader');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

describe('Reader', () => {
  it('reads a the first characters of a grid file', () => {
    const reader = new Reader();
    return reader.read(path.join(__dirname, '/../../src/resources/rdnaptrans/x2c.grd'))
      .then((gridBuffer) => {
        Buffer.isBuffer(gridBuffer).should.equal(true);
        return gridBuffer.slice(0, 4).toString().should.equal('DSBB');
      });
  });

  it('reads a file as a buffer', () => {
    const reader = new Reader();
    return reader.read(path.join(__dirname, '/../../src/resources/rdnaptrans/x2c.grd'))
      .then((gridBuffer) => {
        Buffer.isBuffer(gridBuffer).should.equal(true);
        const cols = gridBuffer.readUInt16LE(4);
        const rows = gridBuffer.readUInt16LE(6);
        cols.should.equal(310);
        return rows.should.equal(343);
      });
  });

});
