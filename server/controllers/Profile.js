const User = require("../models/User");
const Profile = require("../models/Profile");

exports.updateProfile = async(req,res) =>{
    try{
        const {dateOfBirth="",about="",contactNumber,gender} = req.body;
        const id = req.user.id;
        if(!contactNumber || !gender|| !id){
            res.status(400).json({
                success:false,
                message:"please fill all the fields",
            })
        }

        const curUser = await User.findById(id);
        const curProfile = curUser.additionalDetails;
        const profileDetails = await Profile.findById(curProfile);

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about= about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();
        return res.status(200).json({
            success:true,
            message:"profile updated successfully"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"profile not updated please try again"
        })
    }
}

exports.deleteAccount = async(req,res)=>{
    try{
        const id = req.user.id;
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"user not exist",
            })
        }
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        await User.findByIdAndDelete({_id:id});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error in deletion try again"
        })
    }
}

exports.getAllUserDetails = async(req,res)=>{
    try{
        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails");
        return res.status(200).json({
            success:true,
            message:"user details fetched successfully",
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