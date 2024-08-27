import { UserFacade } from "./facade";

describe("UserFacade Pattern", () => {
  let userFacade: UserFacade;
  let authServiceMock: jest.SpyInstance;
  let emailServiceMock: jest.SpyInstance;
  let smsServiceMock: jest.SpyInstance;
  let historyServiceMock: jest.SpyInstance;

  beforeEach(() => {
    userFacade = new UserFacade();
    authServiceMock = jest.spyOn(userFacade["authService"], "login");
    emailServiceMock = jest.spyOn(userFacade["emailService"], "sendEmail");
    smsServiceMock = jest.spyOn(userFacade["smsService"], "sendSms");
    historyServiceMock = jest.spyOn(userFacade["historyService"], "log");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("calls all services when login is successful", () => {
    authServiceMock.mockReturnValue(true);

    const result = userFacade.login("testuser", "password123");

    expect(result).toBe(true);
    expect(authServiceMock).toHaveBeenCalledWith("testuser", "password123");
    expect(emailServiceMock).toHaveBeenCalledWith(
      "testuser",
      "Login successful"
    );
    expect(smsServiceMock).toHaveBeenCalledWith("testuser", "Login successful");
    expect(historyServiceMock).toHaveBeenCalledWith(
      "testuser",
      "Login successful"
    );
  });
});
