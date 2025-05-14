import { circuitBreaker } from "./circuit-breaker";
// Mock timer functions
jest.useFakeTimers();

describe("Circuit Breaker", () => {
  // Helper function to create a failing function
  const createFailingFunction = () =>
    jest.fn().mockRejectedValue(new Error("Service unavailable"));

  // Helper function to create a succeeding function
  const createSucceedingFunction = () => jest.fn().mockResolvedValue("success");

  it("should start in the closed state", () => {
    const breaker = circuitBreaker({
      failureRatio: 3,
      samplingDuration: 10000,
    });

    expect(breaker.getState()).toBe("CLOSED");
  });

  it("should stay closed when number of failures is below threshold", async () => {
    const breaker = circuitBreaker({
      failureRatio: 3,
      samplingDuration: 10000,
    });

    const failingFunction = createFailingFunction();

    // Two failures - should stay closed
    await expect(breaker.execute(failingFunction)).rejects.toThrow();
    await expect(breaker.execute(failingFunction)).rejects.toThrow();

    expect(breaker.getState()).toBe("CLOSED");
    expect(failingFunction).toHaveBeenCalledTimes(2);
  });

  it("should trip open when failures reach threshold", async () => {
    const onStateChange = jest.fn();
    const breaker = circuitBreaker({
      failureRatio: 3,
      samplingDuration: 10000,
      onStateChange,
    });

    const failingFunction = createFailingFunction();

    // Three failures - should trip open
    await expect(breaker.execute(failingFunction)).rejects.toThrow();
    await expect(breaker.execute(failingFunction)).rejects.toThrow();
    await expect(breaker.execute(failingFunction)).rejects.toThrow();

    expect(breaker.getState()).toBe("OPEN");
    expect(failingFunction).toHaveBeenCalledTimes(3);
    expect(onStateChange).toHaveBeenCalledWith("CLOSED", "OPEN");
  });

  it("should reject calls immediately when open", async () => {
    const breaker = circuitBreaker({
      failureRatio: 2,
      samplingDuration: 10000,
    });

    const failingFunction = createFailingFunction();

    // Trip the circuit
    await expect(breaker.execute(failingFunction)).rejects.toThrow();
    await expect(breaker.execute(failingFunction)).rejects.toThrow();

    expect(breaker.getState()).toBe("OPEN");

    // Should reject immediately without calling the function
    failingFunction.mockClear();
    await expect(breaker.execute(failingFunction)).rejects.toThrow(
      "Circuit breaker is open"
    );
    expect(failingFunction).not.toHaveBeenCalled();
  });

  it("should transition to half-open after reset timeout", async () => {
    const onStateChange = jest.fn();
    const breaker = circuitBreaker({
      failureRatio: 2,
      samplingDuration: 10000,
      onStateChange,
    });

    const failingFunction = createFailingFunction();

    // Trip the circuit
    await expect(breaker.execute(failingFunction)).rejects.toThrow();
    await expect(breaker.execute(failingFunction)).rejects.toThrow();

    expect(breaker.getState()).toBe("OPEN");
    onStateChange.mockClear();

    // Advance time past the reset timeout
    jest.advanceTimersByTime(11000);

    // First call after timeout should attempt to execute the function
    failingFunction.mockClear();
    await expect(breaker.execute(failingFunction)).rejects.toThrow(
      "Service unavailable"
    );
    expect(failingFunction).toHaveBeenCalledTimes(1);
    expect(breaker.getState()).toBe("OPEN"); // Back to open after failure
    expect(onStateChange).toHaveBeenCalledWith("OPEN", "HALF_OPEN");
    expect(onStateChange).toHaveBeenCalledWith("HALF_OPEN", "OPEN");
  });

  it("should reset to closed after success in half-open state", async () => {
    const onStateChange = jest.fn();
    const breaker = circuitBreaker({
      failureRatio: 2,
      samplingDuration: 10000,
      onStateChange,
    });

    const failingFunction = createFailingFunction();
    const succeedingFunction = createSucceedingFunction();

    // Trip the circuit
    await expect(breaker.execute(failingFunction)).rejects.toThrow();
    await expect(breaker.execute(failingFunction)).rejects.toThrow();

    expect(breaker.getState()).toBe("OPEN");
    onStateChange.mockClear();

    // Advance time past the reset timeout
    jest.advanceTimersByTime(11000);

    // Succeed on next call
    const result = await breaker.execute(succeedingFunction);
    expect(result).toBe("success");
    expect(breaker.getState()).toBe("CLOSED");
    expect(onStateChange).toHaveBeenCalledWith("OPEN", "HALF_OPEN");
    expect(onStateChange).toHaveBeenCalledWith("HALF_OPEN", "CLOSED");
  });

  it("should require multiple successes with custom halfOpenSuccessThreshold", async () => {
    const onStateChange = jest.fn();
    const breaker = circuitBreaker({
      failureRatio: 2,
      samplingDuration: 10000,
      minimumThroughput: 2,
      onStateChange,
    });

    const failingFunction = createFailingFunction();
    const succeedingFunction = createSucceedingFunction();

    // Trip the circuit
    await expect(breaker.execute(failingFunction)).rejects.toThrow();
    await expect(breaker.execute(failingFunction)).rejects.toThrow();

    // Advance time past the reset timeout
    jest.advanceTimersByTime(11000);

    // First success - should stay half-open
    await breaker.execute(succeedingFunction);
    expect(breaker.getState()).toBe("HALF_OPEN");

    // Second success - should reset to closed
    await breaker.execute(succeedingFunction);
    expect(breaker.getState()).toBe("CLOSED");
  });

  it("should use custom isFailure function", async () => {
    // Only consider 503 errors as failures
    const isFailure = (error: Error) => error.message.includes("503");

    const breaker = circuitBreaker({
      failureRatio: 2,
      samplingDuration: 10000,
      isFailure,
    });

    const notCountedError = jest
      .fn()
      .mockRejectedValue(new Error("404 Not Found"));
    const countedError = jest
      .fn()
      .mockRejectedValue(new Error("503 Service Unavailable"));

    // 404 error - should not count toward threshold
    await expect(breaker.execute(notCountedError)).rejects.toThrow();
    await expect(breaker.execute(notCountedError)).rejects.toThrow();

    expect(breaker.getState()).toBe("CLOSED");

    // 503 errors - should count toward threshold
    await expect(breaker.execute(countedError)).rejects.toThrow();
    await expect(breaker.execute(countedError)).rejects.toThrow();

    expect(breaker.getState()).toBe("OPEN");
  });

  it("should manually reset circuit breaker", async () => {
    const onStateChange = jest.fn();
    const breaker = circuitBreaker({
      failureRatio: 2,
      samplingDuration: 10000,
      onStateChange,
    });

    const failingFunction = createFailingFunction();

    // Trip the circuit
    await expect(breaker.execute(failingFunction)).rejects.toThrow();
    await expect(breaker.execute(failingFunction)).rejects.toThrow();

    expect(breaker.getState()).toBe("OPEN");
    onStateChange.mockClear();

    // Manually reset
    breaker.reset();

    expect(breaker.getState()).toBe("CLOSED");
    expect(onStateChange).toHaveBeenCalledWith("OPEN", "CLOSED");
  });
});
