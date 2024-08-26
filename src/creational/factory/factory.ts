import {
  FastestRouteAlgorithm,
  ScenicRouteAlgorithm,
  ShortestRouteAlgorithm,
} from "./route";

import type { LatLng, RouteAlgorithm } from "./route";


/**
 * Defines the different types of route algorithms that can be created by the `RouteFactory`.
 */
enum RouteType {
  Shortest,
  Fastest,
  Scenic,
}


/**
 * Defines the parameters required to create a route algorithm.
 */
type Param = {
  type: RouteType;
  from: LatLng;
  to: LatLng;
};


/**
 * Defines the contract for a route factory that can create instances of different
 * route algorithms based on the specified route type.
 */
interface RouteFactoryType {
  create(params: Param): RouteAlgorithm;
}


/**
 * The RouteFactory class is responsible for creating instances of
 * different route algorithms based on the specified route type.
 *
 * @param {RouteType} params.type - The type of route algorithm to create.
 * @param {LatLng} params.from - The starting location for the route.
 * @param {LatLng} params.to - The destination location for the route.
 * @returns {RouteAlgorithm} - The created route algorithm instance.
 * @throws {Error} - Throws an error if the specified route type is invalid.
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
