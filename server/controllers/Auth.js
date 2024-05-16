const User = require("../models/User");
const Otp = require("../models/Otp");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// send otp 
exports.sendOtp = async (req,res) =>{
    try{
        const {email} = req.body;
        const checkUser = await User.findOne({email});
    
        if(checkUser){
            return res.status(401).json({
                success:false,
                message:"User already exists",
            })
        }
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });
        console.log(otp);

        const result = await Otp.findOne({otpValue:otp});
        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            });
            result = await Otp.findOne({otp});
        }
        // create an entry of new otp in db
        const newOtp = await Otp.create({email,otpValue:otp});
        console.log("new otp",newOtp);
    
        res.status(200).json({
            success:true,
            message:"otp sent successfully",
            otp,
        })
    
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
   
}
// signUp
exports.signUp = async (req,res) =>{
    // console.log(req.body);
    try{
        const {firstName,lastName,email,password,confirmPassword,accountType,otp,contactNumber=""} = req.body;
    if(!firstName || !lastName || !email || !password||!confirmPassword || !accountType ||!otp){
        return res.status(400).json({
            success:false,
            message:"all fields are required",
        })
    }

    if(password !== confirmPassword){
        return res.status(400).json({
            success:false,
            message:"password in correct",
        })
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            success:false,
            message:"user is already exists"
        })
    }

    const recentOtp = await Otp.find({email}).sort({createdAt:-1}).limit(1);
    console.log("OTP: ",otp);
    console.log(recentOtp);
    if (recentOtp.length === 0) {
        // OTP not found for the email
        return res.status(400).json({
          success: false,
          message: "The OTP is not valid",
        })
      } else if (otp !== recentOtp[0].otpValue) {
        // Invalid OTP
        return res.status(400).json({
          success: false,
          message: "The OTP is not valid",
        })
      }

    const hashedPassword = await bcrypt.hash(password,10);

    const profileDetails = await Profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null
    })

    const user = await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password:hashedPassword,
        accountType,
        additionalDetails:profileDetails._id,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
    })

    return res.status(200).json({
        success:true,
        message:"User is registered successfully",
        user
    });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"user cannot be registered please try again",
        })
    }
}

// login

exports.login = async(req,res) =>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"please enter all fields"
            })
        }
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user does not exist"
            })
        }
        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType,
                // role:user.role,
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            });
            user.token = token;
            user.password = undefined;
            const options = {
                expiresIn:new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"logged in successfully"
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"password incorrect"
            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"login fail try again"
        })
    }
}

// change password
// exports.changePassword = async(req,res) =>{

// }