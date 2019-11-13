import { UserList } from './views/UserList';
import { UserEdit } from './views/UserEdit';
import { Collection } from "./models/Collection";
import { User, UserProps } from "./models/User";
import { UserForm } from "./views/UserForm";


const root = document.querySelector('#root');

// if (root) {
//   // const userForm = new UserForm(
//   //   root,
//   //   User.buildUser({
//   //     name: 'Francesco',
//   //     age: 33
//   //   })
//   // );
//   // userForm.render();
//   const userEdit = new UserEdit(
//     root,
//     User.buildUser({
//       name: 'Francesco',
//       age: 33
//     })
//   );
//   userEdit.render();
//   console.log(userEdit);
// } else {
//   throw new Error('Root element not found!');
// }


// const user = User.buildUser({
//   id: 1,
//   name: 'Francesco',
//   age: 14
// });

// user.on('change', () => {
//   console.log(user);
// })

// user.fetch();

// const userCollection = User.buildUserCollection();

// userCollection.on('change', () => {
//   console.log(userCollection.models);
//   const userList = new UserList(userCollection);
// })
// userCollection.fetch();

const users = new Collection(
  'http://localhost:3000/users',
  (json: UserProps) => {
    return User.buildUser(json)
  }
);

users.on('change', () => {
  if (root) {
    new UserList(root, users).render();
  }
});

users.fetch();



// user.on('change', () => {
//   console.log('CHANGE 2!!!!')
// })

// user.on('save', () => {
//   console.log('I SAVED HAHAHAHAH!')
// })

// user.trigger('change');
// user.trigger('save');
// console.log(user);

// import axios from 'axios';

// axios.put('http://localhost:3000/users/1', {
//   age: 33,
//   name: 'Francesco'
// })