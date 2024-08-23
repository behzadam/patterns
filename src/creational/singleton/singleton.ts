/**
 * For a reqular Singleton pattern you should write a new class for each type you want to have a singleton of.
 *
 * @example
 * ```ts
 * class Singleton {
 *  private static instance: Singleton | null = null;
 *  private constructor() {}
 *
 *  public static getInstance(): Singleton {
 *    if (!Singleton.instance) {
 *      Singleton.instance = new Singleton();
 *    }
 *      return Singleton.instance;
 *  }
 * }
 *
 *
 * const singleton1 = Singleton.getInstance();
 * const singleton2 = Singleton.getInstance();
 * console.log(singleton1 === singleton2); // Output: true
 *
 * ```
 * However, for the sake of simplicity, we will use the same class for all types.
 * In TypeScript we can't do it:
 * ```ts
 * class Singleton<T> {
 *  // We get error here:
 *  private static instance: T | null = null;
 * }
 */
export class Singleton {
  private static instances: Map<Function, any> = new Map();
  private constructor() {}

  public static getInstance<T>(type: new () => T): T {
    if (!Singleton.instances.has(type)) {
      Singleton.instances.set(type, new type());
    }
    return Singleton.instances.get(type);
  }
}
