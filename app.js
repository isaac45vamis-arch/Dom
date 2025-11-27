// Seleccion de elementos del DOM
//Seleccionar por ID
const mainTitle = document.getElementById("main-title");
const descriptionText = document.getElementById("description-text");
const mainCard = document.getElementById("main-card");
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const btnLimpiarLista = document.getElementById("btn-limpiar-lista");
const taskList = document.getElementById("task-list");
const btnTema = document.getElementById("btn-tema");
const btnEjemplo = document.getElementById("btn-ejemplo");
const btnResaltarTitulo = document.getElementById("btn-resaltar-titulo");

//Seleccionar usando querySelector
//Primer elemento dentro de la vista de instrucciones
const primeraInstruccion = document.querySelector("#instructions-list li");
//cambiar el texto
primeraInstruccion.textContent = "Modifica este laboratorio usando JS y DOM";
//modificacion de contenido y estilos
//cambiar el texto del titulo principal
mainTitle.textContent = "Laboratorio DOM: Lista Interactiva";
//cambiar la descriccion usando el metodo innerHTML
descriptionText.innerHTML = "Este laboratorio ayudara a practicar <strong>manipulacion de Dom</strong> con JavaScript"
// anadir una clase de Bootstrap para sonbrear la card
mainCard.classList.add("shadow");
//funcion para alternar una clase en el titulo
//combinar  la clase de bootstrap con la clase personalizada del css
function alternarResaltadoTitulo(){
    //toggle anade la clase si no esta , o la quita si ya esta la clase
    mainTitle.classList.toggle("text-primary");
    mainTitle.classList.toggle("fw-bold");
    mainTitle.classList.toggle("custom-highlight");

}
//asociar la funcional boton resaltar titulo
btnResaltarTitulo.addEventListener("click", alternarResaltadoTitulo);


// NUEVO: Guardar en localStorage
function guardarTareas() {
    const tareas = [];
    document.querySelectorAll("#task-list li").forEach(li => {
        tareas.push({
            texto: li.querySelector("span").textContent,
            completada: li.querySelector("input").checked
        });
    });
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

// NUEVO: Cargar tareas desde localStorage al inicio

function cargarTareas() {
    const guardadas = JSON.parse(localStorage.getItem("tareas")) || [];
    guardadas.forEach(t => {
        const item = crearItemTarea(t.texto);
        const checkbox = item.querySelector("input");
        checkbox.checked = t.completada;
        if (t.completada) {
            item.querySelector("span").classList.add("text-decoration-line-through");
        }
        taskList.appendChild(item);
    });
}



// manejo de eventos en formularios
//crear una funcion para crear un uevo elemento de lista (li) de forma dinamica
function crearItemTarea(textoTarea){
    //crear el li
    const li = document.createElement("li");
    li.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "align-items-center"
    )

    // NUEVO: checkbox para marcar completada
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("form-check-input", "me-2");

    // NUEVO: evento para tachar texto
    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            spanTexto.classList.add("text-decoration-line-through");
        } else {
            spanTexto.classList.remove("text-decoration-line-through");
        }
        guardarTareas();
    });

    //crear un span para el texto
    const spanTexto = document.createElement("span");
    spanTexto.textContent = textoTarea;

    // editar con doble clic
    spanTexto.addEventListener("dblclick", function () {
        const nuevo = prompt("Edita la tarea:", spanTexto.textContent);
        if (nuevo !== null && nuevo.trim() !== "") {
            spanTexto.textContent = nuevo.trim();
            guardarTareas();
        }
    });

    // crear un boton de eliminar 
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "X";
    btnEliminar.classList.add("btn", "btn-sm", "btn-outline-danger");

    //asociar un evento
    btnEliminar.addEventListener("click", function(){
      taskList.removeChild(li);
      guardarTareas(); 
    })

    //agregar elementos al li
    li.appendChild(checkbox);   
    li.appendChild(spanTexto);
    li.appendChild(btnEliminar);

    return li;

}



//manejamos el evento "submit"
taskForm.addEventListener("submit", function(evento){
    //evitar que la pagina se recargue
    evento.preventDefault();

    //obtenemos el texto del input al elimnar espacios al inicio y al final
    const texto = taskInput.value.trim();
    //validamos que no este vacio
    if(texto === ""){
        alert("Por favor escribe una tarea antes de agregarle")
        return;
    }

    //creamos un nuevo li usando la funcion crear
    const nuevoItem = crearItemTarea(texto);
    //agregamos a la lista
    taskList.appendChild(nuevoItem);

    guardarTareas(); // NUEVO

    //limpiar el input
    taskInput.value = "";

});



//botones adicionales
//primero cambiar el tema claro/oscuro de latarjeta principal
btnTema.addEventListener("click", function(){
    //alternamos clases de fondo y texto en la card
    mainCard.classList.toggle("bg-dark");
    mainCard.classList.toggle("text-white");
});

btnEjemplo.addEventListener("click", function(){
    const ejemplo = crearItemTarea("Ejemplo de tarea generada por JavaScript");
    taskList.appendChild(ejemplo);
    guardarTareas(); 
});


//limpiar toda la lista
btnLimpiarLista.addEventListener("click", function(){
    //opcion 1 : remover todos los hijos uno por uno
    //opcion 2: vaciar el contenido html
    taskList.innerHTML = "";
    localStorage.removeItem("tareas"); 
});

// cargar tareas al abrir la página
cargarTareas();
