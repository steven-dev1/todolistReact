/* eslint-disable react/prop-types */
import { useState } from "react"
import { showMenu } from "../logic/script"

export function StructureTask ({task, index, deleteTask, completeTask, inProgressTask, editTasks}) {
    
    const [editar, mostrarEditar] = useState(false)
    const handleClickDelete = () => deleteTask(index)
    const handleClickCompleted = () => completeTask(index)
    const handleClickInProgress = () => inProgressTask(index)
    const handleClickEditTask = (e) => {
      e.preventDefault()
      editTasks(index)
      mostrarEditar(false)
    }
    const handleClickEdit = () => {
      mostrarEditar(true)
    }
    const handleCancelClick = (e) => {
      e.preventDefault()
      mostrarEditar(false)
    }
    const showMenuGear = () => {
      showMenu(index)
    }

    const taskEnProcesoClass = "flex-1 bg-amber-500 p-2 font-bold border-0 md:text-base hover:bg-amber-600 transition-all duration-150 text-xs sm:text-sm hidden sm:block"
    const taskNotEnprocesoClass = "flex-1 bg-slate-900 p-2 font-bold border-0 md:text-base hover:bg-slate-800 text-xs sm:text-sm hidden sm:block"

    return (
      <>
       
      <li className="my-4">
        <div className="z-20 flex fixed w-full h-screen top-0 left-0 justify-center items-center flex-col bg-slate-900/[.97]" style={{display: editar ? 'flex' : 'none'}}>
            <h1 className="font-bold text-2xl text-white mb-5">Editar tarea</h1>
            <form className="w-11/12 sm:w-2/4">
                <div className="flex flex-col gap-2">
                    <input defaultValue={task.tarea} type="text" name="add" className={`edit-input-task${index} flex-1 bg-gray-500 text-white font-semibold p-3 rounded-xl text-md`} placeholder='Nombre de la tarea'/>
                    <input defaultValue={task.desc} type="text" name="text" className={`edit-input-desc${index} flex-1 bg-gray-500 text-white font-semibold p-3 rounded-xl text-md`} placeholder='Descripción'/>
                </div>
                <div className="flex gap-2 justify-center mt-3">
                  <button className='flex-1 bg-slate-600 hover:bg-slate-800 p-2 font-bold border-0 transition-all duration-200 sm:text-xs md:text-base' onClick={handleCancelClick}>Cancelar</button>
                  <button id="save-editform" className="flex-1 bg-indigo-500 hover:bg-indigo-700 p-2 font-semibold border-0 transition-all duration-200 sm:text-xs md:text-base" onClick={handleClickEditTask}>Guardar</button>
                </div>
            </form>
        </div> 
        {/* TASK */}
        <div className="z-10 bg-black p-5 rounded-xl flex flex-col lg:flex-row text-xs md:text-base gap-2 relative">
          <div className="flex items-center flex-1">
            <input type="checkbox" onClick={handleClickCompleted} className={task.completada ? "w-5 font-semibold bg-green-600" : "w-5 font-semibold bg-white"} />
            <div className="flex flex-col items-start ml-2 mb-3 sm:mb-2">
              <span className={task.completada ? "font-semibold text-green-600 text-base text-left" : "font-semibold text-gray text-base text-left"}>{task.tarea}</span>
              <span className="text-left text-sm text-gray-400 md:text-base">{task.desc}</span>
            </div>
          </div>
          <div className='flex justify-between mt-3 lg:mt-0 gap-1.5 flex-1 items-center'>
              <button onClick={handleClickEdit} className="w-auto flex-1 bg-slate-900 hover:bg-slate-800 p-2 font-bold border-0 transition-all duration-200 text-xs sm:text-sm hidden sm:block md:text-base"><i  className="fa-solid fa-pen-to-square"></i> Editar</button>
              <button onClick={handleClickInProgress} className={task.enProceso ? taskEnProcesoClass : taskNotEnprocesoClass}><i className="fa-solid fa-clock"></i> En progreso</button>
              <button onClick={handleClickDelete} className="w-16 flex-1  p-2 font-bold border-0 bg-red-600 hover:bg-red-700  transition-all duration-200 text-xs sm:text-sm min-w-fit hidden sm:block md:text-base"><i className="fa-solid fa-trash"></i> Eliminar</button>
              <div onClick={showMenuGear} id={`menu-gear-btn-${index}`} className="group items-center justify-center w-10 h-10 bg-slate-900  px-2 py-4 font-bold border-0 hover:bg-slate-800 text-sm absolute right-4 bottom-3 min-w-fit flex sm:hidden rounded-xl">
                <span id={`span-edit-${index}`} className="hidden"><i  className="fa-solid fa-pen-to-square"></i></span>
                <span id={`span-progress-${index}`} className="hidden"><i className="fa-solid fa-clock"></i></span>
                <i id="i-gear" className="fa-solid fa-gear group-active:scale-110 transition-all duration-200 origin-center m-2"></i>
              </div>
          </div>
        </div> 
      </li>
      </>
    )
  }