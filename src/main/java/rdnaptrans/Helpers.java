package rdnaptrans;

import java.io.IOException;
import java.io.InputStream;
import static java.lang.Math.*;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import rdnaptrans.value.OptionalDouble;
import static rdnaptrans.Constants.*;
import rdnaptrans.value.Angle;
import rdnaptrans.value.Cartesian;
import rdnaptrans.value.Geographic;
import rdnaptrans.value.GrdFile;

/**
 *
 * @author raymond
 */
public class Helpers {
    /*
    **--------------------------------------------------------------
    **    Functions
    **--------------------------------------------------------------
    */

    /*
    **--------------------------------------------------------------
    **    Function name: deg_sin
    **    Description:   sine for angles in degrees
    **
    **    Parameter      Type        In/Out Req/Opt Default
    **    alpha          double      in     req     none
    **
    **    Additional explanation of the meaning of parameters
    **    none
    **
    **    Return value: (besides the standard return values)
    **    sin(alpha)
    **--------------------------------------------------------------
    */
    static double deg_sin(double alpha)
    {
        return sin(alpha/180.0*PI);
    }

    /*
    **--------------------------------------------------------------
    **    Function name: deg_cos
    **    Description:   cosine for angles in degrees
    **
    **    Parameter      Type        In/Out Req/Opt Default
    **    alpha          double      in     req     none
    **
    **    Additional explanation of the meaning of parameters
    **    none
    **
    **    Return value: (besides the standard return values)
    **    cos(alpha)
    **--------------------------------------------------------------
    */
    static double deg_cos(double alpha)
    {
        return cos(alpha/180.0*PI);
    }

    /*
    **--------------------------------------------------------------
    **    Function name: deg_tan
    **    Description:   tangent for angles in degrees
    **
    **    Parameter      Type        In/Out Req/Opt Default
    **    alpha          double      in     req     none
    **
    **    Additional explanation of the meaning of parameters
    **    none
    **
    **    Return value: (besides the standard return values)
    **    tan(alpha)
    **--------------------------------------------------------------
    */
    static double deg_tan(double alpha)
    {
        return tan(alpha/180.0*PI);
    }

    /*
    **--------------------------------------------------------------
    **    Function name: deg_asin
    **    Description:   inverse sine for angles in degrees
    **
    **    Parameter      Type        In/Out Req/Opt Default
    **    a              double      in     req     none
    **
    **    Additional explanation of the meaning of parameters
    **    none
    **
    **    Return value: (besides the standard return values)
    **    asin(a)
    **--------------------------------------------------------------
    */
    static double deg_asin(double a)
    {
        return (asin(a)*180.0/PI);
    }

    /*
    **--------------------------------------------------------------
    **    Function name: deg_atan
    **    Description:   inverse tangent for angles in degrees
    **
    **    Parameter      Type        In/Out Req/Opt Default
    **    a              double in     req     none
    **
    **    Additional explanation of the meaning of parameters
    **    none
    **
    **    Return value: (besides the standard return values)
    **    atan(a)
    **--------------------------------------------------------------
    */
    static double deg_atan(double a)
    {
        return (atan(a)*180.0/PI);
    }

    /*
    **--------------------------------------------------------------
    **    Function name: atanh
    **    Description:   inverse hyperbolic tangent
    **
    **    Parameter      Type        In/Out Req/Opt Default
    **    a              double      in     req     none
    **
    **    Additional explanation of the meaning of parameters
    **    none
    **
    **    Return value: (besides the standard return values)
    **    atanh(a)
    **--------------------------------------------------------------
    */
    static double atanh(double a)
    {
        return (0.5*log((1.0+a)/(1.0-a)));
    }

    /*
    **--------------------------------------------------------------
    **    Function name: deg_min_sec2decimal
    **    Description:   converts from degrees, minutes and seconds to decimal degrees
    **
    **    Parameter      Type        In/Out Req/Opt Default
    **    deg            double      in     req     none
    **    min            double      in     req     none
    **    sec            double      in     req     none
    **    dec_deg        double      out    -       none
    **
    **    Additional explanation of the meaning of parameters
    **    All parameters are doubles, so one can also enter decimal minutes or degrees.
    **    Note: Nonsense input is accepted too.
    **
    **    Return value: (besides the standard return values)
    **    none
    **--------------------------------------------------------------
    */
    static double deg_min_sec2decimal(Angle angle)
    {
        return (angle.Degrees+angle.Minutes/60.0+angle.Seconds/3600.0);
    }

    /*
    **--------------------------------------------------------------
    **    Function name: decimal2deg_min_sec
    **    Description:   converts from decimal degrees to degrees, minutes and seconds
    **
    **    Parameter      Type        In/Out Req/Opt Default
    **    dec_deg        double      in     req     none
    **    deg            int         out    -       none
    **    min            int         out    -       none
    **    sec            double      out    -       none
    **
    **    Additional explanation of the meaning of parameters
    **    none
    **
    **    Return value: (besides the standard return values)
    **    none
    **--------------------------------------------------------------
    */
    static Angle decimal2deg_min_sec(double dec_deg)
    {
        int deg = (int) (dec_deg);
        int min = (int) ((dec_deg-deg)*60.0);
        double sec = ((dec_deg-deg)*60.0-min)*60.0;
        
        return new Angle(deg, min, sec);
    }

    /*
    **--------------------------------------------------------------
    **    Function name: geographic2cartesian
    **    Description:   from geographic coordinates to cartesian coordinates
    **
    **    Parameter      Type        In/Out Req/Opt Default
    **    phi            double      in     req     none
    **    lambda         double      in     req     none
    **    h              double      in     req     none
    **    a              double      in     req     none
    **    inv_f          double      in     req     none
    **    x              double      out    -       none
    **    y              double      out    -       none
    **    z              double      out    -       none
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
    static Cartesian geographic2cartesian(Geographic g, double a, double inv_f)
    {
        /*
        **--------------------------------------------------------------
        **    Source: G. Bakker, J.C. de Munck and G.L. Strang van Hees, "Radio Positioning at Sea". Delft University of Technology, 1995.
        **--------------------------------------------------------------
        */

        /*
        **--------------------------------------------------------------
        **    Explanation of the meaning of variables:
        **        f    flattening of the ellipsoid
        **        ee   first eccentricity squared (e squared in some notations)
        **        n    second (East West) principal radius of curvature (N in some notations)
        **--------------------------------------------------------------
        */
        double f  = 1.0/inv_f;
        double ee = f*(2.0-f);
        double n  = a/sqrt(1.0-ee*pow(deg_sin(g.phi),2));
        
        double x = (n+g.h)*deg_cos(g.phi)*deg_cos(g.lambda);
        double y = (n+g.h)*deg_cos(g.phi)*deg_sin(g.lambda);
        double z = (n*(1.0-ee)+g.h)*deg_sin(g.phi);
        
        return new Cartesian(x, y, z);
    }

    /*
    **--------------------------------------------------------------
    **    Function name: cartesian2geographic
    **    Description:   from cartesian coordinates to geographic coordinates
    **
    **    Parameter      Type        In/Out Req/Opt Default
    **    x              double      in     req     none
    **    y              double      in     req     none
    **    z              double      in     req     none
    **    a              double      in     req     none
    **    inv_f          double      in     req     none
    **    phi            double      out    -       none
    **    lambda         double      out    -       none
    **    h              double      out    -       none
    **
    **    Additional explanation of the meaning of parameters
    **    x, y, z  input of cartesian coordinates
    **    a        half major axis of the ellisoid
    **    inv_f    inverse flattening of the ellipsoid
    **    phi      output latitude in degrees
    **    lambda   output longitude in degrees
    **    h        output ellipsoidal height
    **
    **    Return value: (besides the standard return values)
    **    none
    **--------------------------------------------------------------
    */
    static Geographic cartesian2geographic(Cartesian c, double a, double inv_f)
    {
        /*
        **--------------------------------------------------------------
        **    Source: G. Bakker, J.C. de Munck and G.L. Strang van Hees, "Radio Positioning at Sea". Delft University of Technology, 1995.
        **--------------------------------------------------------------
        */

        /*
        **--------------------------------------------------------------
        **    Explanation of the meaning of variables:
        **        f    flattening of the ellipsoid
        **        ee   first eccentricity squared (e squared in some notations)
        **        rho  distance to minor axis
        **        n    second (East West) principal radius of curvature (N in some notations)
        **--------------------------------------------------------------
        */
        double f   = 1.0/inv_f;
        double ee  = f*(2.0-f);
        double rho = sqrt(c.X*c.X+c.Y*c.Y);
        double n = 0;

        /*
        **--------------------------------------------------------------
        **    Iterative calculation of phi
        **--------------------------------------------------------------
        */
        double phi=0;
        double previous;
        double diff=90;
        while (diff>DEG_PRECISION)
        {
            previous = phi;
            n        = a/sqrt(1.0-ee*pow(deg_sin(phi),2));
            phi      = deg_atan(c.Z/rho+n*ee*deg_sin(phi)/rho);
            diff     = abs(phi-previous);
        }

        /*
        **--------------------------------------------------------------
        **     Calculation of lambda and h
        **--------------------------------------------------------------
        */
        double lambda = deg_atan(c.Y/c.X);
        double h      = rho*deg_cos(phi)+c.Z*deg_sin(phi)-n*(1.0-ee*pow(deg_sin(phi),2));
        
        return new Geographic(phi, lambda, h);
    }

    /*
    **--------------------------------------------------------------
    **    Function name: sim_trans
    **    Description:   3 dimensional similarity transformation (7 parameters) around another pivot point "a" than the origin
    **
    **    Parameter      Type        In/Out Req/Opt Default
    **    x_in           double      in     req     none
    **    y_in           double      in     req     none
    **    z_in           double      in     req     none
    **    tx             double      in     req     none
    **    ty             double      in     req     none
    **    tz             double      in     req     none
    **    alpha          double      in     req     none
    **    beta           double      in     req     none
    **    gamma          double      in     req     none
    **    delta          double      in     req     none
    **    xa             double      in     req     none
    **    ya             double      in     req     none
    **    za             double      in     req     none
    **    x_out          double      out    -       none
    **    y_out          double      out    -       none
    **    z_out          double      out    -       none
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
    **    xa, ya, za           coordinates of pivot point a (in case of rotation around the center of the ellipsoid these parameters are zero)
    **    x_out, y_out, z_out  output coordinates
    **
    **    Return value: (besides the standard return values)
    **    none
    **--------------------------------------------------------------
    */
    static Cartesian sim_trans(Cartesian in,
                   Cartesian translate,
                   double alpha, double beta, double gamma,
                   double delta,
                   Cartesian pivot)

    {
        /*
        **--------------------------------------------------------------
        **    Source: HTW, "Handleiding voor de Technische Werkzaamheden van het Kadaster". Apeldoorn: Kadaster, 1996.
        **--------------------------------------------------------------
        */

        /*
        **--------------------------------------------------------------
        **    Calculate the elements of the rotation_matrix:
        **
        **    a b c
        **    d e f
        **    g h i
        **
        **--------------------------------------------------------------
        */
        double a = Math.cos(gamma)*Math.cos(beta);
        double b = Math.cos(gamma)*sin(beta)*sin(alpha)+sin(gamma)*cos(alpha);
        double c = -cos(gamma)*sin(beta)*cos(alpha)+sin(gamma)*sin(alpha);
        double d = -sin(gamma)*cos(beta);
        double e = -sin(gamma)*sin(beta)*sin(alpha)+cos(gamma)*cos(alpha);
        double f = sin(gamma)*sin(beta)*cos(alpha)+cos(gamma)*sin(alpha);
        double g = sin(beta);
        double h = -cos(beta)*sin(alpha);
        double i = cos(beta)*cos(alpha);

        /*
        **--------------------------------------------------------------
        **    Calculate the elements of the vector input_point:
        **    point_2 = input_point - pivot_point
        **--------------------------------------------------------------
        */
        double x = in.X-pivot.X;
        double y = in.Y-pivot.Y;
        double z = in.Z-pivot.Z;

        /*
        **--------------------------------------------------------------
        **    Calculate the elements of the output vector:
        **    output_point = scale * rotation_matrix * point_2 + translation_vector + pivot_point
        **--------------------------------------------------------------
        */
        double x_out = (1.0+delta)*(a*x+b*y+c*z)+translate.X+pivot.X;
        double y_out = (1.0+delta)*(d*x+e*y+f*z)+translate.Y+pivot.Y;
        double z_out = (1.0+delta)*(g*x+h*y+i*z)+translate.Z+pivot.Z;
        
        return new Cartesian(x_out, y_out, z_out);
    }

    /*
    **--------------------------------------------------------------
    **    Function name: rd_projection
    **    Description:   stereographic double projection
    **
    **    Parameter      Type        In/Out Req/Opt Default
    **    phi            double      in     req     none
    **    lambda         double      in     req     none
    **    x_rd           double      out    -       none
    **    y_rd           double      out    -       none
    **
    **    Additional explanation of the meaning of parameters
    **    phi         input Bessel latitude in degrees
    **    lambda      input Bessel longitude in degrees
    **    x_rd, rd_y  output RD coordinates
    **
    **    Return value: (besides the standard return values)
    **    none
    **--------------------------------------------------------------
    */
    static Cartesian rd_projection(Geographic in)
    {
        /*
        **--------------------------------------------------------------
        **    Source: G. Bakker, J.C. de Munck and G.L. Strang van Hees, "Radio Positioning at Sea". Delft University of Technology, 1995.
        **            G. Strang van Hees, "Globale en lokale geodetische systemen". Delft: Nederlandse Commissie voor Geodesie (NCG), 1997.
        **--------------------------------------------------------------
        */

        /*
        **--------------------------------------------------------------
        **    Explanation of the meaning of constants:
        **        f                         flattening of the ellipsoid
        **        ee                        first eccentricity squared (e squared in some notations)
        **        e                         first eccentricity
        **        eea                       second eccentricity squared (e' squared in some notations)
        **
        **        phi_amersfoort_sphere     latitude of projection base point Amersfoort on sphere in degrees
        **        lambda_amersfoort_sphere  longitude of projection base point Amersfoort on sphere in degrees
        **
        **        r1                        first (North South) principal radius of curvature in Amersfoort (M in some notations)
        **        r2                        second (East West) principal radius of curvature in Amersfoort (N in some notations)
        **        r_sphere                  radius of sphere
        **
        **        n                         constant of Gaussian projection n = 1.000475...
        **        q_amersfoort              isometric latitude of Amersfoort on ellipsiod
        **        w_amersfoort              isometric latitude of Amersfoort on sphere
        **        m                         constant of Gaussian projection m = 0.003773... (also named c in some notations)
        **--------------------------------------------------------------
        */
        final double f=1/INV_F_BESSEL;
        final double ee=f*(2-f);
        final double e=sqrt(ee);
        final double eea = ee/(1.0-ee);

        final double phi_amersfoort_sphere = deg_atan(deg_tan(PHI_AMERSFOORT_BESSEL)/sqrt(1+eea*pow(deg_cos(PHI_AMERSFOORT_BESSEL),2)));
        final double lambda_amersfoort_sphere = LAMBDA_AMERSFOORT_BESSEL;

        final double r1 = A_BESSEL*(1-ee)/pow(sqrt(1-ee*pow(deg_sin(PHI_AMERSFOORT_BESSEL),2)),3);
        final double r2 = A_BESSEL/sqrt(1.0-ee*pow(deg_sin(PHI_AMERSFOORT_BESSEL),2));
        final double r_sphere = sqrt(r1*r2);

        final double n = sqrt(1+eea*pow(deg_cos(PHI_AMERSFOORT_BESSEL),4));
        final double q_amersfoort = atanh(deg_sin(PHI_AMERSFOORT_BESSEL))-e*atanh(e*deg_sin(PHI_AMERSFOORT_BESSEL));
        final double w_amersfoort = log(deg_tan(45+0.5*phi_amersfoort_sphere));
        final double m = w_amersfoort-n*q_amersfoort;

        /*
        **--------------------------------------------------------------
        **    Explanation of the meaning of variables:
        **        q                    isometric latitude on ellipsiod
        **        w                    isometric latitude on sphere
        **        phi_sphere           latitide on sphere in degrees
        **        delta_lambda_sphere  difference in longitude on sphere with Amersfoort in degrees
        **        psi                  distance angle from Amersfoort on sphere
        **        alpha                azimuth from Amersfoort
        **        r                    distance from Amersfoort in projection plane
        **--------------------------------------------------------------
        */
        double q                    = atanh(deg_sin(in.phi))-e*atanh(e*deg_sin(in.phi));
        double w                    = n*q+m;
        double phi_sphere           = 2*deg_atan(exp(w))-90;
        double delta_lambda_sphere  = n*(in.lambda-lambda_amersfoort_sphere);
        double sin_half_psi_squared = pow(deg_sin(0.5*(phi_sphere-phi_amersfoort_sphere)),2)+pow(deg_sin(0.5*delta_lambda_sphere),2)*deg_cos(phi_sphere)*deg_cos(phi_amersfoort_sphere);
        double sin_half_psi         = sqrt(sin_half_psi_squared);
        double cos_half_psi         = sqrt(1-sin_half_psi_squared);
        double tan_half_psi         = sin_half_psi/cos_half_psi;
        double sin_psi              = 2*sin_half_psi*cos_half_psi;
        double cos_psi              = 1-2*sin_half_psi_squared;
        double sin_alpha            = deg_sin(delta_lambda_sphere)*(deg_cos(phi_sphere)/sin_psi);
        double cos_alpha            = (deg_sin(phi_sphere)-deg_sin(phi_amersfoort_sphere)*cos_psi)/(deg_cos(phi_amersfoort_sphere)*sin_psi);
        double r                    = 2*SCALE_RD*r_sphere*tan_half_psi;

        double x_rd = r*sin_alpha+X_AMERSFOORT_RD;
        double y_rd = r*cos_alpha+Y_AMERSFOORT_RD;
        
        return new Cartesian(x_rd, y_rd);
    }

    /*
    **--------------------------------------------------------------
    **    Function name: inv_rd_projection
    **    Description:   inverse stereographic double projection
    **
    **    Parameter      Type        In/Out Req/Opt Default
    **    x_rd           double      in     req     none
    **    y_rd           double      in     req     none
    **    phi            double      out    -       none
    **    lambda         double      out    -       none
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
    static Geographic inv_rd_projection(Cartesian in)
    {
        /*
        **--------------------------------------------------------------
        **    Source: G. Bakker, J.C. de Munck and G.L. Strang van Hees, "Radio Positioning at Sea". Delft University of Technology, 1995.
        **            G. Strang van Hees, "Globale en lokale geodetische systemen". Delft: Nederlandse Commissie voor Geodesie (NCG), 1997.
        **--------------------------------------------------------------
        */

        /*
        **--------------------------------------------------------------
        **    Explanation of the meaning of constants:
        **        f                         flattening of the ellipsoid
        **        ee                        first eccentricity squared (e squared in some notations)
        **        e                         first eccentricity
        **        eea                       second eccentricity squared (e' squared in some notations)
        **
        **        phi_amersfoort_sphere     latitude of projection base point Amersfoort on sphere in degrees
        **
        **        r1                        first (North South) principal radius of curvature in Amersfoort (M in some notations)
        **        r2                        second (East West) principal radius of curvature in Amersfoort (N in some notations)
        **        r_sphere                  radius of sphere
        **
        **        n                         constant of Gaussian projection n = 1.000475...
        **        q_amersfoort              isometric latitude of Amersfoort on ellipsiod
        **        w_amersfoort              isometric latitude of Amersfoort on sphere
        **        m                         constant of Gaussian projection m = 0.003773... (also named c in some notations)
        **--------------------------------------------------------------
        */
        final double f = 1/INV_F_BESSEL;
        final double ee = f*(2-f);
        final double e = sqrt(ee);
        final double eea = ee/(1.0-ee);

        final double phi_amersfoort_sphere = deg_atan(deg_tan(PHI_AMERSFOORT_BESSEL)/sqrt(1+eea*pow(deg_cos(PHI_AMERSFOORT_BESSEL),2)));

        final double r1 = A_BESSEL*(1-ee)/pow(sqrt(1-ee*pow(deg_sin(PHI_AMERSFOORT_BESSEL),2)),3);
        final double r2 = A_BESSEL/sqrt(1.0-ee*pow(deg_sin(PHI_AMERSFOORT_BESSEL),2));
        final double r_sphere = sqrt(r1*r2);

        final double n = sqrt(1+eea*pow(deg_cos(PHI_AMERSFOORT_BESSEL),4));
        final double q_amersfoort = atanh(deg_sin(PHI_AMERSFOORT_BESSEL))-e*atanh(e*deg_sin(PHI_AMERSFOORT_BESSEL));
        final double w_amersfoort = log(deg_tan(45+0.5*phi_amersfoort_sphere));
        final double m = w_amersfoort-n*q_amersfoort;

        /*
        **--------------------------------------------------------------
        **    Explanation of the meaning of variables:
        **        r                    distance from Amersfoort in projection plane
        **        alpha                azimuth from Amersfoort
        **        psi                  distance angle from Amersfoort on sphere in degrees
        **        phi_sphere           latitide on sphere in degrees
        **        delta_lambda_sphere  difference in longitude on sphere with Amersfoort in degrees
        **        w                    isometric latitude on sphere
        **        q                    isometric latitude on ellipsiod
        **--------------------------------------------------------------
        */
        double r                   = sqrt(pow(in.X-X_AMERSFOORT_RD,2)+pow(in.Y-Y_AMERSFOORT_RD,2));
        double sin_alpha           = (in.X-X_AMERSFOORT_RD)/r;
        if (r<PRECISION) sin_alpha = 0;
        double cos_alpha           = (in.Y-Y_AMERSFOORT_RD)/r;
        if (r<PRECISION) cos_alpha = 1;
        double psi                 = 2*deg_atan(r/(2*SCALE_RD*r_sphere));
        double phi_sphere          = deg_asin(cos_alpha*deg_cos(phi_amersfoort_sphere)*deg_sin(psi)+deg_sin(phi_amersfoort_sphere)*deg_cos(psi));
        double delta_lambda_sphere = deg_asin((sin_alpha*deg_sin(psi))/deg_cos(phi_sphere));

        double lambda = delta_lambda_sphere/n+LAMBDA_AMERSFOORT_BESSEL;

        double w = atanh(deg_sin(phi_sphere));
        double q = (w-m)/n;

        /*
        **--------------------------------------------------------------
        **    Iterative calculation of phi
        **--------------------------------------------------------------
        */
        double phi=0;
        double previous;
        double diff=90;
        while (diff>DEG_PRECISION)
        {
            previous = phi;
            phi      = 2*deg_atan(exp(q+0.5*e*log((1+e*deg_sin(phi))/(1-e*deg_sin(phi)))))-90;
            diff     = abs(phi-previous);
        }
        
        return new Geographic(phi, lambda);
    }
    
    public static double read_double(InputStream in) throws IOException {
        byte[] bytes = new byte[8];
        in.read(bytes);
        return ByteBuffer.wrap(bytes).order(ByteOrder.LITTLE_ENDIAN).getDouble();
    }
    
    public static float read_float(byte[] in) {
        return ByteBuffer.wrap(in).order(ByteOrder.LITTLE_ENDIAN).getFloat();
    }
    
    public static float read_float(InputStream in) throws IOException {
        byte[] bytes = new byte[4];
        in.read(bytes);
        return read_float(bytes);
    }
    
    public static short read_short(InputStream in) throws IOException {
        byte[] bytes = new byte[2];
        in.read(bytes);
        return ByteBuffer.wrap(bytes).order(ByteOrder.LITTLE_ENDIAN).getShort();
    }

    /*
    **--------------------------------------------------------------
    **    Function name: rd_correction
    **    Description:   apply the modelled distortions in the RD coordinate system
    **
    **    Parameter      Type        In/Out Req/Opt Default
    **    x_pseudo_rd    double      in     req     none
    **    y_pseudo_rd    double      in     req     none
    **    x_rd           double      out    -       none
    **    y_rd           double      out    -       none
    **
    **    Additional explanation of the meaning of parameters
    **    x_pseudo_rd, y_pseudo_rd  input coordinates in undistorted pseudo RD
    **    x_rd, y_rd                output coordinates in real RD
    **
    **    Return value: (besides the standard return values)
    **    none
    **--------------------------------------------------------------
    */
    static Cartesian rd_correction(Cartesian pseudo) throws IOException
    {

        OptionalDouble dx = GrdFile.GRID_FILE_DX.grid_interpolation(pseudo.X, pseudo.Y);
        OptionalDouble dy = GrdFile.GRID_FILE_DY.grid_interpolation(pseudo.X, pseudo.Y);
        
        return new Cartesian(pseudo.X - dx.orElse(0), pseudo.Y - dy.orElse(0), pseudo.Z);
    }

    /*
    **--------------------------------------------------------------
    **    Function name: inv_rd_correction
    **    Description:   remove the modelled distortions in the RD coordinate system
    **
    **    Parameter      Type        In/Out Req/Opt Default
    **    x_rd           double      in     req     none
    **    y_rd           double      in     req     none
    **    x_pseudo_rd    double      out    -       none
    **    x_pseudo_rd    double      out    -       none
    **
    **    Additional explanation of the meaning of parameters
    **    x_rd, y_rd                input coordinates in real RD
    **    x_pseudo_rd, y_pseudo_rd  output coordinates in undistorted pseudo RD
    **
    **    Return value: (besides the standard return values)
    **    none
    **--------------------------------------------------------------
    */
    static Cartesian inv_rd_correction(Cartesian rd) throws IOException
    {

        /*
        **--------------------------------------------------------------
        **    The grid values are formally in pseudo RD. For the interpolation below the RD values are used. The intoduced error is certainly smaller than 0.0001 m for the X2c.grd and Y2c.grd.
        **--------------------------------------------------------------
        */
        OptionalDouble dx = GrdFile.GRID_FILE_DX.grid_interpolation(rd.X, rd.Y);
        OptionalDouble dy = GrdFile.GRID_FILE_DY.grid_interpolation(rd.X, rd.Y);
        return new Cartesian(rd.X + dx.orElse(0), rd.Y + dy.orElse(0), rd.Z);
    }

}
