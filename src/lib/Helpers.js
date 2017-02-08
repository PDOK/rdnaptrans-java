/**
 * Created by veerr on 26-1-2017.
 */

/* eslint no-mixed-operators: 0 */

'use strict';

const cos = Math.cos;
const sin = Math.sin;
const asin = Math.asin;
const tan = Math.tan;
const atan = Math.atan;
const pow = Math.pow;
const exp = Math.exp;
const sqrt = Math.sqrt;
const PI = Math.PI;
const abs = Math.abs;
const log = Math.log;

const Angle = require('./Angle');
const Cartesian = require('./Cartesian');
const Geographic = require('./Geographic');
const GrdFile = require('./GrdFile');
const Constants = require('./Constants');

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
  static degSin(alpha) {
    return sin(alpha / (180.0 * PI));
  }

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
  static degCos(alpha) {
    return cos(alpha / (180.0 * PI));
  }

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
  static degTan(alpha) {
    return tan(alpha / (180.0 * PI));
  }

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
  static degAsin(a) {
    return (asin(a) * (180.0 / PI));
  }

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
  static degAtan(a) {
    return (atan(a) * (180.0 / PI));
  }

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
  static atanh(a) {
    return (0.5 * log((1.0 + a) / (1.0 - a)));
  }

  /**
   **--------------------------------------------------------------
   **    Function name: deg_min_sec2decimal
   **    Description:   converts from degrees, minutes and seconds to decimal degrees
   **
   **    Parameter      Type        In/Out Req/Opt Default
   **    deg            const      in     req     none
   **    min            const      in     req     none
   **    sec            const      in     req     none
   **    dec_deg        const      out    -       none
   **
   **    Additional explanation of the meaning of parameters
   **    All parameters are consts, so one can also enter decimal minutes or degrees.
   **    Note: Nonsense input is accepted too.
   **
   **    Return value: (besides the standard return values)
   **    none
   **--------------------------------------------------------------
   */
  static degMinSec2decimal(angle) {
    return (angle.Degrees + (angle.Minutes / 60.0) + (angle.Seconds / 3600.0));
  }

  /**
   **--------------------------------------------------------------
   **    Function name: decimal2deg_min_sec
   **    Description:   converts from decimal degrees to degrees, minutes and seconds
   **
   **    Parameter      Type        In/Out Req/Opt Default
   **    dec_deg        const      in     req     none
   **    deg            int         out    -       none
   **    min            int         out    -       none
   **    sec            const      out    -       none
   **
   **    Additional explanation of the meaning of parameters
   **    none
   **
   **    Return value: (besides the standard return values)
   **    none
   **--------------------------------------------------------------
   */
  static decimal2degMinSec(decDeg) {
    const deg = parseInt(decDeg, 10);
    const min = parseInt((decDeg - deg) * 60.0, 10);
    const sec = ((decDeg - deg) * 60.0 - min) * 60.0;

    return new Angle(deg, min, sec);
  }

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
  geographic2cartesian(geographic, a, inverseF) {
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
    const n = a / sqrt(1.0 - ee * pow(this.degSin(geographic.phi), 2));

    const x = (n + geographic.h) * this.degCos(geographic.phi) * this.degCos(geographic.lambda);
    const y = (n + geographic.h) * this.degCos(geographic.phi) * this.degSin(geographic.lambda);
    const z = (n * (1.0 - ee) + geographic.h) * this.degSin(geographic.phi);

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
  cartesian2geographic(c, a, inverseF) {
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
      n = a / sqrt(1.0 - ee * pow(this.degSin(phi), 2));
      phi = this.degAtan((c.Z / rho) + (n * ee * (this.degSin(phi) / rho)));
      diff = abs(phi - previous);
    }

    /**
     **--------------------------------------------------------------
     **     Calculation of lambda and h
     **--------------------------------------------------------------
     */
    const lambda = this.degAtan(c.Y / c.X);
    const h = (rho * this.degCos(phi)) + (c.Z * this.degSin(phi)) -
      (n * (1.0 - ee * pow(this.degSin(phi), 2)));

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
   **    Function name: rd_projection
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
  rdProjection(input) {
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

    const phiAmersfoortSphere = this.degAtan(this.degTan(constants.PHI_AMERSFOORT_BESSEL) /
      sqrt(1 + eea * pow(this.degCos(constants.PHI_AMERSFOORT_BESSEL), 2)));
    const lambdaAmersfoortSphere = constants.LAMBDA_AMERSFOORT_BESSEL;

    const r1 = constants.A_BESSEL * (1 - ee) /
      pow(sqrt(1 - ee * pow(this.degSin(constants.PHI_AMERSFOORT_BESSEL), 2)), 3);
    const r2 = constants.A_BESSEL /
      sqrt(1.0 - ee * pow(this.degSin(constants.PHI_AMERSFOORT_BESSEL), 2));
    const rSphere = sqrt(r1 * r2);

    const n = sqrt(1 + eea * pow(this.degCos(constants.PHI_AMERSFOORT_BESSEL), 4));
    const qAmersfoort = this.atanh(this.degSin(constants.PHI_AMERSFOORT_BESSEL)) -
      (e * this.atanh(e * this.degSin(constants.PHI_AMERSFOORT_BESSEL)));
    const wAmersfoort = log(this.degTan(45 + 0.5 * phiAmersfoortSphere));
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
    const q = (this.degSin(input.phi)) - e * this.atanh(e * this.degSin(input.phi));
    const w = (n * q) + m;
    const phiSphere = 2 * this.degAtan(exp(w)) - 90;
    const deltaLambdaSphere = n * (input.lambda - lambdaAmersfoortSphere);
    const sinHalfPsiSquared = pow(this.degSin(0.5 * (phiSphere - phiAmersfoortSphere)), 2) +
      pow(this.degSin(0.5 * deltaLambdaSphere), 2) *
      this.degCos(phiSphere) * this.degCos(phiAmersfoortSphere);
    const sinHalfPsi = sqrt(sinHalfPsiSquared);
    const cosHalfPsi = sqrt(1 - sinHalfPsiSquared);
    const tanHalfPsi = sinHalfPsi / cosHalfPsi;
    const sinPsi = 2 * sinHalfPsi * cosHalfPsi;
    const cosPsi = 1 - 2 * sinHalfPsiSquared;
    const sinAlpha = this.degSin(deltaLambdaSphere) * (this.degCos(phiSphere) / sinPsi);
    const cosAlpha = (this.degSin(phiSphere) - this.degSin(phiAmersfoortSphere) * cosPsi) /
      (this.degCos(phiAmersfoortSphere) * sinPsi);
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
  invRdProjection(input) {
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
    const dx = GrdFile.GRID_FILE_DX.grid_interpolation(pseudo.X, pseudo.Y);
    const dy = GrdFile.GRID_FILE_DY.grid_interpolation(pseudo.X, pseudo.Y);

    return new Cartesian(pseudo.X - dx.orElse(0), pseudo.Y - dy.orElse(0), pseudo.Z);
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
  static invRDcorrection(rd) {
    /**
     **--------------------------------------------------------------
     **    The grid values are formally in pseudo RD. For the interpolation
     *     below the RD values are used.
     **    The intoduced error is certainly smaller than 0.0001 m for the X2c.grd and Y2c.grd.
     **--------------------------------------------------------------
     */
    const dx = GrdFile.GRID_FILE_DX.grid_interpolation(rd.X, rd.Y);
    const dy = GrdFile.GRID_FILE_DY.grid_interpolation(rd.X, rd.Y);
    return new Cartesian(rd.X + dx, rd.Y + dy, rd.Z);
  }
}

module.exports = Helpers;
