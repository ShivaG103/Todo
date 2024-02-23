import React,{ useState } from 'react'

const Tabs = ({selectedTab, setSelectedTab}) => {
    const tabs = ["All", "Active", "Completed"]
        
  return (
    <div className='w-full flex items-center justify-start'>
        <ul className='flex items-center justify-between gap-x-2'>
            {
                tabs.map((ele,i) => (
                    <li key={i} className={`md:w-28 w-[4.8rem] md:h-7 h-5 md:p-5 p-4 flex items-center md:text-xl text-sm justify-center border border-[#ccc] dark:bg-[#ccc] bg-[#f9f9f9] rounded-t-md cursor-pointer hover:text-[#198754]  ${selectedTab === ele && 'text-[#198754] dark:scale-105 dark:border-b-0 border-b-0'}`} onClick={() => setSelectedTab(ele)}>{ele}</li>
                ))
            }
        </ul>
    </div>
  )
}

export default Tabs