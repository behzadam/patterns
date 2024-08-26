/**
 * Defines the options for a Dialog component.
 */
interface DialogOptions {
  title: string;
  description: string;
  modal?: boolean;
  /**
   * Defines optional callback functions to be invoked when the dialog is opened or closed.
   */
  onClose?: () => void;
  onOpen?: () => void;
}

/**
 * Represents a Dialog component with configurable options.
 */
class Dialog {
  constructor(public options: DialogOptions) {}

  /**
   * Returns a string representation of the Dialog options, including the title, description, and modal status.
   * @returns {string} A string representation of the Dialog options.
   */
  toString() {
    return `Title: ${this.options.title}, Description: ${this.options.description}, Modal: ${this.options.modal}`;
  }

  /**
   * Opens the dialog and invokes the `onOpen` callback if it is defined.
   */
  open() {
    if (this.options.onOpen) {
      this.options.onOpen();
    }
  }

  /**
   * Closes the dialog and invokes the `onClose` callback if it is defined.
   */
  close() {
    if (this.options.onClose) {
      this.options.onClose();
    }
  }
}

/**
 * Provides a fluent interface for building a `Dialog` component with configurable options.
 */
class DialogBuilder {
  private options: DialogOptions = {
    title: "",
    description: "",
  };

  /**
   * Sets the title of the dialog.
   * @param title - The title of the dialog.
   * @returns The DialogBuilder instance, for chaining.
   */
  setTitle(title: string) {
    this.options.title = title;
    return this;
  }

  /**
   * Sets the description of the dialog.
   * @param description - The description of the dialog.
   * @returns The DialogBuilder instance, for chaining.
   */
  setDescription(description: string) {
    this.options.description = description;
    return this;
  }

  /**
   * Sets whether the dialog should be displayed as a modal.
   * @param value - `true` to display the dialog as a modal, `false` to display it as a regular dialog.
   * @returns The `DialogBuilder` instance, for chaining.
   */
  setModal(value: boolean) {
    this.options.modal = value;
    return this;
  }

  /**
   * Sets the callback function to be invoked when the dialog is closed.
   * @param callback - The function to be called when the dialog is closed.
   * @returns The `DialogBuilder` instance, for chaining.
   */
  onClose(callback: () => void) {
    this.options.onClose = callback;
    return this;
  }

  /**
   * Sets the callback function to be invoked when the dialog is opened.
   * @param callback - The function to be called when the dialog is opened.
   * @returns The `DialogBuilder` instance, for chaining.
   */
  onOpen(callback: () => void) {
    this.options.onOpen = callback;
    return this;
  }

  /**
   * Builds a new `Dialog` instance with the configured options.
   * @returns A new `Dialog` instance with the configured options.
   */
  build() {
    return new Dialog(this.options);
  }
}

export { Dialog, DialogBuilder };
