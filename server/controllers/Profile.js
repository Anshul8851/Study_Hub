const User = require("../models/User");
const Profile = require("../models/Profile");
const{uploadImageToCloudinary} = require("../Utils/imageUploader");
// const mongoose = require("mongoose");
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

exports.getUserDetails = async(req,res)=>{
    try{
        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails");
        return res.status(200).json({
            success:true,
            message:"user details fetched successfully",
            userDetails
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

exports.updateProfilePicture = async(req,res)=>{
    try{
        const newProfilePicture = req.files.displayPicture;
        // console.log(newProfilePicture);
        const userId = req.user.id;
        const image = await uploadImageToCloudinary(
            newProfilePicture,
            process.env.FOLDER_NAME,
            1000,
            1000
          )
            // console.log(image);
          const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
          )
          res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
          })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
          })
    }
}

exports.updateAdditionalDetails = async(req,res)=>{
    try{
        const{gender,dateOfBirth,contactNumber,about} = req.body;
        const userId = req.user.id;
        if(!gender || !dateOfBirth || !contactNumber || !about ){
            return res.status(400).json({
                success:false,
                message:"All fields are necessary",
            })
        }

        const userDetails = await User.findById(userId);
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"This User Does Not Exists",
            })
        }

        const userProfile = await Profile.findById(userDetails.additionalDetails);

        userProfile.dateOfBirth = dateOfBirth;
        userProfile.about = about;
        userProfile.contactNumber = contactNumber;
        userProfile.gender = gender;
        
        await userProfile.save();

        const updatedUserProfile = await User.findById(userId).populate("additionalDetails");
        return res.status(200).json({
            success:true,
            message:"profile updated successfully",
            updatedUserProfile,
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