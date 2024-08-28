/**
 * Defines an interface for shapes that can be drawn.
 */
interface Shape {
  draw(): void;
}

/**
 * Defines an interface for drawing with different implementations.
 */
interface DrawingAPI {
  drawCircle(x: number, y: number, radius: number): void;
}

/**
 * Version 1 of the drawing API.
 */
class DrawingAPI1 implements DrawingAPI {
  drawCircle(x: number, y: number, radius: number): void {
    console.log(`Drawing a circle at (${x}, ${y}) with radius ${radius} V1`);
  }
}

/**
 * Version 2 of the drawing API.
 */
class DrawingAPI2 implements DrawingAPI {
  drawCircle(x: number, y: number, radius: number): void {
    console.log(`Drawing a circle at (${x}, ${y}) with radius ${radius} V2`);
  }
}

/**
 * Represents a circle shape that can be drawn using a specific drawing API.
 */
class Circle implements Shape {
  private x: number;
  private y: number;
  private radius: number;
  /**
   * Holds the drawing API implementation that will be used to draw the circle.
   */
  private drawingAPI: DrawingAPI;
  constructor(x: number, y: number, radius: number, drawingAPI: DrawingAPI) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.drawingAPI = drawingAPI;
  }

  draw(): void {
    this.drawingAPI.drawCircle(this.x, this.y, this.radius);
  }
}

export { Circle, DrawingAPI, DrawingAPI1, DrawingAPI2, Shape };
