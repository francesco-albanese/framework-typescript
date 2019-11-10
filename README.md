# Web framework using Typescript
## Key concepts
- Inheritance and Composition
- Typescript generics
- <K extends keyof T> as in 
  ```js
  getSomething<K extends keyof T>(key: K): T[K] => {}
  ```
  this function will return a specific property `K` of the generic type `T`