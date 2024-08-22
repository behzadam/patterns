/**
 * Represents a cloneable object that can create a deep copy of itself.
 */
interface DeepCloneable<Type extends DeepCloneable<Type>> {
  clone(): Type;
}

/**
 * Represents a note that can be cloned.
 */
class Note implements DeepCloneable<Note> {
  constructor(public readonly message: string) {}

  clone(): Note {
    return new Note(this.message);
  }
}

/**
 * Imagine, we want to clone a text document with its notes.
 * We want to make sure for a deep clone, then we can use the prototype pattern.
 */
class TextDocument implements DeepCloneable<TextDocument> {
  private readonly text: string;
  private readonly notes: Note[];

  constructor(text: string, notes: Note[] = []) {
    if (!text) {
      throw new Error("Text cannot be empty");
    }

    this.text = text;
    this.notes = notes;
  }

  clone(): TextDocument {
    const clonedNotes = this.notes.map((note) => note.clone());
    return new TextDocument(this.text, clonedNotes);
  }
}

export { Note, TextDocument };
