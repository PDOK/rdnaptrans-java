/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rdnaptrans;

import java.net.URL;

/**
 *
 * @author raymond
 */
public class Constants {
    /*
    **--------------------------------------------------------------
    **    Static data declarations
    **    Mathematical constant pi = 3.14...
    **--------------------------------------------------------------
    */
    //static final double PI = Math.PI;
    /*
    **--------------------------------------------------------------
    **    Continuation of static data declarations
    **    Geographic NL-Bessel coordinates of Amersfoort (pivot point and projection base point)
    **        phi     latitude in decimal degrees
    **        lambda  longitude in decimal degrees
    **        h       ellipsoidal height in meters
    **    Source of constants:
    **        Hk.J. Heuvelink, "De stereografische kaartprojectie in hare toepassing bij de Rijksdriehoeksmeting". Delft: Rijkscommissie voor Graadmeting en Waterpassing, 1918.
    **        HTW, "Handleiding voor de Technische Werkzaamheden van het Kadaster". Apeldoorn: Kadaster, 1996.
    **--------------------------------------------------------------
    */
    static final double PHI_AMERSFOORT_BESSEL    = 52.0+ 9.0/60.0+22.178/3600.0;
    static final double LAMBDA_AMERSFOORT_BESSEL =  5.0+23.0/60.0+15.500/3600.0;
    static final double H_AMERSFOORT_BESSEL      =  0.0;
    /*
    **--------------------------------------------------------------
    **    Continuation of static data declarations
    **    Parameters of ellipsoids Bessel1841 and GRS80
    **        a      half major axis in meters
    **        inv_f  inverse flattening
    **    Source of constants: HTW, "Handleiding voor de Technische Werkzaamheden van het Kadaster". Apeldoorn: Kadaster, 1996.
    **--------------------------------------------------------------
    */
    static final double A_BESSEL     = 6377397.155;
    static final double INV_F_BESSEL = 299.1528128;
    static final double A_ETRS       = 6378137;
    static final double INV_F_ETRS   = 298.257222101;
    /*
    **--------------------------------------------------------------
    **    Continuation of static data declarations
    **    Transformation parameters relative to pivot point Amersfoort. Note: Do NOT confuse with parameters for the center of the ellipsoid!
    **        tx     translation in direction of x axis in meters
    **        ty     translation in direction of y axis in meters
    **        tz     translation in direction of z axis in meters
    **        alpha  rotation around x axis in radials
    **        beta   rotation around y axis in radials
    **        gamma  rotation around z axis in radials
    **        delta  scale parameter (scale = 1 + delta)
    **    Source of constants: A. de Bruijne, J. van Buren, A. Kösters and H. van der Marel, "De geodetische referentiestelsels van Nederland; Definitie en vastlegging van ETRS89, RD en NAP en hun onderlinge relatie". Delft: Nederlandse Commissie voor Geodesie (NCG), to be published in 2005.
    **--------------------------------------------------------------
    */
    static final double TX_BESSEL_ETRS    =  593.0248;
    static final double TY_BESSEL_ETRS    =   25.9984;
    static final double TZ_BESSEL_ETRS    =  478.7459;
    static final double ALPHA_BESSEL_ETRS =    1.9342e-6;
    static final double BETA_BESSEL_ETRS  =   -1.6677e-6;
    static final double GAMMA_BESSEL_ETRS =    9.1019e-6;
    static final double DELTA_BESSEL_ETRS =    4.0725e-6;

    static final double TX_ETRS_BESSEL    = -593.0248;
    static final double TY_ETRS_BESSEL    =  -25.9984;
    static final double TZ_ETRS_BESSEL    = -478.7459;
    static final double ALPHA_ETRS_BESSEL =   -1.9342e-6;
    static final double BETA_ETRS_BESSEL  =    1.6677e-6;
    static final double GAMMA_ETRS_BESSEL =   -9.1019e-6;
    static final double DELTA_ETRS_BESSEL =   -4.0725e-6;
    /*
    **--------------------------------------------------------------
    **    Continuation of static data declarations
    **    Parameters of RD projection
    **        scale         scale factor (k in some notations)
    **                      this factor was first defined by Hk.J. Heuvelink as pow(10,-400e-7), nowadays we define it as exactly 0.9999079
    **        x_amersfoort  false Easting
    **        y_amersfoort  false Northing
    **    Source of constants:
    **        G. Bakker, J.C. de Munck and G.L. Strang van Hees, "Radio Positioning at Sea". Delft University of Technology, 1995.
    **        G. Strang van Hees, "Globale en lokale geodetische systemen". Delft: Nederlandse Commissie voor Geodesie (NCG), 1997.
    **--------------------------------------------------------------
    */
    static final double SCALE_RD = 0.9999079;
    static final double X_AMERSFOORT_RD = 155000;
    static final double Y_AMERSFOORT_RD = 463000;
    /*
    **--------------------------------------------------------------
    **    Continuation of static data declarations
    **    Names of grd files
    **
    **    Grd files are binary grid files in the format of the program Surfer(R)
    **    The header contains information on the number of grid points, bounding box and extreme values.
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
    **        50° 31' 30" < ETRS89_latitude  (stepsize 0° 3' 0") < 53° 40' 30"
    **         3° 12' 30" < ETRS89_longitude (stepsize 0° 5' 0") <  7° 27' 30"
    **
    **        The stepsizes correspond to about 5,5 km x 5,5 km in the Netherlands.
    **--------------------------------------------------------------
    */
    static final URL GRID_FILE_DX = ClassLoader.getSystemResource("rdnaptrans/x2c.grd");
    static final URL GRID_FILE_DY = ClassLoader.getSystemResource("rdnaptrans/y2c.grd");
    static final URL GRID_FILE_GEOID = ClassLoader.getSystemResource("rdnaptrans/nlgeo04.grd");
    /*
    **--------------------------------------------------------------
    **    Continuation of static data declarations
    **    Precision parameters for iterations (respectively in meters and degrees)
    **--------------------------------------------------------------
    */
    static final double PRECISION     = 0.0001;
    static final double DEG_PRECISION = PRECISION/40e6*360;
    /*
    **--------------------------------------------------------------
    **    Continuation of static data declarations
    **    Mean difference between NAP and ellipsoidal Bessel height. This is only used for getting from x, y in RD to phi, lambda in ETRS89.
    **--------------------------------------------------------------
    */
    static final double MEAN_GEOID_HEIGHT_BESSEL = 0.0;
}
