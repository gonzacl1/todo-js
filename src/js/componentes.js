
// importaciones

import { Todo } from "../classes";
import { todoList } from "../index";

// Referencias en el Html
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
// creamos una constante para manejar la referencia al input o cuadro de texto de class new-todo

// darle utilidad a los botones html de los filtros
// un listener de cualquier click de esa lista ordenada.
const ulFiltros = document.querySelector('.filters');
//
const anchorFiltros = document.querySelectorAll('.filtro');
export const crearTodoHtml= (todo) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : "" }" data-id="${todo.id}">
						<div class="view">
							<input class="toggle" type="checkbox" ${ (todo.completado) ? "checked" : "" }>
							<label>${todo.tarea}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li>`

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    //divTodoList.append( div );
    divTodoList.append( div.firstElementChild );
    
    return div;
}


// Eventos

// Al txt le agregamos el evento "keyup" cuando la persona suelta la tecla y soltamos el evento.
// Necesitamos recoger del console log, el value que es lo que se terminó por escribir 
// y el keycode, para tener el valor del enter que es 13.

// hacemos una condición si event.keycode === 13 significa que presiona enter
// Y para que nos lance los valores solo cuando el length del valor es mayor a 0, es decir escribieron.
// cuando eso se cumpla importamos el Todo, y creamos una constante nuevoTodo que sera igual a 
// new Todo( txtInput.value) y mandamos dentro del método lo que la persona escribe para que se cree el nuevo Todo con ese nombre.

// Necesitamos insertar el nuevo Todo en el arreglo del todoList, para eso importamos el todoList
// todoList.nuevoTodo( nuevoTodo ) que es el método para crear una nueva tarea.

// Vemos a través de la consola que se agrega al arreglo la nueva tarea, para que aparezca en el html
// debemos llamar al método crearTodoHtml () y le damos de valor el nuevoTodo

// Finalmente para que el input quede vacío luego que se presiona enter, luego de haber insertado la tarea,
// el txtInput.value = "" será un string vacío.
txtInput.addEventListener('keyup', (event) => {

    if( event.keyCode === 13 && txtInput.value.length > 0 ) {
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo(nuevoTodo);
        
        crearTodoHtml(nuevoTodo);
        txtInput.value = "";
    }
});

// Usamos el divTodoList le agregamos el evento a través del click
// buscamos en un comienzo imprimir en consola clg('click') y el clg('event'),
// en el mouse event, vemos que está el target, si le damos click en el nombre, será el label. en la x el button
// y en el checkbox el input, en tonces del evento lo que nos interesa es el event.target
// y para saber dentro de la consola a que le hemos dado click event.target.localName (img1)

// Hacemos una referencia a ese valor, const nombre Elemento = event.target.localName
// Hacemos una referencia al li completo porque tenemos que destruir al html completo (a la casilla), con la x
// div todo Elemento, event.target.parentElement.parentElement, para llegar hasta el li. (img2)
// con el li, llegamos a obtener el data-id de cada elemento.

// Deseamos obtener el data-id de la siguiente manera const todoId = todoElemento.getAttribute('data-id');
// si hacemos un console log de todoElemento y damos click en cada tarea, obtenemos el id.

// si nombreElemento incluye el input es decir que hizo click en el check,
// todoList.marcarCompletado (todoId); usamos el método de TodoList 
// para añadir la clase que tacha la tarea al dale click en el ckeckbox
// tenemos la referencia html todoElemento para hacer referencia a todas las clases
// es el classList y si queremos agregar o cambiar una clase .toggle('la que queremos codificar' 'completed')
divTodoList.addEventListener('click', ( event ) => {

    // console.log('click');
    // console.log(event);
    // console.log(event.target.localName);
    const nombreElemento = event.target.localName; // input, label, button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');
    // console.log(todoElemento);
    // console.log(todoId);

    if(nombreElemento.includes('input')) {
        todoList.marcarCompletado (todoId);
        todoElemento.classList.toggle('completed');
    
    } // hacemos la condición para eliminar los elementos.
    // si el nombre elementro incluye el boton entonces hay que borrar el todo
    // llamamos al todo list, y hacemos el llamado a nuestro método eliminar todo, pero para 
    // eliminarlo del html, hacemos referencia al divTodoList.removeChild(todoElemento)
    else if ( nombreElemento.includes('button')){
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    } 
});

btnBorrar.addEventListener('click', () => { 

    todoList.eliminarCompletados();

    for( let i = divTodoList.children.length-1; i >=0; i--) {
        
        const elemento = divTodoList.children[i];
        //console.log(elemento);

        if ( elemento.classList.contains('completed') ) {
            divTodoList.removeChild(elemento);
        }
    }
});

// le agregamos el listener a los filtros para mandar los eventos.
// hacemos un clg, del event pero le agregamos el .target.text para que solo se pueda dar click 
// en los textos. (foto 1), pero si damos al medio puede dar undefined.

// almanecamos el filtro en una variable, y validamos, si el filtro no existe, solo trae un return.

// tenemos una classe en css que es hidden que oculta las cosas, lo que queremos es que al seleccionar un boton
// ese atributo hidden no se aplique a esos todo.

// ciclo for para barrer cada uno de los elementos que tenemos en el divTodoList.children
// en el clg tenemos los elementos de la lista ordenada y la class completed, para saber si estan completados o no.
// foto 2 

// cada vez que hacemos click en uno de los elementos quitamos la clase hidden de los elementos.
// porque vamos a estar cambiando de pendientes a completados, etc y queremos limpiar esa clase.
// elemento.classList.remove('hidden');

// necesitamos saber si el elemento está marcado como completado o no const completado = elemento.classList.contains('completed');

// vamos a utilizar un switch porque son varias decisiones y evaluar mediante el filtro (completado pendiente o todos)
// en el caso de pendientes, a todos los elementos que estén completados, le tengo que agregar el hidden. break para que no haga las otras lineas.
// caso completados, si no están completados agregar la clase hidden.
// en todos se muestran todos porque como no es pendiente ni completados no hace nada.
// ynuestro elemento ya remueve el hidden por defecto.
ulFiltros.addEventListener('click', (event) =>{

    const filtro= event.target.text;
    if( !filtro ) {return};

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for ( const elemento of divTodoList.children) {
        // console.log(elemento);
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes' :
                if (completado) {
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados' :
                if (!completado) {
                    elemento.classList.add('hidden');
                }
            break;
        }
    }
});