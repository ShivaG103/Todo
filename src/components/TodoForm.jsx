import React, { useEffect, useRef, useState } from 'react';

const TodoForm = ({handleAddTask, editTask}) => {
  const [text, setText] = useState("");
  const [placeholder, setPlaceholder] = useState('Write your task here...');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!text || text === "" || !text.trim()){
      setPlaceholder('Task cannot be empty');
      inputRef.current.focus();
      return;
    }
    const taskId = editTask ? editTask?.id : "";
    handleAddTask(text, taskId)
    setText("")
    setPlaceholder('Write your task here...');
  }

  const handleChange = (e) => {
    const taskValue = e.target.value
    setText(taskValue)
    setPlaceholder('Write your task here...');
  }

  useEffect(() => {
    if(editTask) {
      setText(editTask?.title || "")
      inputRef.current.focus() 
    }
    else {
      setText("")
    }
  }, [editTask?.id])

  return (
    <div className='flex items-center w-full'>
        <form className='w-full sm:text-2xl text-sm flex' onSubmit={handleSubmit}>
        
            <input type='text' value={text} ref={inputRef} onChange={(e) => handleChange(e)} className={`w-[75%] lg:w-[89%] border border-[#ccc] dark:bg-[#ccc] rounded-l-md outline-none py-2 px-3 ${placeholder === 'Task cannot be empty' && 'placeholder border-[#ff0000]'}`} placeholder={placeholder} autoComplete='off' name='task'/>
            <button type='submit' className='w-[25%] lg:w-[11%] py-2 text-white rounded-r-md bg-[#198754] border-[#198754] border'>{!editTask ? 'ADD' : 'UPDATE'}</button>
        </form>
    </div>
  )
}

export default TodoForm