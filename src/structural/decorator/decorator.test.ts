import { DataSourceWithMeasureDecorator, FileDataSource } from "./decorator";

describe("Decorator Pattern", () => {
  let consoleLogSpy: jest.SpyInstance;
  let performanceNowSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
    performanceNowSpy = jest.spyOn(performance, "now").mockReturnValue(0);
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    performanceNowSpy.mockRestore();
  });

  it("measures read time", () => {
    const fileDataSource = new FileDataSource("test.txt");
    const decoratedDataSource = new DataSourceWithMeasureDecorator(
      fileDataSource
    );

    performanceNowSpy.mockReturnValueOnce(0).mockReturnValueOnce(100);

    const result = decoratedDataSource.readData();

    expect(result).toBe("Reading data from test.txt");
    expect(consoleLogSpy).toHaveBeenCalledWith("Read time: 100 ms");
  });

  it("measures write time", () => {
    const fileDataSource = new FileDataSource("test.txt");
    const decoratedDataSource = new DataSourceWithMeasureDecorator(
      fileDataSource
    );

    performanceNowSpy.mockReturnValueOnce(0).mockReturnValueOnce(50);

    decoratedDataSource.writeData("Test data");

    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Writing data to test.txt: Test data"
    );
    expect(consoleLogSpy).toHaveBeenCalledWith("Write time: 50 ms");
  });
});
