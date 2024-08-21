import { DialogBuilder } from "./builder";

describe("Builder Pattern", () => {
  it("creates a dialog with the correct title and description", () => {
    const dialogBuilder = new DialogBuilder();
    const dialog = dialogBuilder
      .setTitle("My Dialog")
      .setDescription("This is my dialog")
      .build();

    expect(dialog.toString()).toBe(
      "Title: My Dialog, Description: This is my dialog"
    );
  });
});
