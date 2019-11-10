export class Attributes<T> {
  constructor(private data: T) {}


  /**
   * K extends keyof T represents a generic constraint
   * A constraint limits the type that K can be
   * So we are saying that K can only be one of the 
   * keys of T
   */
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  }

  set(update: T): void {
    this.data = {
      ...this.data,
      ...update
    };
  }

  getAllProps = (): T => {
    return this.data;
  }
}