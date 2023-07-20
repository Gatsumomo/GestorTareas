const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".wrapper-lane");

draggables.forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");

    //actualizar numero de tareas
    switch(task.parentNode.id){
      case "todo-lane":
        const parrafosTodo = document.querySelectorAll('#todo-lane p')
        const dropzoneTodo = document.getElementById("amount-todo");
        dropzoneTodo.innerText = parrafosTodo.length - 1;
        break;
      case "doing-lane":
        const parrafosDoing = document.querySelectorAll('#doing-lane p')
        const dropzoneDoing = document.getElementById("amount-doing");
        dropzoneDoing.innerText = parrafosDoing.length - 1;
        break;
      default:
        const parrafosDone = document.querySelectorAll('#done-lane p')
        const dropzoneDone = document.getElementById("amount-done");
        dropzoneDone.innerText = parrafosDone.length - 1;
        break;
      }

    //actualizar numero de tareas
  });

  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");

    console.log(task.parentNode.id)
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
  });
});

droppables.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();

    const bottomTask = insertAboveTask(zone, e.clientY);
    const curTask = document.querySelector(".is-dragging");

    if (!bottomTask) {
      zone.appendChild(curTask); 
    }else{
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
