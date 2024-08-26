import { MenuComposite, MenuImage, MenuItem, MenuSeparator } from "./composite";

describe("Composite Pattern", () => {
  let menuComposite: MenuComposite;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    menuComposite = new MenuComposite("Main Menu", []);
    consoleSpy = jest.spyOn(console, "log");
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("handles mixed menu items", () => {
    const menuItem = new MenuItem("Food Item", "Delicious food");
    const menuSeparator = new MenuSeparator();
    const menuImage = new MenuImage("Food Image", "food.jpg");

    menuComposite.add(menuItem);
    menuComposite.add(menuSeparator);
    menuComposite.add(menuImage);

    menuComposite.display();

    expect(consoleSpy).toHaveBeenCalledTimes(4);
    expect(consoleSpy).toHaveBeenNthCalledWith(1, "- Main Menu");
    expect(consoleSpy).toHaveBeenNthCalledWith(
      2,
      "- Food Item: Delicious food"
    );
    expect(consoleSpy).toHaveBeenNthCalledWith(3, "-------------------");
    expect(consoleSpy).toHaveBeenNthCalledWith(4, "- Food Image: food.jpg");
  });
});
