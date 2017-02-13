/**
 * Created by veerr on 8-2-2017.
 */

'use strict';

/**
 * <p>Cartesian class.</p>
 *
 * @author raymond
 * @version $Id: $Id
 */
class Cartesian {
  /**
   * <p>Constructor for Cartesian.</p>
   *
   * @param X a double.
   * @param Y a double.
   * @param Z a double.
   */
  constructor(X, Y, Z = 0) {
    this.X = X;
    this.Y = Y;
    this.Z = Z;
  }

  /**
   * <p>withZ.</p>
   *
   * @param z a double.
   * @return a {@link rdnaptrans.value.Cartesian} object.
   */
  withZ(z) {
    return new Cartesian(this.X, this.Y, z);
  }
}

module.exports = Cartesian;
