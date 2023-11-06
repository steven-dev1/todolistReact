/* eslint-disable react/prop-types */
import { useState} from 'react'
import './App.css'
import { StructureTask } from './components/TaskList'
import { Form } from './components/Form'
import { showDeletedTasks, hiddenDeletedTasks } from './logic/script'



const StructureDeletedTask = ({task, index, restore, deleteEl}) => {
  const restoreElement = () => restore(index)
  const deleteTrashElement = () => deleteEl(index)
  const newLocal = task.completada ? "✅ Completada" : "❌ Sin completar"
  return (
    <li className='bg-gradient-to-r from-slate-700 to-slate-900 p-3 flex flex-col md:flex-row items-center mb-4 justify-between rounded-xl w-3/4'>
      <div className="flex mx-2 items-center w-full">
        <i className="fa-regular fa-trash-can text-xl mr-3 sm:text-2xl"></i>
        <div className='flex flex-col items-start w-full'>
          <span className='font-medium text-left text-sm sm:text-base'>{task.tarea}</span>
          <span className='text-gray-400 text-sm sm:text-base'><span>Estado:</span> {newLocal}</span>
        </div>
      </div>
      <div className='flex gap-2 text-center mt-3 md:mt-0 w-full justify-center'>
        <button onClick={restoreElement} className='font-medium text-sm sm:text-base flex-1 border-0 p-2 md:p-3 bg-indigo-500 hover:bg-indigo-700 transition-all duration-200 text-center'><i className="fa-solid fa-arrow-rotate-left"></i> Restaurar</button>
        <button onClick={deleteTrashElement} className='font-medium text-sm sm:text-base flex-1 border-0 bg-red-600 hover:bg-red-700 p-2 md:p-3 transition-all duration-200 text-center'><i className="fa-solid fa-trash"></i> Eliminar</button>
      </div>

    </li>
  )
}




function App() {
  const [showForm, setShowForm] = useState(false)
  const [tasks, setTasks] = useState(() => {
    const newTasks = window.localStorage.getItem('task')
    return newTasks ? JSON.parse(newTasks) : []
  })
  const [deletedTasks, setDeletedTasks] = useState(() => {
    const newTasks = window.localStorage.getItem('tasksDeleted')
    return newTasks ? JSON.parse(newTasks) : []
  })
      

  const changeStateForm = () => {
    setShowForm(showForm ? false : true)
    hiddenDeletedTasks()
  }

  const addTasks = (e) => {
    e.preventDefault()
    const task = document.getElementById('input-task').value
    const desc = document.getElementById('input-desc').value
    if (task === '' || desc === '') return
    const newTasks = [...tasks, {
      tarea: task,
      desc: desc,
      completada: false,
      enProceso: false
    }]
    setTasks(newTasks)
    changeStateForm()
    window.localStorage.setItem('task', JSON.stringify(newTasks))
  }
  const editTasks = (index) => {
    const valueInputTask = document.querySelector(`.edit-input-task${index}`).value
    const valueInputDesc = document.querySelector(`.edit-input-desc${index}`).value
    if (valueInputTask === '' || valueInputDesc === '') return
    const newTasks = [...tasks]
    newTasks[index].tarea = valueInputTask
    newTasks[index].desc = valueInputDesc
    window.localStorage.setItem('task', JSON.stringify(newTasks))
    setTasks(newTasks)
  }

  const deleteTrashTask = (index) => {
    const newTasks = [...deletedTasks]
    newTasks.splice(index, 1)
    setDeletedTasks(newTasks)
  }


  const deleteTask = (index) => {
    const newTasks = [...tasks]
    const deletedElement = [...deletedTasks, tasks[index]]
    newTasks.splice(index, 1)
    setTasks(newTasks)
    setDeletedTasks(deletedElement)
    window.localStorage.setItem('tasksDeleted', JSON.stringify(deletedElement))
    window.localStorage.setItem('task', JSON.stringify(newTasks))
  }

  const restoreTask = (index) => {
    const newTasks = [...tasks, deletedTasks[index]]
    const deletedElement = [...deletedTasks]
    deletedElement.splice(index, 1)
    setTasks(newTasks)
    setDeletedTasks(deletedElement)
    window.localStorage.setItem('tasksDeleted', JSON.stringify(deletedElement))
    window.localStorage.setItem('task', JSON.stringify(newTasks))
  }

  const completedTask = (index) => {
    const dataStorage = JSON.parse(window.localStorage.getItem('task'))
    if (dataStorage[index].completada) {
      dataStorage[index].completada = false
    } else {
      dataStorage[index].completada = true
      dataStorage[index].enProceso = false
    }
    window.localStorage.setItem('task', JSON.stringify(dataStorage))
    setTasks(dataStorage)
  }
  const inProgressTask = (index) => {
    const dataStorage = JSON.parse(window.localStorage.getItem('task'))
    if (dataStorage[index].enProceso) {
      dataStorage[index].enProceso = false
    } else {
      dataStorage[index].enProceso = true
      dataStorage[index].completada = false
    }
    window.localStorage.setItem('task', JSON.stringify(dataStorage))
    setTasks(dataStorage)
  }

  const emptyTasksDeleted = () => {
    if(deletedTasks.length === 0) return
    else {
      setDeletedTasks([])
      window.localStorage.removeItem('tasksDeleted')
    }
  }
  return (
    <>
      <div className="hidden" id='deletedElements'>
        <h2 className='text-3xl text-white font-bold my-3'>Tareas eliminadas</h2>
        <div className="h-11/12 overflow-auto">
          <ul className='flex flex-col items-center'>
        {deletedTasks.map((task, index) => {
        return (
              <StructureDeletedTask
                key={index}
                index={index}
                task={task}
                restore={restoreTask}
                deleteEl={deleteTrashTask}
              ></StructureDeletedTask>
              
              )
            })}
            </ul>
          </div>
        {deletedTasks.length ? "" : "No hay tareas eliminadas"}
          <div className="close-deletedTasks my-3 flex justify-center gap-3">
            <button id='empty-trash' onClick={emptyTasksDeleted} className='font-medium text-sm sm:text-base border-0 p-3 bg-indigo-500 hover:bg-indigo-700 transition-all duration-200'><i className="fa-solid fa-trash"></i> Vaciar papelera</button>
            <button id='close-trash' onClick={hiddenDeletedTasks} className='font-medium text-sm sm:text-base bg-red-600 p-3 border-0 hover:bg-red-700 transition-all duration-200'><i className="fa-solid fa-xmark"></i> Cerrar</button>
          </div>
      </div>
      <div className='flex flex-col items-center'>

      <h1 className='text-4xl font-black my-3'>To Do List</h1>
      <div className="w-full ">
        <ul className='list-none'>
        {tasks.map((task, index) => {
              return (
              <StructureTask 
              key={index} 
              task={task} 
              index={index} 
              deleteTask={deleteTask} 
              completeTask={completedTask}
              inProgressTask={inProgressTask}
              editTasks={editTasks}
              >
              </StructureTask>
              )
            })}
        </ul>
      </div>
      
        {tasks.length ? "": <span className='my-2 bg-black/[0.2] p-2 rounded-md'>Aún no hay tareas</span>}
      <div className='flex items-center flex-col sm:flex-row w-full justify-center gap-2'>
        <button id='añadir-tarea' onClick={changeStateForm} className='w-full bg-slate-900 p-3 hover:bg-black text-base sm:text-xl font-semibold rounded-1xl border-0  transition-all duration-250 flex-1'><i className="fa-solid fa-plus"></i> Añadir nueva tarea</button>
        <button className='w-full bg-slate-900 p-3 flex items-center gap-2 outline-none border-0 hover:bg-black transition-all duration-200 text-base font-semibold sm:text-xl flex-1  justify-center bg' onClick={showDeletedTasks} id='trash-button'><i className="fa-solid fa-trash"></i> Tareas eliminadas: {deletedTasks.length}</button>
      </div>
      <Form showForm={showForm} changeStateForm={changeStateForm} addTasks={addTasks}/>
      </div>
    </>
  )
}

export default App
