import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { storeDataLocal } from '../utils/storage';
import ConfirmationModal from './ConfirmationModal';


const TodoList = ({task, setTask, filter, editTask, setEditTask, open, setOpen}) => {

  const [filteredTasks, setFilteredTasks] = useState([])
  const [confirmationModal, setConfirmationModal] = useState(null);
  
 

  const handleClickAction = (id, action) => {
    
    switch (action) {
      case "markAsDone": {
        const updatedTasks = task.map((item) => item.id === id ? {...item, isCompleted: !item.isCompleted} : item);
        setTask(updatedTasks);
        storeDataLocal("localTasks", updatedTasks);
        break;
      }
      case "delete": {
        setOpen(true)
        setConfirmationModal({
          text1: "Confirm to Delete",
          text2: "Are you sure to do this.",
          btn1Text: "Ok",
          btn1Handler: () => {
            const updatedTasks = task.filter((item) => item.id !== id);
            setTask(updatedTasks);
            storeDataLocal("localTasks", updatedTasks);
            // Update filteredTasks state
            setFilteredTasks(updatedTasks.length > 0 ? updatedTasks : []);
            setConfirmationModal(null)
            setOpen(false)
          },
          btn2Text: "Cancel",
          btn2Handler: () => {
            setConfirmationModal(null)
            setOpen(false)
          },
          
        });
        
      }   
      default:
        break;
    }
  }


  useEffect(()=> {
    if(task.length === 0) {
      setFilteredTasks([]);
      return;
    }
    let results;
    switch(filter) {
      case "Active": {
        results = task.filter(item => !item?.isCompleted)
        break;
      }
      case "Completed": {
        results = task.filter(item => item?.isCompleted)
        break;
      }
      default :
      results = task;
    }
    setFilteredTasks(results)
  }, [filter, task])


  return (
    <div className='w-full flex items-center '>
      <ul className='flex flex-col items-center w-full '>
        {(!filteredTasks || filteredTasks?.length === 0) && <li className='w-full md:text-4xl text-2xl flex justify-center py-28 dark:text-white'>No Task available!</li>}
        {filteredTasks && filteredTasks?.length > 0 && 
          filteredTasks?.map((ele) => (
            <li key={ele.id} className='w-full text-lg flex items-center justify-between py-3 border-b-[0.5px] border-[#dddcdc] li-item  dark:border-[#cdc]'>
              <div className='flex items-center space-x-3'>
                <span onClick={() => handleClickAction(ele?.id, "markAsDone")} className='cursor-pointer hover:scale-150 transition-transform duration-300'><FaCheckCircle fill={ele.isCompleted ? '#3AAF3C' : '#cfeacf'} /></span> 
                <span className='dark:text-white'>{ele?.title}</span> 
              </div>
              <div className='flex space-x-5 items-center'>
                <span title='Edit' onClick={() => setEditTask(prevState => prevState === ele ? null : ele)} className={`cursor-pointer hover:scale-150 transition-transform duration-300`}><MdEdit fill={`${editTask === ele ? '#eec984' : 'orange'}`} size={25} /></span>
                <span title='Delete' onClick={() => handleClickAction(ele?.id, "delete")} className='cursor-pointer hover:scale-150 transition-transform duration-300'><MdDelete fill='red' size={25}/></span>
              </div>
            </li>
          ))
        }
      </ul>
      {open && <ConfirmationModal modalData={confirmationModal} setOpen={setOpen} open={open}/>}
    </div>
  )
}

export default TodoList