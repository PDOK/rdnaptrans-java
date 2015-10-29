package rdnaptrans;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;
import rdnaptrans.value.Cartesian;
import rdnaptrans.value.Geographic;
import static rdnaptrans.Transform.etrs2rdnap;
import static rdnaptrans.Transform.rdnap2etrs;

/**
 *
 * @author raymond
 */
@RunWith(Parameterized.class)
public class EtrsToNap {
    
    public static double MAX_DELTA_RD = 0.001;
    public static double MAX_DELTA_ANGLE = 0.00000001;
    public static double MAX_DELTA_H = 0.001;
    
    @Parameters
    public static Collection<Object[]> data() {
        return Arrays.asList(new Object[][] {     
            { "Texel" , new Geographic(53.160753042, 4.824761912, 42.8614), new Cartesian(117380.1200, 575040.3400, 1.0000) },
            { "Noord-Groningen" , new Geographic(53.419482050, 6.776726674, 42.3586), new Cartesian(247380.5600, 604580.7800, 2.0000) },
            { "Amersfoort" , new Geographic(52.155172897, 5.387203657, 43.2551), new Cartesian(155000.0000, 463000.0000, 0.0000) },
            { "Amersfoort 100m" , new Geographic(52.155172910, 5.387203658, 143.2551), new Cartesian(155000.0000, 463000.0000, 100.0000) },
            { "Zeeuws-Vlaanderen" , new Geographic(51.368607152, 3.397588595, 47.4024), new Cartesian(16460.9100, 377380.2300, 3.0000) },
            { "Zuid-Limburg" , new Geographic(50.792584916, 5.773795548, 245.9478), new Cartesian(182260.4500, 311480.6700, 200.0000) },
            { "Maasvlakte" , new Geographic(51.947393898, 4.072887101, 47.5968), new Cartesian(64640.8900, 440700.0101, 4.0000) },
            { "outside" , new Geographic(48.843030210, 8.723260235, 52.0289), new Cartesian(400000.2300, 100000.4500, 5.0000) },
            { "no_rd&geoid" , new Geographic(50.687420392, 4.608971813, 51.6108), new Cartesian(100000.6700, 300000.8900, 6.0000) },
            { "no_geoid" , new Geographic(51.136825197, 4.601375361, 50.9672), new Cartesian(100000.6700, 350000.8900, 6.0000) },
            { "no_rd" , new Geographic(52.482440839, 4.268403889, 49.9436), new Cartesian(79000.0100, 500000.2300, 7.0000) },
            { "edge_rd" , new Geographic(51.003976532, 3.891247830, 52.7427), new Cartesian(50000.4500, 335999.6700, 8.0000) }
                
           });
    }
    
    private String name;
    private Geographic etrs;
    private Cartesian rd;
    
    public EtrsToNap(String name, Geographic etrs, Cartesian rd) {
        this.name = name;
        this.etrs = etrs;
        this.rd = rd;
    }


    @Test
    public void validateToRD() throws IOException {
        Cartesian result = etrs2rdnap(etrs);
        assertEquals(name, rd.X, result.X, MAX_DELTA_RD);
        assertEquals(name, rd.Y, result.Y, MAX_DELTA_RD);
        assertEquals(name, rd.Z, result.Z, MAX_DELTA_H);
        
    }
    
    @Test
    public void validateToETRS() throws IOException {
        Geographic result = rdnap2etrs(rd);
        assertEquals(name, etrs.lambda, result.lambda, MAX_DELTA_ANGLE);
        assertEquals(name, etrs.phi, result.phi, MAX_DELTA_ANGLE);
        assertEquals(name, etrs.h, result.h, MAX_DELTA_H);
        
    }
    
    
}
