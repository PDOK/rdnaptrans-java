/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rdnaptrans.value;

import com.google.common.io.ByteStreams;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import static java.lang.Math.floor;
import java.net.URL;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import static rdnaptrans.Helpers.*;
import static rdnaptrans.Constants.*;

/**
 *
 * @author raymond
 */
public class GrdFile {
    
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
    public static final GrdFile GRID_FILE_DX = new GrdFile(ClassLoader.getSystemResource("rdnaptrans/x2c.grd"));
    public static final GrdFile GRID_FILE_DY = new GrdFile(ClassLoader.getSystemResource("rdnaptrans/y2c.grd"));
    public static final GrdFile GRID_FILE_GEOID = new GrdFile(ClassLoader.getSystemResource("rdnaptrans/nlgeo04.grd"));
    
    private final byte[] grdInner;
    public final GrdFileHeader header;
    
    public GrdFile(URL src) {
        try {
            this.header = read_grd_file_header(src);
            try (InputStream in = src.openStream()) {
                this.grdInner = ByteStreams.toByteArray(in);
            }
            
        } catch (IOException ex) {
            throw new RuntimeException(ex);
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
    public OptionalDouble grid_interpolation(double x, double y) throws IOException
    {
        int[] record_number = new int[16];
        float[] record_value = new float[16];
        double ddx, ddy;
        double[] f = new double[4];
        double[] g = new double[4];
        double[] gfac = new double[16];

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

        /*
        **--------------------------------------------------------------
        **    Check for location safely inside the bounding box of grid
        **--------------------------------------------------------------
        */
        if (x<=header.safe_min_x || x>= header.safe_max_x ||
            y<= header.safe_min_y || y>= header.safe_max_y)
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
        ddx =    (x-header.min_x)/header.step_size_x-floor((x-header.min_x)/header.step_size_x);
        ddy = 1-((y-header.min_y)/header.step_size_y-floor((y-header.min_y)/header.step_size_y));

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
        record_number[5]  = (int)((x-header.min_x)/header.step_size_x + floor((y-header.min_y)/header.step_size_y)*header.size_x);
        record_number[0]  = record_number[5]-header.size_x-1;
        record_number[1]  = record_number[5]-header.size_x   ;
        record_number[2]  = record_number[5]-header.size_x+1;
        record_number[3]  = record_number[5]-header.size_x+2;
        record_number[4]  = record_number[5]-1;
        record_number[6]  = record_number[5]+1;
        record_number[7]  = record_number[5]+2;
        record_number[8]  = record_number[5]+header.size_x-1;
        record_number[9]  = record_number[5]+header.size_x;
        record_number[10] = record_number[5]+header.size_x+1;
        record_number[11] = record_number[5]+header.size_x+2;
        record_number[12] = record_number[5]+2*header.size_x-1;
        record_number[13] = record_number[5]+2*header.size_x;
        record_number[14] = record_number[5]+2*header.size_x+1;
        record_number[15] = record_number[5]+2*header.size_x+2;

        /*
        **--------------------------------------------------------------
        **    Read the record values of the selected grid point
        **    Outside the validity area the records have a very large value (circa 1.7e38).
        **--------------------------------------------------------------
        */
        for (int i=0; i<16; i=i+1)
        {
            record_value[i] = memoized_read_grd_file_body.get(record_number[i]);
            //record_value[i] = read_grd_file_body(record_number[i]);
            if (record_value[i]>header.max_value+PRECISION || record_value[i]<header.min_value-PRECISION)
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
    private static GrdFileHeader read_grd_file_header(URL src) throws IOException
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
    private float read_grd_file_body(int record_number)
    {
        final int record_length  =  4;
        final int header_length  = 56;
        
        
        /*
        **--------------------------------------------------------------
        **    Read
        **    Grd files are binary grid files in the format of the program Surfer(R)
        **    The first "header_length" bytes are the header of the file
        **    The body of the file consists of records of "record_length" bytes
        **    The records have a "record_number", starting with 0,1,2,...
        **--------------------------------------------------------------
        */
        
        
        byte[] b = Arrays.copyOfRange(grdInner, header_length + record_number * record_length, 
                header_length + record_number * (record_length + 1));
        
        return read_float(b);
    }
    
    abstract public class Memoize1<P, V> {
        //The memory, it maps one calculation parameter to one calculation result
        private Map<P, V> values = new HashMap<P, V>();

        private V get(P p) {
            if (!values.containsKey(p)) {
                values.put(p, calc(p));
            }
            return values.get(p);
        }

        /**
         * Will implement the calculations that are
         * to be remembered thanks to this class
         * (one calculation per distinct parameter)
         */
        public abstract V calc(P p);
    }
    
    Memoize1<Integer, Float> memoized_read_grd_file_body = new Memoize1<Integer, Float>() {
        @Override
        public Float calc(Integer record_number) {
            return read_grd_file_body(record_number);
        }
    };
    
    private static class GrdFileHeader {
    
        /*
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
        */

        public final short size_x;
        public final short size_y;
        public final double min_x;
        public final double max_x;
        public final double min_y;
        public final double max_y;
        public final double min_value;
        public final double max_value;
        
        public final double step_size_x;
        public final double step_size_y;
        
        public final double safe_min_x;
        public final double safe_max_x;
        public final double safe_min_y;
        public final double safe_max_y;

        public GrdFileHeader(short size_x, short size_y, double min_x, double max_x, double min_y, double max_y, double min_value, double max_value) {
            this.size_x = size_x;
            this.size_y = size_y;
            this.min_x = min_x;
            this.max_x = max_x;
            this.min_y = min_y;
            this.max_y = max_y;
            this.min_value = min_value;
            this.max_value = max_value;
            
            this.step_size_x = (this.max_x - this.min_x)/(size_x-1);
            this.step_size_y = (this.max_y - this.min_y)/(size_y-1);
            
            this.safe_min_x = this.min_x + this.step_size_x;
            this.safe_max_x = this.max_x - this.step_size_x;
            this.safe_min_y = this.min_y + this.step_size_y;
            this.safe_max_y = this.max_y - this.step_size_y;
        }
    }
    
}
