const User = require("../models/User");
const mailSender = require("../Utils/mailSender");
const bcrypt = require("bcrypt");

exports.resetPasswordToken = async(req,res)=>{
    try{
        const {email} = req.body;

        const user = await User.find({email});
        if(!user){
            return res.status(500).json({
                success:false,
                message:"your email is not registered with us",
            })
        }

        const token = crypto.randomUUID();
        
        const updatedDetails = await User.findOneAndUpdate({email},{token:token,
                                                                    resetTokenExpiresIn:Date.now()+5*60*1000},
                                                                    {new:true});
        
        
        const url = `http://localhost:3000/update-password/${token}`
        
        await mailSender(email,
                        "password reset link",
                        `password reset link: ${url}`);

        return res.json({
            success:true,
            message:"email sent successfully"
        })
    }
    catch(error){
        console.log(error);
        return res.status(501).json({
            success:false,
            message:"Something Went Wrong"
        })
    }
}

// Reset Password 

exports.resetPassword = async(req,res)=>{
    try{
        const {password,confirmPassword,token} = req.body;
        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:"password incorrect"
            })
        }
        const userDetails = await User.find({token});
        if(!userDetails){
            return res.json({
                success:false,
                message:"user does not exist"
            })
        }
        if(userDetails.resetTokenExpiresIn < Date.now()){
            return res.json({
                success:false,
                message:"Token is expired"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const updatedValue = await User.findOneAndUpdate({token},
                                    {password:hashedPassword},
                                    {new:true},);

        return res.json({
            success:true,
            message:"password reset successfully"
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error occured please try again to reset password"
        })
    }
}