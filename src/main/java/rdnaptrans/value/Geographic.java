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
public class Geographic {
    
    /*
     **    phi      latitude in degrees
     **    lambda   longitude in degrees
     **    h        ellipsoidal height
    */
    
    public final double phi;
    public final double lambda; 
    public final double h;

    public Geographic(double phi, double lambda, double h) {
        this.phi = phi;
        this.lambda = lambda;
        this.h = h;
    }
    
    public Geographic(double phi, double lambda) {
        this (phi, lambda, 0);
    }
    
    public Geographic withH(double h) {
        return new Geographic(phi, lambda, h);
    }
}
