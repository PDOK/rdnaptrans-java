package rdnaptrans.value;

/**
 * <p>Cartesian class.</p>
 *
 * @author raymond
 * @version $Id: $Id
 */
public class Cartesian {
    public final double X;
    public final double Y;
    public final double Z;

    /**
     * <p>Constructor for Cartesian.</p>
     *
     * @param X a double.
     * @param Y a double.
     * @param Z a double.
     */
    public Cartesian(double X, double Y, double Z) {
        this.X = X;
        this.Y = Y;
        this.Z = Z;
    }
    
    /**
     * <p>Constructor for Cartesian.</p>
     *
     * @param X a double.
     * @param Y a double.
     */
    public Cartesian(double X, double Y) {
        this (X, Y, 0);
    }
    
    /**
     * <p>withZ.</p>
     *
     * @param z a double.
     * @return a {@link rdnaptrans.value.Cartesian} object.
     */
    public Cartesian withZ(double z) {
        return new Cartesian(X,Y, z);
    }
}
