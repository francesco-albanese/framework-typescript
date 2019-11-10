type Callback = () => void;

interface HasId {
  id?: number;
}

interface ModelAttributes<T> {
  set(value: T): void;
  getAllProps(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): Promise<T>;
  save(data: T): Promise<T>;
}

interface Events {
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  async fetch(): Promise<void> {
    const id = this.attributes.get('id');

    if (typeof id !== 'number') {
      throw new Error('User does not exist in the db!');
    }

    const data = await this.sync.fetch(id);
    this.set(data);
  }

  async save(): Promise<void> {
    const userData = this.attributes.getAllProps();
    try {
      await this.sync.save(userData);
      this.trigger('save');
    } catch (e) {
      this.trigger('error');
    }
  }

}