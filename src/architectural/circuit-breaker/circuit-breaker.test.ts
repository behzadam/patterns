import { CircuitBreaker } from "./circuit-breaker";

describe("CircuitBreaker", () => {
  const successFn = jest.fn().mockResolvedValue("Success");
  const errorFn = jest.fn().mockRejectedValue(new Error("Test error"));

  let breaker: CircuitBreaker;

  beforeEach(() => {
    jest.clearAllMocks();
    breaker = new CircuitBreaker({
      failureThreshold: 3,
      durationOfBreak: 100, // Short duration for testing
      samplingDuration: 2,
    });
  });

  it("handles closed state - allows successful execution", async () => {
    // Test successful execution (circuit closed)
    const result = await breaker.execute(successFn);
    expect(result).toBe("Success");
    expect(successFn).toHaveBeenCalledTimes(1);
  });

  it("handles open state - blocks execution after failures", async () => {
    // Trigger failures to open the circuit
    for (let i = 0; i < 3; i++) {
      await expect(breaker.execute(errorFn)).rejects.toThrow("Test error");
    }

    // Circuit should be open now
    await expect(breaker.execute(successFn)).rejects.toThrow(
      "Circuit is open. Try later."
    );
  });

  it("handles half-open state - allows execution after break duration", async () => {
    // First open the circuit
    for (let i = 0; i < 3; i++) {
      await expect(breaker.execute(errorFn)).rejects.toThrow("Test error");
    }

    // Mock time to simulate waiting for the break duration
    const originalDateNow = Date.now;
    Date.now = jest.fn(() => originalDateNow() + 200);

    try {
      // Circuit should be half-open and allow the call
      const halfOpenResult = await breaker.execute(successFn);
      expect(halfOpenResult).toBe("Success");

      // Another successful call should return the circuit to closed
      const finalResult = await breaker.execute(successFn);
      expect(finalResult).toBe("Success");
    } finally {
      // Restore original Date.now
      Date.now = originalDateNow;
    }
  });
});
