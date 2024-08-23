import { Singleton } from "./singleton";

describe("Singleton", () => {
  class TestClass1 {}
  class TestClass2 {}

  it("creates only one instance of a class", () => {
    const instance1 = Singleton.getInstance(TestClass1);
    const instance2 = Singleton.getInstance(TestClass1);
    expect(instance1).toBe(instance2);
  });

  it("creates different instances for different classes", () => {
    const instance1 = Singleton.getInstance(TestClass1);
    const instance2 = Singleton.getInstance(TestClass2);
    expect(instance1).not.toBe(instance2);
  });

  it("creates instances of the correct type", () => {
    const instance1 = Singleton.getInstance(TestClass1);
    const instance2 = Singleton.getInstance(TestClass2);
    expect(instance1).toBeInstanceOf(TestClass1);
    expect(instance2).toBeInstanceOf(TestClass2);
  });
});
