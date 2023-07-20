const hidden = document.querySelectorAll('.board')
hidden.forEach(element => {
    element.classList.add('hidden')
})

const heading_task = document.querySelector('.task-add');
heading_task.addEventListener('click', event => {
    console.log('click')
    const board = document.getElementById('board-task')
    board.classList.toggle('show')
})

const heading_group = document.querySelector('.add-group');
heading_group.addEventListener('click', event => {
    const board = document.getElementById('board-group')
    board.classList.toggle('show')
})

const three_dots = document.querySelectorAll('.three-dots')
three_dots.forEach(element => {
    element.addEventListener('click', event => {
        console.log('click')
        var range = document.createRange()
        range.selectNode(document.body)

        var newGroup = range.createContextualFragment(`
        <select class="">
            <opt>Editar grupos</opt>
            <opt>Borrar grupos</opt>
        </select>
        `)

        newGroup.classList.add('hidden')
        element.appendChild(newGroup)
    })
})