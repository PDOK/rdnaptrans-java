/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rdnaptrans.value;

/**
 * <p>Geographic class.</p>
 *
 * @author raymond
 * @version $Id: $Id
 */
public class Geographic {
    
    /*
     **    phi      latitude in degrees
     **    lambda   longitude in degrees
     **    h        ellipsoidal height
    */
    
    public final double phi;
    public final double lambda; 
    public final double h;

    /**
     * <p>Constructor for Geographic.</p>
     *
     * @param phi a double.
     * @param lambda a double.
     * @param h a double.
     */
    public Geographic(double phi, double lambda, double h) {
        this.phi = phi;
        this.lambda = lambda;
        this.h = h;
    }
    
    /**
     * <p>Constructor for Geographic.</p>
     *
     * @param phi a double.
     * @param lambda a double.
     */
    public Geographic(double phi, double lambda) {
        this (phi, lambda, 0);
    }
    
    /**
     * <p>withH.</p>
     *
     * @param h a double.
     * @return a {@link rdnaptrans.value.Geographic} object.
     */
    public Geographic withH(double h) {
        return new Geographic(phi, lambda, h);
    }
}
