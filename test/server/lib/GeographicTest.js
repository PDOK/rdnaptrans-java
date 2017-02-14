/**
 * Created by veerr on 8-2-2017.
 */

/* eslint-env mocha */

'use strict';

const Geographic = require('../../../src/lib/Geographic');
const chai = require('chai');

chai.should();

describe('Geographic', () => {
  it('verifies the creation of a 3D Cartesian instance', () => {
    const testGeographic = new Geographic(1, 12, 36);
    testGeographic.should.deep.equal({
      phi: 1,
      lambda: 12,
      h: 36
    });
  });

  it('creates a 3D Cartesian instance from a null h', () => {
    const testGeographic = new Geographic(1, 12);
    testGeographic.should.deep.equal({
      phi: 1,
      lambda: 12,
      h: 0
    });
  });
});
