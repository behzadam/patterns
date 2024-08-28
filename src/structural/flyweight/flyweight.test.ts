import { LetterFactory } from "./flyweight";

describe("Flyweight Pattern", () => {
  let letterFactory: LetterFactory;

  beforeEach(() => {
    letterFactory = new LetterFactory();
  });

  it("creates letters and ensure reuse", () => {
    letterFactory.createLetter("h").draw(0, 0);
    letterFactory.createLetter("e").draw(0, 1);
    letterFactory.createLetter("l").draw(0, 2);
    letterFactory.createLetter("l").draw(0, 3);
    letterFactory.createLetter("o").draw(0, 4);


    // hello lenght is 5 but it takse a `l` from the cache,
    // so the letter count is 4
    expect(letterFactory.getLetterCount()).toBe(4);
    expect(letterFactory.getLetters()).toEqual(["h", "e", "l", "o"]);
  });
});
