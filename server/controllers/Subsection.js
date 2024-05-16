const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const {uploadImageToCloudinary} = require("../Utils/imageUploader");
const mongoose = require("mongoose");
require("dotenv").config();

exports.createSubSection = async(req,res)=>{
    try{
        const{sectionId,title,timeDuration,description} = req.body;
        const video = req.files.videoFile;
        if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:"all fields are mandatory",
            })
        }
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        const newSubSection  = await SubSection.create({
            title,
            timeDuration,
            description,
            videoUrl:uploadDetails.secure_url,
        })
       console.log("new sub section :",newSubSection);
        const updatedSection = await Section.findByIdAndUpdate(sectionId,
                                                        {
                                                            $push:{
                                                                subSections:newSubSection._id,      
                                                            }
                                                        },{new:true}).populate("subSections");

        console.log("updated section",updatedSection);
        return res.status(200).json({
            success:true,
            message:"subsection created successfully",
            updatedSection
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"subsection not created try again",
            errorMessage:error.message
        })
    }
}   

exports.deleteSubSection = async(req,res)=>{
    try{
        const{id} = req.params;
        await SubSection.findByIdAndDelete(id);
        return res.status(200).json({
            success:true,
            message:"subsectionsection deleted successfully"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"subsection not created try again"
        })
    }
}

exports.updateSubSection = async(req,res)=>{
    try{
        const{title,timeDuration,description,id} = req.body;
        const video = req.files.videoFile;
        if(!title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:"all fields are mandatory",
            })
        }
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        
        await SubSection.findByIdAndUpdate(id,
                                            {title,timeDuration,description,videoUrl:uploadDetails.secure_url});

        
        return res.status(200).json({
            success:true,
            message:"subsection created successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"subsection not created try again",
        })
    }
}   
