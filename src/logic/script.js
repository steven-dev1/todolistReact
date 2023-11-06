export const showDeletedTasks = () => {
    document.getElementById('trash-button').style.display = "none"
    document.getElementById('deletedElements').className = "absolute top-0 left-0 bg-black/[.95] w-screen h-screen flex flex-col items-cennter justify-center z-50"
}

export const hiddenDeletedTasks = () => {
    document.getElementById('trash-button').style.display = "flex"
    document.getElementById('deletedElements').className = "hidden"
}

export const showMenu = (index) => {

        const e = document.getElementById(`menu-gear-btn-${index}`)
        const bigWidth = "menu-gear-btn group items-center justify-center w-50 h-10 bg-slate-900  px-2 py-4 font-bold border-0 hover:bg-slate-800  text-sm absolute right-4 bottom-3 min-w-fit flex sm:hidden rounded-xl"
        const shortWidth = "menu-gear-btn group items-center justify-center w-10 h-10 bg-slate-900  px-2 py-4 font-bold border-0 hover:bg-slate-800  text-sm absolute right-4 bottom-3 min-w-fit flex sm:hidden rounded-xl"
            if(e.className == bigWidth) {
                const spanEdit = document.getElementById(`span-edit-${index}`)
                const spanProgress = document.getElementById(`span-progress-${index}`)
                spanEdit.className = "hidden"
                spanProgress.className = "hidden"
                e.className = shortWidth
            } else if (e.className == shortWidth) {
                const spanEdit = document.getElementById(`span-edit-${index}`)
                const spanProgress = document.getElementById(`span-progress-${index}`)
                spanEdit.className = "inline-block bg-slate-500 py-1 px-3 rounded-lg m-1 cursor-pointer hover:bg-slate-700"
                spanProgress.className = "inline-block bg-slate-500 py-1 px-3 rounded-lg m-1 cursor-pointer"
                e.className = bigWidth
            }
}