import { facade, ServiceA, ServiceB, ServiceC } from "./facade-fn";

describe("Facade Pattern (Function)", () => {
  let serviceA: ServiceA;
  let serviceB: ServiceB;
  let serviceC: ServiceC;
  let facadeInstance: ReturnType<typeof facade>;

  beforeEach(() => {
    serviceA = { methodA: jest.fn() };
    serviceB = { methodB: jest.fn() };
    serviceC = { methodC: jest.fn() };
    facadeInstance = facade(serviceA, serviceB, serviceC);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("calls all service methods when execute is called", () => {
    facadeInstance.execute();

    expect(serviceA.methodA).toHaveBeenCalledTimes(1);
    expect(serviceB.methodB).toHaveBeenCalledTimes(1);
    expect(serviceC.methodC).toHaveBeenCalledTimes(1);
  });
});
