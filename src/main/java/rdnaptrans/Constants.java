/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rdnaptrans;

import java.net.URL;

/**
 * <p>Constants class.</p>
 *
 * @author raymond
 * @version $Id: $Id
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
    /** Constant <code>PHI_AMERSFOORT_BESSEL=52.0+ 9.0/60.0+22.178/3600.0</code> */
    public static final double PHI_AMERSFOORT_BESSEL    = 52.0+ 9.0/60.0+22.178/3600.0;
    /** Constant <code>LAMBDA_AMERSFOORT_BESSEL=5.0+23.0/60.0+15.500/3600.0</code> */
    public static final double LAMBDA_AMERSFOORT_BESSEL =  5.0+23.0/60.0+15.500/3600.0;
    /** Constant <code>H_AMERSFOORT_BESSEL=0.0</code> */
    public static final double H_AMERSFOORT_BESSEL      =  0.0;
    /*
    **--------------------------------------------------------------
    **    Continuation of static data declarations
    **    Parameters of ellipsoids Bessel1841 and GRS80
    **        a      half major axis in meters
    **        inv_f  inverse flattening
    **    Source of constants: HTW, "Handleiding voor de Technische Werkzaamheden van het Kadaster". Apeldoorn: Kadaster, 1996.
    **--------------------------------------------------------------
    */
    /** Constant <code>A_BESSEL=6377397.155</code> */
    public static final double A_BESSEL     = 6377397.155;
    /** Constant <code>INV_F_BESSEL=299.1528128</code> */
    public static final double INV_F_BESSEL = 299.1528128;
    /** Constant <code>A_ETRS=6378137</code> */
    public static final double A_ETRS       = 6378137;
    /** Constant <code>INV_F_ETRS=298.257222101</code> */
    public static final double INV_F_ETRS   = 298.257222101;
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
    **    Source of constants: A. de Bruijne, J. van Buren, A. K\u0148sters and H. van der Marel, "De geodetische referentiestelsels van Nederland; Definitie en vastlegging van ETRS89, RD en NAP en hun onderlinge relatie". Delft: Nederlandse Commissie voor Geodesie (NCG), to be published in 2005.
    **--------------------------------------------------------------
    */
    /** Constant <code>TX_BESSEL_ETRS=593.0248</code> */
    public static final double TX_BESSEL_ETRS    =  593.0248;
    /** Constant <code>TY_BESSEL_ETRS=25.9984</code> */
    public static final double TY_BESSEL_ETRS    =   25.9984;
    /** Constant <code>TZ_BESSEL_ETRS=478.7459</code> */
    public static final double TZ_BESSEL_ETRS    =  478.7459;
    /** Constant <code>ALPHA_BESSEL_ETRS=1.9342e-6</code> */
    public static final double ALPHA_BESSEL_ETRS =    1.9342e-6;
    /** Constant <code>BETA_BESSEL_ETRS=-1.6677e-6</code> */
    public static final double BETA_BESSEL_ETRS  =   -1.6677e-6;
    /** Constant <code>GAMMA_BESSEL_ETRS=9.1019e-6</code> */
    public static final double GAMMA_BESSEL_ETRS =    9.1019e-6;
    /** Constant <code>DELTA_BESSEL_ETRS=4.0725e-6</code> */
    public static final double DELTA_BESSEL_ETRS =    4.0725e-6;

    /** Constant <code>TX_ETRS_BESSEL=-593.0248</code> */
    public static final double TX_ETRS_BESSEL    = -593.0248;
    /** Constant <code>TY_ETRS_BESSEL=-25.9984</code> */
    public static final double TY_ETRS_BESSEL    =  -25.9984;
    /** Constant <code>TZ_ETRS_BESSEL=-478.7459</code> */
    public static final double TZ_ETRS_BESSEL    = -478.7459;
    /** Constant <code>ALPHA_ETRS_BESSEL=-1.9342e-6</code> */
    public static final double ALPHA_ETRS_BESSEL =   -1.9342e-6;
    /** Constant <code>BETA_ETRS_BESSEL=1.6677e-6</code> */
    public static final double BETA_ETRS_BESSEL  =    1.6677e-6;
    /** Constant <code>GAMMA_ETRS_BESSEL=-9.1019e-6</code> */
    public static final double GAMMA_ETRS_BESSEL =   -9.1019e-6;
    /** Constant <code>DELTA_ETRS_BESSEL=-4.0725e-6</code> */
    public static final double DELTA_ETRS_BESSEL =   -4.0725e-6;
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
    /** Constant <code>SCALE_RD=0.9999079</code> */
    public static final double SCALE_RD = 0.9999079;
    /** Constant <code>X_AMERSFOORT_RD=155000</code> */
    public static final double X_AMERSFOORT_RD = 155000;
    /** Constant <code>Y_AMERSFOORT_RD=463000</code> */
    public static final double Y_AMERSFOORT_RD = 463000;

    /*
    **--------------------------------------------------------------
    **    Continuation of static data declarations
    **    Precision parameters for iterations (respectively in meters and degrees)
    **--------------------------------------------------------------
    */
    /** Constant <code>PRECISION=0.0001</code> */
    public static final double PRECISION     = 0.0001;
    /** Constant <code>DEG_PRECISION=PRECISION/40e6*360</code> */
    public static final double DEG_PRECISION = PRECISION/40e6*360;
    /*
    **--------------------------------------------------------------
    **    Continuation of static data declarations
    **    Mean difference between NAP and ellipsoidal Bessel height. This is only used for getting from x, y in RD to phi, lambda in ETRS89.
    **--------------------------------------------------------------
    */
    /** Constant <code>MEAN_GEOID_HEIGHT_BESSEL=0.0</code> */
    public static final double MEAN_GEOID_HEIGHT_BESSEL = 0.0;
}
