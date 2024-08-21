import { RouteFactory, RouteType } from "./factory";
import {
  FastestRouteAlgorithm,
  ScenicRouteAlgorithm,
  ShortestRouteAlgorithm,
} from "./route";

describe("RouteFactory", () => {
  let routeFactory: RouteFactory;

  beforeEach(() => {
    routeFactory = new RouteFactory();
  });

  it("creates a ShortestRouteAlgorithm when RouteType.Shortest is provided", () => {
    const route = routeFactory.create(RouteType.Shortest);
    expect(route).toBeInstanceOf(ShortestRouteAlgorithm);
  });

  it("creates a FastestRouteAlgorithm when RouteType.Fastest is provided", () => {
    const route = routeFactory.create(RouteType.Fastest);
    expect(route).toBeInstanceOf(FastestRouteAlgorithm);
  });

  it("creates a ScenicRouteAlgorithm when RouteType.Scenic is provided", () => {
    const route = routeFactory.create(RouteType.Scenic);
    expect(route).toBeInstanceOf(ScenicRouteAlgorithm);
  });
});
