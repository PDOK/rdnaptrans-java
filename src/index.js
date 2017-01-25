'use strict';

const reader = require('./lib/reader');

reader('./resources/rdnaptrans/nlgeo04.grd')
  .then(grid => {
    console.log('got grid');
  })
  .catch(console.error);