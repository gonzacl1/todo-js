
export class Todo {

// crear una instrucción que nos permita crear una nueva instancia en base a valores del localStorage en
// class Todo.
// static fromJson que recibe un objeto, que sería un todo
// const tempTodo será una nueva instancia del todo, para llamar al constructor hay que mandar la tarea
// podemos hacer desestructuración para las tareas.
// hacemos referencia a las propiedades del constructor
// necesitamos regresar la instancia
// tenemos que llamar el fromJson  en el cargarLocalStorage

    static fromJson ({id, tarea, completado, creado}) {

        const tempTodo = new Todo(tarea);
        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;
    }


// queremos recibir la tarea, entonces al mandar una tarea automaticamente nos da toda la info.
    constructor( tarea ) {
        // la tarea que se recibe por el argumento
        this.tarea = tarea;
        // identificador único de la tarea, para que no sea duplicado.
        this.id = new Date().getTime(); //info de hora, min,seg,microseg 1231234
        // nos dice si la tarea está completada o no.
        this.completado = false;
        // fecha de creación.
        this.creado = new Date();
    }
    // creamos un método para probar los objetos y las instancias.
    imprimirClase (){
        console.log(`${this.tarea} - ${this.id}`)
    }
}
