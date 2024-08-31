/**
 * Defines an interface for an object storage system that can load objects by key.
 */
interface ObjectStorage {
  load(key: string): string | null;
}

/**
 * Provides a remote object storage implementation that loads objects from a remote server.
 * TODO: This must be implemented
 */
class RemoteObjectStorage implements ObjectStorage {
  constructor(private readonly key: string) {}
  // Load from a remote server
  load(key: string): string | null {
    return `Image URL For: (${this.key})`;
  }
}

/**
 * Provides a caching proxy for an ObjectStorage implementation,
 * loading objects from a remote storage and caching the results,
 * instead of loading them from the remote storage every time.
 */
class CachedObjectStorage implements ObjectStorage {
  private cached: Map<string, string | null> = new Map();
  constructor(private readonly remote: ObjectStorage) {}

  load(key: string): string | null {
    // If the key is in the cache, return it
    if (this.cached.has(key)) {
      return this.cached.get(key)!;
    }
    // If the key is not in the cache, load it from the remote storage
    const value = this.remote.load(key);
    this.cached.set(key, value);
    return value;
  }
}

export { CachedObjectStorage, ObjectStorage };
