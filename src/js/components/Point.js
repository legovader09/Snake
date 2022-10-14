/**
 * A point that represents a location from (x, y) coordinates.
 * @param {string} x
 * @param {string} y
 */
 class Point {
  /**
   * Converts coordinates to a new point with relevant x, and y values.
   * @param {string} str a comma separated string representing coordinates
   */
  static fromInt = (str) => new Point(str[0], str[1]);

  /**
   * Creates a new instance of Point from an already existing Point.
   * @param {Point} point
   */
  static fromPoint = (point) => new Point(point.x, point.y)

  /**
   * Compares two points to see if the x and y values are equal.
   * @param {Point} p1
   * @param {Point} p2
   */
  static compareEquals = (p1, p2) => (p1.x === p2.x && p1.y === p2.y);
  
  constructor(x, y) {
    this.set(x, y);
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }

  asString() {
    return `${this.x},${this.y}`;
  }
}

export default Point;