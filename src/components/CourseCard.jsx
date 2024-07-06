import React from 'react'
import { HiUsers } from "react-icons/hi2"
import { ImTree } from "react-icons/im";

function CourseCard({carddetails,currentcard,setcurrentcard}) {
  return (
    <div onClick={()=>setcurrentcard(carddetails.heading)} className={`${carddetails.heading === currentcard?"bg-white shadow-[12px_12px_0px_0px] shadow-yellow-50  ":"bg-richblack-800"}
                 flex flex-col gap-5 p-5 w-[30%] text-xl`}>
        <div className={`${carddetails.heading === currentcard?" text-richblack-900 font-bold":""}`}>
            {carddetails.heading}
        </div>
        <div className={`${carddetails.heading === currentcard?" text-richblack-900":"text-richblack-300"}`}>
            {carddetails.description}
        </div>
        <div className={`${carddetails.heading === currentcard? " text-blue-200":""} flex flex-row text-richblack-300 justify-between mt-12`}>
            <div className=' flex flex-row gap-1'>
            <HiUsers />{carddetails.level}
            </div>
            <div className='flex flex-row gap-1'>
            <ImTree />{carddetails.lessionNumber}
            </div>
        </div>
    </div>
  )
}

export default CourseCard
