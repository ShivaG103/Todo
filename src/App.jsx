import { useEffect, useState } from 'react';
import './App.css';
import Tabs from './components/Tabs';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { getRecordsFromLocal, storeDataLocal } from './utils/storage';
import ConfirmationModal from './components/ConfirmationModal';


function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All")
  const [editTask, setEditTask] = useState()
  const [darkMode, setDarkMode] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [open, setOpen] = useState(false)

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    storeDataLocal("theme", newMode)
  }

  const handleAddTask = (task, id="") => {

    const submit = (title) => {
      setConfirmationModal({
        text1: title,
      });
      setTimeout(() => {
        setConfirmationModal(null)
      }, 1000);
    }

    let updatedTask;
    if(id !== ""){
      updatedTask = tasks.map(item => item.id === id ? {...item, title:task} : item)
      submit("Task Updated")      
    }
    else {
      const newTask = { id:tasks.length + 1, title: task, isCompleted: false};
      updatedTask = [...tasks, newTask];
      submit("Task Added")
    }
    setTasks(updatedTask);
    storeDataLocal("localTasks", updatedTask);
    setEditTask();
  }

  useEffect(() => {
    const records = getRecordsFromLocal("localTasks")
    if(records) {
      setTasks(records)
    }
    const theme = getRecordsFromLocal("theme")
    if(theme !== null) {
      setDarkMode(theme)
    }
  }, [])

  
  return (
    <div className={`${darkMode && 'dark'}`}>
      <div className='dark:bg-slate-900 w-[100vw] overflow-y-auto h-[100vh] flex flex-col'>
        <div className='w-full p-4 lg:w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-center font-serif gap-y-5'>
          <div className='w-full flex items-center justify-between pt-5'>
            <p className='text-center grow  sm:text-5xl text-4xl font-bold text-slate-700 dark:text-white'>Todo List</p>
            <button onClick={toggleDarkMode} className='sm:w-12 sm:h-12 w-8 h-8 text-[10px] sm:text-sm bg-slate-800 text-white dark:text-black font-semibold dark:bg-[#ccc] rounded-full'>{darkMode ? "LHT" : "DRK"}</button>
          </div>
          <TodoForm handleAddTask={handleAddTask} editTask={editTask}/>
          <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          <TodoList task={tasks} setTask={setTasks} filter={selectedTab} editTask={editTask} setEditTask={setEditTask} open={open} setOpen={setOpen}/>
            
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default App
