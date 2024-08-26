/**
 * The `Menu` class is an abstract base class that defines the common interface for all menu items.
 * Concrete subclasses of `Menu` represent different types of menu items, such as `MenuItem`, `MenuSeparator`, and `MenuComposite`.
 */
abstract class Menu {
  public abstract display(): void;
}

/**
 * Represents a menu item with a name and description.
 */
class MenuItem extends Menu {
  constructor(public name: string, public description: string) {
    super();
  }

  public display(): void {
    console.log(`- ${this.name}: ${this.description}`);
  }
}

/**
 * Represents a menu separator, which is a visual divider between menu items.
 */
class MenuSeparator extends Menu {
  public display(): void {
    console.log("-------------------");
  }
}

/**
 * Represents a menu item that displays an image.
 */
class MenuImage extends Menu {
  constructor(public name: string, public image: string) {
    super();
  }
  public display(): void {
    console.log(`- ${this.name}: ${this.image}`);
  }
}

/**
 * Represents a composite menu item that can contain other menu items.
 * The `MenuComposite` class allows for the creation of hierarchical menu structures,
 * where a menu can contain other menus, menu items, and other composite elements.
 */
class MenuComposite extends Menu {
  private children: Menu[] = [];
  public name: string;

  /**
   * Constructs a new `MenuComposite` instance with the given name and an array of menu items.
   *
   * @param name - The name of the menu composite.
   * @param menuItems - An array of `Menu` instances that will be the children of this composite.
   */
  constructor(name: string, menuItems: Menu[]) {
    super();
    this.name = name;
    this.children = menuItems;
  }

  /**
   * Adds the given `Menu` instance as a child of this `MenuComposite`.
   *
   * @param child - The `Menu` instance to add as a child.
   */
  public add(child: Menu): void {
    this.children.push(child);
  }

  /**
   * Displays the name of the menu composite and recursively displays all of its child menu items.
   */
  public display(): void {
    console.log(`- ${this.name}`);
    this.children.forEach((child) => child.display());
  }
}

export { Menu, MenuComposite, MenuImage, MenuItem, MenuSeparator };
