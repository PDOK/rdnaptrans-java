/**
 * Created by veerr on 10-2-2017.
 */

const co = require('co');

const Helpers = require('./lib/Helpers');
const Constants = require('./lib/Constants');
const Cartesian = require('./lib/Cartesian');
const Geographic = require('./lib/Geographic');
const GrdFile = require('./lib/GrdFile');

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
