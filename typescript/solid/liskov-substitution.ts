/**
 * Let q(x) be a property provable about objects of x of type T. Then q(y) should be provable for objets y of type S
 * where S is a subtype of T.
 *
 * This principle states that objects must be replaceable by instances of their subtypes without altering the correct
 * functioning of the system.
 */

namespace Wrong {
  class Rectangle {
    constructor(private _width: number, private _height: number) {}

    public area() : number {
      return this._height * this._width;
    }
  }

  /**
   * A classic example of violation of this principle is the Rectangle-Square problem. The Square class extends the
   * Rectangle class and assumes that the width and height are equal. When calculating the area of a square, we'd get
   * a wrong value
   */
  class Square extends Rectangle {}
}

namespace Correct {
  /**
   * Use interface~
   */
  interface Shape {
    area(): number
  }

  class Rectangle implements Shape {
    constructor(private _width: number, private _height: number) {
    }

    area(): number {
      return this._height*this._width;
    }
  }

  class Square implements Shape {
    constructor(private _height: number) {
    }

    area(): number {
      return Math.pow(this._height, 2)
    }
  }
}
