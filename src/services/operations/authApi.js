import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { toast } from "react-hot-toast";
import { setLoading } from "../../slices/authSlice";


const {RESETPASSTOKEN_API,RESETPASSWORD_API,SENDOTP_API,SIGNUP_API} = endpoints;

export function getPasswordResetToken(email,setemailSent) {
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            
            const response = await apiConnector("POST",RESETPASSTOKEN_API,{email});
            console.log(response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }else{
                toast.success("Email Sent Successfully");
                setemailSent(true);
                
            }
        }catch(error){
            console.log("reset password token error",error);
            toast.error("failed to send otp to email")
        }
        dispatch(setLoading(false));
    }
}

export function resetpassword(password,confirmPassword,token){
    
    return async(dispatch)=>{
        
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST",RESETPASSWORD_API,{password,confirmPassword,token});
            if(!response.data.success){
                throw new Error(response.data.message);
            }else{
                toast.success("Password reset successfully Successfully");
                
            }
        }catch(error){
            console.log("reset password error :",error);
            toast.error("failed to reset password");
        }
        dispatch(setLoading(false));
    }
}

export function sendOtp(email,navigate){

    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST",SENDOTP_API,{email});
            console.log("SENDOTP API RESPONSE............", response)

            console.log(response.data.success)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("OTP Sent Successfully")
            navigate("/verify-email")
        }catch(error){
            console.log("otp send error"+error);
            toast.error("Failed to send otp");
        }
        dispatch(setLoading(false));
    }

}

export function signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST",SIGNUP_API,{firstName,lastName,email,password,confirmPassword,accountType,otp});
            console.log("SIGNUP API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Signup Successful")
            navigate("/login")

        }
        catch(error){
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
        
    }
}