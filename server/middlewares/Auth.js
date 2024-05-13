const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();


exports.auth = async(req,res,next)=>{
    try{
        const token = req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer ","");
        if(!token){
            return res.status(401).json({
                success:false,
                message:"you are an authenticated user",
            })
        }

        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);

            req.user = decode;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"TOKEN VERIFICATION FAILED",
            })
        }
        next();
        
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"something went wrong while validating the token"
        })
    }
}

// check if user is student or not

exports.isStudent = async(req,res,next)=>{
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"this user is not allowed"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified",
        })
    }
}

// check if user is admin or not

exports.isAdmin = async(req,res,next)=>{
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"this user is not allowed"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified",
        })
    }
}

// check if user is Instructor or not

exports.isInstructor = async(req,res,next)=>{
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"this user is not allowed"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified",
        })
    }
}