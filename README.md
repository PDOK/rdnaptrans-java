# rdnaptrans.js
[![Build Status](https://travis-ci.org/reinvantveer/rdnaptrans.js.svg?branch=master)](https://travis-ci.org/reinvantveer/rdnaptrans.js)

JavaScript implementation of RDNAPTRANS&trade;
https://www.kadaster.nl/web/Themas/Registraties/Rijksdriehoeksmeting/Transformatie-van-coordinaten.htm

Compatible with Node.js back end and browser front end.

# Install:
## Node.js
* clone the repo
* run `npm install`

## Browser
As under the Node.js install section

# Usage:
Due to the rather youthful nature of the port, the implementation is still very close to the original Java version. Therefore, you need a few helping classes to convert from RD or ETRS89:

```js
const Transform = require('../index').Transform;
const Geographic = require('../index').Geographic;
const Cartesian = require('../index').Cartesian;

const texelRD = new Cartesian(117380.1200, 575040.3400, 1.0000);
Transform.rdnap2etrs(texelRD)
  .then(texelETRS => console.log(texelETRS));
/* output:
Geographic {
  phi: 53.16075304177141,
  lambda: 4.824761912426986,
  h: 42.86140355819888 }
 */
```

The `phi`, `lambda` and `h` stuff in the returned Geographic object correspond with latitude, longitude and height. 

The JS implementation deviates in the respect of its asynchronous nature. This is due to the loading of the grid files needed for the final correction of the coordinates.