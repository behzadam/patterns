import {
  FastestRouteAlgorithm,
  Route,
  ScenicRouteAlgorithm,
  ShortestRouteAlgorithm,
} from "./route";

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
 * The factory interface for creating route objects.
 */
interface RouteFactoryType {
  create(type: RouteType): Route;
}

/**
 * The factory class for creating route objects.
 */
class RouteFactory implements RouteFactoryType {
  create(type: RouteType): Route {
    switch (type) {
      case RouteType.Shortest:
        return new ShortestRouteAlgorithm();
      case RouteType.Fastest:
        return new FastestRouteAlgorithm();
      case RouteType.Scenic:
        return new ScenicRouteAlgorithm();
      default:
        throw new Error("Invalid route type");
    }
  }
}

export { RouteFactory, RouteFactoryType, RouteType };
