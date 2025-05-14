/**
 * The state of the circuit breaker
 *
 * CLOSED: The circuit breaker is closed and the circuit is not being tripped
 * OPEN: The circuit breaker is open and the circuit is being tripped
 * HALF_OPEN: The circuit breaker is half-open and the circuit is being retried
 */
type State = "CLOSED" | "OPEN" | "HALF_OPEN";

type CircuitBreakerOptions = {
  /**
   * The ratio of failures to the total number of requests
   */
  failureRatio: number;
  /**
   * The duration of the sampling period
   */
  samplingDuration: number;
  /**
   * The minimum number of successful requests required to reset the circuit breaker
   * to the closed state
   */
  minimumThroughput?: number;

  onStateChange?: (from: State, to: State) => void;
  isFailure?: (error: Error) => boolean;
};

// Function to create a circuit breaker
export function circuitBreaker(options: CircuitBreakerOptions) {
  // Default options
  const {
    failureRatio = 5,
    samplingDuration = 30000,
    minimumThroughput = 1,
    onStateChange = () => {},
    isFailure = () => true,
  } = options;

  // Internal state
  let state: State = "CLOSED";
  let failureCount = 0;
  let successCount = 0;
  let lastFailureTime = 0;

  // Reset the circuit breaker
  const reset = (): void => {
    if (state !== "CLOSED") {
      const previousState = state;
      state = "CLOSED";
      failureCount = 0;
      successCount = 0;
      onStateChange(previousState, "CLOSED");
    }
  };

  // Trip the circuit breaker
  const trip = (): void => {
    if (state !== "OPEN") {
      const previousState = state;
      state = "OPEN";
      lastFailureTime = Date.now();
      onStateChange(previousState, "OPEN");
    }
  };

  // Set to half-open state
  const halfOpen = (): void => {
    if (state !== "HALF_OPEN") {
      const previousState = state;
      state = "HALF_OPEN";
      successCount = 0;
      onStateChange(previousState, "HALF_OPEN");
    }
  };

  // Check if the circuit is ready for a retry
  const isReadyForRetry = (): boolean => {
    if (state === "OPEN") {
      const now = Date.now();
      if (now - lastFailureTime > samplingDuration) {
        halfOpen();
        return true;
      }
      return false;
    }
    return true;
  };

  // Record a success
  const recordSuccess = (): void => {
    if (state === "HALF_OPEN") {
      successCount++;
      if (successCount >= minimumThroughput) {
        reset();
      }
    } else if (state === "CLOSED") {
      failureCount = 0;
    }
  };

  // Record a failure
  const recordFailure = (): void => {
    if (state === "HALF_OPEN") {
      trip();
    } else if (state === "CLOSED") {
      failureCount++;
      if (failureCount >= failureRatio) {
        trip();
      }
    }
  };

  // Execute a function with circuit breaker protection
  const execute = async <R>(fn: () => Promise<R>): Promise<R> => {
    if (!isReadyForRetry()) {
      throw new Error("Circuit breaker is open");
    }

    try {
      const result = await fn();
      recordSuccess();
      return result;
    } catch (error) {
      if (error instanceof Error && isFailure(error)) {
        recordFailure();
      }
      throw error;
    }
  };

  // Get the current state of the circuit
  const getState = (): State => state;

  return {
    execute,
    getState,
    reset,
  };
}
