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
    
        var range = document.createRange();
        range.selectNode(document.body)
        
        var form = range.createContextualFragment(`
            <div class="row content show-task" id="show-task">
            <hr>
                <div class="col-6">
                    <div class="board-task">
                    <img src="/icons/x-circle.svg" class="x-circle-add" id="x-circle-add">
                        <div class="heading">
                            <h3>${clickable.innerText}</h3>
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

    document.body.appendChild(form);

    var deleteTask = document.querySelectorAll('#delete-task')
    deleteTask.forEach((taskButton) => {
        taskButton.addEventListener('click', () => {
            if(clickable != null){
                document.getElementById(clickable.id).remove();
                document.getElementById('show-task').remove();   
            }else{
                return 0;
            }
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
                        <img src="/icons/x-circle.svg" class="x-circle-form" id="x-circle-form">
                        
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
            document.body.appendChild(form);
            
            //cerrar formulario
            const closeForm = document.getElementById('x-circle-form');
            closeForm.addEventListener('click', () => {
                document.getElementById('form-wrapper').remove();
            })

            document.getElementById('x-circle-form').addEventListener("mouseover", () => {
                document.getElementById('x-circle-form').setAttribute("src", "/icons/x-circle-fill.svg")
            })

            document.getElementById('x-circle-form').addEventListener("mouseout", () => {
                document.getElementById('x-circle-form').setAttribute("src", "/icons/x-circle.svg")
            })
        })

        //cerrar tarea
        const closeTask = document.getElementById('x-circle-add');
        closeTask.addEventListener('click', () => {
            document.getElementById('show-task').remove();
        })

        document.getElementById('x-circle-add').addEventListener("mouseover", () => {
            document.getElementById('x-circle-add').setAttribute("src", "/icons/x-circle-fill.svg")
        })

        document.getElementById('x-circle-add').addEventListener("mouseout", () => {
            document.getElementById('x-circle-add').setAttribute("src", "/icons/x-circle.svg")
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
  


//mostrar parrafos
document.addEventListener('DOMContentLoaded', () => {
    //amount-todo
    const parrafosTodo = document.querySelectorAll('#todo-lane p')
    const dropzoneTodo = document.getElementById("amount-todo");
    dropzoneTodo.innerText = parrafosTodo.length;
  
    //amount-done
    const parrafosDone = document.querySelectorAll('#done-lane p')
    const dropzoneDone = document.getElementById("amount-done");
    dropzoneDone.innerText = parrafosDone.length;
  
    //amount-doing
    const parrafosDoing = document.querySelectorAll('#doing-lane p')
    const dropzoneDoing = document.getElementById("amount-doing");
    dropzoneDoing.innerText = parrafosDoing.length;
});

//delete drag & drop - trash can
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('dragstart', (e) => {})
});
 

  


  
   


