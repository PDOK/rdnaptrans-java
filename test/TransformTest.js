/**
 * Created by veerr on 25-1-2017.
 */
/* eslint-env mocha */

'use strict';

const Transform = require('../src/Transform');
const Geographic = require('../src/lib/Geographic');
const Cartesian = require('../src/lib/Cartesian');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

const places = [
  ['Texel', new Geographic(53.160753042, 4.824761912, 42.8614), new Cartesian(117380.1200, 575040.3400, 1.0000)],
  ['Noord-Groningen', new Geographic(53.419482050, 6.776726674, 42.3586), new Cartesian(247380.5600, 604580.7800, 2.0000)],
  ['Amersfoort', new Geographic(52.155172897, 5.387203657, 43.2551), new Cartesian(155000.0000, 463000.0000, 0.0000)],
  ['Amersfoort 100m', new Geographic(52.155172910, 5.387203658, 143.2551), new Cartesian(155000.0000, 463000.0000, 100.0000)],
  ['Zeeuws-Vlaanderen', new Geographic(51.368607152, 3.397588595, 47.4024), new Cartesian(16460.9100, 377380.2300, 3.0000)],
  ['Zuid-Limburg', new Geographic(50.792584916, 5.773795548, 245.9478), new Cartesian(182260.4500, 311480.6700, 200.0000)],
  ['Maasvlakte', new Geographic(51.947393898, 4.072887101, 47.5968), new Cartesian(64640.8900, 440700.0101, 4.0000)],
  ['outside', new Geographic(48.843030210, 8.723260235, 52.0289), new Cartesian(400000.2300, 100000.4500, 5.0000)],
  ['no_rd&geoid', new Geographic(50.687420392, 4.608971813, 51.6108), new Cartesian(100000.6700, 300000.8900, 6.0000)],
  ['no_geoid', new Geographic(51.136825197, 4.601375361, 50.9672), new Cartesian(100000.6700, 350000.8900, 6.0000)],
  ['no_rd', new Geographic(52.482440839, 4.268403889, 49.9436), new Cartesian(79000.0100, 500000.2300, 7.0000)],
  ['edge_rd', new Geographic(51.003976532, 3.891247830, 52.7427), new Cartesian(50000.4500, 335999.6700, 8.0000)]
];

describe('Transform', () => {
  describe('checks transformations from ETRS 89 to RD', () => places
    .forEach(place =>
      it(`tests ${place[0]}`, () => Transform.etrs2rdnap(place[1])
        .then((transformed) => {
          const actualToFixed = {
            X: parseFloat(transformed.X.toFixed(4)),
            Y: parseFloat(transformed.Y.toFixed(4)),
            Z: parseFloat(transformed.Z.toFixed(4))
          };

          return actualToFixed.should.deep.equal(place[2]);
        })
        .catch((err) => { throw err; })
      )
    )
  );

  describe('checks transformations from RD to ETRS 89', () => places
    .forEach(place =>
      it(`tests ${place[0]}`, () => Transform.rdnap2etrs(place[2])
        .then((transformed) => {
          const actualToFixed = {
            phi: parseFloat(transformed.phi.toFixed(9)),
            lambda: parseFloat(transformed.lambda.toFixed(9)),
            h: parseFloat(transformed.h.toFixed(4))
          };

          return actualToFixed.should.deep.equal(place[1]);
        })
        .catch((err) => { throw err; })
      )
    )
  );
});
