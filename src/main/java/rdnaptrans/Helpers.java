package rdnaptrans;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import static java.lang.Math.*;
import java.net.URL;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import rdnaptrans.value.OptionalDouble;
import static rdnaptrans.Constants.*;
import rdnaptrans.value.Angle;
import rdnaptrans.value.Cartesian;
import rdnaptrans.value.Geographic;
import rdnaptrans.value.GrdFileHeader;

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
    
    public static float read_float(InputStream in) throws IOException {
        byte[] bytes = new byte[4];
        in.read(bytes);
        return ByteBuffer.wrap(bytes).order(ByteOrder.LITTLE_ENDIAN).getFloat();
    }
    
    public static short read_short(InputStream in) throws IOException {
        byte[] bytes = new byte[2];
        in.read(bytes);
        return ByteBuffer.wrap(bytes).order(ByteOrder.LITTLE_ENDIAN).getShort();
    }

    /*
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
    static GrdFileHeader read_grd_file_header(URL src) throws IOException
    {
        /*
        **--------------------------------------------------------------
        **    Grd files are binary grid files in the format of the program Surfer(R)
        **--------------------------------------------------------------
        */
        
        try (InputStream input = src.openStream()) {
        /*
        **--------------------------------------------------------------
        **    Read file id
        **--------------------------------------------------------------
        */
        byte[] id = new byte[4];
        input.read(id, 0, 4);
        String id_string = new String(id);

        /*
        **--------------------------------------------------------------
        **    Checks
        **--------------------------------------------------------------
        */

        if (!id_string.equals("DSBB"))
        {
            throw new UnsupportedEncodingException("Not a valid grd file");
        }

        /*
        **--------------------------------------------------------------
        **    Read output parameters
        **--------------------------------------------------------------
        */
        
        short size_x = read_short(input);
        short size_y = read_short(input);
        double min_x = read_double(input);
        double max_x = read_double(input);
        double min_y = read_double(input);
        double max_y = read_double(input);
        double min_value = read_double(input);
        double max_value = read_double(input);

        return new GrdFileHeader(size_x, size_y, min_x, max_x, min_y, max_y, min_value, max_value);
        }
    }

    /*
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
    **    record_number  number defining the position in the file
    **    record_value   output of the read value
    **
    **    Return value: (besides the standard return values)
    **    none
    **--------------------------------------------------------------
    */
    static float read_grd_file_body(URL src, long record_number) throws IOException
    {
        final int record_length  =  4;
        final int header_length  = 56;
        
        try (InputStream input = src.openStream()) {
        
        /*
        **--------------------------------------------------------------
        **    Read
        **    Grd files are binary grid files in the format of the program Surfer(R)
        **    The first "header_length" bytes are the header of the file
        **    The body of the file consists of records of "record_length" bytes
        **    The records have a "record_number", starting with 0,1,2,...
        **--------------------------------------------------------------
        */
        input.skip(header_length + record_number * record_length);
        return read_float(input);
        }
    }

    /*
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
    static OptionalDouble grid_interpolation(double x, double y, URL src) throws IOException
    {
        long[] record_number = new long[16];
        float[] record_value = new float[16];
        double ddx, ddy;
        double[] f = new double[4];
        double[] g = new double[4];
        double[] gfac = new double[16];
        double step_size_x, step_size_y;

        /*
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
        GrdFileHeader h = read_grd_file_header(src);

        step_size_x = (h.max_x-h.min_x)/(h.size_x-1);
        step_size_y = (h.max_y-h.min_y)/(h.size_y-1);

        /*
        **--------------------------------------------------------------
        **    Check for location safely inside the bounding box of grid
        **--------------------------------------------------------------
        */
        if (x<=(h.min_x+step_size_x) || x>=(h.max_x-step_size_x) ||
            y<=(h.min_y+step_size_y) || y>=(h.max_y-step_size_y))
        {
            return OptionalDouble.empty();
        }

        /*
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
        **    ddx and ddy (in parts of the grid interval) are defined relative to grid point 9, respectively to the right and down.
        **--------------------------------------------------------------
        */
        ddx =    (x-h.min_x)/step_size_x-floor((x-h.min_x)/step_size_x);
        ddy = 1-((y-h.min_y)/step_size_y-floor((y-h.min_y)/step_size_y));

        /*
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
        record_number[5]  = (int)((x-h.min_x)/step_size_x + floor((y-h.min_y)/step_size_y)*h.size_x);
        record_number[0]  = record_number[5]-h.size_x-1;
        record_number[1]  = record_number[5]-h.size_x   ;
        record_number[2]  = record_number[5]-h.size_x+1;
        record_number[3]  = record_number[5]-h.size_x+2;
        record_number[4]  = record_number[5]-1;
        record_number[6]  = record_number[5]+1;
        record_number[7]  = record_number[5]+2;
        record_number[8]  = record_number[5]+h.size_x-1;
        record_number[9]  = record_number[5]+h.size_x;
        record_number[10] = record_number[5]+h.size_x+1;
        record_number[11] = record_number[5]+h.size_x+2;
        record_number[12] = record_number[5]+2*h.size_x-1;
        record_number[13] = record_number[5]+2*h.size_x;
        record_number[14] = record_number[5]+2*h.size_x+1;
        record_number[15] = record_number[5]+2*h.size_x+2;

        /*
        **--------------------------------------------------------------
        **    Read the record values of the selected grid point
        **    Outside the validity area the records have a very large value (circa 1.7e38).
        **--------------------------------------------------------------
        */
        for (int i=0; i<16; i=i+1)
        {
            record_value[i] = read_grd_file_body(src, record_number[i]);
            if (record_value[i]>h.max_value+PRECISION || record_value[i]<h.min_value-PRECISION)
            {
                return OptionalDouble.empty();
            }
        }

        /*
        **--------------------------------------------------------------
        **    Calculation of the multiplication factors
        **--------------------------------------------------------------
        */
        f[0] = -0.5*ddx+ddx*ddx-0.5*ddx*ddx*ddx;
        f[1] = 1.0-2.5*ddx*ddx+1.5*ddx*ddx*ddx;
        f[2] = 0.5*ddx+2.0*ddx*ddx-1.5*ddx*ddx*ddx;
        f[3] = -0.5*ddx*ddx+0.5*ddx*ddx*ddx;
        g[0] = -0.5*ddy+ddy*ddy-0.5*ddy*ddy*ddy;
        g[1] = 1.0-2.5*ddy*ddy+1.5*ddy*ddy*ddy;
        g[2] = 0.5*ddy+2.0*ddy*ddy-1.5*ddy*ddy*ddy;
        g[3] = -0.5*ddy*ddy+0.5*ddy*ddy*ddy;

        gfac[12] = f[0]*g[0];
        gfac[8]  = f[0]*g[1];
        gfac[4]  = f[0]*g[2];
        gfac[0]  = f[0]*g[3];
        gfac[13] = f[1]*g[0];
        gfac[9]  = f[1]*g[1];
        gfac[5]  = f[1]*g[2];
        gfac[1]  = f[1]*g[3];
        gfac[14] = f[2]*g[0];
        gfac[10] = f[2]*g[1];
        gfac[6]  = f[2]*g[2];
        gfac[2]  = f[2]*g[3];
        gfac[15] = f[3]*g[0];
        gfac[11] = f[3]*g[1];
        gfac[7]  = f[3]*g[2];
        gfac[3]  = f[3]*g[3];

        /*
        **--------------------------------------------------------------
        **    Calculation of the interpolated value
        **    Applying the multiplication factors on the selected grid values
        **--------------------------------------------------------------
        */
        double value=0.0;
        for (int i=0; i<16; i=i+1)
        {
            value=value+gfac[i]*record_value[i];
        }

        return OptionalDouble.of(value);
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

        OptionalDouble dx = grid_interpolation(pseudo.X, pseudo.Y, GRID_FILE_DX);
        OptionalDouble dy = grid_interpolation(pseudo.X, pseudo.Y, GRID_FILE_DY);
        
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
        OptionalDouble dx = grid_interpolation(rd.X, rd.Y, GRID_FILE_DX);
        OptionalDouble dy = grid_interpolation(rd.X, rd.Y, GRID_FILE_DY);
        return new Cartesian(rd.X + dx.orElse(0), rd.Y + dy.orElse(0), rd.Z);
    }

}
