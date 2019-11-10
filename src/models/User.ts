import { Model } from './Model';
import { ApiSync } from './ApiSync';
import { Eventing } from './Eventing';
import { Attributes } from './Attributes';

export interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes(attrs),
      new Eventing(),
      new ApiSync('http://localhost:3000/users')
    );
  }
}