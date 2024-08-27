/**
 * Defines the contract for a data source that can read and write data.
 */
interface DataSource {
  readData(): string;
  writeData(data: string): void;
}

/**
 * Implements the `DataSource` interface by reading and writing data to a file.
 */
class FileDataSource implements DataSource {
  private filename: string;
  constructor(filename: string) {
    this.filename = filename;
  }
  readData(): string {
    return `Reading data from ${this.filename}`;
  }
  writeData(data: string): void {
    console.log(`Writing data to ${this.filename}: ${data}`);
  }
}

/**
 * Decorator that measures the time it takes to read and write data using the wrapped `DataSource`.
 * This decorator can be used to add performance measurement capabilities to any `DataSource` implementation.
 */
class DataSourceWithMeasureDecorator implements DataSource {
  protected wrappee: DataSource;
  constructor(source: DataSource) {
    this.wrappee = source;
  }

  readData(): string {
    const startTime = performance.now();
    const result = this.wrappee.readData();
    const endTime = performance.now();
    const measure = endTime - startTime;
    console.log(`Read time: ${measure} ms`);
    return result;
  }

  writeData(data: string): void {
    const startTime = performance.now();
    this.wrappee.writeData(data);
    const endTime = performance.now();
    const measure = endTime - startTime;
    console.log(`Write time: ${measure} ms`);
  }
}

export { DataSource, DataSourceWithMeasureDecorator, FileDataSource };
