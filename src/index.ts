import { User } from "./models/User";

const user = User.buildUser({
  id: 1,
  name: 'Francesco',
  age: 14
});

user.on('change', () => {
  console.log(user);
})

user.fetch();


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