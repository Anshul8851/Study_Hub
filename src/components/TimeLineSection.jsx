import React from 'react'
import Logo1 from '../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../assets/TimeLineLogo/Logo4.svg'
import timeLineImg from '../assets/Images/TimelineImage.png'
import { FaArrowDownLong } from "react-icons/fa6";

const timeLine = [
    {
        Logo:Logo1,
        Heading:"Leadership",
        Subheading:"Fully committed to the success company"
    },
    {
        Logo:Logo2,
        Heading:"Responsibility",
        Subheading:"Student will always be our top priority"
    },
    {
        Logo:Logo3,
        Heading:"Flexibility",
        Subheading:"The ability to switch is an important skills"
    },
    {
        Logo:Logo4,
        Heading:"Solve the problem",
        Subheading:"Code your way to a solution"
    }
]

function TimeLineSection() {
  return (
    <>
        <div className='w-11/12  mx-auto flex flex-row mt-16 gap-10 p-5 mb-10'>
            <div className='w-[40%] flex flex-col gap-6 justify-center'>
                {
                    timeLine.map((element,index)=>{
                        return(
                            <div className='flex flex-row' key={index}>
                                <div className='w-[30%] flex items-center gap-7 flex-col justify-between'>
                                    <img src={element.Logo}/>
                                    
                                    {index !== 3?<FaArrowDownLong/>:""}
                                     
                                </div>
                                <div className='w-[70%]'>
                                    <div className='flex flex-col'>
                                        <h2 className='font-bold'>
                                            {element.Heading}
                                        </h2>
                                        
                                        
                                            <h5 className=''>
                                                {element.Subheading}
                                            </h5>
                                            
                                        
                                        
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            
            <div className='w-[60%] flex items-center justify-center  shadow-[10px_-5px_50px_-5px] shadow-blue-200  '>
                <img className='h-[410px] w-[100%]'  src={timeLineImg} alt="" srcset=""/>
            </div>
        </div>
        <div className='absolute flex flex-row bg-caribbeangreen-700 h-[100px] w-[400px] translate-x-[165%] translate-y-[583%] '>
            <div className='flex fles-row items-center gap-3  p-4 border-r border-caribbeangreen-300 m-3'>
                <p className='text-white text-3xl font-bold'>10</p>
                <p className='text-caribbeangreen-300 '>Years of experience</p>
            </div>
            <div className='flex fles-row gap-3 items-center p-4 m-3'>
                <p className='text-white text-3xl font-bold'>250</p>
                <p className='text-caribbeangreen-300 '>Types of courses</p>
            </div>
        </div>
    </>
  )
}

export default TimeLineSection
