import './app.css';
import { addClass, createStore, removeClass, toggleClass } from '@/utils';

addClass(document.body, ['hello', ' world ', 'x c']);
addClass(document.body, ' one ');
addClass(document.body, [' one-arr ']);
addClass(document.body, 'one-normal');

setTimeout(() => {
  toggleClass(document.body, ['hello', ' world ', 'x c']);
  toggleClass(document.body, ' one ');
  removeClass(document.body, [' one-arr ']);
  removeClass(document.body, 'one-normal');
}, 5000);


const store = createStore({
  hello: "world",
  age: 31
})


console.log(store.getAll())

store.clear();

console.log(store.getAll())