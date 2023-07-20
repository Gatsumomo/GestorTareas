//a medias
/*window.onload = function(){
    document.addEventListener("dragstart", function(event){
        event.dataTransfer.setData("text/plain", event.target.id);
    });

    document.addEventListener("dragover", function(event){
        event.preventDefault();
    });

    document.addEventListener("dragend", function(event){
        event.preventDefault();
        const data = event.dataTransfer.getData("text/plain");
        const draggedElement = document.getElementById(data);
        console.log(data)

       
    });
}*/


//prueba funciona pero solo agrega al primer list-group-item
/*window.onload = function(){
        document.addEventListener("dragstart", function(event){
            event.dataTransfer.setData("text/plain", event.target.id);
        });
        
        document.addEventListener("dragover", function(event){
            event.preventDefault();
            var dropzone = event.target
        });

        document.addEventListener("dragend", function(event){
            event.preventDefault();
            var id = event.dataTransfer.getData("text/plain");
            var draggedElement = document.getElementById(id);

            //coge el primer id que coincida con list-group-item -> no
            //cada list-item-group puede tener tantos tasks como sean

            //const dropzone = this.querySelectorAll('#list-group-item')
            if(draggedElement.id === 'task' && dropzone.id === 'list-group-item'){
                dropzone.appendChild(item)
            }else{
                return 0;
            }
        })
    }
*/

//check-unchecked
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

//drag&drop con html
/*function dragStart(event) {
    event.dataTransfer.setData("text", Event.AT_TARGET); //establece los datos que se trasnferiran durante la operacion de arrastre     
}

function dragOver(event) {
    event.preventDefault();
}

function onDrop(event){
    event.preventDefault();
    const id = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(id);
    const dropzone = event.target;

    console.log(id);
    console.log(draggedElement)
    
    dropzone.appendChild(document.getElementById(id));
    console.log(id); 
}*/

//drag&drop solo addevent listener
/*document.addEventListener('DOMContentLoaded', () => {
    var draggable = document.getElementById('task');
    var droppable = document.getElementById('list-group-item');

    console.log(draggable)
    console.log(droppable)

    draggable.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text", event.target.id);
    });
  
    droppable.addEventListener("dragover", function(event) {
        event.preventDefault();
    });
  
    droppable.addEventListener("drop", function(event) {
        event.preventDefault();
        var data = event.dataTransfer.getData("text");
        var draggableElement = document.getElementById(event.dataTransfer.getData("text"));
        droppable.appendChild(draggableElement);
    });
})*/



//ondragover="dragOver(event)" ondragend="onDrop(event)" 
/*document.addEventListener('DOMContentLoaded', () => {
    var draggables = document.getElementsByClassName('task');

    for (var i = 0; i < draggables.length; i++) {
        draggables[i].addEventListener("dragstart", function (event) {
          event.dataTransfer.setData("text", event.target.id);
        });
    }

    var droppables = document.getElementsByClassName('list-group-item');

    for (var i = 0; i < droppables.length; i++) {
        droppables[i].addEventListener("dragover", function (event){
            event.preventDefault();
            event.target.classList.add("drag-over");
        });

        droppables[i].addEventListener("dragleave", function (event) {
            event.target.classList.remove("drag-over");
        });

        droppables[i].addEventListener("drop", function (event) {
            var id = event.dataTransfer.getData("text");
            var draggableElement = document.getElementById(id);

            console.log(id);

            if (draggableElement.parentElement.id === "list-group-item"){
                event.target.appendChild(draggableElement);

                event.target.classList.remove("drag-over");
                event.target.classList.add("dropped");
                
                event.dataTransfer.clearData();

                setTimeout(function () {
                    event.target.classList.remove("dropped");
                }, 1000);
            }else{
                console.log("no se puede")
            }

        })
    }    
})*/

const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".wrapper-lane");

draggables.forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
});

droppables.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();

    const bottomTask = insertAboveTask(zone, e.clientY);
    const curTask = document.querySelector(".is-dragging");

    if (!bottomTask) {
      zone.appendChild(curTask);
    } else {
      zone.insertBefore(curTask, bottomTask);
    }
  });
});

const insertAboveTask = (zone, mouseY) => {
  const els = zone.querySelectorAll(".task:not(.is-dragging)");

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  els.forEach((task) => {
    const { top } = task.getBoundingClientRect();

    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });

  return closestTask;
};




