import { Circle, DrawingAPI1, DrawingAPI2 } from "./bridge";
describe("Bridge Pattern", () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it("draws a circle using DrawingAPI1", () => {
    const drawingAPI = new DrawingAPI1();
    const circle = new Circle(10, 20, 5, drawingAPI);
    circle.draw();
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Drawing a circle at (10, 20) with radius 5 V1"
    );
  });

  it("draws a circle using DrawingAPI2", () => {
    const drawingAPI = new DrawingAPI2();
    const circle = new Circle(15, 25, 8, drawingAPI);
    circle.draw();
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Drawing a circle at (15, 25) with radius 8 V2"
    );
  });
});
