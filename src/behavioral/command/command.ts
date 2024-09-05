/**
 * The `Command` interface defines the contract for executing, undoing, and drawing commands.
 */
interface Command {
  execute: () => void;
  undo: () => void;
  redo: () => void;
  // We usually need a loop in graphical applications and then the draw method is needed.
  draw: () => void;
}

/**
 * The `Invoker` class is responsible for executing, drawing, and undoing `Command` objects.
 */
class Invoker {
  private drawingHistory: Command[];
  private undoHistory: Command[];
  constructor() {
    this.drawingHistory = [];
    this.undoHistory = [];
  }

  /**
   * Executes the provided `Command` object, and adds it to the command history.
   */
  execute(command: Command): void {
    command.execute();
    this.drawingHistory.push(command);
  }

  /**
   * Draws all the commands in the command history.
   */
  draw() {
    for (const command of this.drawingHistory) {
      command.draw();
    }
  }

  /**
   * Undoes the most recent command executed by the Invoker.
   */
  undo() {
    if (this.drawingHistory.length > 0) {
      const removedCommand = this.drawingHistory.pop();
      if (removedCommand) {
        removedCommand.undo();
        this.undoHistory.push(removedCommand);
      }
    }
  }

  redo() {
    if (this.undoHistory.length > 0) {
      const removedCommand = this.undoHistory.pop();
      if (removedCommand) {
        removedCommand.redo();
        this.drawingHistory.push(removedCommand);
      }
    }
  }
}

/**
 * The `DrawCircleCommand` class implements the `Command` interface and represents a command to draw a circle.
 */
class DrawCircleCommand implements Command {
  private circle?: Circle;
  constructor(private x: number, private y: number) {}

  /**
   * Executes the command by creating a new `Circle` instance with the provided x and y coordinates.
   */
  execute() {
    this.circle = new Circle(this.x, this.y);
  }

  /**
   * Undoes the most recent `DrawCircleCommand` by removing the associated `Circle` instance.
   */
  undo() {
    console.log(`Undone: DrawCircleCommand at (${this.x}, ${this.y})`);
    this.circle = undefined;
  }

  redo() {
    console.log(`Redone: DrawCircleCommand at (${this.x}, ${this.y})`);
    this.execute();
  }

  /**
   * Draws the circle represented by this command.
   */
  draw() {
    if (this.circle) {
      this.circle.draw();
    }
  }
}

/**
 * Represents a circle with an x and y coordinate.
 */
class Circle {
  constructor(private x: number, private y: number) {}
  draw() {
    console.log(`Circle drawn at (${this.x}, ${this.y})`);
  }
}

export { Circle, Command, DrawCircleCommand, Invoker };
