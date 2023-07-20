function dragStart(event) { 
    event.dataTransfer.setData("text", event.target.id); //establece los datos que se trasnferiran durante la operacion de arrastre
    //se esta almacenando el id del elemento que se esta arrastrando en el objeto de transferencia de datos (dataTransfer) con el formato text/plain
}
//evento dragstart se activa y llama a la funcion dragStart

function dragOver(event) {
    event.preventDefault();
} 

function onDrop(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(id);
    const dropzone = event.target;

    console.log(id); 

    dropzone.appendChild(draggedElement);

    event.dataTransfer.clearData();
}


//checkbox
function checked(){
addEventListener("click", function(event){
    event.target.src = '/icons/check-circle.svg'
})
}
function uncheck(){
addEventListener("dblclick", function(event){
    event.target.src = '/icons/circle.svg'
})
}





