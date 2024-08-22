import { DialogBuilder } from "./builder";

describe("Builder Pattern", () => {
  const mockOnOpen = jest.fn();
  const mockOnClose = jest.fn();

  it("creates a dialog with the correct title and description", () => {
    const dialogBuilder = new DialogBuilder();
    const dialog = dialogBuilder
      .setTitle("My Dialog")
      .setDescription("This is my dialog")
      .setModal(true)
      .onOpen(mockOnOpen)
      .onClose(mockOnClose)
      .build();

    expect(dialog.options.title).toBe("My Dialog");
    expect(dialog.options.description).toBe("This is my dialog");
    expect(dialog.options.modal).toBe(true);

    dialog.open();
    expect(mockOnOpen).toHaveBeenCalled();

    dialog.close();
    expect(mockOnClose).toHaveBeenCalled();

    expect(dialog.toString()).toBe(
      "Title: My Dialog, Description: This is my dialog, Modal: true"
    );
  });
});
