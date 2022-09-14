/**
 * Software entities should be open for extension, but closed for modification.
 *
 * This principle states that software entities must be extensible without having to modify the existing code. In order
 * to achieve this, we need to make abstractions. By doing this, we'll be able to extend the behavior of a class
 * without changing a single line of code in it.
 */

namespace Wrong {
  class Rectangle {
    constructor(private _width: number, private _height: number) {}

    get height(): number {
      return this._height;
    }

    get width(): number {
      return this._width;
    }
  }

  class Square {
    constructor(private _height: number) {}

    get height(): number {
      return this._height;
    }
  }

  /**
   * AreaCalculator accumulates the areas of different shapes, and it will have to be modified every time we add a new
   * Shape
   */
  class AreaCalculator {
    private shapes: any[];

    constructor(shapes: any[]) {
      this.shapes = shapes;
    }

    public sum() {
      return this.shapes.reduce((acc, shape) => {
        if (shape instanceof Square) {
          acc += Math.pow(shape.height, 2);
        }
        if (shape instanceof Rectangle) {
          acc += shape.height * shape.width;
        }
        return acc;
      }, 0);
    }
  }
}

namespace Correct {
  /**
   * A solution would be to implement a Shape interface in every shape. This way we implement a simple method to
   * calculate the sum of the areas. Every time we need to add a new shape, it will implement the Shape interface,
   * and we won't have to make any changes on the calculator
   */
  interface Shape {
    area(): number;
  }

  class Rectangle implements Shape {
    constructor(private _width: number, private _height: number) {}

    area(): number {
      return this._height * this._width
    }
  }

  class Square implements Shape {
    constructor(private _height: number) {}

    area(): number {
      return Math.pow(this._height, 2)
    }
  }

  class AreaCalculator {
    private shapes: Shape[];

    constructor(shapes: Shape[]) {
      this.shapes = shapes
    }

    sum(): number {
      return this.shapes.reduce((acc: number, shape: Shape) => acc += shape.area(), 0)
    }
  }
}





















