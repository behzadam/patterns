import {
  DependencyInjectionContainer,
  ObjectFactory,
  SingletonObjectFactory,
} from "../creational/factory";

class MyClass {}

describe("Factore Method", () => {
  it("should resolve objects using the default factory", () => {
    const container = new DependencyInjectionContainer();

    const instance1 = container.resolve(MyClass);
    const instance2 = container.resolve(MyClass);

    expect(instance1).toBeInstanceOf(MyClass);
    expect(instance2).toBeInstanceOf(MyClass);
    expect(instance1).not.toBe(instance2); // Different instances
  });

  it("should resolve objects using the singleton factory", () => {
    const container = new DependencyInjectionContainer();
    container.register(MyClass, new SingletonObjectFactory());

    const instance1 = container.resolve(MyClass);
    const instance2 = container.resolve(MyClass);

    expect(instance1).toBeInstanceOf(MyClass);
    expect(instance2).toBeInstanceOf(MyClass);
    expect(instance1).toBe(instance2); // Same instance
  });

  it("should resolve objects using a custom factory", () => {
    const container = new DependencyInjectionContainer();

    class MyClass {}

    class CustomObjectFactory implements ObjectFactory {
      createInstance<T>(type: new () => T): T {
        return new type(); // Or implement custom logic here
      }
    }

    container.register(MyClass, new CustomObjectFactory());

    const instance = container.resolve(MyClass);

    expect(instance).toBeInstanceOf(MyClass);
  });
});
