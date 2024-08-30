/**
 * Represents a service with a `methodA` function that performs some operation.
 */
type ServiceA = {
  methodA: () => void;
};

/**
 * Represents a service with a `methodB` function that performs some operation.
 */
type ServiceB = {
  methodB: () => void;
};

/**
 * Represents a service with a `methodC` function that performs some operation.
 */
type ServiceC = {
  methodC: () => void;
};

/**
 * Facade Pattern (Function)
 * This pattern is useful for providing a high-level API that hides the complexity of the underlying system.
 */
function facade(serviceA: ServiceA, serviceB: ServiceB, serviceC: ServiceC) {
  return {
    execute: () => {
      serviceA.methodA();
      serviceB.methodB();
      serviceC.methodC();
    },
  };
}

// Example usage:
// const facadeInstance = facade(
//   { methodA: () => console.log("Method A") },
//   { methodB: () => console.log("Method B") },
//   { methodC: () => console.log("Method C") }
// );
// facadeInstance.execute();

export { facade };
export type { ServiceA, ServiceB, ServiceC };
