import { Collection } from "../models/Collection";

export abstract class CollectionView<T, K> {
  constructor(
    public parent: Element,
    public collection: Collection<T, K>
  ) {}

  render(): void {
    this.parent.innerHTML = '';
    const templateElement = document.createElement('template');

    this.collection.models.forEach((model: T): void => {
      const itemParent = document.createElement('div');
      this.renderItem(model, itemParent);
      templateElement.content.appendChild(itemParent);
    });

    this.parent.appendChild(templateElement.content);
  }

  abstract renderItem(model: T, itemParent: Element): void;
}