import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import {Link} from "react-router-dom";
import HighlightText from './HighlightText';
import Button from './Button';
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from './CodeBlocks';
import TimeLineSection from './TimeLineSection';
import LearningSection from './LearningSection';
import instructorImg from '../assets/Images/Instructor.png'
import Exploremore from './Exploremore';

function Home(){
    return(
        <div>
            {/* section1 */}

            <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between'>

                <Link to={"/signup"}>
                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'> 
                        <p>Become an Instructor</p>
                        <FaArrowRight />
                    </div>
                </div>
                </Link>

                <div className='mt-10 text-4xl font-bold'>
                    Empower Your Future with <HighlightText text={"Coding Skills"} />
                </div>

                <div className='mt-4 text-richblack-300 text-lg font-bold text-center w-[90%]'>
                With our online coding courses, you can learn at your own pace, from
                anywhere in the world, and get access to a wealth of resources,
                including hands-on projects, quizzes, and personalized feedback from
                instructors.
                </div>

                <div className='flex flex-row gap-7 mt-8'>
                    <Button active={true} linkto={"/signup"}>
                        Learn More
                    </Button>
                    <Button active={false} linkto={"/login"}>
                        Book a Demo
                    </Button>
                </div>

                <div className='shadow-[10px_-5px_50px_-5px] shadow-blue-200 mx-3 my-7 mt-12'>
                    <video 
                    muted 
                    loop 
                    autoPlay
                    >
                        <source src={Banner} type="video/mp4" />
                    </video>
                </div>

                {/* code section 1 */}

                <div>
                    <CodeBlocks 
                        heading={
                            <div className='text-4xl font-bold'>
                                Unlock your 
                                <HighlightText text={"coding potential"}/>
                                with our online courses
                            </div>  
                        }
                        position={"lg:flex-row"}

                        subheading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        ctabtn1={{
                            btnText: "Try it Yourself",
                            link: "/signup",
                            active: true,
                          }}
                          ctabtn2={{
                            btnText: "Learn More",
                            link: "/signup",
                            active: false,
                          }}
                        //   codeColor={"text-white-25"}
                          codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a>\n <a href="/two">Two</a>\n <a href="/three">Three</a>\n</nav>\n</body>\n</html>`}
                    />
                </div>
                {/* coding section 2 */}
                <div>
                    <CodeBlocks 
                        heading={
                            <div className='text-4xl font-bold'>
                                Start codind
                                <HighlightText text={"In seconds"}/>

                            </div>  
                        }
                        position={"lg:flex-row-reverse"}

                        subheading={
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }
                        ctabtn1={{
                            btnText: "Continue Lesson",
                            link: "/signup",
                            active: true,
                          }}
                          ctabtn2={{
                            btnText: "Learn More",
                            link: "/signup",
                            active: false,
                          }}
                        //   codeColor={"text-white-25"}
                          codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a>\n <a href="/two">Two</a>\n <a href="/three">Three</a>\n</nav>\n</body>\n</html>`}
                    />
                </div>
                <Exploremore/>
                
            </div>
            {/* section 2 */}

            <div className='bg-pure-greys-5 text-richblack-700'>
                <div className='homepage_bg h-[400px]'>
                    <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto'>
                        <div className='h-[230px] '> </div>
                            <div className='flex flex-row gap-7 text-white'>
                                <Button active={true} linkto={"/signup"}>
                                    <div className='flex flex-row items-center gap-3'>
                                        Explore Full Catalog 
                                        <FaArrowRight/>
                                    </div>
                                </Button>
                                <Button active={false} linkto={"/signup"}>
                                    Learn More
                                </Button>
                            </div>
                       
                        
                    </div>
                </div>
                <div className='w-11/12 max-w-maxContent flex flex-col mx-auto py-5'>
                    <div className='flex flex-row w-11/12 mx-auto'>
                        <div className='w-[50%] text-4xl font-bold'>
                            Get the Skills you need for a 
                            <HighlightText text={"job that is in demand"} />
                        </div>
                        <div className='w-[50%] flex flex-col'>
                            <div className='text-[16px] font-semibold '>
                                The modern StudyNotion is the dictates its own terms. Today, to
                                be a competitive specialist requires more than professional
                                skills.
                            </div>
                            <div className='py-2 mt-9 flex'>
                                <Button active={true} linkto={"/signup"}> Learn More</Button>
                            </div>
                        </div>
                    </div>
                    <TimeLineSection/>
                    <LearningSection/>

                </div>
            </div>

            {/* section 3 */}
            <div className='w-[80%]  flex flex-row gap-20 mt-16 justify-center  mx-auto '>
                <div className='w-[50%] flex items-center justify-center'>
                    <img className='h-[450px] mb-10 shadow-white shadow-[-20px_-20px_0px_0px]' src={instructorImg} alt="" />
                </div>
                <div className='flex flex-col justify-center gap-5 '>
                    <div className='text-white text-4xl font-inter font-bold w-[30%]'>
                        Become an 
                        <HighlightText text={"Instructor"}/>
                    </div>
                   <div className='flex flex-col gap-16'>
                        <div className="font-medium text-[16px] text-justify w-[70%] text-richblack-300">
                            Instructors from around the world teach millions of students on
                            StudyNotion. We provide the tools and skills to teach what you
                            love.
                        </div>
                        <div className='flex '>
                            <Button active={true} linkto={"/signup"}>
                                <div className='flex flex-row items-center gap-2'>
                                    Start Teaching Today
                                    <FaArrowRight/>
                                </div>
                            </Button>
                        </div>
                   </div>
                </div>
            </div>
            {/* footer  */}
        </div>
    );
}
export default Home;