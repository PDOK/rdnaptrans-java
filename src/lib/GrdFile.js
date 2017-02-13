/**
 * Created by veerr on 8-2-2017.
 */

'use strict';

const path = require('path');
const xtend = require('xtend');
const Constants = require('./Constants');
const Reader = require('./Reader');

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
          const idString = data.slice(cursor, cursor + 4)
            .toString();
          cursor += 4;

          /**
           **--------------------------------------------------------------
           **    Checks
           **--------------------------------------------------------------
           */

          if (idString !== 'DSBB') {
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

    const sizeX = input.readUInt16LE(cursor);
    cursor += 2;
    const sizeY = input.readUInt16LE(cursor);
    cursor += 2;
    const minX = input.readDoubleLE(cursor);
    cursor += 8;
    const maxX = input.readDoubleLE(cursor);
    cursor += 8;
    const minY = input.readDoubleLE(cursor);
    cursor += 8;
    const maxY = input.readDoubleLE(cursor);
    cursor += 8;
    const minValue = input.readDoubleLE(cursor);
    cursor += 8;
    const maxValue = input.readDoubleLE(cursor);

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

    try {
      return b.readFloatLE(b);
    } catch (err) {
      console.error(err.stack);
    }
  }

  /**
   * Will implement the calculations that are
   * to be remembered thanks to this class
   * (one calculation per distinct parameter)
   * @param p Calc V for p
   * @return v based on p
   */
  calc(recordNumber) {
    return this.readGrdFileBody(recordNumber);
  }
}

module.exports = GrdFile;
