/**
 * The route interface defines the common methods for all route types.
 */
interface Route {
  getDirection(): string;
}

/**
 * Implementations of the shortest route algorithm.
 */
class ShortestRouteAlgorithm implements Route {
  getDirection(): string {
    return "Shortest route direction";
  }
}

/**
 * Implementations of the fastest route algorithm.
 */
class FastestRouteAlgorithm implements Route {
  getDirection(): string {
    return "Fastest route direction";
  }
}

/**
 * Implementations of the scenic route algorithm.
 */
class ScenicRouteAlgorithm implements Route {
  getDirection(): string {
    return "Scenic route direction";
  }
}

export {
  FastestRouteAlgorithm,
  Route,
  ScenicRouteAlgorithm,
  ShortestRouteAlgorithm,
};
