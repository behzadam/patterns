class Dialog {
  constructor(public title: string, public description: string) {}

  toString() {
    return `Title: ${this.title}, Description: ${this.description}`;
  }
}

/**
 * The classic Builder pattern.
 *
 */
class DialogBuilder {
  private title: string = "";
  private description: string = "";

  setTitle(title: string) {
    this.title = title;
    return this;
  }

  setDescription(description: string) {
    this.description = description;
    return this;
  }

  build() {
    return new Dialog(this.title, this.description);
  }
}

export { Dialog, DialogBuilder };
