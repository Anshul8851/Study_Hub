import React from 'react'
import HighlightText from './HighlightText'
import progressImg from '../assets/Images/Know_your_progress.png'
import compareImg from '../assets/Images/Compare_with_others.png'
import lessonImg from '../assets/Images/Plan_your_lessons.png'
import Button from './Button'

function LearningSection() {
  return (
    <>
        <div className='w-11/12 flex flex-col justify-center items-center mx-auto '>
            <div className='text-4xl font-inter font-bold p-4 mt-3'>
                Your swiss Knife for 
                <HighlightText text={"learning any language"}/>
            </div>
            <div className='w-[740px]  p-4 font-semibold text-center '>
              Using spin making learning multiple languages easy. with 20+
              languages realistic voice-over, progress tracking, custom schedule
              and more.
            </div>
            <div className='flex'>
                <img src={progressImg} className='object-contain relative '/>
                <img src={compareImg} className='object-contain relative translate-x-[-20%]' />
                <img src={lessonImg} className='object-contain relative translate-x-[-48%]' />
            </div>
            <div className='mb-10'>
              <Button active={true} linkto={"/signup"}>
                  Learn More
              </Button>
            </div>
        </div>
    </>
  )
}

export default LearningSection
