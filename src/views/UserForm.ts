import { User, UserProps } from './../models/User';
import { View } from './View';
interface EventMap { 
  [key: string]: () => void 
};

export class UserForm extends View<User, UserProps> {

  template(): string {
    return `
      <div>User name: ${this.model.get('name')}</div>
      <div>User age: ${this.model.get('age')}</div>
      <input type="text" class="input-name" />
      <button class="change-name">Change Name</button>
      <button class="set-random-age">Set random age</button>
    `;
  }

  eventsMap(): EventMap {
    return {
      'click:.set-random-age': this.onSetAgeClick,
      'click:.change-name': this.onChangeName
    };
  }

  onChangeName = (): void => {
    const input = this.parent.querySelector('input');
    if (input) {
      this.model.set({ name: input.value });
    }
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  }
}