
import './styles.css';
import { Todo, TodoList } from './classes/index';
import { crearTodoHtml } from './js/componentes';

// crear un nuevo Todo, para JS
export const todoList = new TodoList();
// cuando tenemos una instrucción cuando el argumento que enviamos es el mismo argumento a otra función o método
// se puede obviar la función de fleca y mandar los argumentos.
// el primero elemento argumento del callback foreach está llamando la función
// y el argumento es el primer argumento que regresa el forEach.
// todoList.todos.forEach( todo => crearTodoHtml(todo));
todoList.todos.forEach(crearTodoHtml);

// agregamos unanueva instancia de nuevoTodo, y podemos ver la diferencia
// de un todo objeto o una instancia, esto no es un problema, pero si tuvieramos un método en al clase
// no podríamos trabajar con los objetos. creamos un metodo imprimirClase en la class Todo para probar
// cuando probamos con un elemento del arreglo que es un objeto, nos dice que no es una función,
// cuando se prueba con la instancia no hay problema.

// PROBLEMA : al trabajar en el local storage los métodos se pierden, pero las propiedades no.
// porque los métodos no son almacenados en el localStorage mediante el JSON stringify.

// SOLUCION: crear una instrucción que nos permita crear una nueva instancia en base a valores del localStorage en
// class Todo.

// const newTodo = new Todo('Aprender JavaScript');
// todoList.nuevoTodo(newTodo)
// todoList.todos[0].imprimirClase();
// newTodo.imprimirClase();

console.log('todos', todoList.todos);
