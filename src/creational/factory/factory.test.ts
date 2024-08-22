import { Param, RouteFactory, RouteType } from "./factory";
import { FastestRouteAlgorithm, LatLng, ScenicRouteAlgorithm, ShortestRouteAlgorithm } from "./route";

describe("RouteFactory", () => {
  let routeFactory: RouteFactory;
  const from: LatLng = { lat: 0, lng: 0 };
  const to: LatLng = { lat: 1, lng: 1 };

  beforeEach(() => {
    routeFactory = new RouteFactory();
  });

  it("creates a ShortestRouteAlgorithm when type is Shortest", () => {
    const params: Param = { type: RouteType.Shortest, from, to };
    const result = routeFactory.create(params);
    expect(result).toBeInstanceOf(ShortestRouteAlgorithm);
  });

  it("creates a FastestRouteAlgorithm when type is Fastest", () => {
    const params: Param = { type: RouteType.Fastest, from, to };
    const result = routeFactory.create(params);
    expect(result).toBeInstanceOf(FastestRouteAlgorithm);
  });

  it("creates a ScenicRouteAlgorithm when type is Scenic", () => {
    const params: Param = { type: RouteType.Scenic, from, to };
    const result = routeFactory.create(params);
    expect(result).toBeInstanceOf(ScenicRouteAlgorithm);
  });
});
