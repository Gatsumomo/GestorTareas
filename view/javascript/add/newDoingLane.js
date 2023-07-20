const addDoingLane = document.getElementById("add-lane-doing");

const dividorDoing = document.createElement("form");
dividorDoing.classList.add("sumbission");
dividorDoing.setAttribute("id", "doing-form")

const newDoingLane = document.createElement("input");
newDoingLane.classList.add("lane-input");
newDoingLane.setAttribute("type", "text");
newDoingLane.setAttribute("placeholder", "Nombre de la nueva tarea");

const submitDoingLane = document.createElement("button");
submitDoingLane.classList.add("lane-submit");
submitDoingLane.classList.add("btn")
submitDoingLane.setAttribute("type", "submit");
submitDoingLane.innerText = "Crear tarea";

addDoingLane.addEventListener("click", (event) => {
  addDoingLane.style.display = "none";

  const idDoing = event.target.id;
  const elementDoing= document.getElementById(idDoing);

  dividorDoing.appendChild(newDoingLane);
  dividorDoing.appendChild(submitDoingLane);

  let parentDoing = elementDoing.parentNode;
  parentDoing.appendChild(dividorDoing);

  dividorDoing.style.display = "block";
});


submitDoingLane.addEventListener("click", (event) => {
  event.preventDefault();
  const value = newDoingLane.value;

  //vacio - 2 caracteres
  if(value == "" || value.length < 2){
    const message = document.createElement("p")
    message.innerText = "Ingrese un nombre valido"
    message.classList.add("error-message")
    message.classList.add("task")
    dividorDoing.appendChild(message)
    dividorDoing = "none"

    newDoingLane.value = "";
    addDoingLane.style.display = "block"
    dividorDoing.style.display = "none"
  }else{

    const newDoingManualTask = document.createElement("p");
    newDoingManualTask.classList.add("task");
    newDoingManualTask.setAttribute("draggable", "true");
    newDoingManualTask.innerText = value;

    newDoingManualTask.addEventListener("dragstart",() => {
      newDoingManualTask.classList.add("is-dragging");
    })

    newDoingManualTask.addEventListener("dragend", () => {
      newDoingManualTask.classList.remove("is-dragging");
    });

    document.getElementById("doing-lane").appendChild(newDoingManualTask);

    newDoingLane.value = "";
    addDoingLane.style.display = "block";
    dividorDoing.style.display = "none";

    //amount-doing -> cantidad de tareas
    const parrafosDoing = document.querySelectorAll('#doing-lane p')
    const dropzoneDoing = document.getElementById("amount-doing");
    dropzoneDoing.innerText = parrafosDoing.length;

    var clickables = document.querySelectorAll('.task');

    //mostrar info task
    clickables.forEach((clickable) => {
      clickable.addEventListener('click', () => {
          if(document.getElementById('form-wrapper') != null){
            if(confirm('se cerrará el formulario, ¿desea continuar?')){
                document.getElementById('form-wrapper').remove();
            }else{
              return;
            }
          }
          
          clickables = document.querySelectorAll('.task') 

          var range = document.createRange();
          range.selectNode(document.body)
            
          var form = range.createContextualFragment(`
              <div class="row content show-task" id="show-task">
                  <div class="col-6">
                      <div class="board-task">
                      <img src="../view/icons/x-circle.svg" class="x-circle-add" id="x-circle-add">
                          <div class="heading">
                              <h3>${clickable.innerHTML}</h3>
                              <h6>${clickable.id}</h6>
                          </div>
                          <div class="dates">
                              <p>Descripción</p>
                              <p>Etiqueta</p>
                              <p>Entrega</p>
                              <p>Fecha de inicio</p>
                              <p>Fecha de entrega</p>
                              <p>Prioridad</p>
                              <p>${clickable.parentNode.id}</p>
                          </div>
                          <div class="buttons-task">
                              <button class="btn btn-light" id="edit-task">editar</button>
                              <button class="btn btn-light" id="delete-task">borrar</button><br>
                              <br>
                          </div>
                      </div>
                  </div>
              </div>
          `)
          
          if(document.getElementById('show-task') != null){
              document.getElementById('show-task').remove();
          }

      document.querySelector('.response').appendChild(form);

      //borrar tarea
      var deleteTask = document.querySelectorAll('#delete-task')
      deleteTask.forEach((taskButton) => {
        taskButton.addEventListener('click', () => {
          document.getElementById(clickable.id).remove();
          document.getElementById('show-task').remove();

          const parrafosDoing = document.querySelectorAll('#doing-lane p')
          const dropzoneDoing = document.getElementById("amount-doing") 
          dropzoneDoing.innerText = parrafosDoing.length
         })
      })
  
      var editTask = document.getElementById('edit-task')
      editTask.addEventListener('click', () => {
          //Si existe un formulario, lo borra
          document.getElementById('show-task').remove();
          const range = document.createRange();
          range.selectNode(document.body)

          const form = range.createContextualFragment(`
          <div class="row content content-color">
              <div class="row">  
                  <!--agregar atributos para las tareas-->
                  <div class="col">
                      <form action="http://127.0.0.1:5500/test/sirve.html" method="post" class="form-wrapper" id="form-wrapper">
                          <img src="../view/icons/x-circle.svg" class="x-circle-form" id="x-circle-form">
                          
                          <label for="task-name" class="form-label">Nombre:</label><input type="text" class="form-control" id="task-name" name="task-name">
                          <label for="task-description" class="form-label">Descripción:</label><input type="text" class="form-control" id="task-description" name="task-description">
                          <label for="task-hash" class="form-label">Etiqueta:</label><input type="text" class="form-control" id="task-hash" name="task-hash">
                          <div class="dates">
                              <label for="task-deliver" class="form-label">Fecha de entrega:</label><input type="date" id="task-deliver" name="task-deliver">
                              <label for="task-start" class="form-label">Fecha de inicio:</label><input type="date" id="task-start" name="task-start"><br>
                          </div>
                          <!--<label for="" class="form-label">Prioridad:</label><input type="text" class="form-control">-->
                          <input type="hidden" id="$">
                          <div class="check-wrapper">
                              <label for="check-options" class="form-label">Estado: </label><br>
                              <div class="check-options" id="check-options" name="check-options">
                                  <input type="checkbox" class="form-check-input" id="done-input"><label for="done-input" class="form-check-label">Done</label><br>
                                  <input type="checkbox" class="form-check-input" id="doing-input"><label for="doing-input" class="form-check-label">Doing</label><br>
                                  <input type="checkbox" class="form-check-input" id="todo-input"><label for="todo-input" class="form-check-label">To do</label><br>
                              </div>
                          </div><br>
                          <div class="buttons">
                              <button class="btn btn-light" id="save-task">Guardar</button>
                              <button type="reset" class="btn btn-light">Resetear</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div><br><br>
          `)
              document.querySelector('.response').appendChild(form);
              
              //cerrar formulario
              const closeForm = document.getElementById('x-circle-form');
              closeForm.addEventListener('click', () => {
                  document.getElementById('form-wrapper').remove();
              })

              document.getElementById('x-circle-form').addEventListener("mouseover", () => {
                  document.getElementById('x-circle-form').setAttribute("src", "../view/icons/x-circle-fill.svg")
              })

              document.getElementById('x-circle-form').addEventListener("mouseout", () => {
                  document.getElementById('x-circle-form').setAttribute("src", "../view/icons/x-circle.svg")
              })
          })

          //cerrar tarea
          const closeTask = document.getElementById('x-circle-add');
          closeTask.addEventListener('click', () => {
            document.getElementById('show-task').remove();
          })
          
          document.getElementById('x-circle-add').addEventListener("mouseover", () => {
            document.getElementById('x-circle-add').setAttribute("src", "../view/icons/x-circle-fill.svg")
          })
          
          document.getElementById('x-circle-add').addEventListener("mouseout", () => {
            document.getElementById('x-circle-add').setAttribute("src", "../view/icons/x-circle.svg")
          })
      })
  })








  //delete
  document.addEventListener('DOMContentLoaded', () => {
      const tareas = document.getElementsByClassName("task");
      for(let i = 0; i < tareas.length; i++){
        //console.log(tareas)
    
        tareas[i].addEventListener("dblclick", () => {
          if(confirm("¿Desea eliminar la tarea?") === true){
            tareas[i].remove();
          }else{
            return;
          }
        })
      }
  })
    
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
    });

    task.addEventListener("dragend", () => {
      task.classList.remove("is-dragging");

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
  }
});

