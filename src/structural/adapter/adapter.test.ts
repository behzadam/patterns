import {
  ExternalInstagramPackage,
  Facebook,
  InstagramAdapter,
  LinkeIn,
  Scheduler,
} from "./adapter";

describe("Adapter Pattern", () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("schedules posts for different social media platforms", () => {
    const scheduler = new Scheduler();
    const facebook = new Facebook();
    const linkedIn = new LinkeIn();
    const instagramAdapter = new InstagramAdapter(
      new ExternalInstagramPackage()
    );

    scheduler.schedule(facebook);
    scheduler.schedule(linkedIn);
    scheduler.schedule(instagramAdapter);

    expect(consoleSpy).toHaveBeenNthCalledWith(1, "Posting to social media...");
    expect(consoleSpy).toHaveBeenNthCalledWith(2, "Posting to Facebook...");
    expect(consoleSpy).toHaveBeenNthCalledWith(3, "Posting to social media...");
    expect(consoleSpy).toHaveBeenNthCalledWith(4, "Posting to LinkeIn...");
    expect(consoleSpy).toHaveBeenNthCalledWith(5, "Posting to social media...");
  });
});
