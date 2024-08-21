interface Exception {
  message: string;
  code: number;
}

class NotFoundException implements Exception {
  message = "Resource not found";
  code = 404;
}

class UnauthorizedException implements Exception {
  message = "Unauthorized access";
  code = 401;
}

interface ExceptionFactory {
  createError(errorCode: number): Exception;
}

class DefaultExceptionFactory implements ExceptionFactory {
  createError(errorCode: number): Exception {
    switch (errorCode) {
      case 404:
        return new NotFoundException();
      case 401:
        return new UnauthorizedException();
      default:
        throw new Error("Invalid error code");
    }
  }
}

export {
  DefaultExceptionFactory,
  Exception,
  ExceptionFactory,
  NotFoundException,
  UnauthorizedException,
};
