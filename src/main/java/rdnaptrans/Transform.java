/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rdnaptrans;

import java.io.IOException;
import static rdnaptrans.Constants.*;
import static rdnaptrans.Helpers.*;
import rdnaptrans.value.Cartesian;
import rdnaptrans.value.Geographic;
import rdnaptrans.value.OptionalDouble;

/**
 *
 * @author raymond
 */
public class Transform {
    /* JAVA PORT
**--------------------------------------------------------------
**    RDNAPTRANS(TM)2008
**
**    Authors: Jochem Lesparre, Joop van Buren, Marc Crombaghs, Frank Dentz, Arnoud Pol, Sander Oude Elberink
**             http://www.rdnap.nl
**    Based on RDNAPTRANS2004
**    Main changes:
**    - 7 similarity transformation parameters
**    - 0.0088 offset in the transformation between ellipsoidal height (h) and orthometric heights (NAP)
**    - coordinates are computed also outside the validity regions of the grid files x2c.grd, y2c.grd and nlgeo04.grd
**--------------------------------------------------------------
*/

/*
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
static Cartesian etrs2rd(Geographic etrs) throws IOException
{
    double x_amersfoort_etrs;
    double y_amersfoort_etrs;
    double z_amersfoort_etrs;

    /*
    **--------------------------------------------------------------
    **    Calculate the cartesian ETRS89 coordinates of the pivot point Amersfoort
    **--------------------------------------------------------------
    */
    Cartesian amersfoort_bessel = geographic2cartesian(new Geographic(PHI_AMERSFOORT_BESSEL, LAMBDA_AMERSFOORT_BESSEL, H_AMERSFOORT_BESSEL),
                         A_BESSEL, INV_F_BESSEL);
    x_amersfoort_etrs = amersfoort_bessel.X +TX_BESSEL_ETRS;
    y_amersfoort_etrs = amersfoort_bessel.Y +TY_BESSEL_ETRS;
    z_amersfoort_etrs = amersfoort_bessel.Z +TZ_BESSEL_ETRS;

    /*
    **--------------------------------------------------------------
    **    Convert ETRS89 coordinates to RD coordinates
    **    (To convert from degrees, minutes and seconds use the function deg_min_sec2decimal() here)
    **--------------------------------------------------------------
    */
    Cartesian cartesian_etrs = geographic2cartesian(etrs,
                         A_ETRS, INV_F_ETRS);
    Cartesian cartesian_bessel = sim_trans(cartesian_etrs,
              new Cartesian(TX_ETRS_BESSEL, TY_ETRS_BESSEL, TZ_ETRS_BESSEL),
              ALPHA_ETRS_BESSEL, BETA_ETRS_BESSEL, GAMMA_ETRS_BESSEL,
              DELTA_ETRS_BESSEL,
              new Cartesian(x_amersfoort_etrs, y_amersfoort_etrs, z_amersfoort_etrs));
    
    Geographic geographic_bessel = cartesian2geographic(cartesian_bessel,
                         A_BESSEL, INV_F_BESSEL);
    
    Cartesian pseudo_rd = rd_projection(geographic_bessel);
    return rd_correction(pseudo_rd).withZ(geographic_bessel.h);
}

/*
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
static Geographic rd2etrs(Cartesian rd) throws IOException
{
    /*
    **--------------------------------------------------------------
    **    Calculate the cartesian Bessel coordinates of the pivot point Amersfoort
    **--------------------------------------------------------------
    */
    Cartesian amersfoort_bessel = geographic2cartesian(new Geographic(PHI_AMERSFOORT_BESSEL, LAMBDA_AMERSFOORT_BESSEL, H_AMERSFOORT_BESSEL),
                         A_BESSEL, INV_F_BESSEL);

    /*
    **--------------------------------------------------------------
    **    Calculate appoximated value of ellipsoidal Bessel height
    **    The error made by using a constant for de Bessel geoid height is max. circa 1 meter in the ellipsoidal height (for the NLGEO2004 geoid model). This intoduces an error in the phi, lambda position too, this error is nevertheless certainly smaller than 0.0001 m.
    **--------------------------------------------------------------
    */
    double h_bessel = rd.Z + MEAN_GEOID_HEIGHT_BESSEL;

    /*
    **--------------------------------------------------------------
    **    Convert RD coordinates to ETRS89 coordinates
    **--------------------------------------------------------------
    */
    Cartesian pseudo_rd = inv_rd_correction(rd);
    Geographic etrs_bessel = inv_rd_projection(pseudo_rd);
    Cartesian cartesian_bessel = geographic2cartesian(etrs_bessel.withH(h_bessel), A_BESSEL, INV_F_BESSEL);
    Cartesian cartesian_etrs = sim_trans(cartesian_bessel,
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
static OptionalDouble etrs2nap(Geographic etrs) throws IOException
{
    /*
    **--------------------------------------------------------------
    **    Explanation of the meaning of variables:
    **        n  geoid height
    **    on error (outside geoid grid) nap is not compted
    **    instead in etrs2rdnap nap=h_bessel
    **--------------------------------------------------------------
    */
    
    OptionalDouble n = grid_interpolation(etrs.lambda, etrs.phi, GRID_FILE_GEOID);
    
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
static OptionalDouble nap2etrs(double phi, double lambda, double nap) throws IOException
{
    /*
    **--------------------------------------------------------------
    **    Explanation of the meaning of variables:
    **        n  geoid height
    **--------------------------------------------------------------
    */
    OptionalDouble n = grid_interpolation(lambda, phi, GRID_FILE_GEOID);
    
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
static Cartesian etrs2rdnap(Geographic etrs) throws IOException
{
    Cartesian rd = etrs2rd(etrs);
    OptionalDouble better_h = etrs2nap(etrs);
    if (better_h.isPresent()) {
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
static Geographic rdnap2etrs(Cartesian rdnap) throws IOException
{
    Geographic etrs = rd2etrs(rdnap);
    OptionalDouble better_h = nap2etrs(etrs.phi,  etrs.lambda, rdnap.Z);
    
    if (better_h.isPresent()) {
        return etrs.withH(better_h.getAsDouble());
    }
    else {
        return etrs;
    }
}

/*
**--------------------------------------------------------------
**    End of RDNAPTRANS(TM)2008
**--------------------------------------------------------------
*/
}
