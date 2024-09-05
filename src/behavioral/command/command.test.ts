import { DrawCircleCommand, Invoker } from "./command";

describe("Command Pattern", () => {
  let invoker: Invoker;
  let spy: jest.SpyInstance;

  const CIRCLE_COORDS = [
    { x: 5, y: 5 },
    { x: 15, y: 15 },
    { x: 25, y: 25 },
  ];

  function setupCircles(): DrawCircleCommand[] {
    return CIRCLE_COORDS.map(({ x, y }) => new DrawCircleCommand(x, y));
  }

  beforeEach(() => {
    invoker = new Invoker();
    spy = jest.spyOn(console, "log");
  });

  afterEach(() => {
    spy.mockRestore();
  });

  it("executes multiple draw commands", () => {
    const circles: DrawCircleCommand[] = setupCircles();

    for (const circle of circles) {
      invoker.execute(circle);
      invoker.draw();
    }

    CIRCLE_COORDS.forEach(({ x, y }) => {
      expect(spy).toHaveBeenCalledWith(`Circle drawn at (${x}, ${y})`);
    });
  });

  it("undoes the last draw command", () => {
    const circles: DrawCircleCommand[] = setupCircles();

    for (const circle of circles) {
      invoker.execute(circle);
      invoker.draw();
    }

    invoker.undo();
    const lastCoord = CIRCLE_COORDS[CIRCLE_COORDS.length - 1];
    expect(spy).toHaveBeenCalledWith(
      `Undone: DrawCircleCommand at (${lastCoord.x}, ${lastCoord.y})`
    );
  });
});
