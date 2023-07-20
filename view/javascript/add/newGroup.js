//agregar grupo
const form_group = document.getElementById('group-form')
const input_group = document.getElementById('group-input')
const lanes = document.querySelector('.lanes')

form_group.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input_group.value
    console.log(value)

    if(!value) return;

        //color random
        const color = Math.floor(Math.random()*16777215).toString(16);
        console.log(color);

        var range = document.createRange();
        range.selectNode(document.body);

        var newGroup = range.createContextualFragment(`
        <div class="swim-lane">
            <div class="head-newgroup" id="newgroup-heading" style="background-color: #${color};">
                <h5><a href="tasks.html" class="link-task">${value}</a></h5>
                <p id="amount-${value}"></p>
                <p></p>
            </div>
            <div class="wrapper-lane left-color" id="${value}-lane">
            </div>
            <p class="add-lane" id="add-lane-${value}"><img src="/icons/plus.svg" alt="add ${value} task"></p>
        </div>
        `)

        lanes.appendChild(newGroup)
        const addLane = document.getElementById(`add-lane-${value}`)

        const dividor = document.createElement("form");
        dividor.classList.add("submission");
        dividor.setAttribute("id", `${value}-form`);

        const newLane = document.createElement("input");
        newLane.classList.add("lane-input");
        newLane.setAttribute("type", "text");
        newLane.setAttribute("placeholder", "nombre de la nueva tarea");

        const submitLane = document.createElement("button");
        submitLane.classList.add("lane-submit");
        submitLane.classList.add("btn");
        submitLane.setAttribute("type","submit");
        submitLane.innerText = "Crear tarea";

        addLane.addEventListener("click", (event) => {
            addLane.style.display = "none";

            const id = event.target.id;
            const element = document.getElementById(id);

            dividor.appendChild(newLane);
            dividor.appendChild(submitLane);

            const parent = element.parentNode;
            console.log(parent)
            console.log(element.parentNode)
            parent.appendChild(dividor);

            dividor.style.display = "block";
        })

        submitLane.addEventListener("click", (event) => {
            event.preventDefault();
            const valor = newLane.value;

            //vacio
            if(valor.length<2){
                newLane.value = "";
                addLane.style.display = "block";
                dividor.style.display = "none";
            }else{
                const newManualTask = document.createElement("p");
                newManualTask.classList.add("task");
                newManualTask.classList.add("paragraph")
                newManualTask.setAttribute("draggable", "true")
                newManualTask.setAttribute("id", "unique") /*arreglar*/ 
                newManualTask.innerText = valor;

                newManualTask.addEventListener("dragstart", () => {
                    newManualTask.classList.add("is-dragging");
                })

                newManualTask.addEventListener("dragend", () => {
                    newManualTask.classList.remove("is-dragging");
                })

                document.getElementById(`${value}-lane`).appendChild(newManualTask)

                //contar parrafos
                const parrafos = document.querySelectorAll(`${value}-lane p`)
                const dropzone = document.getElementById(`amount-${value}`)
                dropzone.innerText = parrafos.length

                newLane.value = "";
                addLane.style.display = "block";
                dividor.style.display = "none";

                var clickables = document.querySelectorAll('.task')

                
                //mostrar info tasks
                clickables.forEach((clickable) => {
                    clickable.addEventListener('click', () => {
                        if(document.getElementById('form-wrapper') != null){
                            if(confirm('se cerrará el formulario, ¿desea continuar?')){
                                document.getElementById('form-wrapper')
                            }else{
                                return;
                            }
                        }

                        clickables = document.querySelectorAll('.task')

                        var range = document.createRange()
                        range.selectNode(document.body)

                        var form = range.createContextualFragment(`
                            <div class="row content show-task" id="show-task">
                            <hr>
                                <div class="col-6">
                                    <div class="board-task">
                                    <img src="/icons/x-circle.svg" class="x-circle-add" id="x-circle-add">
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


                        document.body.appendChild(form)

                        //borrar tarea 
                        var deleteTask = document.querySelectorAll('#delete-task')
                        deleteTask.forEach((taskButton) => {
                            taskButton.addEventListener('click', () => {
                                document.getElementById(clickable.id).remove()
                                document.getElementById('show-task').remove()

                                //contar parrafos
                                const parrafos = document.querySelectorAll(`${value}-lane p`)
                                const dropzone = document.getElementById(`amount-${value}`)
                                dropzone.innerText = parrafos.length
                            })
                        })

                        //editar tarea
                        var editTask = document.getElementById('edit-task')
                        editTask.addEventListener('click', () => {
                            document.getElementById('show-task').remove()
                            const range = document.createRange()
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

                            document.body.appendChild(form)

                            //cerrar formulario
                            const closeForm = document.getElementById('x-circle-form')
                            closeForm.addEventListener('click', () => {
                                document.getElementById('form-wrapper').remove()
                            })

                            document.getElementById('x-circle-form').addEventListener("mouseover", () => {
                                document.getElementById('x-circle-form').setAttribute("src", "/icons/x-circle-fill.svg")
                            })

                            document.getElementById('x-circle-form').addEventListener("mouseout", () => {
                                document.getElementById('x-circle-form').setAttribute("src", "/icons/x-circle-fill.svg")
                            })


                            //cerrar tarea
                            const closeTask = document.getElementById('x-circle-form')
                            closeTask.addEventListener('click', () => {
                                document.getElementById('show-task').remove()
                            }) 
                        })
                    })


                    //delete - doble click
                    document.addEventListener('DOMContentLoaded', () => {
                        const tareas = document.getElementsByClassName("task")
                        for(let i = 0; i < tareas.length; i++){
                            tareas[i].addEventListener("dblclick", () => {
                                if(confirm('¿Desea eliminar la tarea?') === true){
                                    tareas[i].remove()
                                }else{
                                    return
                                }
                            })
                        }
                    })

                    const draggables = document.querySelectorAll(".task")
                    const droppables = document.querySelectorAll(".wrapper-lane")
                    
                    draggables.forEach((task) => {
                        task.addEventListener("dragstart", () => {
                            task.classList.add("id-dragging")
                            
                            //actualizar numero de tareas
                            const parrafos = document.querySelectorAll(`${value}-lane p`)
                            const dropzone = document.getElementById(`amount-${value}`)
                            dropzone.innerText = parrafos.length
                        })
                    })

                    droppables.forEach((zone) => {
                        zone.addEventListener("dragover", (e) => {
                            e.preventDefault()

                            const bottomTask = insertAboveTask(zone, e.clientY)
                            const curTask = document.querySelector(".is-dragging")

                            if(!bottomTask){
                                zone.appendChild(curTask)
                            }else{
                                zone.appendChild(curTask, bottomTask)
                            }
                        })
                    })

                    const insertAboveTask = (zone, mouseY) => {
                        const els = zone.querySelectorAll(".task:not(.is-dragging)")

                        let closestTask = null
                        let closestOffset = Number.NEGATIVE_INFINITY

                        els.forEach((task) => {
                            const { top } = task.getBoundingClientRect()

                            const offset = mouseY - top

                            if(offset < 0 && offset > closestOffset){
                                closestOffset = offset
                                closestTask = task
                            }
                        })  

                        return closestTask
                    }
                })
            }
        })   
})

//eliminar grupo

