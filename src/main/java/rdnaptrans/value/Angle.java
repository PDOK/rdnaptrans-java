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
public class Angle {
    public final double Degrees;
    public final double Minutes;
    public final double Seconds;

    public Angle(double Degrees, double Minutes, double Seconds) {
        this.Degrees = Degrees;
        this.Minutes = Minutes;
        this.Seconds = Seconds;
    }
    
}
