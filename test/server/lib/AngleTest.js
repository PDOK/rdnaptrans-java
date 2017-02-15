/**
 * Created by veerr on 8-2-2017.
 */

/* eslint-env mocha */

'use strict';

const Angle = require('../../../src/lib/Angle');
const chai = require('chai');

chai.should();

describe('Angle', () => {
  it('verifies the creation of an Angle instance', () => {
    const testAngle = new Angle(1, 12, 36);
    testAngle.should.deep.equal({
      Degrees: 1,
      Minutes: 12,
      Seconds: 36
    });
  });
});
