/**
 * Created by veerr on 10-2-2017.
 */

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

    const pseudoRD = Helpers.rdProjection(geographicBessel);
    const correction = Helpers.rdCorrection(pseudoRD);
    return correction
      .then(cartesian => cartesian.withZ(geographicBessel.h))
      .catch(err => { throw err; });
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
static rd2etrs(rd){
  /*
   **--------------------------------------------------------------
   **    Calculate the cartesian Bessel coordinates of the pivot point Amersfoort
   **--------------------------------------------------------------
   */
  const amersfoort_bessel = geographic2cartesian(new Geographic(PHI_AMERSFOORT_BESSEL, LAMBDA_AMERSFOORT_BESSEL, H_AMERSFOORT_BESSEL),
  A_BESSEL, INV_F_BESSEL);

  /*
   **--------------------------------------------------------------
   **    Calculate appoximated value of ellipsoidal Bessel height
   **    The error made by using a constant for de Bessel geoid height is max. circa 1 meter in the ellipsoidal height (for the NLGEO2004 geoid model). This intoduces an error in the phi, lambda position too, this error is nevertheless certainly smaller than 0.0001 m.
   **--------------------------------------------------------------
   */
  const h_bessel = rd.Z + MEAN_GEOID_HEIGHT_BESSEL;

  /*
   **--------------------------------------------------------------
   **    Convert RD coordinates to ETRS89 coordinates
   **--------------------------------------------------------------
   */
  const pseudo_rd = inv_rd_correction(rd);
  const etrs_bessel = inv_rd_projection(pseudo_rd);
  const cartesian_bessel = helpers.geographic2cartesian(etrs_bessel.withH(h_bessel), A_BESSEL, INV_F_BESSEL);
  const cartesian_etrs = sim_trans(cartesian_bessel,
  new Cartesian(TX_BESSEL_ETRS, TY_BESSEL_ETRS, TZ_BESSEL_ETRS),
  ALPHA_BESSEL_ETRS, BETA_BESSEL_ETRS, GAMMA_BESSEL_ETRS,
  DELTA_BESSEL_ETRS,
  amersfoort_bessel);
  return cartesian2geographic(cartesian_etrs,
    A_ETRS, INV_F_ETRS);
  /*
   **--------------------------------------------------------------
   **    To convert to degrees, minutes and seconds use the function decimal2deg_min_sec() here
   **--------------------------------------------------------------
   */
}

/*
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
static etrs2nap(etrs){
  /*
   **--------------------------------------------------------------
   **    Explanation of the meaning of variables:
   **        n  geoid height
   **    on error (outside geoid grid) nap is not compted
   **    instead in etrs2rdnap nap=h_bessel
   **--------------------------------------------------------------
   */

  const n = GrdFile.GRID_FILE_GEOID.grid_interpolation(etrs.lambda, etrs.phi);

  if (n.isPresent()) {
    return OptionalDouble.of(etrs.h-n.getAsDouble()+0.0088);
  }
  else {
    return OptionalDouble.empty();
  }

}

/*
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
  /*
   **--------------------------------------------------------------
   **    Explanation of the meaning of variables:
   **        n  geoid height
   **--------------------------------------------------------------
   */
  const n = GrdFile.GRID_FILE_GEOID.grid_interpolation(lambda, phi);

  if (n.isPresent()) {
    return OptionalDouble.of(nap+n.getAsDouble()-0.0088);
  }
  else {
    return OptionalDouble.empty();
  }
}

/*
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
  const rd = etrs2rd(etrs);
  const better_h = etrs2nap(etrs);
  if (better_h) {
    return rd.withZ(better_h.getAsDouble());
  }
  else {
    return rd;
  }
}

/*
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
  const etrs = rd2etrs(rdnap);
  const better_h = nap2etrs(etrs.phi,  etrs.lambda, rdnap.Z);

  if (better_h) {
    return etrs.withH(better_h.getAsDouble());
  }
  else {
    return etrs;
  }
}

/**
 **--------------------------------------------------------------
 **    End of RDNAPTRANS(TM)2008
 **--------------------------------------------------------------
 */
}

module.exports = Transform;
