interface ObjectFactory {
  createInstance<T>(type: new () => T): T;
}

class DefaultObjectFactory implements ObjectFactory {
  createInstance<T>(type: new () => T): T {
    return new type();
  }
}

class SingletonObjectFactory implements ObjectFactory {
  private instances: Map<Function, any> = new Map();

  createInstance<T>(type: new () => T): T {
    if (!this.instances.has(type)) {
      this.instances.set(type, new type());
    }
    return this.instances.get(type);
  }
}

class DependencyInjectionContainer {
  private factories: Map<Function, ObjectFactory> = new Map();

  register<T>(type: new () => T, factory: ObjectFactory): void {
    this.factories.set(type, factory);
  }

  resolve<T>(type: new () => T): T {
    const factory = this.factories.get(type) || new DefaultObjectFactory();
    return factory.createInstance(type);
  }
}

export { DependencyInjectionContainer, ObjectFactory, SingletonObjectFactory };
