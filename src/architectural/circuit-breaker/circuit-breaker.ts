type CircuitState = "CLOSED" | "OPEN" | "HALF_OPEN";

interface CircuitBreakerOptions {
  failureThreshold: number;
  successThreshold: number;
  timeout: number;
}

class CircuitBreaker {
  private state: CircuitState;
  private failureCount: number;
  private successCount: number;
  private lastFailureTime: number;
  private failureThreshold: number;
  private successThreshold: number;
  private timeout: number;

  constructor(options: CircuitBreakerOptions) {
    this.state = "CLOSED";
    this.failureCount = 0;
    this.successCount = 0;
    this.lastFailureTime = 0;
    this.failureThreshold = options.failureThreshold;
    this.successThreshold = options.successThreshold;
    this.timeout = options.timeout;
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
      if (this.successCount > this.successThreshold) {
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
    this.lastFailureTime = Date.now() + this.timeout;
    this.failureCount = 0;
    this.successCount = 0;
  }

  private reset() {
    this.state = "CLOSED";
    this.failureCount = 0;
    this.successCount = 0;
  }
}
