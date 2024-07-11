import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import Tab from './Tab';
import { ACCOUNT_TYPE } from "../../utils/constant"
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux';
import { setSignupData } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../../services/operations/authApi';
import FrameImg from '../../assets/Images/frame.png';
import SignupImg from '../../assets/Images/signup.webp';
import HighlightText from '../HighlightText';



function SignupForm() {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setaccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email:""
  })

  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]

  const handleOnChange = (e) => {
    setformData((prevdata) => ({
      ...prevdata,
      [e.target.name]: e.target.value
    }))
  }

  const { password, confirmPassword } = formData;
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password and confirm password not match");
      return
    }
    const signupData = {
      ...formData,
      accountType
    }
    console.log(signupData);
    dispatch(setSignupData(signupData));

    dispatch(sendOtp(formData.email, navigate));
 
    // Reset
    setformData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setaccountType(ACCOUNT_TYPE.STUDENT)


  }

  return (
    <div className=' flex items-center justify-center   '>

      {
        loading ? (<div className='text-richblack-5'>Loading.........</div>) :
          (
            <>
              <div className='flex flex-col justify-center items-center mt-4 '>
                <p className='text-3xl w-[55%] font-bold text-richblack-5'>Join the millions learning to code with StudyNotion for free</p>
                <p className=' text-richblack-200 font-semibold w-[55%] mt-3'>Build skills for today, tomorrow, and beyond.<HighlightText text={"Education to future-proof your career."} /> </p>
                <Tab tabData={tabData} field={accountType} setField={setaccountType} />
                <form onSubmit={handleOnSubmit}>
                  <div className='text-richblack-25 flex gap-x-3'>
                    <label htmlFor='firstName'>
                      <p className='text-richblack-5'>FirstName<sup className='text-pink-200'>*</sup></p>
                      <input type='text' required name='firstName' id='firstName' placeholder='Enter First Name' className='bg-richblack-800 text-richblack-5 p-3 rounded-[0.5rem] w-full' value={formData.firstName} onChange={handleOnChange} /><br />
                    </label>

                    <label htmlFor='lastName'>
                      <p>LastName<sup className='text-pink-200'>*</sup></p>
                      <input type='text' required name='lastName' id='lastName' placeholder='Enter Last Name' className='bg-richblack-800 text-richblack-5 p-3 rounded-[0.5rem] w-full' value={formData.lastName} onChange={handleOnChange} />
                    </label>
                  </div>
                  <label htmlFor='email'>
                    <p className='text-richblack-5 mt-3'>Email Address<sup className='text-pink-200'>*</sup></p>
                    <input type='text' required name='email' id='email' placeholder='enter your email' className='bg-richblack-800 text-richblack-5 p-3 rounded-[0.5rem] w-full ' value={formData.email} onChange={handleOnChange} />
                  </label>


                  <div className='flex mt-3 gap-x-3'>
                    <label htmlFor='password' >
                      <p className='text-richblack-5'>Create Password<sup className='text-pink-200'>*</sup></p>
                      <input name='password' id='password' required type={showPassword ? 'text' : 'password'} placeholder='Password' className='bg-richblack-800 text-richblack-5 p-3 rounded-[0.5rem] w-full' value={formData.password} onChange={handleOnChange} />
                      <span className='absolute translate-x-[-2rem] translate-y-[0.6rem] cursor-pointer' onClick={() => setShowPassword((prev) => (!prev))}>
                        {
                          showPassword ? <AiOutlineEye fontSize={24} fill="#AFB2BF" /> : <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        }
                      </span>
                    </label>


                    <label htmlFor='confirmPassword' >
                      <p className='text-richblack-5'>Confirm Password<sup className='text-pink-200'>*</sup></p>
                      <input name='confirmPassword' id='confirmPassword' required type={showConfirmPassword ? 'text' : 'password'} placeholder='Confirm Password' className='bg-richblack-800 text-richblack-5 p-3 rounded-[0.5rem] w-full' value={formData.confirmPassword} onChange={handleOnChange} />
                      <span className='absolute translate-x-[-2rem] translate-y-[0.6rem] cursor-pointer' onClick={() => setShowConfirmPassword((prev) => (!prev))}>
                        {
                          showConfirmPassword ? <AiOutlineEye fontSize={24} fill="#AFB2BF" /> : <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        }
                      </span>
                    </label>

                  </div>
                  <button className='bg-yellow-50 text-black p-3 font-bold flex justify-center items-center rounded-md mt-7 w-full'>create account</button>
                </form>

              </div>
              <div className='relative mt-8 p-6'>
                <img src={FrameImg} className='h-[27rem]' />
                <img src={SignupImg} className='absolute translate-y-[-104%] translate-x-[-4%] h-[27rem] ' />
              </div>
            </>

          )
      }

    </div>
  )
}

export default SignupForm
