import {
  FastestRouteAlgorithm,
  ScenicRouteAlgorithm,
  ShortestRouteAlgorithm,
} from "./route";

import type { LatLng, RouteAlgorithm } from "./route";

/**
 * The RouteFactory class is responsible for creating instances of
 * different route algorithms based on the specified route type.
 */
enum RouteType {
  Shortest,
  Fastest,
  Scenic,
}

/**
 * The param type for the route factory.
 */
type Param = {
  type: RouteType;
  from: LatLng;
  to: LatLng;
};

/**
 * The factory interface for creating route objects.
 */
interface RouteFactoryType {
  create(params: Param): RouteAlgorithm;
}

/**
 * The factory class for creating route objects.
 */
class RouteFactory implements RouteFactoryType {
  create({ type, from, to }: Param): RouteAlgorithm {
    switch (type) {
      case RouteType.Shortest:
        return new ShortestRouteAlgorithm(from, to);
      case RouteType.Fastest:
        return new FastestRouteAlgorithm(from, to);
      case RouteType.Scenic:
        return new ScenicRouteAlgorithm(from, to);
      default:
        throw new Error("Invalid route type");
    }
  }
}

export { RouteFactory, RouteType };
export type { Param, RouteFactoryType };
