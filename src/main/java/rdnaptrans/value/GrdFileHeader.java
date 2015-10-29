/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rdnaptrans.value;

/**
 *
 * @author raymond
 */
public class GrdFileHeader {
    
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

    public GrdFileHeader(short size_x, short size_y, double min_x, double max_x, double min_y, double max_y, double min_value, double max_value) {
        this.size_x = size_x;
        this.size_y = size_y;
        this.min_x = min_x;
        this.max_x = max_x;
        this.min_y = min_y;
        this.max_y = max_y;
        this.min_value = min_value;
        this.max_value = max_value;
    }
}
