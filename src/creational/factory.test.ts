import {
  DefaultExceptionFactory,
  NotFoundException,
  UnauthorizedException,
} from "./factory";

describe("Facotry Method Pattern", () => {
  let factory: DefaultExceptionFactory;

  beforeEach(() => {
    factory = new DefaultExceptionFactory();
  });

  it("creates a NotFoundException for error code 404", () => {
    const exception = factory.createError(404);
    expect(exception).toBeInstanceOf(NotFoundException);
    expect(exception.message).toBe("Resource not found");
    expect(exception.code).toBe(404);
  });

  it("creates an UnauthorizedException for error code 401", () => {
    const exception = factory.createError(401);
    expect(exception).toBeInstanceOf(UnauthorizedException);
    expect(exception.message).toBe("Unauthorized access");
    expect(exception.code).toBe(401);
  });

  it("throws an Error for an invalid error code", () => {
    expect(() => factory.createError(500)).toThrow("Invalid error code");
  });
});
