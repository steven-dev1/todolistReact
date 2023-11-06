/* eslint-disable react/prop-types */
export const Form = ({showForm, changeStateForm, addTasks}) => {
    if (!showForm) return
  return (
        <div className="z-40 flex fixed w-screen h-screen top-0 left-0 justify-center items-center flex-col bg-slate-900/[.97]">
          <h1 className="font-bold text-2xl text-white mb-5">Añadir nueva tarea</h1>
          <form action='' className="w-11/12">
            <div className="flex flex-c l md:flex-row gap-2 mb-5 justify-center">
                <input type="text" name="add" id="input-task" className='flex-1 bg-gray-500 text-white font-medium p-3 rounded-xl text-md' placeholder='Nombre de la tarea'/>
                <input type="text" name="text" id="input-desc" className='flex-1 bg-gray-500 text-white font-medium p-3 rounded-xl text-md' placeholder='Descripción'/>
            </div>
            <div className="flex gap-2 justify-center">
              <button className='flex-1 bg-slate-600 hover:bg-slate-800 p-2 font-bold border-0 transition-all duration-200 sm:text-xs md:text-base' onClick={changeStateForm}>Cancelar</button>
              <button type="submit" onClick={addTasks} className="flex-1 bg-sky-500 hover:bg-slate-800 p-2 font-semibold border-0 transition-all duration-200 sm:text-xs md:text-base">Añadir</button>
            </div>
          </form>
          </div>  
  )
}