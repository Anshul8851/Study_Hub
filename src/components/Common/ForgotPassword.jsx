import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { getPasswordResetToken } from '../../services/operations/authApi';
import ClipLoader from "react-spinners/ClipLoader";

function ForgotPassword() {
    const [emailSent,setemailSent] = useState(false);
    const [email,setemail] = useState("");
    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    
    const handleOnSubmit = (e) =>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setemailSent));
    }
  return (
    <div className='w-11/12 flex  justify-center mx-auto gap-y-2'>
        {
            loading ? (
                
                <div style={{"color":"white"}}>Loading ...</div>
            ):( 
                <div className=' flex flex-col  justify-center  p-10 w-[530px] mt-14 '>
                    <h1 className='text-richblack-5 text-[1.875rem] font-semibold  '>
                        {
                            emailSent?"Check Email":"Reset Your Password"
                        }
                    </h1>
                    <p className='font-semibold mt-4 text-richblack-5'>
                    {!emailSent
                        ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                         : `We have sent the reset email to ${email}`
                    }
                    </p>
                    <form className='text-richblack-5 flex flex-col gap-y-3 mt-4 text-[1.2rem]' onSubmit={handleOnSubmit}>
                    {!emailSent &&
                        <label htmlFor="email">Email Addresss : </label>
                        &&
                        <input 
                            required
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            placeholder="Enter email address"
                            className="form-style w-full rounded-md p-2  "
                        />
                    }
                        
                        <button
                        type="submit"
                        className="mt-6   rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-bold text-richblack-900"
                        >
                        {!emailSent ? "Sumbit" : "Resend Email"}
                        </button>
                    </form>
                    
                    <div className="mt-6 flex items-center justify-between">
                        <Link to="/login">
                        <p className="flex items-center gap-x-2 text-richblack-5">
                            <BiArrowBack /> Back To Login
                        </p>
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword
