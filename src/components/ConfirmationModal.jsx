import React, { useEffect, useRef } from 'react'
import useOnClickOutside from './../hooks/useOnClickOutside';

const ConfirmationModal = ({modalData, setOpen, open}) => {

  const buttonRef = useRef(null);
  
  const ref = useRef(null)
  useOnClickOutside(ref, () => setOpen(false))

  useEffect(() => {
    // If modal is open, focus on the first button
    if (open) {
      buttonRef.current.focus();
    }
  }, [open]);

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm" >
      <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 dark:bg-slate-800 p-6 bg-slate-200" ref={ref}>
            <p className="text-2xl font-semibold dark:text-[#ccc] text-slate-900">{modalData?.text1}</p>
            <p className="mt-3 mb-5 leading-6 dark:text-[#ccc] text-slate-900">{modalData?.text2}</p>

            {
              modalData?.btn1Text && (
                <div className="flex items-center gap-x-4">
                  <button ref={buttonRef} className="cursor-pointer rounded-md dark:bg-slate-100 bg-slate-600 py-[8px] px-[20px] font-semibold dark:text-slate-900 text-slate-100  focus:outline-black" onClick={modalData?.btn1Handler}>{modalData?.btn1Text}</button>
                  
                  {
                    modalData?.btn2Text && (
                      <button className="cursor-pointer rounded-md dark:bg-slate-100 bg-slate-600 py-[8px] px-[20px] font-semibold dark:text-slate-900 text-slate-100 focus:outline-black" onClick={modalData?.btn2Handler}>{modalData?.btn2Text}</button>
                    )
                  }
                </div>
              )
            }
        </div>
    </div>
  )
}

export default ConfirmationModal