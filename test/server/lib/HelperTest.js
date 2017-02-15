/**
 * Created by veerr on 10-2-2017.
 */
/* eslint-env mocha */

'use strict';

const Helpers = require('../../../src/lib/Helpers');
const Constants = require('../../../src/lib/Constants');
const Geographic = require('../../../src/lib/Geographic');
const Cartesian = require('../../../src/lib/Cartesian');

const constants = new Constants();

const chai = require('chai');

chai.should();

describe('Helpers', () => {
  it('creates a cartesian Bessel object from a geographic position at Amersfoort', () => {
    Helpers.geographic2cartesian(
      new Geographic(
        constants.PHI_AMERSFOORT_BESSEL,
        constants.LAMBDA_AMERSFOORT_BESSEL,
        constants.H_AMERSFOORT_BESSEL
      ),
      constants.A_BESSEL,
      constants.INV_F_BESSEL
    ).should.deep.equal({
      X: 3903453.1482176865,
      Y: 368135.3134488123,
      Z: 5012970.305092561
    });
  });

  it('creates a geographic object from a Bessel position at Amersfoort', () => {
    const hRounded = 1.352130064740777;
    // TODO: see if the deviation from the java implementation can be lessened
    Helpers.cartesian2geographic(
      new Cartesian(
        3818230.7732591243,
        322310.92566787155,
        5080844.876087745
      ),
      constants.A_BESSEL,
      constants.INV_F_BESSEL
    ).should.deep.equal({
      phi: 53.16185829046308,
      lambda: 4.825108807779475,
      h: hRounded
    });
  });
});
