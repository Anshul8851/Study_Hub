import React,{useState} from 'react'
import HighlightText from './HighlightText'
import {HomePageExplore} from '../data/homepage-explore'
import CourseCard from './CourseCard';

const tabsName = ["Free","New to coding","Most popular","Skills paths","Career paths"];

function Exploremore() {
    const [currentTab,setcurrentTab] = useState(tabsName[0]);
    const [currentCourse,setcurrentCourse] = useState(HomePageExplore[0].courses);
    const [currentCard,setcurrentCard] = useState(HomePageExplore[0].courses[0].heading);
    
    const setMyCard = (value) =>{
        setcurrentTab(value);
        const result = HomePageExplore.filter((course)=>course.tag === value);
        setcurrentCourse(result[0].courses);
        setcurrentCard(result[0].courses[0].heading);
    }
  return (
        
            <div className='w-11/12 flex flex-col items-center justify-center gap-4 mb-52 '>
                    
                    <div className='text-4xl font-inter font-bold'>
                        Unlock the 
                        <HighlightText text={"Power of code"}/>
                    </div>
                    <div className='text-richblack-400 font-semibold'>
                        Learn to Build Anything You Can Imagine
                    </div>
                    <div className='flex flex-row bg-richblack-700 gap-5 text-richblack-300  text-[16px] p-1  rounded-full'>
                        {
                            tabsName.map((element,index)=>{
                                return(
                                <div key={index} className ={`p-2 cursor-pointer rounded-full hover:bg-richblack-900 hover:text-richblack-5 transition-all duration-200   ${element === currentTab?"bg-richblack-900 text-richblack-5" : ""}`} onClick={()=>setMyCard(element)}>
                                    {element}
                                </div>
                            )})
                        }
                    </div>
                    <div className='flex flex-row gap-7 absolute translate-y-[100%] mx-auto items-center justify-center'>
                        {
                            currentCourse.map((element,index)=>(
                                <CourseCard carddetails={element} key={index} currentcard={currentCard} setcurrentcard={setcurrentCard}/>
                            ))
                        }
                    </div>
                    
                            
            </div>
            
        
        
  )
}

export default Exploremore
