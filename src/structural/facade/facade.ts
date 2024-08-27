/**
 * The `AuthenticationService` class provides methods for authenticating users.
 */
class AuthenticationService {
  public login(username: string, password: string): boolean {
    return true;
  }
}

/**
 * The `EmailService` class provides methods for sending emails.
 */
class EmailService {
  public sendEmail(email: string, content: string): void {
    console.log("Sending email to" + email + "with content" + content);
  }
}

/**
 * The `SMSService` class provides methods for sending SMS messages.
 */
class SMSService {
  public sendSms(phone: string, content: string): void {
    console.log("Sending sms to" + phone + "with content" + content);
  }
}

/**
 * The `HistoryService` class provides methods for logging user actions.
 */
class HistoryService {
  public log(user: string, action: string): void {
    console.log("Logging action" + action + "by user" + user);
  }
}

/**
 * The `UserFacade` class provides a simplified interface for interacting with various services
 * related to user authentication, email, SMS, and logging.
 *
 * The `login` method handles the entire login process, including:
 * - Authenticating the user using the `AuthenticationService`
 * - Sending an email notification using the `EmailService`
 * - Sending an SMS notification using the `SMSService`
 * - Logging the successful login using the `HistoryService`
 *
 * This facade pattern helps to simplify the usage of these underlying services and provide a more cohesive and user-friendly API.
 */
class UserFacade {
  private authService: AuthenticationService;
  private emailService: EmailService;
  private smsService: SMSService;
  private historyService: HistoryService;
  constructor() {
    this.authService = new AuthenticationService();
    this.emailService = new EmailService();
    this.smsService = new SMSService();
    this.historyService = new HistoryService();
  }
  public login(username: string, password: string): boolean {
    if (this.authService.login(username, password)) {
      this.emailService.sendEmail(username, "Login successful");
      this.smsService.sendSms(username, "Login successful");
      this.historyService.log(username, "Login successful");
      return true;
    }
    return false;
  }
}

export { UserFacade };
