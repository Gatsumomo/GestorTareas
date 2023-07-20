document.addEventListener("DOMContentLoaded", () => {
    const draggablesDelete = document.querySelectorAll('.task')
    const droppable = document.querySelector('.delete')
    
    draggablesDelete.forEach( draggable => {
        draggable.addEventListener("dragstart", (event) => {
            event.originalEvent.dataTransfer.effectAllowed = "move"
            console.log(event.dataTransfer.setData("text", event.target.id))
            draggable.classList.add("is-dragging")
    
            //actualizar numero de tareas
            switch(draggable.parentNode.id){
                case "todo-lane":
                    const parrafosTodo = document.querySelectorAl('#todo-lane p');
                    const dropzoneTodo = document.getElementById("#amount-todo");
                    dropzoneTodo.innerText = parrafosTodo.length -1;
                break;
                case "doing-lane":
                    const parrafosDoing = document.querySelectorAll('#doing-lane p')
                    const dropzoneDoing = document.getElementById("amount-doing")
                    dropzoneDoing.innerText = parrafosDoing.length - 1;
                break;
                default:
                    const parrafosDone = document.querySelectorAll('#done-lane p')
                    const dropzoneDone = document.getElementById("amount-doing")
                    dropzoneDone.innerText = parrafosDone.length - 1
                break;
            } 
        })
    
        draggable.addEventListener("dragend", (event) => {
            draggable.classList.remove("is-dragging")
    
            //actualizar numero de tareas
            switch(task.parentNode.id){
                case "todo-lane":
                    const parrafosTodo = document.querySelectorAll('#todo-lane p')
                    const dropzoneTodo = document.getElementById("amount-todo");
                    dropzoneTodo.innerText = parrafosTodo.length;
                break;
                case "doing-lane":
                    const parrafosDoing = document.querySelectorAll('#doing-lane p')
                    const dropzoneDoing = document.getElementById("amount-doing");
                    dropzoneDoing.innerText = parrafosDoing.length;
                break;
                default:
                    const parrafosDone = document.querySelectorAll('#done-lane p')
                    const dropzoneDone = document.getElementById("amount-done");
                    dropzoneDone.innerText = parrafosDone.length;
                break;
            }
        })
    
        droppable.addEventListener("dragover", (e) => {
            e.preventDefault();
        })
    
        droppable.addEventListener("drop", (event) => {
            event.preventDefault()
            var data = event.dataTransfer.getData("text")
            var draggedElement = document.getElementById(data)
    
            console.log(event.target)
            console.log(event.pa)
    
            if(event.target.id == "trash"){
                console.log('hola')
            }
        })
    });
})




/*
//borrar con click
const deleteTask = document.querySelectorAll('.trash-can')
deleteTask.forEach( taskButton => {
    taskButton.addEventListener("click", () => {
        console.log("hola")
        document.querySelectorAll('.task').forEach((task) => {
            task.addEventListener("click", (event) => {
                task.parentNode.removeChild(task)
            })
        })
    })
})

//borrar con click - version 2
const delTask = document.querySelectorAll('.task')
delTask.forEach( task => {
    task.addEventListener("click", () => {
        console.log("hola")
        document.querySelectorAll('.trash-can').forEach((can) => {
            can.addEventListener("click", (event) => {
                task.parentNode.removeChild(task)
            })
        })
    })
})*/

/*document.addEventListener("DOMContentLoaded", () => {
    var draggablesDelete = document.querySelectorAll('.task')

    for(var i = 0; i < draggablesDelete.length; i++){
        draggables[i].addEventListener("dragstart", (event) => {
            event.dataTransfer.serData("text/plain", event.target.id)
        })
    }

    var droppable = document.querySelector('.trash-can')

    droppable.addEventListener("dragover", (event) => {
        event.preventDefault()
        event.target.classList.add("is-dragover")
    })

    droppable.addEventListener("drop", (event) => {
        event.target.classList.remove("is-dragover")
    })

    droppable.addEventListener("dragleave", (event) => {
        var id = event.dataTransfer.getData("text/plain")
        var draggedElement = document.getElementById(id)

        if(event.target.classList.contains("trash-can")){
            draggedElement.remove()
            event.target.classList.add("dropped")
        }
    })
})*/