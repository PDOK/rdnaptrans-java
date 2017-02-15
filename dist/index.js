/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by veerr on 25-1-2017.
 */



class Constants {
  /**
   **--------------------------------------------------------------
   **    Static data declarations
   **    Mathematical constant pi = 3.14...
   **--------------------------------------------------------------
   */
  constructor() {
    // this.PI = Math.PI;
    /**
     ** --------------------------------------------------------------
     **    Continuation of static data declarations
     **    Geographic NL-Bessel coordinates of Amersfoort (pivot point and projection base point)
     **        phi     latitude in decimal degrees
     **        lambda  longitude in decimal degrees
     **        h       ellipsoidal height in meters
     **    Source of constants:
     **        Hk.J. Heuvelink, "De stereografische kaartprojectie in
     **        hare toepassing bij de Rijksdriehoeksmeting".
     **        Delft: Rijkscommissie voor Graadmeting en Waterpassing, 1918.
     **        HTW, "Handleiding voor de Technische Werkzaamheden van het Kadaster".
     **        Apeldoorn: Kadaster, 1996.
     **--------------------------------------------------------------
     */
    this.PHI_AMERSFOORT_BESSEL = 52.0 + (9.0 / 60.0) + (22.178 / 3600.0);
    this.LAMBDA_AMERSFOORT_BESSEL = 5.0 + (23.0 / 60.0) + (15.500 / 3600.0);
    this.H_AMERSFOORT_BESSEL = 0.0;
    /**
     **--------------------------------------------------------------
     **    Continuation of static data declarations
     **    Parameters of ellipsoids Bessel1841 and GRS80
     **        a      half major axis in meters
     **        inv_f  inverse flattening
     **    Source of constants: HTW, "Handleiding voor de Technische
      *  Werkzaamheden van het Kadaster". Apeldoorn: Kadaster, 1996.
     **--------------------------------------------------------------
     */

    this.A_BESSEL = 6377397.155;
    this.INV_F_BESSEL = 299.1528128;
    this.A_ETRS = 6378137;
    this.INV_F_ETRS = 298.257222101;

    /**
     **--------------------------------------------------------------
     **    Continuation of static data declarations
     **    Transformation parameters relative to pivot point Amersfoort.
     *     Note: Do NOT confuse with parameters for the center of the ellipsoid!
     **        tx     translation in direction of x axis in meters
     **        ty     translation in direction of y axis in meters
     **        tz     translation in direction of z axis in meters
     **        alpha  rotation around x axis in radials
     **        beta   rotation around y axis in radials
     **        gamma  rotation around z axis in radials
     **        delta  scale parameter (scale = 1 + delta)
     **    Source of constants: A. de Bruijne, J. van Buren, A. K\u0148sters and
     *     H. van der Marel, "De geodetische referentiestelsels van Nederland;
     *     Definitie en vastlegging van ETRS89, RD en NAP en hun onderlinge relatie".
     *     Delft: Nederlandse Commissie voor Geodesie (NCG), to be published in 2005.
     **--------------------------------------------------------------
     */
    this.TX_BESSEL_ETRS = 593.0248;
    this.TY_BESSEL_ETRS = 25.9984;
    this.TZ_BESSEL_ETRS = 478.7459;
    this.ALPHA_BESSEL_ETRS = 1.9342e-6;
    this.BETA_BESSEL_ETRS = -1.6677e-6;
    this.GAMMA_BESSEL_ETRS = 9.1019e-6;
    this.DELTA_BESSEL_ETRS = 4.0725e-6;

    this.TX_ETRS_BESSEL = -593.0248;
    this.TY_ETRS_BESSEL = -25.9984;
    this.TZ_ETRS_BESSEL = -478.7459;
    this.ALPHA_ETRS_BESSEL = -1.9342e-6;
    this.BETA_ETRS_BESSEL = 1.6677e-6;
    this.GAMMA_ETRS_BESSEL = -9.1019e-6;
    this.DELTA_ETRS_BESSEL = -4.0725e-6;

    /**
     **--------------------------------------------------------------
     **    Continuation of static data declarations
     **    Parameters of RD projection
     **        scale         scale factor (k in some notations)
     **                      this factor was first defined by Hk.J. Heuvelink as
     *                       pow(10,-400e-7), nowadays we define it as exactly 0.9999079
     **        x_amersfoort  false Easting
     **        y_amersfoort  false Northing
     **    Source of constants:
     **        G. Bakker, J.C. de Munck and G.L. Strang van Hees,
     *         "Radio Positioning at Sea". Delft University of Technology, 1995.
     **        G. Strang van Hees, "Globale en lokale geodetische systemen".
     *         Delft: Nederlandse Commissie voor Geodesie (NCG), 1997.
     **--------------------------------------------------------------
     */
    this.SCALE_RD = 0.9999079;
    this.X_AMERSFOORT_RD = 155000;
    this.Y_AMERSFOORT_RD = 463000;

    /**
     **--------------------------------------------------------------
     **    Continuation of static data declarations
     **    Precision parameters for iterations (respectively in meters and degrees)
     **--------------------------------------------------------------
     */
    this.PRECISION = 0.0001;
    this.DEG_PRECISION = this.PRECISION / (40e6 * 360);

    /**
     **--------------------------------------------------------------
     **    Continuation of static data declarations
     **    Mean difference between NAP and ellipsoidal Bessel height.
     *     This is only used for getting from x, y in RD to phi, lambda in ETRS89.
     **--------------------------------------------------------------
     */
    this.MEAN_GEOID_HEIGHT_BESSEL = 0.0;
  }

}

module.exports = Constants;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var proto = {}
module.exports = proto

proto.from = __webpack_require__(18)
proto.to = __webpack_require__(23)
proto.is = __webpack_require__(19)
proto.subarray = __webpack_require__(22)
proto.join = __webpack_require__(20)
proto.copy = __webpack_require__(16)
proto.create = __webpack_require__(17)

mix(__webpack_require__(21), proto)
mix(__webpack_require__(24), proto)

function mix(from, into) {
  for(var key in from) {
    into[key] = from[key]
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

;(function (exports) {
  'use strict'

  var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

  var PLUS = '+'.charCodeAt(0)
  var SLASH = '/'.charCodeAt(0)
  var NUMBER = '0'.charCodeAt(0)
  var LOWER = 'a'.charCodeAt(0)
  var UPPER = 'A'.charCodeAt(0)
  var PLUS_URL_SAFE = '-'.charCodeAt(0)
  var SLASH_URL_SAFE = '_'.charCodeAt(0)

  function decode (elt) {
    var code = elt.charCodeAt(0)
    if (code === PLUS || code === PLUS_URL_SAFE) return 62 // '+'
    if (code === SLASH || code === SLASH_URL_SAFE) return 63 // '/'
    if (code < NUMBER) return -1 // no match
    if (code < NUMBER + 10) return code - NUMBER + 26 + 26
    if (code < UPPER + 26) return code - UPPER
    if (code < LOWER + 26) return code - LOWER + 26
  }

  function b64ToByteArray (b64) {
    var i, j, l, tmp, placeHolders, arr

    if (b64.length % 4 > 0) {
      throw new Error('Invalid string. Length must be a multiple of 4')
    }

    // the number of equal signs (place holders)
    // if there are two placeholders, than the two characters before it
    // represent one byte
    // if there is only one, then the three characters before it represent 2 bytes
    // this is just a cheap hack to not do indexOf twice
    var len = b64.length
    placeHolders = b64.charAt(len - 2) === '=' ? 2 : b64.charAt(len - 1) === '=' ? 1 : 0

    // base64 is 4/3 + up to two characters of the original data
    arr = new Arr(b64.length * 3 / 4 - placeHolders)

    // if there are placeholders, only get up to the last complete 4 chars
    l = placeHolders > 0 ? b64.length - 4 : b64.length

    var L = 0

    function push (v) {
      arr[L++] = v
    }

    for (i = 0, j = 0; i < l; i += 4, j += 3) {
      tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
      push((tmp & 0xFF0000) >> 16)
      push((tmp & 0xFF00) >> 8)
      push(tmp & 0xFF)
    }

    if (placeHolders === 2) {
      tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
      push(tmp & 0xFF)
    } else if (placeHolders === 1) {
      tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
      push((tmp >> 8) & 0xFF)
      push(tmp & 0xFF)
    }

    return arr
  }

  function uint8ToBase64 (uint8) {
    var i
    var extraBytes = uint8.length % 3 // if we have 1 byte left, pad 2 bytes
    var output = ''
    var temp, length

    function encode (num) {
      return lookup.charAt(num)
    }

    function tripletToBase64 (num) {
      return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
    }

    // go through the array every three bytes, we'll deal with trailing stuff later
    for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
      temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
      output += tripletToBase64(temp)
    }

    // pad the end with zeros, but make sure to not forget the extra bytes
    switch (extraBytes) {
      case 1:
        temp = uint8[uint8.length - 1]
        output += encode(temp >> 2)
        output += encode((temp << 4) & 0x3F)
        output += '=='
        break
      case 2:
        temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
        output += encode(temp >> 10)
        output += encode((temp >> 4) & 0x3F)
        output += encode((temp << 2) & 0x3F)
        output += '='
        break
      default:
        break
    }

    return output
  }

  exports.toByteArray = b64ToByteArray
  exports.fromByteArray = uint8ToBase64
}( false ? (this.base64js = {}) : exports))


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var proto
  , map

module.exports = proto = {}

map = typeof WeakMap === 'undefined' ? null : new WeakMap

proto.get = !map ? no_weakmap_get : get

function no_weakmap_get(target) {
  return new DataView(target.buffer, 0)
}

function get(target) {
  var out = map.get(target.buffer)
  if(!out) {
    map.set(target.buffer, out = new DataView(target.buffer, 0))
  }
  return out
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by veerr on 8-2-2017.
 */



/**
 * <p>Cartesian class.</p>
 *
 * @author raymond
 * @version $Id: $Id
 */
class Cartesian {
  /**
   * <p>Constructor for Cartesian.</p>
   *
   * @param X a double.
   * @param Y a double.
   * @param Z a double.
   */
  constructor(X, Y, Z = 0) {
    this.X = X;
    this.Y = Y;
    this.Z = Z;
  }

  /**
   * <p>withZ.</p>
   *
   * @param z a double.
   * @return a {@link rdnaptrans.value.Cartesian} object.
   */
  withZ(z) {
    return new Cartesian(this.X, this.Y, z);
  }
}

module.exports = Cartesian;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by veerr on 8-2-2017.
 */



/**
 * <p>Geographic class.</p>
 *
 * @author raymond
 * @version $Id: $Id
 */
class Geographic {

  /*
   **    phi      latitude in degrees
   **    lambda   longitude in degrees
   **    h        ellipsoidal height
   */

  /**
   * <p>Constructor for Geographic.</p>
   *
   * @param phi a double.
   * @param lambda a double.
   * @param h a double.
   */
  constructor(phi, lambda = 0, h = 0) {
    this.phi = phi;
    this.lambda = lambda;
    this.h = h;
  }

  /**
   * <p>withH.</p>
   *
   * @param h a double.
   * @return a {Geographic} object.
   */
  withH(h) { return new Geographic(this.phi, this.lambda, h); }

}

module.exports = Geographic;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {/**
 * Created by veerr on 8-2-2017.
 */



const path = __webpack_require__(13);
const binary = __webpack_require__(3);
const xtend = __webpack_require__(33);
const Constants = __webpack_require__(2);
const Reader = __webpack_require__(34);

const constants = new Constants();
const floor = Math.floor;
/**
 * <p>GrdFile class.</p>
 *
 * @author raymond
 * @version $Id: $Id
 */
class GrdFile {
  /**
   **--------------------------------------------------------------
   **    Continuation of static data declarations
   **    Names of grd files
   **
   **    Grd files are binary grid files in the format of the program Surfer(R)
   **    The header contains information on the number of grid points,
   **    bounding box and extreme values.
   **
   **    RD-corrections in x and y
   **
   **          -8000 meters < RD Easting  (stepsize 1 km) < 301000 meters
   **         288000 meters < RD Northing (stepsize 1 km) < 630000 meters
   **
   **    Geoid model NLGEO2004
   **
   **        50.525   degrees < ETRS89 latitude  (stepsize 0.050000 degrees) < 53.675 degrees
   **         3.20833 degrees < ETRS89 longitude (stepsize 0.083333 degrees) <  7.45833 degrees
   **
   **        Alternative notation:
   **        50\u0248 31' 30" < ETRS89_latitude  (stepsize 0\u0248 3' 0") < 53\u0248 40' 30"
   **         3\u0248 12' 30" < ETRS89_longitude (stepsize 0\u0248 5' 0") <  7\u0248 27' 30"
   **
   **        The stepsizes correspond to about 5,5 km x 5,5 km in the Netherlands.
   **--------------------------------------------------------------
   */
  /** Constant <code>GRID_FILE_DX</code> */
  static GRID_FILE_DX() { return new GrdFile(path.join(__dirname, '../resources/rdnaptrans/x2c.grd')); }

  /** Constant <code>GRID_FILE_DY</code> */
  static GRID_FILE_DY() { return new GrdFile(path.join(__dirname, '../resources/rdnaptrans/y2c.grd')); }

  /** Constant <code>GRID_FILE_GEOID</code> */
  static GRID_FILE_GEOID() { return new GrdFile(path.join(__dirname, '../resources/rdnaptrans/nlgeo04.grd')); }

  /**
   * <p>Constructor for GrdFile.</p>
   *
   * @param src a {@link java.net.URL} object.
   */
  constructor(src) {
    /**
     **--------------------------------------------------------------
     **    Grd files are binary grid files in the format of the program Surfer(R)
     **--------------------------------------------------------------
     */

    const reader = new Reader(src);
    let cursor = 0;

    return new Promise((resolve, reject) => reader.read(src)
        .then((data) => {
          /**
           **--------------------------------------------------------------
           **    Read file id
           **--------------------------------------------------------------
           */
          const idString = binary.to(data.slice(cursor, cursor + 4));
          cursor += 4;

          /**
           **--------------------------------------------------------------
           **    Checks
           **--------------------------------------------------------------
           */

          if (idString !== 'DSBB') {
            console.error(idString);
            return reject(new Error(`${src} is not a valid grd file`));
          }

          this.grdInner = data;
          this.header = this.readGrdFileHeader(data, cursor);
          this.header = xtend(this.header, {
            stepSizeX: (this.header.maxX - this.header.minX) / (this.header.sizeX - 1),
            stepSizeY: (this.header.maxY - this.header.minY) / (this.header.sizeY - 1)
          });
          this.header = xtend(this.header, {
            safeMinX: this.header.minX + this.header.stepSizeX,
            safeMaxX: this.header.maxX - this.header.stepSizeX,
            safeMinY: this.header.minY + this.header.stepSizeY,
            safeMaxY: this.header.maxY - this.header.stepSizeY
          });
          return resolve(this);
        })
        .catch(reject));
  }

  /**
   **--------------------------------------------------------------
   **    Function name: grid_interpolation
   **    Description:   grid interpolation using Overhauser splines
   **
   **    Parameter      Type        In/Out Req/Opt Default
   **    x              double      in     req     none
   **    y              double      in     req     none
   **    grd_file       string      in     req     none
   **    value          double      out    -       none
   **
   **    Additional explanation of the meaning of parameters
   **    x, y           coordinates of the point for which a interpolated value is desired
   **    grd_file       name of the grd file to be read
   **    record_value   output of the interpolated value
   **
   **    Return value: (besides the standard return values)
   **    none
   **--------------------------------------------------------------
   */

  /**
   * <p>gridInterpolation.</p>
   *
   * @param x a double.
   * @param y a double.
   * @return a {@link rdnaptrans.value.OptionalDouble} object.
   * @throws java.io.IOException if any.
   */
  gridInterpolation(x, y) {
    /**
     **--------------------------------------------------------------
     **    Explanation of the meaning of variables:
     **    size_x     number of grid values in x direction (row)
     **    size_y     number of grid values in y direction (col)
     **    min_x      minimum of x
     **    max_x      maximum of x
     **    min_y      minimum of y
     **    max_y      maximum of x
     **    min_value  minimum value in grid (besides the error values)
     **    max_value  maximum value in grid (besides the error values)
     **--------------------------------------------------------------
     */

    /**
     **--------------------------------------------------------------
     **    Check for location safely inside the bounding box of grid
     **--------------------------------------------------------------
     */
    const header = this.header;
    if (x <= header.safeMinX || x >= header.safeMaxX ||
      y <= header.safeMinY || y >= header.safeMaxY) {
      return null;
    }

    /**
     **--------------------------------------------------------------
     **    The selected grid points are situated around point X like this:
     **
     **        12  13  14  15
     **
     **         8   9  10  11
     **               X
     **         4   5   6   7
     **
     **         0   1   2   3
     **
     **    ddx and ddy (in parts of the grid interval) are defined relative
     **    to grid point 9, respectively to the right and down.
     **--------------------------------------------------------------
     */
    const ddx = (x - header.minX) /
      header.stepSizeX - floor((x - header.minX) / header.stepSizeX);
    const ddy = 1 - ((y - header.minY) /
      header.stepSizeY - floor((y - header.minY) / header.stepSizeY));

    /**
     **--------------------------------------------------------------
     **    Calculate the record numbers of the selected grid points
     **    The records are numbered from lower left corner to the uper right corner starting with 0:
     **
     **    size_x*(size_y-1) . . size_x*size_y-1
     **                   .                    .
     **                   .                    .
     **                   0 . . . . . . size_x-1
     **--------------------------------------------------------------
     */
    const recordNumber = [];
    recordNumber[5] = parseInt(((x - header.minX) /
      header.stepSizeX + floor((y - header.minY) / header.stepSizeY) * header.sizeX), 10);
    recordNumber[0] = recordNumber[5] - header.sizeX - 1;
    recordNumber[1] = recordNumber[5] - header.sizeX;
    recordNumber[2] = recordNumber[5] - header.sizeX + 1;
    recordNumber[3] = recordNumber[5] - header.sizeX + 2;
    recordNumber[4] = recordNumber[5] - 1;
    recordNumber[6] = recordNumber[5] + 1;
    recordNumber[7] = recordNumber[5] + 2;
    recordNumber[8] = recordNumber[5] + header.sizeX - 1;
    recordNumber[9] = recordNumber[5] + header.sizeX;
    recordNumber[10] = recordNumber[5] + header.sizeX + 1;
    recordNumber[11] = recordNumber[5] + header.sizeX + 2;
    recordNumber[12] = recordNumber[5] + 2 * header.sizeX - 1;
    recordNumber[13] = recordNumber[5] + 2 * header.sizeX;
    recordNumber[14] = recordNumber[5] + 2 * header.sizeX + 1;
    recordNumber[15] = recordNumber[5] + 2 * header.sizeX + 2;

    /**
     **--------------------------------------------------------------
     **    Read the record values of the selected grid point
     **    Outside the validity area the records have a very large value (circa 1.7e38).
     **--------------------------------------------------------------
     */
    const recordValue = [];

    for (let i = 0; i < 16; i += 1) {
      recordValue[i] = this.readGrdFileBody(recordNumber[i]);
      if (
        recordValue[i] > header.maxValue + constants.PRECISION ||
        recordValue[i] < header.minValue - constants.PRECISION
      ) {
        return null;
      }
    }

    /**
     **--------------------------------------------------------------
     **    Calculation of the multiplication factors
     **--------------------------------------------------------------
     */
    const f = [];
    const g = [];
    const gfac = [];
    f[0] = -0.5 * ddx + ddx * ddx - 0.5 * ddx * ddx * ddx;
    f[1] = 1.0 - 2.5 * ddx * ddx + 1.5 * ddx * ddx * ddx;
    f[2] = 0.5 * ddx + 2.0 * ddx * ddx - 1.5 * ddx * ddx * ddx;
    f[3] = -0.5 * ddx * ddx + 0.5 * ddx * ddx * ddx;
    g[0] = -0.5 * ddy + ddy * ddy - 0.5 * ddy * ddy * ddy;
    g[1] = 1.0 - 2.5 * ddy * ddy + 1.5 * ddy * ddy * ddy;
    g[2] = 0.5 * ddy + 2.0 * ddy * ddy - 1.5 * ddy * ddy * ddy;
    g[3] = -0.5 * ddy * ddy + 0.5 * ddy * ddy * ddy;

    gfac[12] = f[0] * g[0];
    gfac[8] = f[0] * g[1];
    gfac[4] = f[0] * g[2];
    gfac[0] = f[0] * g[3];
    gfac[13] = f[1] * g[0];
    gfac[9] = f[1] * g[1];
    gfac[5] = f[1] * g[2];
    gfac[1] = f[1] * g[3];
    gfac[14] = f[2] * g[0];
    gfac[10] = f[2] * g[1];
    gfac[6] = f[2] * g[2];
    gfac[2] = f[2] * g[3];
    gfac[15] = f[3] * g[0];
    gfac[11] = f[3] * g[1];
    gfac[7] = f[3] * g[2];
    gfac[3] = f[3] * g[3];

    /*
     **--------------------------------------------------------------
     **    Calculation of the interpolated value
     **    Applying the multiplication factors on the selected grid values
     **--------------------------------------------------------------
     */
    let value = 0.0;
    for (let i = 0; i < 16; i += 1) {
      value += gfac[i] * recordValue[i];
    }

    return value;
  }

  /**
   **--------------------------------------------------------------
   **    Function name: read_grd_file_header
   **    Description:   reads the header of a grd file
   **
   **    Parameter      Type        In/Out Req/Opt Default
   **    filename       string      in     req     none
   **    size_x         short int   out    -       none
   **    size_y         short int   out    -       none
   **    min_x          double      out    -       none
   **    max_x          double      out    -       none
   **    min_y          double      out    -       none
   **    max_y          double      out    -       none
   **    min_value      double      out    -       none
   **    max_value      double      out    -       none
   **
   **    Additional explanation of the meaning of parameters
   **    filename   name of the to be read binary file
   **    size_x     number of grid values in x direction (row)
   **    size_y     number of grid values in y direction (col)
   **    min_x      minimum of x
   **    max_x      maximum of x
   **    min_y      minimum of y
   **    max_y      maximum of x
   **    min_value  minimum value in grid (besides the error values)
   **    max_value  maximum value in grid (besides the error values)
   **
   **    Return value: (besides the standard return values)
   **    none
   **--------------------------------------------------------------
   */
  readGrdFileHeader(input, cursor) {
    /**
     **--------------------------------------------------------------
     **    Read output parameters
     **--------------------------------------------------------------
     */

    const sizeX = Reader.readShort(input, cursor);
    cursor += 2;
    const sizeY = Reader.readShort(input, cursor);
    cursor += 2;
    const minX = Reader.readDouble(input, cursor);
    cursor += 8;
    const maxX = Reader.readDouble(input, cursor);
    cursor += 8;
    const minY = Reader.readDouble(input, cursor);
    cursor += 8;
    const maxY = Reader.readDouble(input, cursor);
    cursor += 8;
    const minValue = Reader.readDouble(input, cursor);
    cursor += 8;
    const maxValue = Reader.readDouble(input, cursor);

    return { sizeX, sizeY, minX, maxX, minY, maxY, minValue, maxValue };
  }

  /**
   **--------------------------------------------------------------
   **    Function name: read_grd_file_body
   **    Description:   reads a value from a grd file
   **
   **    Parameter      Type        In/Out Req/Opt Default
   **    filename       string      in     req     none
   **    number         long int    in     req     none
   **    value          float       out    -       none
   **
   **    Additional explanation of the meaning of parameters
   **    filename       name of the grd file to be read
   **    recordNumber  number defining the position in the file
   **    record_value   output of the read value
   **
   **    Return value: (besides the standard return values)
   **    none
   **--------------------------------------------------------------
   */
  readGrdFileBody(recordNumber) {
    const recordLength = 4;
    const headerLength = 56;

    /**
     **--------------------------------------------------------------
     **    Read
     **    Grd files are binary grid files in the format of the program Surfer(R)
     **    The first "headerLength" bytes are the header of the file
     **    The body of the file consists of records of "recordLength" bytes
     **    The records have a "recordNumber", starting with 0,1,2,...
     **--------------------------------------------------------------
     */

    const start = headerLength + recordNumber * recordLength;
    const end = headerLength + recordNumber * (recordLength + 1);

    const b = this.grdInner.slice(start, end);

    return binary.readFloatLE(b);
  }
}

module.exports = GrdFile;

/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Geographic = __webpack_require__(7);
const Cartesian = __webpack_require__(6);
const Transform = __webpack_require__(37);

module.exports = { Geographic, Cartesian, Transform };


/***/ }),
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports) {



/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, exports) {

module.exports = to_utf8

var out = []
  , col = []
  , fcc = String.fromCharCode
  , mask = [0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x01]
  , unmask = [
      0x00
    , 0x01
    , 0x02 | 0x01
    , 0x04 | 0x02 | 0x01
    , 0x08 | 0x04 | 0x02 | 0x01
    , 0x10 | 0x08 | 0x04 | 0x02 | 0x01
    , 0x20 | 0x10 | 0x08 | 0x04 | 0x02 | 0x01
    , 0x40 | 0x20 | 0x10 | 0x08 | 0x04 | 0x02 | 0x01
  ]

function to_utf8(bytes, start, end) {
  start = start === undefined ? 0 : start
  end = end === undefined ? bytes.length : end

  var idx = 0
    , hi = 0x80
    , collecting = 0
    , pos
    , by

  col.length =
  out.length = 0

  while(idx < bytes.length) {
    by = bytes[idx]
    if(!collecting && by & hi) {
      pos = find_pad_position(by)
      collecting += pos
      if(pos < 8) {
        col[col.length] = by & unmask[6 - pos]
      }
    } else if(collecting) {
      col[col.length] = by & unmask[6]
      --collecting
      if(!collecting && col.length) {
        out[out.length] = fcc(reduced(col, pos))
        col.length = 0
      }
    } else { 
      out[out.length] = fcc(by)
    }
    ++idx
  }
  if(col.length && !collecting) {
    out[out.length] = fcc(reduced(col, pos))
    col.length = 0
  }
  return out.join('')
}

function find_pad_position(byt) {
  for(var i = 0; i < 7; ++i) {
    if(!(byt & mask[i])) {
      break
    }
  }
  return i
}

function reduced(list) {
  var out = 0
  for(var i = 0, len = list.length; i < len; ++i) {
    out |= list[i] << ((len - i - 1) * 6)
  }
  return out
}


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = copy

var slice = [].slice

function copy(source, target, target_start, source_start, source_end) {
  target_start = arguments.length < 3 ? 0 : target_start
  source_start = arguments.length < 4 ? 0 : source_start
  source_end = arguments.length < 5 ? source.length : source_end

  if(source_end === source_start) {
    return
  }

  if(target.length === 0 || source.length === 0) {
    return
  }

  if(source_end > source.length) {
    source_end = source.length
  }

  if(target.length - target_start < source_end - source_start) {
    source_end = target.length - target_start + source_start
  }

  if(source.buffer !== target.buffer) {
    return fast_copy(source, target, target_start, source_start, source_end)
  }
  return slow_copy(source, target, target_start, source_start, source_end)
}

function fast_copy(source, target, target_start, source_start, source_end) {
  var len = (source_end - source_start) + target_start

  for(var i = target_start, j = source_start;
      i < len;
      ++i,
      ++j) {
    target[i] = source[j]
  }
}

function slow_copy(from, to, j, i, jend) {
  // the buffers could overlap.
  var iend = jend + i
    , tmp = new Uint8Array(slice.call(from, i, iend))
    , x = 0

  for(; i < iend; ++i, ++x) {
    to[j++] = tmp[x]
  }
}


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function(size) {
  return new Uint8Array(size)
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = from

var base64 = __webpack_require__(4)

var decoders = {
    hex: from_hex
  , utf8: from_utf
  , base64: from_base64
}

function from(source, encoding) {
  if(Array.isArray(source)) {
    return new Uint8Array(source)
  }

  return decoders[encoding || 'utf8'](source)
}

function from_hex(str) {
  var size = str.length / 2
    , buf = new Uint8Array(size)
    , character = ''

  for(var i = 0, len = str.length; i < len; ++i) {
    character += str.charAt(i)

    if(i > 0 && (i % 2) === 1) {
      buf[i>>>1] = parseInt(character, 16)
      character = '' 
    }
  }

  return buf 
}

function from_utf(str) {
  var arr = []
    , code

  for(var i = 0, len = str.length; i < len; ++i) {
    code = fixed_cca(str, i)

    if(code === false) {
      continue
    }

    if(code < 0x80) {
      arr[arr.length] = code

      continue
    }

    codepoint_to_bytes(arr, code)
  }

  return new Uint8Array(arr)
}

function codepoint_to_bytes(arr, code) {
  // find MSB, use that to determine byte count
  var copy_code = code
    , bit_count = 0
    , byte_count
    , prefix
    , _byte
    , pos

  do {
    ++bit_count
  } while(copy_code >>>= 1)

  byte_count = Math.ceil((bit_count - 1) / 5) | 0
  prefix = [0, 0, 0xc0, 0xe0, 0xf0, 0xf8, 0xfc][byte_count]
  pos = [0, 0, 3, 4, 5, 6, 7][byte_count]

  _byte |= prefix

  bit_count = (7 - pos) + 6 * (byte_count - 1)

  while(bit_count) {
    _byte |= +!!(code & (1 << bit_count)) << (7 - pos)
    ++pos

    if(pos % 8 === 0) {
      arr[arr.length] = _byte
      _byte = 0x80
      pos = 2
    }

    --bit_count
  }

  if(pos) {
    _byte |= +!!(code & 1) << (7 - pos)
    arr[arr.length] = _byte
  }
}

function pad(str) {
  while(str.length < 8) {
    str = '0' + str
  }

  return str
}

function fixed_cca(str, idx) {
  idx = idx || 0

  var code = str.charCodeAt(idx)
    , lo
    , hi

  if(0xD800 <= code && code <= 0xDBFF) {
    lo = str.charCodeAt(idx + 1)
    hi = code

    if(isNaN(lo)) {
      throw new Error('High surrogate not followed by low surrogate')
    }

    return ((hi - 0xD800) * 0x400) + (lo - 0xDC00) + 0x10000
  }

  if(0xDC00 <= code && code <= 0xDFFF) {
    return false
  }

  return code
}

function from_base64(str) {
  return new Uint8Array(base64.toByteArray(str)) 
}


/***/ }),
/* 19 */
/***/ (function(module, exports) {


module.exports = function(buffer) {
  return buffer instanceof Uint8Array;
}


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = join

function join(targets, hint) {
  if(!targets.length) {
    return new Uint8Array(0)
  }

  var len = hint !== undefined ? hint : get_length(targets)
    , out = new Uint8Array(len)
    , cur = targets[0]
    , curlen = cur.length
    , curidx = 0
    , curoff = 0
    , i = 0

  while(i < len) {
    if(curoff === curlen) {
      curoff = 0
      ++curidx
      cur = targets[curidx]
      curlen = cur && cur.length
      continue
    }
    out[i++] = cur[curoff++] 
  }

  return out
}

function get_length(targets) {
  var size = 0
  for(var i = 0, len = targets.length; i < len; ++i) {
    size += targets[i].byteLength
  }
  return size
}


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    readUInt8:      read_uint8
  , readInt8:       read_int8
  , readUInt16LE:   read_uint16_le
  , readUInt32LE:   read_uint32_le
  , readInt16LE:    read_int16_le
  , readInt32LE:    read_int32_le
  , readFloatLE:    read_float_le
  , readDoubleLE:   read_double_le
  , readUInt16BE:   read_uint16_be
  , readUInt32BE:   read_uint32_be
  , readInt16BE:    read_int16_be
  , readInt32BE:    read_int32_be
  , readFloatBE:    read_float_be
  , readDoubleBE:   read_double_be
}

var map = __webpack_require__(5)

function read_uint8(target, at) {
  return target[at]
}

function read_int8(target, at) {
  var v = target[at];
  return v < 0x80 ? v : v - 0x100
}

function read_uint16_le(target, at) {
  var dv = map.get(target);
  return dv.getUint16(at + target.byteOffset, true)
}

function read_uint32_le(target, at) {
  var dv = map.get(target);
  return dv.getUint32(at + target.byteOffset, true)
}

function read_int16_le(target, at) {
  var dv = map.get(target);
  return dv.getInt16(at + target.byteOffset, true)
}

function read_int32_le(target, at) {
  var dv = map.get(target);
  return dv.getInt32(at + target.byteOffset, true)
}

function read_float_le(target, at) {
  var dv = map.get(target);
  return dv.getFloat32(at + target.byteOffset, true)
}

function read_double_le(target, at) {
  var dv = map.get(target);
  return dv.getFloat64(at + target.byteOffset, true)
}

function read_uint16_be(target, at) {
  var dv = map.get(target);
  return dv.getUint16(at + target.byteOffset, false)
}

function read_uint32_be(target, at) {
  var dv = map.get(target);
  return dv.getUint32(at + target.byteOffset, false)
}

function read_int16_be(target, at) {
  var dv = map.get(target);
  return dv.getInt16(at + target.byteOffset, false)
}

function read_int32_be(target, at) {
  var dv = map.get(target);
  return dv.getInt32(at + target.byteOffset, false)
}

function read_float_be(target, at) {
  var dv = map.get(target);
  return dv.getFloat32(at + target.byteOffset, false)
}

function read_double_be(target, at) {
  var dv = map.get(target);
  return dv.getFloat64(at + target.byteOffset, false)
}


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = subarray

function subarray(buf, from, to) {
  return buf.subarray(from || 0, to || buf.length)
}


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = to

var base64 = __webpack_require__(4)
  , toutf8 = __webpack_require__(15)

var encoders = {
    hex: to_hex
  , utf8: to_utf
  , base64: to_base64
}

function to(buf, encoding) {
  return encoders[encoding || 'utf8'](buf)
}

function to_hex(buf) {
  var str = ''
    , byt

  for(var i = 0, len = buf.length; i < len; ++i) {
    byt = buf[i]
    str += ((byt & 0xF0) >>> 4).toString(16)
    str += (byt & 0x0F).toString(16)
  }

  return str
}

function to_utf(buf) {
  return toutf8(buf)
}

function to_base64(buf) {
  return base64.fromByteArray(buf)
}



/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    writeUInt8:      write_uint8
  , writeInt8:       write_int8
  , writeUInt16LE:   write_uint16_le
  , writeUInt32LE:   write_uint32_le
  , writeInt16LE:    write_int16_le
  , writeInt32LE:    write_int32_le
  , writeFloatLE:    write_float_le
  , writeDoubleLE:   write_double_le
  , writeUInt16BE:   write_uint16_be
  , writeUInt32BE:   write_uint32_be
  , writeInt16BE:    write_int16_be
  , writeInt32BE:    write_int32_be
  , writeFloatBE:    write_float_be
  , writeDoubleBE:   write_double_be
}

var map = __webpack_require__(5)

function write_uint8(target, value, at) {
  return target[at] = value
}

function write_int8(target, value, at) {
  return target[at] = value < 0 ? value + 0x100 : value
}

function write_uint16_le(target, value, at) {
  var dv = map.get(target);
  return dv.setUint16(at + target.byteOffset, value, true)
}

function write_uint32_le(target, value, at) {
  var dv = map.get(target);
  return dv.setUint32(at + target.byteOffset, value, true)
}

function write_int16_le(target, value, at) {
  var dv = map.get(target);
  return dv.setInt16(at + target.byteOffset, value, true)
}

function write_int32_le(target, value, at) {
  var dv = map.get(target);
  return dv.setInt32(at + target.byteOffset, value, true)
}

function write_float_le(target, value, at) {
  var dv = map.get(target);
  return dv.setFloat32(at + target.byteOffset, value, true)
}

function write_double_le(target, value, at) {
  var dv = map.get(target);
  return dv.setFloat64(at + target.byteOffset, value, true)
}

function write_uint16_be(target, value, at) {
  var dv = map.get(target);
  return dv.setUint16(at + target.byteOffset, value, false)
}

function write_uint32_be(target, value, at) {
  var dv = map.get(target);
  return dv.setUint32(at + target.byteOffset, value, false)
}

function write_int16_be(target, value, at) {
  var dv = map.get(target);
  return dv.setInt16(at + target.byteOffset, value, false)
}

function write_int32_be(target, value, at) {
  var dv = map.get(target);
  return dv.setInt32(at + target.byteOffset, value, false)
}

function write_float_be(target, value, at) {
  var dv = map.get(target);
  return dv.setFloat32(at + target.byteOffset, value, false)
}

function write_double_be(target, value, at) {
  var dv = map.get(target);
  return dv.setFloat64(at + target.byteOffset, value, false)
}


/***/ }),
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */
/***/ (function(module, exports) {


/**
 * slice() reference.
 */

var slice = Array.prototype.slice;

/**
 * Expose `co`.
 */

module.exports = co['default'] = co.co = co;

/**
 * Wrap the given generator `fn` into a
 * function that returns a promise.
 * This is a separate function so that
 * every `co()` call doesn't create a new,
 * unnecessary closure.
 *
 * @param {GeneratorFunction} fn
 * @return {Function}
 * @api public
 */

co.wrap = function (fn) {
  createPromise.__generatorFunction__ = fn;
  return createPromise;
  function createPromise() {
    return co.call(this, fn.apply(this, arguments));
  }
};

/**
 * Execute the generator function or a generator
 * and return a promise.
 *
 * @param {Function} fn
 * @return {Promise}
 * @api public
 */

function co(gen) {
  var ctx = this;
  var args = slice.call(arguments, 1)

  // we wrap everything in a promise to avoid promise chaining,
  // which leads to memory leak errors.
  // see https://github.com/tj/co/issues/180
  return new Promise(function(resolve, reject) {
    if (typeof gen === 'function') gen = gen.apply(ctx, args);
    if (!gen || typeof gen.next !== 'function') return resolve(gen);

    onFulfilled();

    /**
     * @param {Mixed} res
     * @return {Promise}
     * @api private
     */

    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    /**
     * @param {Error} err
     * @return {Promise}
     * @api private
     */

    function onRejected(err) {
      var ret;
      try {
        ret = gen.throw(err);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    /**
     * Get the next value in the generator,
     * return a promise.
     *
     * @param {Object} ret
     * @return {Promise}
     * @api private
     */

    function next(ret) {
      if (ret.done) return resolve(ret.value);
      var value = toPromise.call(ctx, ret.value);
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
      return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
        + 'but the following object was passed: "' + String(ret.value) + '"'));
    }
  });
}

/**
 * Convert a `yield`ed value into a promise.
 *
 * @param {Mixed} obj
 * @return {Promise}
 * @api private
 */

function toPromise(obj) {
  if (!obj) return obj;
  if (isPromise(obj)) return obj;
  if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj);
  if ('function' == typeof obj) return thunkToPromise.call(this, obj);
  if (Array.isArray(obj)) return arrayToPromise.call(this, obj);
  if (isObject(obj)) return objectToPromise.call(this, obj);
  return obj;
}

/**
 * Convert a thunk to a promise.
 *
 * @param {Function}
 * @return {Promise}
 * @api private
 */

function thunkToPromise(fn) {
  var ctx = this;
  return new Promise(function (resolve, reject) {
    fn.call(ctx, function (err, res) {
      if (err) return reject(err);
      if (arguments.length > 2) res = slice.call(arguments, 1);
      resolve(res);
    });
  });
}

/**
 * Convert an array of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Array} obj
 * @return {Promise}
 * @api private
 */

function arrayToPromise(obj) {
  return Promise.all(obj.map(toPromise, this));
}

/**
 * Convert an object of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Object} obj
 * @return {Promise}
 * @api private
 */

function objectToPromise(obj){
  var results = new obj.constructor();
  var keys = Object.keys(obj);
  var promises = [];
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var promise = toPromise.call(this, obj[key]);
    if (promise && isPromise(promise)) defer(promise, key);
    else results[key] = obj[key];
  }
  return Promise.all(promises).then(function () {
    return results;
  });

  function defer(promise, key) {
    // predefine the key in the result
    results[key] = undefined;
    promises.push(promise.then(function (res) {
      results[key] = res;
    }));
  }
}

/**
 * Check if `obj` is a promise.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isPromise(obj) {
  return 'function' == typeof obj.then;
}

/**
 * Check if `obj` is a generator.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */

function isGenerator(obj) {
  return 'function' == typeof obj.next && 'function' == typeof obj.throw;
}

/**
 * Check if `obj` is a generator function.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */
function isGeneratorFunction(obj) {
  var constructor = obj.constructor;
  if (!constructor) return false;
  if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
  return isGenerator(constructor.prototype);
}

/**
 * Check for plain object.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isObject(val) {
  return Object == val.constructor;
}


/***/ }),
/* 32 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by veerr on 25-1-2017.
 */



const binary = __webpack_require__(3);

class Reader {
  /**
   * Constructor
   * The read() function on the reader class is instantiated as a polymorphic Promise,
   * able to read either from a local file system (Node.js)
   * or from a location served over http (browser). This
   * allows the rdnaptrans module to be used in either environment,
   * as it requires the grid files under ./resources to be
   * available.
   * @param src a file or url path string
   */
  constructor() {
    const node = typeof window !== 'object';

    if (node) { // The browser has a window object, but Node.js does not
      /* eslint global-require: 0 */
      const fs = __webpack_require__(12);
      this.read = function (filePath) {
        return new Promise((resolve, reject) => {
          fs.readFile(filePath, (err, buffer) => {
            if (err) return reject(err);
            console.log(buffer);
            return resolve(binary.from(buffer));
          });
        });
      };
    } else {
      this.read = function (filePath) {
        return new Promise((resolve, reject) => {
          try {
            const xhrReq = new XMLHttpRequest();
            xhrReq.open('GET', filePath);
            xhrReq.responseType = 'arraybuffer';
            xhrReq.send();
            xhrReq.onreadystatechange = ()=> {
              if (xhrReq.readyState === XMLHttpRequest.DONE && xhrReq.status === 200) {

                if (xhrReq.response === 'NOT FOUND') {
                  return reject(new Error(`Resource ${filePath} not found`));
                }

                const buffer = xhrReq.response;
                const dataview = new DataView(buffer);
                const ints = new Uint8Array(buffer.byteLength);
                ints.forEach((int, index) => ints[index] = dataview.getUint8(i));

                return resolve(ints);
              }
            };
          } catch (err) {
            reject(err);
          }
        });
      };
    }
  }

  static readShort(buffer, offset) {
    return binary.readUInt16LE(buffer, offset)
  }

  static readDouble(buffer, offset) {
    return binary.readDoubleLE(buffer, offset);
  }
}

module.exports = Reader;


/***/ }),
/* 35 */,
/* 36 */,
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by veerr on 10-2-2017.
 */

const co = __webpack_require__(31);

const Helpers = __webpack_require__(69);
const Constants = __webpack_require__(2);
const Cartesian = __webpack_require__(6);
const Geographic = __webpack_require__(7);
const GrdFile = __webpack_require__(8);

const constants = new Constants();

/**
 * <p>Transform class.</p>
 *
 * @author raymond
 * @version $Id: $Id
 */
class Transform {
  /** JAVASCRIPT PORT
   **--------------------------------------------------------------
   **    RDNAPTRANS(TM)2008
   **
   **    Authors: Jochem Lesparre, Joop van Buren, Marc Crombaghs, Frank Dentz,
   **    Arnoud Pol, Sander Oude Elberink
   **             http://www.rdnap.nl
   **    Based on RDNAPTRANS2004
   **    Main changes:
   **    - 7 similarity transformation parameters
   **    - 0.0088 offset in the transformation between ellipsoidal height (h)
   **    and orthometric heights (NAP)
   **    - coordinates are computed also outside the validity regions of the
   **    grid files x2c.grd, y2c.grd and nlgeo04.grd
   **--------------------------------------------------------------
   */

  /**
   **--------------------------------------------------------------
   **    Function name: etrs2rd
   **    Description:   convert ETRS89 coordinates to RD coordinates
   **
   **    Parameter      Type        In/Out Req/Opt Default
   **    phi_etrs       double      in     req     none
   **    lambda_etrs    double      in     req     none
   **    h_etrs         double      in     req     none
   **    x_rd           double      out    -       none
   **    y_rd           double      out    -       none
   **
   **    Additional explanation of the meaning of parameters
   **    phi_etrs, lambda_etrs, h_etrs  input ETRS89 coordinates
   **    x_rd, y_rd                     output RD coordinates
   **
   **    Return value: (besides the standard return values)
   **    none
   **--------------------------------------------------------------
   */
  /**
   * <p>etrs2rd.</p>
   *
   * @param etrs a {@link rdnaptrans.value.Geographic} object.
   * @return a {@link rdnaptrans.value.Cartesian} object.
   * @throws java.io.IOException if any.
   */
  static etrs2rd(etrs) {
    /**
     **--------------------------------------------------------------
     **    Calculate the cartesian ETRS89 coordinates of the pivot point Amersfoort
     **--------------------------------------------------------------
     */
    const amersfoortBessel = Helpers.geographic2cartesian(
      new Geographic(
        constants.PHI_AMERSFOORT_BESSEL,
        constants.LAMBDA_AMERSFOORT_BESSEL,
        constants.H_AMERSFOORT_BESSEL
      ),
      constants.A_BESSEL,
      constants.INV_F_BESSEL
    );
    const xAmersfoortETRS = amersfoortBessel.X + constants.TX_BESSEL_ETRS;
    const yAmersfoortETRS = amersfoortBessel.Y + constants.TY_BESSEL_ETRS;
    const zAmersfoortETRS = amersfoortBessel.Z + constants.TZ_BESSEL_ETRS;

    /**
     **--------------------------------------------------------------
     **    Convert ETRS89 coordinates to RD coordinates
     **    (To convert from degrees, minutes and seconds use the function
     **    deg_min_sec2decimal() here)
     **--------------------------------------------------------------
     */
    const cartesianETRS = Helpers.geographic2cartesian(
      etrs,
      constants.A_ETRS,
      constants.INV_F_ETRS
    );

    const cartesianBessel = Helpers.simTrans(
      cartesianETRS,
      new Cartesian(constants.TX_ETRS_BESSEL, constants.TY_ETRS_BESSEL, constants.TZ_ETRS_BESSEL),
      constants.ALPHA_ETRS_BESSEL,
      constants.BETA_ETRS_BESSEL,
      constants.GAMMA_ETRS_BESSEL,
      constants.DELTA_ETRS_BESSEL,
      new Cartesian(xAmersfoortETRS, yAmersfoortETRS, zAmersfoortETRS)
    );

    const geographicBessel = Helpers.cartesian2geographic(
      cartesianBessel,
      constants.A_BESSEL,
      constants.INV_F_BESSEL
    );

    return co(function* () {
      const pseudoRD = Helpers.rdProjection(geographicBessel);
      const corrected = yield Helpers.rdCorrection(pseudoRD);
      return corrected.withZ(geographicBessel.h);
    });
  }

/**
 **--------------------------------------------------------------
 **    Function name: rd2etrs
 **    Description:   convert RD coordinates to ETRS89 coordinates
 **
 **    Parameter      Type        In/Out Req/Opt Default
 **    x_rd           double      in     req     none
 **    y_rd           double      in     req     none
 **    nap            double      in     req     none
 **    phi_etrs       double      out    -       none
 **    lambda_etrs    double      out    -       none
 **
 **    Additional explanation of the meaning of parameters
 **    x_rd, y_rd, nap        input RD and NAP coordinates
 **    phi_etrs, lambda_etrs  output ETRS89 coordinates
 **
 **    Return value: (besides the standard return values)
 **    none
 **--------------------------------------------------------------
 */
/**
 * <p>rd2etrs.</p>
 *
 * @param rd a {Cartesian} object.
 * @return a {Geographic} object.
 * @throws java.io.IOException if any.
 */
  static rd2etrs(rd) {
  /**
   **--------------------------------------------------------------
   **    Calculate the cartesian Bessel coordinates of the pivot point Amersfoort
   **--------------------------------------------------------------
   */
    const amersfoortBessel = Helpers.geographic2cartesian(
      new Geographic(
        constants.PHI_AMERSFOORT_BESSEL,
        constants.LAMBDA_AMERSFOORT_BESSEL,
        constants.H_AMERSFOORT_BESSEL
      ),
      constants.A_BESSEL,
      constants.INV_F_BESSEL
    );

  /**
   **--------------------------------------------------------------
   **    Calculate appoximated value of ellipsoidal Bessel height
   **    The error made by using a constant for de Bessel geoid height is max.
   **    circa 1 meter in the ellipsoidal height (for the NLGEO2004 geoid model).
   **    This intoduces an error in the phi, lambda position too, this error is
   **    nevertheless certainly smaller than 0.0001 m.
   **--------------------------------------------------------------
   */
    const hBessel = rd.Z + constants.MEAN_GEOID_HEIGHT_BESSEL;

  /**
   **--------------------------------------------------------------
   **    Convert RD coordinates to ETRS89 coordinates
   **--------------------------------------------------------------
   */
    return co(function* () {
      const pseudoRD = yield Helpers.invRdCorrection(rd);
      const etrsBessel = Helpers.invRdProjection(pseudoRD);
      const cartesianBessel = Helpers.geographic2cartesian(
        etrsBessel.withH(hBessel),
        constants.A_BESSEL,
        constants.INV_F_BESSEL
      );
      const cartesianETRS = Helpers.simTrans(
        cartesianBessel,
        new Cartesian(constants.TX_BESSEL_ETRS, constants.TY_BESSEL_ETRS, constants.TZ_BESSEL_ETRS),
        constants.ALPHA_BESSEL_ETRS, constants.BETA_BESSEL_ETRS, constants.GAMMA_BESSEL_ETRS,
        constants.DELTA_BESSEL_ETRS,
        amersfoortBessel
      );

      return Helpers.cartesian2geographic(cartesianETRS,
        constants.A_ETRS, constants.INV_F_ETRS);
    });

  /**
   **--------------------------------------------------------------
   **    To convert to degrees, minutes and seconds use the function decimal2deg_min_sec() here
   **--------------------------------------------------------------
   */
  }

/**
 **--------------------------------------------------------------
 **    Function name: etrs2nap
 **    Description:   convert ellipsoidal ETRS89 height to NAP height
 **
 **    Parameter      Type        In/Out Req/Opt Default
 **    phi            double      in     req     none
 **    lambda         double      in     req     none
 **    h              double      in     req     none
 **    nap            double      out    -       none
 **
 **    Additional explanation of the meaning of parameters
 **    phi, lambda, h  input ETRS89 coordinates
 **    nap             output NAP height
 **
 **    Return value: (besides the standard return values) none
 **    on error (outside geoid grid) nap is not compted here
 **    instead in etrs2rdnap nap=h_bessel
 **--------------------------------------------------------------
 */
/**
 * <p>etrs2nap.</p>
 *
 * @param etrs a {@link rdnaptrans.value.Geographic} object.
 * @return a {@link rdnaptrans.value.OptionalDouble} object.
 * @throws java.io.IOException if any.
 */
  static etrs2nap(etrs) {
  /**
   **--------------------------------------------------------------
   **    Explanation of the meaning of variables:
   **        n  geoid height
   **    on error (outside geoid grid) nap is not compted
   **    instead in etrs2rdnap nap=h_bessel
   **--------------------------------------------------------------
   */

    return co(function* interpolate() {
      const grdFileZ = yield GrdFile.GRID_FILE_GEOID();
      const n = grdFileZ.gridInterpolation(etrs.lambda, etrs.phi);
      return n ? etrs.h - n + 0.0088 : null;
    });
  }

/**
 **--------------------------------------------------------------
 **    Function name: nap2etrs
 **    Description:   convert NAP height to ellipsoidal ETRS89 height
 **
 **    Parameter      Type        In/Out Req/Opt Default
 **    phi            double      in     req     none
 **    lambda         double      in     req     none
 **    nap            double      in     req     none
 **    h              double      out    -       none
 **
 **    Additional explanation of the meaning of parameters
 **    phi, lambda  input ETRS89 position
 **    nap          input NAP height at position phi, lambda
 **    h            output ellipsoidal ETRS89 height
 **
 **    Return value: (besides the standard return values)
 **    none
 **    on error (outside geoid grid) h is not compted here
 **    instead in rdnap2etrs h=h_etrs_sim (from similarity transformation)
 **--------------------------------------------------------------
 */
/**
 * <p>nap2etrs.</p>
 *
 * @param phi a double.
 * @param lambda a double.
 * @param nap a double.
 * @return a {@link rdnaptrans.value.OptionalDouble} object.
 * @throws java.io.IOException if any.
 */
  static nap2etrs(phi, lambda, nap) {
  /**
   **--------------------------------------------------------------
   **    Explanation of the meaning of variables:
   **        n  geoid height
   **--------------------------------------------------------------
   */
    return co(function* interpolate() {
      const grdFileZ = yield GrdFile.GRID_FILE_GEOID();
      const n = grdFileZ.gridInterpolation(lambda, phi);
      return n ? nap + n - 0.0088 : null;
    });
  }

/**
 **--------------------------------------------------------------
 **    Function name: etrs2rdnap
 **    Description:   convert ETRS89 coordinates to RD and NAP coordinates
 **
 **    Parameter      Type        In/Out Req/Opt Default
 **    phi            double      in     req     none
 **    lambda         double      in     req     none
 **    h              double      in     req     none
 **    x_rd           double      out    -       none
 **    y_rd           double      out    -       none
 **    nap            double      out    -       none
 **
 **    Additional explanation of the meaning of parameters
 **    phi, lambda, h   input ETRS89 coordinates
 **    x_rd, y_rd, nap  output RD and NAP coordinates
 **
 **    Return value: (besides the standard return values)
 **    none
 **--------------------------------------------------------------
 */
/**
 * <p>etrs2rdnap.</p>
 *
 * @param etrs a {@link rdnaptrans.value.Geographic} object.
 * @return a {@link rdnaptrans.value.Cartesian} object.
 * @throws java.io.IOException if any.
 */
  static etrs2rdnap(etrs) {
    return co(function* () {
      const rd = yield Transform.etrs2rd(etrs);
      const betterH = yield Transform.etrs2nap(etrs);
      return betterH ? rd.withZ(betterH) : rd;
    });
  }

/**
 **--------------------------------------------------------------
 **    Function name: rdnap2etrs
 **    Description:   convert RD and NAP coordinates to ETRS89 coordinates
 **
 **    Parameter      Type        In/Out Req/Opt Default
 **    x_rd           double      in     req     none
 **    y_rd           double      in     req     none
 **    nap            double      in     req     none
 **    phi            double      out    -       none
 **    lambda         double      out    -       none
 **    h              double      out    -       none
 **
 **    Additional explanation of the meaning of parameters
 **    x_rd, y_rd, nap  input RD and NAP coordinates
 **    phi, lambda, h   output ETRS89 coordinates
 **
 **    Return value: (besides the standard return values)
 **    none
 **--------------------------------------------------------------
 */
/**
 * <p>rdnap2etrs.</p>
 *
 * @param rdnap a {@link rdnaptrans.value.Cartesian} object.
 * @return a {@link rdnaptrans.value.Geographic} object.
 * @throws java.io.IOException if any.
 */
  static rdnap2etrs(rdnap) {
    return co(function* () {
      const etrs = yield Transform.rd2etrs(rdnap);
      const betterH = yield Transform.nap2etrs(etrs.phi, etrs.lambda, rdnap.Z);
      return betterH ? etrs.withH(betterH) : etrs;
    });
  }

/**
 **--------------------------------------------------------------
 **    End of RDNAPTRANS(TM)2008
 **--------------------------------------------------------------
 */
}

module.exports = Transform;


/***/ }),
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by veerr on 8-2-2017.
 */



/**
 * <p>Angle class.</p>
 *
 * @author raymond
 * @version $Id: $Id
 */

class Angle {
  /**
   * <p>Constructor for Angle.</p>
   *
   * @param Degrees a double.
   * @param Minutes a double.
   * @param Seconds a double.
   */
  constructor(Degrees, Minutes, Seconds) {
    this.Degrees = Degrees;
    this.Minutes = Minutes;
    this.Seconds = Seconds;
  }
}

module.exports = Angle;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by veerr on 26-1-2017.
 */

/* eslint no-mixed-operators: 0 */



const co = __webpack_require__(31);

const Angle = __webpack_require__(68);
const Cartesian = __webpack_require__(6);
const Geographic = __webpack_require__(7);
const GrdFile = __webpack_require__(8);
const Constants = __webpack_require__(2);

const cos = Math.cos;
const sin = Math.sin;
const asin = Math.asin;
const tan = Math.tan;
const atan = Math.atan;
/* eslint no-restricted-properties: 0 */
// Allow Math.pow as exponential operator (**) is not supported in ES6 yet
const pow = Math.pow;
const exp = Math.exp;
const sqrt = Math.sqrt;
const PI = Math.PI;
const abs = Math.abs;
const log = Math.log;

const constants = new Constants();

/**
 * <p>Helpers class.</p>
 *
 * @author reinvantveer
 * @version $Id: $Id
 */

class Helpers {
  /**
   **--------------------------------------------------------------
   **    Functions
   **--------------------------------------------------------------
   */

  /**
   **--------------------------------------------------------------
   **    Function name: deg_sin
   **    Description:   sine for angles in degrees
   **
   **    Parameter      Type        In/Out Req/Opt Default
   **    alpha          const      in     req     none
   **
   **    Additional explanation of the meaning of parameters
   **    none
   **
   **    Return value: (besides the standard return values)
   **    sin(alpha)
   **--------------------------------------------------------------
   */
  static degSin(alpha) { return sin(alpha / 180.0 * PI); }

  /**
   **--------------------------------------------------------------
   **    Function name: deg_cos
   **    Description:   cosine for angles in degrees
   **
   **    Parameter      Type        In/Out Req/Opt Default
   **    alpha          const      in     req     none
   **
   **    Additional explanation of the meaning of parameters
   **    none
   **
   **    Return value: (besides the standard return values)
   **    cos(alpha)
   **--------------------------------------------------------------
   */
  static degCos(alpha) { return cos(alpha / 180.0 * PI); }

  /**
   **--------------------------------------------------------------
   **    Function name: deg_tan
   **    Description:   tangent for angles in degrees
   **
   **    Parameter      Type        In/Out Req/Opt Default
   **    alpha          const      in     req     none
   **
   **    Additional explanation of the meaning of parameters
   **    none
   **
   **    Return value: (besides the standard return values)
   **    tan(alpha)
   **--------------------------------------------------------------
   */
  static degTan(alpha) { return tan(alpha / 180.0 * PI); }

  /**
   **--------------------------------------------------------------
   **    Function name: deg_asin
   **    Description:   inverse sine for angles in degrees
   **
   **    Parameter      Type        In/Out Req/Opt Default
   **    a              const      in     req     none
   **
   **    Additional explanation of the meaning of parameters
   **    none
   **
   **    Return value: (besides the standard return values)
   **    asin(a)
   **--------------------------------------------------------------
   */
  static degAsin(a) { return (asin(a) * 180.0 / PI); }

  /**
   **--------------------------------------------------------------
   **    Function name: deg_atan
   **    Description:   inverse tangent for angles in degrees
   **
   **    Parameter      Type        In/Out Req/Opt Default
   **    a              const in     req     none
   **
   **    Additional explanation of the meaning of parameters
   **    none
   **
   **    Return value: (besides the standard return values)
   **    atan(a)
   **--------------------------------------------------------------
   */
  static degAtan(a) { return (atan(a) * 180.0 / PI); }

  /**
   **--------------------------------------------------------------
   **    Function name: atanh
   **    Description:   inverse hyperbolic tangent
   **
   **    Parameter      Type        In/Out Req/Opt Default
   **    a              const      in     req     none
   **
   **    Additional explanation of the meaning of parameters
   **    none
   **
   **    Return value: (besides the standard return values)
   **    atanh(a)
   **--------------------------------------------------------------
   */
  static atanh(a) { return (0.5 * log((1.0 + a) / (1.0 - a))); }

  /**
   **--------------------------------------------------------------
   **    Function name: geographic2cartesian
   **    Description:   from geographic coordinates to cartesian coordinates
   **
   **    Parameter      Type        In/Out Req/Opt Default
   **    phi            const      in     req     none
   **    lambda         const      in     req     none
   **    h              const      in     req     none
   **    a              const      in     req     none
   **    inv_f          const      in     req     none
   **    x              const      out    -       none
   **    y              const      out    -       none
   **    z              const      out    -       none
   **
   **    Additional explanation of the meaning of parameters
   **    phi      latitude in degrees
   **    lambda   longitude in degrees
   **    h        ellipsoidal height
   **    a        half major axis of the ellisoid
   **    inv_f    inverse flattening of the ellipsoid
   **    x, y, z  output of cartesian coordinates
   **
   **    Return value: (besides the standard return values)
   **    none
   **--------------------------------------------------------------
   */
  static geographic2cartesian(geographic, a, inverseF) {
    /**
     **--------------------------------------------------------------
     **    Source: G. Bakker, J.C. de Munck and G.L. Strang van Hees,
     **        "Radio Positioning at Sea". Delft University of Technology, 1995.
     **--------------------------------------------------------------
     */

    /**
     **--------------------------------------------------------------
     **    Explanation of the meaning of variables:
     **        f    flattening of the ellipsoid
     **        ee   first eccentricity squared (e squared in some notations)
     **        n    second (East West) principal radius of curvature (N in some notations)
     **--------------------------------------------------------------
     */
    const f = 1.0 / inverseF;
    const ee = f * (2.0 - f);
    const n = a / sqrt(1.0 - ee * pow(Helpers.degSin(geographic.phi), 2));

    const x = (n + geographic.h) * Helpers.degCos(geographic.phi)
      * Helpers.degCos(geographic.lambda);
    const y = (n + geographic.h) * Helpers.degCos(geographic.phi)
      * Helpers.degSin(geographic.lambda);
    const z = (n * (1.0 - ee) + geographic.h) * Helpers.degSin(geographic.phi);

    return new Cartesian(x, y, z);
  }

  /**
   **--------------------------------------------------------------
   **    Function name: cartesian2geographic
   **    Description:   from cartesian coordinates to geographic coordinates
   **
   **    Parameter      Type        In/Out Req/Opt Default
   **    x              const      in     req     none
   **    y              const      in     req     none
   **    z              const      in     req     none
   **    a              const      in     req     none
   **    inverseF          const      in     req     none
   **    phi            const      out    -       none
   **    lambda         const      out    -       none
   **    h              const      out    -       none
   **
   **    Additional explanation of the meaning of parameters
   **    x, y, z  input of cartesian coordinates
   **    a        half major axis of the ellisoid
   **    inverseF    inverse flattening of the ellipsoid
   **    phi      output latitude in degrees
   **    lambda   output longitude in degrees
   **    h        output ellipsoidal height
   **
   **    Return value: (besides the standard return values)
   **    none
   **--------------------------------------------------------------
   */
  static cartesian2geographic(c, a, inverseF) {
    /**
     **--------------------------------------------------------------
     **    Source: G. Bakker, J.C. de Munck and G.L. Strang van Hees, "Radio Positioning at Sea".
     **    Delft University of Technology, 1995.
     **--------------------------------------------------------------
     */

    /**
     **--------------------------------------------------------------
     **    Explanation of the meaning of variables:
     **        f    flattening of the ellipsoid
     **        ee   first eccentricity squared (e squared in some notations)
     **        rho  distance to minor axis
     **        n    second (East West) principal radius of curvature (N in some notations)
     **--------------------------------------------------------------
     */
    const f = 1.0 / inverseF;
    const ee = f * (2.0 - f);
    const rho = sqrt(c.X * c.X + c.Y * c.Y);
    let n = 0;

    /**
     **--------------------------------------------------------------
     **    Iterative calculation of phi
     **--------------------------------------------------------------
     */
    let phi = 0;
    let previous;
    let diff = 90;

    while (diff > constants.DEG_PRECISION) {
      previous = phi;
      n = a / sqrt(1.0 - ee * pow(Helpers.degSin(phi), 2));
      phi = Helpers.degAtan((c.Z / rho) + (n * ee * (Helpers.degSin(phi) / rho)));
      diff = abs(phi - previous);
    }

    /**
     **--------------------------------------------------------------
     **     Calculation of lambda and h
     **--------------------------------------------------------------
     */
    const lambda = Helpers.degAtan(c.Y / c.X);
    const h = rho * Helpers.degCos(phi) +
      c.Z * Helpers.degSin(phi) -
      n * (1.0 - ee * pow(Helpers.degSin(phi), 2));

    return new Geographic(phi, lambda, h);
  }

  /**
   **--------------------------------------------------------------
   **    Function name: sim_trans
   **    Description:   3 dimensional similarity transformation (7 parameters)
   **    around another pivot point "a" than the origin
   **
   **    Parameter      Type        In/Out Req/Opt Default
   **    x_in           const      in     req     none
   **    y_in           const      in     req     none
   **    z_in           const      in     req     none
   **    tx             const      in     req     none
   **    ty             const      in     req     none
   **    tz             const      in     req     none
   **    alpha          const      in     req     none
   **    beta           const      in     req     none
   **    gamma          const      in     req     none
   **    delta          const      in     req     none
   **    xa             const      in     req     none
   **    ya             const      in     req     none
   **    za             const      in     req     none
   **    xOut          const      out    -       none
   **    yOut          const      out    -       none
   **    zOut          const      out    -       none
   **
   **    Additional explanation of the meaning of parameters
   **    x_in, y_in, z_in     input coordinates
   **    tx                   translation in direction of x axis
   **    ty                   translation in direction of y axis
   **    tz                   translation in direction of z axis
   **    alpha                rotation around x axis in radials
   **    beta                 rotation around y axis in radials
   **    gamma                rotation around z axis in radials
   **    delta                scale parameter (scale = 1 + delta)
   **    xa, ya, za           coordinates of pivot point a (in case
   **                         of rotation around the center of the
   **                         ellipsoid these parameters are zero)
   **    xOut, yOut, zOut  output coordinates
   **
   **    Return value: (besides the standard return values)
   **    none
   **--------------------------------------------------------------
   */
  static simTrans(input, translate, alpha, beta, gamma, delta, pivot) {
    /**
     **--------------------------------------------------------------
     **    Source: HTW, "Handleiding voor de Technische Werkzaamheden van het Kadaster".
     **    Apeldoorn: Kadaster, 1996.
     **--------------------------------------------------------------
     */

    /**
     **--------------------------------------------------------------
     **    Calculate the elements of the rotation_matrix:
     **
     **    a b c
     **    d e f
     **    g h i
     **
     **--------------------------------------------------------------
     */
    const a = cos(gamma) * cos(beta);
    const b = (cos(gamma) * sin(beta) * sin(alpha)) + (sin(gamma) * cos(alpha));
    const c = (-cos(gamma) * sin(beta) * cos(alpha)) + (sin(gamma) * sin(alpha));
    const d = -sin(gamma) * cos(beta);
    const e = (-sin(gamma) * sin(beta) * sin(alpha)) + (cos(gamma) * cos(alpha));
    const f = (sin(gamma) * sin(beta) * cos(alpha)) + (cos(gamma) * sin(alpha));
    const g = sin(beta);
    const h = -cos(beta) * sin(alpha);
    const i = cos(beta) * cos(alpha);

    /**
     **--------------------------------------------------------------
     **    Calculate the elements of the vector input_point:
     **    point_2 = input_point - pivot_point
     **--------------------------------------------------------------
     */
    const x = input.X - pivot.X;
    const y = input.Y - pivot.Y;
    const z = input.Z - pivot.Z;

    /**
     **--------------------------------------------------------------
     **    Calculate the elements of the output vector:
     **    output_point = scale * rotation_matrix * point_2 + translation_vector + pivot_point
     **--------------------------------------------------------------
     */
    const xOut = (1.0 + delta) * (a * x + b * y + c * z) + translate.X + pivot.X;
    const yOut = (1.0 + delta) * (d * x + e * y + f * z) + translate.Y + pivot.Y;
    const zOut = (1.0 + delta) * (g * x + h * y + i * z) + translate.Z + pivot.Z;

    return new Cartesian(xOut, yOut, zOut);
  }

  /**
   **--------------------------------------------------------------
   **    Function name: rdProjection
   **    Description:   stereographic const projection
   **
   **    Parameter      Type        In/Out Req/Opt Default
   **    phi            const      in     req     none
   **    lambda         const      in     req     none
   **    xRD           const      out    -       none
   **    yRD           const      out    -       none
   **
   **    Additional explanation of the meaning of parameters
   **    phi         input Bessel latitude in degrees
   **    lambda      input Bessel longitude in degrees
   **    xRD, rd_y  output RD coordinates
   **
   **    Return value: (besides the standard return values)
   **    none
   **--------------------------------------------------------------
   */
  static rdProjection(input) {
    /**
     **--------------------------------------------------------------
     **    Source: G. Bakker, J.C. de Munck and G.L. Strang van Hees,
     **    "Radio Positioning at Sea". Delft University of Technology, 1995.
     **            G. Strang van Hees, "Globale en lokale geodetische systemen".
     **    Delft: Nederlandse Commissie voor Geodesie (NCG), 1997.
     **--------------------------------------------------------------
     */

    /**
     **--------------------------------------------------------------
     **    Explanation of the meaning of constants:
     **        f                         flattening of the ellipsoid
     **        ee                        first eccentricity squared (e squared in some notations)
     **        e                         first eccentricity
     **        eea                       second eccentricity squared (e' squared in some notations)
     **
     **        phiAmersfoortSphere     latitude of projection base point Amersfoort
     **                                  on sphere in degrees
     **        lambdaAmersfoortSphere  longitude of projection base point Amersfoort
     **                                  on sphere in degrees
     **
     **        r1                        first (North South) principal radius of curvature
     **                                  in Amersfoort (M in some notations)
     **        r2                        second (East West) principal radius of curvature in
     **                                  Amersfoort (N in some notations)
     **        rSphere                  radius of sphere
     **
     **        n                         constant of Gaussian projection n = 1.000475...
     **        qAmersfoort              isometric latitude of Amersfoort on ellipsiod
     **        wAmersfoort              isometric latitude of Amersfoort on sphere
     **        m                         constant of Gaussian projection m = 0.003773...
     **                                 (also named c in some notations)
     **--------------------------------------------------------------
     */
    const f = 1 / constants.INV_F_BESSEL;
    const ee = f * (2 - f);
    const e = sqrt(ee);
    const eea = ee / (1.0 - ee);

    const phiAmersfoortSphere = Helpers.degAtan(Helpers.degTan(constants.PHI_AMERSFOORT_BESSEL) /
      sqrt(1 + eea * pow(Helpers.degCos(constants.PHI_AMERSFOORT_BESSEL), 2)));
    const lambdaAmersfoortSphere = constants.LAMBDA_AMERSFOORT_BESSEL;

    const r1 = constants.A_BESSEL * (1 - ee) /
      pow(sqrt(1 - ee * pow(Helpers.degSin(constants.PHI_AMERSFOORT_BESSEL), 2)), 3);
    const r2 = constants.A_BESSEL /
      sqrt(1.0 - ee * pow(Helpers.degSin(constants.PHI_AMERSFOORT_BESSEL), 2));
    const rSphere = sqrt(r1 * r2);

    const n = sqrt(1 + eea * pow(Helpers.degCos(constants.PHI_AMERSFOORT_BESSEL), 4));
    const qAmersfoort = Helpers.atanh(Helpers.degSin(constants.PHI_AMERSFOORT_BESSEL)) -
      (e * Helpers.atanh(e * Helpers.degSin(constants.PHI_AMERSFOORT_BESSEL)));
    const wAmersfoort = log(Helpers.degTan(45 + 0.5 * phiAmersfoortSphere));
    const m = wAmersfoort - n * qAmersfoort;

    /**
     **--------------------------------------------------------------
     **    Explanation of the meaning of variables:
     **        q                    isometric latitude on ellipsoid
     **        w                    isometric latitude on sphere
     **        phiSphere           latitude on sphere in degrees
     **        deltaLambdaSphere  difference in longitude on sphere with Amersfoort in degrees
     **        psi                  distance angle from Amersfoort on sphere
     **        alpha                azimuth from Amersfoort
     **        r                    distance from Amersfoort in projection plane
     **--------------------------------------------------------------
     */
    const q = Helpers.atanh(Helpers.degSin(input.phi)) -
      e * Helpers.atanh(e * Helpers.degSin(input.phi));
    const w = (n * q) + m;
    const phiSphere = 2 * Helpers.degAtan(exp(w)) - 90;
    const deltaLambdaSphere = n * (input.lambda - lambdaAmersfoortSphere);
    const sinHalfPsiSquared = pow(Helpers.degSin(0.5 * (phiSphere - phiAmersfoortSphere)), 2) +
      pow(Helpers.degSin(0.5 * deltaLambdaSphere), 2) *
      Helpers.degCos(phiSphere) * Helpers.degCos(phiAmersfoortSphere);
    const sinHalfPsi = sqrt(sinHalfPsiSquared);
    const cosHalfPsi = sqrt(1 - sinHalfPsiSquared);
    const tanHalfPsi = sinHalfPsi / cosHalfPsi;
    const sinPsi = 2 * sinHalfPsi * cosHalfPsi;
    const cosPsi = 1 - 2 * sinHalfPsiSquared;
    const sinAlpha = Helpers.degSin(deltaLambdaSphere) * (Helpers.degCos(phiSphere) / sinPsi);
    const cosAlpha = (Helpers.degSin(phiSphere) - Helpers.degSin(phiAmersfoortSphere) * cosPsi) /
      (Helpers.degCos(phiAmersfoortSphere) * sinPsi);
    const r = 2 * constants.SCALE_RD * rSphere * tanHalfPsi;

    const xRD = r * sinAlpha + constants.X_AMERSFOORT_RD;
    const yRD = r * cosAlpha + constants.Y_AMERSFOORT_RD;

    return new Cartesian(xRD, yRD);
  }

  /**
   **--------------------------------------------------------------
   **    Function name: inv_rd_projection
   **    Description:   inverse stereographic const projection
   **
   **    Parameter      Type        In/Out Req/Opt Default
   **    x_rd           const      in     req     none
   **    y_rd           const      in     req     none
   **    phi            const      out    -       none
   **    lambda         const      out    -       none
   **
   **    Additional explanation of the meaning of parameters
   **    x_rd, rd_y  input RD coordinates
   **    phi         output Bessel latitude in degrees
   **    lambda      output Bessel longitude in degrees
   **
   **    Return value: (besides the standard return values)
   **    none
   **--------------------------------------------------------------
   */
  static invRdProjection(input) {
    /**
     **--------------------------------------------------------------
     **    Source: G. Bakker, J.C. de Munck and G.L. Strang van Hees,
     **            "Radio Positioning at Sea". Delft University of Technology, 1995.
     **            G. Strang van Hees, "Globale en lokale geodetische systemen".
     **            Delft: Nederlandse Commissie voor Geodesie (NCG), 1997.
     **--------------------------------------------------------------
     */

    /**
     **--------------------------------------------------------------
     **    Explanation of the meaning of constants:
     **        f                         flattening of the ellipsoid
     **        ee                        first eccentricity squared (e squared in some notations)
     **        e                         first eccentricity
     **        eea                       second eccentricity squared (e' squared in some notations)
     **
     **        phiAmersfoortSphere     latitude of projection base point Amersfoort
     **                                  on sphere in degrees
     **
     **        r1                        first (North South) principal radius of curvature
     **                                  in Amersfoort (M in some notations)
     **        r2                        second (East West) principal radius of curvature
     **                                  in Amersfoort (N in some notations)
     **        rSphere                  radius of sphere
     **
     **        n                         constant of Gaussian projection n = 1.000475...
     **        qAmersfoort              isometric latitude of Amersfoort on ellipsiod
     **        wAmersfoort              isometric latitude of Amersfoort on sphere
     **        m                         constant of Gaussian projection m = 0.003773...
     **                                  (also named c in some notations)
     **--------------------------------------------------------------
     */
    const f = 1 / constants.INV_F_BESSEL;
    const ee = f * (2 - f);
    const e = sqrt(ee);
    const eea = ee / (1.0 - ee);

    const phiAmersfoortSphere = this.degAtan(this.degTan(constants.PHI_AMERSFOORT_BESSEL) /
      sqrt(1 + eea * pow(this.degCos(constants.PHI_AMERSFOORT_BESSEL), 2)));

    const r1 = constants.A_BESSEL * (1 - ee) /
      pow(sqrt(1 - ee * pow(this.degSin(constants.PHI_AMERSFOORT_BESSEL), 2)), 3);
    const r2 = constants.A_BESSEL / sqrt(1.0 - ee *
        pow(this.degSin(constants.PHI_AMERSFOORT_BESSEL), 2));
    const rSphere = sqrt(r1 * r2);

    const n = sqrt(1 + eea * pow(this.degCos(constants.PHI_AMERSFOORT_BESSEL), 4));
    const qAmersfoort = this.atanh(this.degSin(constants.PHI_AMERSFOORT_BESSEL)) -
      e * this.atanh(e * this.degSin(constants.PHI_AMERSFOORT_BESSEL));
    const wAmersfoort = log(this.degTan(45 + 0.5 * phiAmersfoortSphere));
    const m = wAmersfoort - n * qAmersfoort;

    /**
     **--------------------------------------------------------------
     **    Explanation of the meaning of variables:
     **        r                    distance from Amersfoort in projection plane
     **        alpha                azimuth from Amersfoort
     **        psi                  distance angle from Amersfoort on sphere in degrees
     **        phiSphere           latitide on sphere in degrees
     **        deltaLambdaSphere  difference in longitude on sphere with Amersfoort in degrees
     **        w                    isometric latitude on sphere
     **        q                    isometric latitude on ellipsiod
     **--------------------------------------------------------------
     */
    const r = sqrt(pow(input.X - constants.X_AMERSFOORT_RD, 2) +
      pow(input.Y - constants.Y_AMERSFOORT_RD, 2));

    let sinAlpha = (input.X - constants.X_AMERSFOORT_RD) / r;
    if (r < constants.PRECISION) sinAlpha = 0;

    let cosAlpha = (input.Y - constants.Y_AMERSFOORT_RD) / r;
    if (r < constants.PRECISION) cosAlpha = 1;

    const psi = 2 * this.degAtan(r / (2 * constants.SCALE_RD * rSphere));
    const phiSphere = this.degAsin(cosAlpha * this.degCos(phiAmersfoortSphere) *
      this.degSin(psi) + this.degSin(phiAmersfoortSphere) * this.degCos(psi));
    const deltaLambdaSphere = this.degAsin((sinAlpha * this.degSin(psi)) / this.degCos(phiSphere));

    const lambda = deltaLambdaSphere / n + constants.LAMBDA_AMERSFOORT_BESSEL;

    const w = this.atanh(this.degSin(phiSphere));
    const q = (w - m) / n;

    /**
     **--------------------------------------------------------------
     **    Iterative calculation of phi
     **--------------------------------------------------------------
     */
    let phi = 0;
    let previous;
    let diff = 90;
    while (diff > constants.DEG_PRECISION) {
      previous = phi;
      phi = 2 * this.degAtan(
        exp(q + 0.5 * e * log((1 + e * this.degSin(phi)) / (1 - e * this.degSin(phi))))
        ) - 90;
      diff = abs(phi - previous);
    }

    return new Geographic(phi, lambda);
  }

  static rdCorrection(pseudo) {
    return co(function* () {
      const gridDX = yield GrdFile.GRID_FILE_DX();
      const gridDY = yield GrdFile.GRID_FILE_DY();
      const dx = gridDX.gridInterpolation(pseudo.X, pseudo.Y);
      const dy = gridDY.gridInterpolation(pseudo.X, pseudo.Y);
      return new Cartesian(pseudo.X - dx, pseudo.Y - dy, pseudo.Z);
    });
  }

  /**
   **--------------------------------------------------------------
   **    Function name: inv_rd_correction
   **    Description:   remove the modelled distortions in the RD coordinate system
   **
   **    Parameter      Type        In/Out Req/Opt Default
   **    x_rd           const      in     req     none
   **    y_rd           const      in     req     none
   **    x_pseudo_rd    const      out    -       none
   **    x_pseudo_rd    const      out    -       none
   **
   **    Additional explanation of the meaning of parameters
   **    x_rd, y_rd                input coordinates in real RD
   **    x_pseudo_rd, y_pseudo_rd  output coordinates in undistorted pseudo RD
   **
   **    Return value: (besides the standard return values)
   **    none
   **--------------------------------------------------------------
   */
  static invRdCorrection(rd) {
    /**
     **--------------------------------------------------------------
     **    The grid values are formally in pseudo RD. For the interpolation
     *     below the RD values are used.
     **    The intoduced error is certainly smaller than 0.0001 m for the X2c.grd and Y2c.grd.
     **--------------------------------------------------------------
     */
    return co(function* () {
      const gridDX = yield GrdFile.GRID_FILE_DX();
      const gridDY = yield GrdFile.GRID_FILE_DY();

      const dx = gridDX.gridInterpolation(rd.X, rd.Y);
      const dy = gridDY.gridInterpolation(rd.X, rd.Y);
      return new Cartesian(rd.X + dx, rd.Y + dy, rd.Z);
    });
  }
}

module.exports = Helpers;


/***/ })
/******/ ]);