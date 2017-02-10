/**
 * Created by veerr on 8-2-2017.
 */

/* eslint-env mocha */

'use strict';

const Cartesian = require('../../src/lib/Cartesian');
const chai = require('chai');

chai.should();

describe('Cartesian', () => {
  it('verifies the creation of a 3D Cartesian instance', () => {
    const testCartesian = new Cartesian(1, 12, 36);
    testCartesian.should.deep.equal({
      X: 1,
      Y: 12,
      Z: 36
    });
  });

  it('creates a 3D Cartesian instance', () => {
    const testCartesian = new Cartesian(1, 12);
    testCartesian.should.deep.equal({
      X: 1,
      Y: 12,
      Z: 0
    });
  });

  it('extends a 2D Cartesian instance to 3D', () => {
    const testCartesian = new Cartesian(1, 12)
      .withZ(36);
    testCartesian.should.deep.equal({
      X: 1,
      Y: 12,
      Z: 36
    });
  });
});
