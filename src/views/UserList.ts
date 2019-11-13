import { UserShow } from './UserShow';
import { UserProps } from './../models/User';
import { CollectionView } from "./CollectionView";
import { User } from "../models/User";

export class UserList extends CollectionView<User, UserProps> {
  renderItem(model: User, itemParent: Element) {
    new UserShow(itemParent, model).render();
  }
}