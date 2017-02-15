/**
 * Created by veerr on 13-2-2017.
 */
const Transform = require('../../index').Transform;
const Geographic = require('../../index').Geographic;
const Cartesian = require('../../index').Cartesian;

const texelRD = new Cartesian(117380.1200, 575040.3400, 1.0000);
Transform.rdnap2etrs(texelRD)
  .then(texelETRS => console.log(texelETRS));
