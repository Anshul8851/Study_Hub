import React from 'react'
import BannerImage1 from '../../assets/Images/aboutus1.webp';
import BannerImage2 from '../../assets/Images/aboutus2.webp';
import BannerImage3 from '../../assets/Images/aboutus3.webp';
import HighlightText from '../HighlightText';


function About() {
  return (
    <div>
      {/* section 1 */}
      <section className='bg-richblack-700 '>
        <div className='relative'>
            <header className=' flex flex-col items-center justify-center'>
                
                    <p className='mt-16 text-center text-4xl font-bold text-richblack-5 p-5 lg:w-[55%]'>Driving Innovation in Online Education for a <HighlightText text={"Brighter Future"} /></p>
            
                    <p className=' text-richblack-300 md:w-[60%] text-center m-auto mt-2'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
            </header>
        </div>
        <div className="sm:h-[70px] lg:h-[230px]"></div>
        <div className='flex  gap-x-10 mt-5 absolute bottom-[50px] translate-x-[13%]'>
            <img src={BannerImage1} />
            <img src={BannerImage2} />
            <img src={BannerImage3} />
        </div>
      </section>
      <div>
      <div className='text-white'>
        We are passionate about revolutionizing the way we learn. Our innovative platform"combines technology expertise, and community to create an unparalleled educational experience.
        </div>
      </div>
    </div>
  )
}

export default About
