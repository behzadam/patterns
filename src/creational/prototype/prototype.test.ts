import { Note, TextDocument } from "./prototype";

describe("Prototype Pattern", () => {
  it("clones a TextDocument with its notes correctly", () => {
    const originalDocument = new TextDocument("Original text", [
      new Note("Note 1"),
      new Note("Note 2"),
    ]);
    const clonedDocument = originalDocument.clone();

    // Check if the cloned document is an instance of TextDocument
    expect(clonedDocument).toBeInstanceOf(TextDocument);
    // Check if the cloned document is not the same instance as the original
    expect(clonedDocument).not.toBe(originalDocument);
    // Check if the cloned document has the same text as the original
    expect(clonedDocument["text"]).toBe(originalDocument["text"]);
    // Check if the cloned document has the same number of notes as the original
    expect(clonedDocument["notes"]).toHaveLength(
      originalDocument["notes"].length
    );

    // Check if the notes are cloned correctly
    expect(clonedDocument["notes"][0]).not.toBe(originalDocument["notes"][0]);
    expect(clonedDocument["notes"][1]).not.toBe(originalDocument["notes"][1]);

    // Check if the cloned notes have the same content as the original notes
    expect(clonedDocument["notes"][0].message).toBe(
      originalDocument["notes"][0].message
    );
    expect(clonedDocument["notes"][1].message).toBe(
      originalDocument["notes"][1].message
    );
  });
});
