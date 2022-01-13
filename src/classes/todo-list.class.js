import { Todo } from ".";

export class TodoList {

    constructor (){
    // creamos un arreglo de todos y lo dejamos vacíos.
        // this.todos =[];
        this.cargarLocalStorage();

    }
// métodos a utilizar 
// En un a instancia de la clase, tendrémos todos los todos

// insertamos el nuevo todo dentro del todos
    nuevoTodo( todo ) {
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

// eliminar el todo de los todos o tareas.
    eliminarTodo( id ) {
    // buscaremos barrer todos los todos con el filter, 
    // this.todos.filter ( viene un callback recibe el todo como argumento
    // y tendremos un todo individual y preguntaremos si todo.id != id del argumento)
    // toda esta instrucción va a regresar un nuevo arreglo, excluyendo el todo que coincida con el id.
    // y lo almacenamos en el this.todos

    // hacemos el código del event listener en componente.js
        this.todos = this.todos.filter(todo => todo.id != id)
        this.guardarLocalStorage();
    }

// Cambiar estado de los pendientes o todos, si esta completado o no completado
    marcarCompletado( id ) {
    // Necesitamos barrer el arreglo buscar el id, y cambiar el valor
    // empezamos con un ciclo for const todo of this.todos
    // si el id de todo.id esigual al id que queremos cambiar.
    // hacemos un clg id todo.id para ver si son string o números, y será con == en lugar de ===
    // si da true, todo completado = !todo.completado;
    // hacemos un break para poder salirnos del ciclo.

    // Necesitamos identificar el elemento que hacemos click, divTodoList
        for ( const todo of this.todos ) {
            console.log(id, todo.id);
            if(todo.id == id){
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }

    }

// Eliminar todos completados
    eliminarCompletados(  ) {

        this.todos = this.todos.filter(todo => !todo.completado)
        this.guardarLocalStorage();
    }

    guardarLocalStorage( ) {
    // localStorage.setItem para guardar en el local storage
    // localStorage.setItem('todo', this.todo)
    // mandamos el guardarLocalStorage en las demás métodos.
    // this.todo al ser un array nos da como valor en el local storage object, object
    // objectobject es la representación de un objeto en su forma string, no se puede recuperar el valor.

    // forma de transformar a JSON, es decir, a un string.
    // JSON.stringify convierte el arreglo de todos a JSON.
        localStorage.setItem('todo',JSON.stringify(this.todos));

    }

    cargarLocalStorage( ) {
        // si en el localStorage.getItem existe el todo 
        // if(localStorage.getItem('todo')){
        // entonces si existe, this.todos = localStogare.getItem todo
        // hasta este punto, this.todos no es una función, es un string por el JSON creado.
        // para transformarlo al objeto original el JSON.parse cambia el JSON string a su objeto original.
        //     this.todos = JSON.parse(localStorage.getItem('todo'));
        //     console.log('cargarLocal: ', this.todos);

        // } else { sino, el array []
        //     this.todos = [];
        // }
    // verificar si el objeto existe
    // código más limpio con operador ternario.
        this.todos = (localStorage.getItem('todo'))
                        ? JSON.parse(localStorage.getItem('todo'))
                        : [];
    // una vez que pasa por el operador ternario sabemos si es un arreglo vacío o objetos que parecen instancias
    // el map nos permite barrer cada uno de los elementos del arreglo 
    // y retornar un arreglo con los objetos mutados.
    // this.todos = this.todos.map( recibe un arg obj pasa por func => y retorna el el Todo nuevo fromJson )
    // se usa el Todo. en mayuscula porque es estática, y solo mandamos obj porque ya se hizo la desestructuración.
        this.todos = this.todos.map(obj => Todo.fromJson(obj))
    //  this.todos = this.todos.map( Todo.fromJson)
    }
}