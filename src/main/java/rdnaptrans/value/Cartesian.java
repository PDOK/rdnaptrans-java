package rdnaptrans.value;

/**
 *
 * @author raymond
 */
public class Cartesian {
    public final double X;
    public final double Y;
    public final double Z;

    public Cartesian(double X, double Y, double Z) {
        this.X = X;
        this.Y = Y;
        this.Z = Z;
    }
    
    public Cartesian(double X, double Y) {
        this (X, Y, 0);
    }
    
    public Cartesian withZ(double z) {
        return new Cartesian(X,Y, z);
    }
}
