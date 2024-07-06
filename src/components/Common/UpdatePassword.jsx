import React, { useState } from 'react'
import { BiArrowBack } from "react-icons/bi";
import { Link, useLocation } from 'react-router-dom';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { resetpassword } from '../../services/operations/authApi';



function UpdatePassword() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [passwordVisible,setpasswordVisible] = useState(false);
    const [confirmpasswordVisible,setconfirmpasswordVisible] = useState(false);
    const{loading} = useSelector((state)=> state.auth);
    const [formData,setformData] = useState({
        password:"",
        confirmpassword:""
    })
    function handleOnChange(e){
        setformData((prevdata)=>(
            {
                ...prevdata,
                [e.target.name]:e.target.value,
            }
        ))
    }
    const {password,confirmpassword} = formData;
    function handleOnSubmit(e){
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetpassword(password,confirmpassword,token));

    }

  return (
    <div>
        {
            loading?
            (<div>
                Loading...
            </div>):
            (<div className='text-white'>
                <div className='flex flex-col'>
                    <p>Choose new password</p>
                    <p>Almost done Enter your new password and youre all set.</p>
                    <form onSubmit={handleOnSubmit}>
                        <label htmlFor="New password">New password<sup>*</sup></label>
                        <input required className='text-black' type={passwordVisible?"text":"password"}  id='New password' name='password' placeholder='Enter Password' value={formData.password} onChange={handleOnChange} />
                        <div onClick={()=>setpasswordVisible((state)=>(!state))}>{passwordVisible?<IoEye />:<IoEyeOff />} </div>

                        <label htmlFor="Confirm New password">Confirm New password<sup>*</sup></label>
                        <input required className='text-black' type={confirmpasswordVisible?"text":"password"}  id='Confirm New password' name='confirmPassword' placeholder='Confirm Password' onChange={handleOnChange} value={formData.confirmpassword}/>
                        <div onClick={()=>setconfirmpasswordVisible((state)=>(!state))}>{confirmpasswordVisible?<IoEye />:<IoEyeOff />} </div>
                        <button>Reset Password</button>
                    </form>
                    <div className="mt-6 flex items-center justify-between">
                        <Link to="/login">
                            <p className="flex items-center gap-x-2 text-richblack-5">
                                <BiArrowBack /> Back To Login
                            </p>
                        </Link>
                     </div>
                </div>
                
            </div>)
        }
    </div>
    
  )
}

export default UpdatePassword
