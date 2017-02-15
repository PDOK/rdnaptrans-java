/**
 * Created by veerr on 8-2-2017.
 */

'use strict';

/**
 * <p>Angle class.</p>
 *
 * @author raymond
 * @version $Id: $Id
 */

class Angle {
  /**
   * <p>Constructor for Angle.</p>
   *
   * @param Degrees a double.
   * @param Minutes a double.
   * @param Seconds a double.
   */
  constructor(Degrees, Minutes, Seconds) {
    this.Degrees = Degrees;
    this.Minutes = Minutes;
    this.Seconds = Seconds;
  }
}

module.exports = Angle;
