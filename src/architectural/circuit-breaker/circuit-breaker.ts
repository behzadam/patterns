type CircuitState = "CLOSED" | "OPEN" | "HALF_OPEN";

interface CircuitBreakerOptions {
  /**
   * The number of failures allowed before opening the circuit
   */
  failureThreshold: number;
  /**
   * The duration the circuit will stay open before resetting
   */
  durationOfBreak: number;
  /**
   * The number of successful calls required to close the circuit
   */
  samplingDuration?: number;
}

class CircuitBreaker {
  // State tracking
  private state: CircuitState = "CLOSED";
  private failureCount: number = 0;
  private successCount: number = 0;
  private lastFailureTime: number = 0;

  // Configuration properties
  private readonly failureThreshold: number;
  private readonly durationOfBreak: number;
  private readonly samplingDuration: number;

  constructor(options: CircuitBreakerOptions) {
    const {
      failureThreshold,
      durationOfBreak,
      samplingDuration = 30000,
    } = options;

    this.failureThreshold = failureThreshold;
    this.durationOfBreak = durationOfBreak;
    this.samplingDuration = samplingDuration;
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === "OPEN") {
      if (Date.now() > this.lastFailureTime) {
        this.state = "HALF_OPEN";
      } else {
        throw new Error("Circuit is open. Try later.");
      }
    }
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess() {
    if (this.state === "HALF_OPEN") {
      this.successCount++;
      if (this.successCount > this.samplingDuration) {
        this.reset();
      }
    } else {
      this.reset();
    }
  }

  private onFailure() {
    this.failureCount++;
    if (this.failureCount >= this.failureThreshold) {
      this.trip();
    }
  }

  private trip() {
    this.state = "OPEN";
    this.lastFailureTime = Date.now() + this.durationOfBreak;
    this.failureCount = 0;
    this.successCount = 0;
  }

  private reset() {
    this.state = "CLOSED";
    this.failureCount = 0;
    this.successCount = 0;
  }
}
export { CircuitBreaker, type CircuitBreakerOptions };
