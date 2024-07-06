import React from 'react'
import HighlightText from './HighlightText'
import Button from './Button'
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

function CodeBlocks({
    position,heading,subheading,ctabtn1,ctabtn2,codeblock
}) {
  return (
    <div className={`flex ${position} my-20  justify-between flex-col gap-10 `}>
        <div className='w-[100%] lg:w-[50%] flex flex-col gap-8 '>
            {heading}
            <div className='text-richblack-300 text-base font-bold w-[85%] -mt-3'>
                {subheading}
            </div>
            <div className="flex gap-7 mt-7">
                <Button active={ctabtn1.active} linkto={ctabtn1.link}>
                    <div className="flex items-center gap-2">
                        {ctabtn1.btnText}
                        <FaArrowRight />
                     </div>
                </Button>
                <Button active={ctabtn2.active} linkto={ctabtn2.link}>
                    {ctabtn2.btnText}
                </Button>
            </div>

        </div>

        <div className='w-[100%] lg:w-[470px] flex flex-row justify-between mt-5 '>
            <div className='w-[10%] flex flex-col text-center text-richblack-400 font-inter font-bold select-none'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
                <p>13</p>
            </div>
            <div
                className={`w-[90%] flex flex-col gap-2 font-bold font-mono  pr-1 bg-gradient-to-b from-[#fa5cdd] via-[#fbc6f7]
                to-[#d2de4f] text-transparent bg-clip-text`}
                >
                <TypeAnimation
                    sequence={[codeblock, 2000, ""]}
                    cursor={true}
                    repeat={Infinity}
                    style={{
                    whiteSpace: "pre-line",
                    display: "block",
                    }}
                    omitDeletionAnimation={true}
                />
            </div>
        </div>
    </div>
  )
}

export default CodeBlocks
