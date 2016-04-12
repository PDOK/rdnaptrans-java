/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rdnaptrans;

import java.io.IOException;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import rdnaptrans.value.Cartesian;

/**
 *
 * @author raymond
 */
public class BugfixTest {
    
    public BugfixTest() {
    }
    
    @BeforeClass
    public static void setUpClass() {
    }
    
    @AfterClass
    public static void tearDownClass() {
    }
    
    @Before
    public void setUp() {
    }
    
    @After
    public void tearDown() {
    }

    @Test
    public void outOfBoundsTest() throws IOException {
        Cartesian rd = new Cartesian(45000.0, 65000.0, 0);
        Transform.rdnap2etrs(rd);
    }
}
