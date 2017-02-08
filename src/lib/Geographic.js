/**
 * Created by veerr on 8-2-2017.
 */

'use strict';

/**
 * <p>Geographic class.</p>
 *
 * @author raymond
 * @version $Id: $Id
 */
class Geographic {

  /*
   **    phi      latitude in degrees
   **    lambda   longitude in degrees
   **    h        ellipsoidal height
   */

  /**
   * <p>Constructor for Geographic.</p>
   *
   * @param phi a double.
   * @param lambda a double.
   * @param h a double.
   */
  constructor(phi, lambda = 0, h = 0) {
    this.phi = phi;
    this.lambda = lambda;
    this.h = h;
  }
}

module.exports = Geographic;
