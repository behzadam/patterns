/**
 * The lat/long type
 */
type LatLng = {
  lat: number;
  lng: number;
};

/**
 * A path is a collection of points and a distance.
 */
type Path = {
  distance: number;
  points: LatLng[];
};

/**
 * The base class for route algorithms.
 */
abstract class RouteAlgorithm {
  constructor(public from: LatLng, public to: LatLng) {
    this.from = from;
    this.to = to;
  }
  abstract getDirection(): Path;
}

/**
 * Implementations of the shortest route algorithm.
 */
class ShortestRouteAlgorithm extends RouteAlgorithm {
  constructor(from: LatLng, to: LatLng) {
    super(from, to);
  }

  getDirection(): Path {
    return {
      distance: 10,
      points: [
        { lat: 1, lng: 2 },
        { lat: 3, lng: 4 },
      ],
    };
  }
}

/**
 * Implementations of the fastest route algorithm.
 */
class FastestRouteAlgorithm extends RouteAlgorithm {
  constructor(from: LatLng, to: LatLng) {
    super(from, to);
  }

  getDirection(): Path {
    return {
      distance: 14,
      points: [
        { lat: 3, lng: 3 },
        { lat: 3, lng: 5 },
      ],
    };
  }
}

/**
 * Implementations of the scenic route algorithm.
 */
class ScenicRouteAlgorithm extends RouteAlgorithm {
  constructor(from: LatLng, to: LatLng) {
    super(from, to);
  }

  getDirection(): Path {
    return {
      distance: 12,
      points: [
        { lat: 2, lng: 2 },
        { lat: 2, lng: 4 },
      ],
    };
  }
}

export { FastestRouteAlgorithm, ScenicRouteAlgorithm, ShortestRouteAlgorithm };
export type { LatLng, Path, RouteAlgorithm };
