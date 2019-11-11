import axios from 'axios';

import { Eventing } from './Eventing';

export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(
    public rootUrl: string,
    public deserialize: (json: K) => T
  ) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  async fetch(): Promise<void> | never {
    try {
      const { data } = await axios.get(this.rootUrl);
      data.forEach((attrs: K) => {
        this.models.push(this.deserialize(attrs));
      });
      this.deserialize(data);
      this.trigger('fetch');
    } catch (e) {
      throw new Error(e.message);
    }
  }
}