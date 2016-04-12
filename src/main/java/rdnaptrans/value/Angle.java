/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rdnaptrans.value;

/**
 * <p>Angle class.</p>
 *
 * @author raymond
 * @version $Id: $Id
 */
public class Angle {
    public final double Degrees;
    public final double Minutes;
    public final double Seconds;

    /**
     * <p>Constructor for Angle.</p>
     *
     * @param Degrees a double.
     * @param Minutes a double.
     * @param Seconds a double.
     */
    public Angle(double Degrees, double Minutes, double Seconds) {
        this.Degrees = Degrees;
        this.Minutes = Minutes;
        this.Seconds = Seconds;
    }
    
}
