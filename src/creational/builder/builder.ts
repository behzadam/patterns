interface DialogOptions {
  title: string;
  description: string;
  modal?: boolean;
  // Callbacks
  onClose?: () => void;
  onOpen?: () => void;
}

class Dialog {
  constructor(public options: DialogOptions) {}

  toString() {
    return `Title: ${this.options.title}, Description: ${this.options.description}, Modal: ${this.options.modal}`;
  }

  open() {
    console.log("Dialog opened");
    if (this.options.onOpen) {
      this.options.onOpen();
    }
  }

  close() {
    console.log("Dialog closed");
    if (this.options.onClose) {
      this.options.onClose();
    }
  }
}

/**
 * The classic Builder pattern.
 *
 */
class DialogBuilder {
  private options: DialogOptions = {
    title: "",
    description: "",
  };

  setTitle(title: string) {
    this.options.title = title;
    return this;
  }

  setDescription(description: string) {
    this.options.description = description;
    return this;
  }

  setModal(value: boolean) {
    this.options.modal = value;
    return this;
  }

  onClose(callback: () => void) {
    this.options.onClose = callback;
    return this;
  }

  onOpen(callback: () => void) {
    this.options.onOpen = callback;
    return this;
  }

  build() {
    return new Dialog(this.options);
  }
}

export { Dialog, DialogBuilder };
