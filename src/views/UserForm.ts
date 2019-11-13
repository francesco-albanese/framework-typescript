import { User, UserProps } from './../models/User';
import { View } from './View';
interface EventMap { 
  [key: string]: () => void 
};

export class UserForm extends View<User, UserProps> {

  template(): string {
    return `
      <input 
        type="text" 
        class="input-name"
        placeholder="${this.model.get('name')}" />
      <button class="change-name">Change Name</button>
      <button class="set-random-age">Set random age</button>
      <button class="save-model">Save</button>
    `;
  }

  eventsMap = (): EventMap => {
    return {
      'click:.set-random-age': this.onSetAgeClick,
      'click:.change-name': this.onChangeName,
      'click:.save-model': this.onSave
    };
  }

  onSave = (): void => {
    this.model.save();
  }

  onChangeName = (): void => {
    const input = this.parent.querySelector('.input-name') as HTMLInputElement;
    if (input) {
      this.model.set({ name: input.value });
    }
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  }
}