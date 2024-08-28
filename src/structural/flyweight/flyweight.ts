/**
 * Represents a character that can be drawn on the screen.
 */
interface Letter {
  draw(row: number, col: number): void;
  getChar(): string;
}

/**
 * Represents a single character that can be drawn on the screen.
 * This class implements the `Letter` interface to provide a consistent
 * drawing API for characters.
 */
class Character implements Letter {
  private char: string;
  constructor(char: string) {
    this.char = char;
  }

  draw(row: number, col: number): void {
    console.log(`Drawing ${this.char} at ${row}, ${col}`);
  }

  getChar(): string {
    return this.char;
  }
}

/**
 * A factory class that manages the creation and reuse of `Letter` objects.
 * This class implements the Flyweight pattern to optimize memory usage by
 * sharing common `Letter` instances.
 */
class LetterFactory {
  private letters: { [key: string]: Letter } = {};
  constructor() {}

  createLetter(char: string): Letter {
    if (!this.letters[char]) {
      this.letters[char] = new Character(char);
    }
    return this.letters[char];
  }

  getLetterCount(): number {
    return Object.keys(this.letters).length;
  }

  getLetters(): string[] {
    return Object.values(this.letters).map((letter) => letter.getChar());
  }

  //... Other APIs
}

export { Character, Letter, LetterFactory };
