import { CachedObjectStorage, ObjectStorage } from "./proxy";

describe("Proxy Pattern", () => {
  let remoteStorage: jest.Mocked<ObjectStorage>;
  let cachedStorage: CachedObjectStorage;

  beforeEach(() => {
    remoteStorage = {
      load: jest.fn(),
    };
    cachedStorage = new CachedObjectStorage(remoteStorage);
  });

  it("loads from remote storage when key is not cached", () => {
    // Mock the remote storage to return a value
    remoteStorage.load.mockReturnValue("Remote Value");
    // Load the value
    const result = cachedStorage.load("key1");
    // The result should be the value returned by the remote storage
    expect(result).toBe("Remote Value");
    // The remote storage should have been called once
    expect(remoteStorage.load).toHaveBeenCalledWith("key1");
  });

  it("returns cached value when key is already cached", () => {
    // Mock the remote storage to return a value
    remoteStorage.load.mockReturnValue("Remote Value");
    // Load the value once
    cachedStorage.load("key1");
    // The second call to load should not call the remote storage
    const result = cachedStorage.load("key1");
    // The result should be the value returned by the remote storage
    expect(result).toBe("Remote Value");
    // The remote storage should have been called once
    expect(remoteStorage.load).toHaveBeenCalledTimes(1);
  });
});
