import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { sendOtp,signUp} from '../../services/operations/authApi';


function VerifyEmail() {
    const {loading,signupData} = useSelector((state)=>state.auth);
    const [otp,setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
      if(!signupData){
        console.log(signupData);
        navigate("/signup")
      }
    },[])
    const handleVerifyAndSignup = (e)=>{
      e.preventDefault();
      const {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      } = signupData;

      dispatch(signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      ));

    }
  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-3.5rem)]'>

      {
        loading?(
          <div className='text-white flex items-center justify-center'>LOADING............</div>
        ):(
          <div className='flex flex-col  max-w-[500px] p-4'>
            <p className='text-richblack-5 font-bold text-[2rem] '>Verify Email</p>
            <p className='text-richblack-5 mt-4 mb-3'>A verification code has been sent t0 you.Enter the code below</p>
            <form onSubmit={handleVerifyAndSignup}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <button
              type="submit"
              className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
            >
              Verify Email
            </button>

            </form>
            <div className="mt-6 flex items-center justify-between">
              <Link to="/signup">
                <p className="text-richblack-5 flex items-center gap-x-2">
                  <BiArrowBack /> Back To Signup
                </p>
              </Link>
              <button
                className="flex items-center text-blue-100 gap-x-2"
                onClick={() => dispatch(sendOtp(signupData.email))}
              >
                <RxCountdownTimer />
                Resend it
              </button>
          </div>
          </div>
        )
      }
    </div>
  )
}

export default VerifyEmail
