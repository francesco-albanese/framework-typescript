import { User } from './../models/User';
interface EventMap { 
  [key: string]: () => void 
};

export class UserForm {
  constructor(
    public parent: Element,
    public model: User
  ) {
    this.bindModel();
  }

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  }

  template(): string {
    return `
      <div>User name: ${this.model.get('name')}</div>
      <div>User age: ${this.model.get('age')}</div>
      <button class="set-random-age">Set random age</button>
    `;
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    Object.keys(eventsMap).forEach((eventKey: string): void => {
      const [eventName, selector] = eventKey.split(':');

      fragment.querySelectorAll(selector)
      .forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    });
  }

  eventsMap(): EventMap {
    return {
      'click:.set-random-age': this.onSetAgeClick
    };
  }

  onButtonClick(): void {
    console.log('hello from on button click');
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  }

  render(): void {
    this.parent.innerHTML = '';
    
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);
    this.parent.appendChild(templateElement.content);
  }
}