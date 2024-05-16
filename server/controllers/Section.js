const Course = require("../models/Course");
const Section = require("../models/Section");

require("dotenv").config();

exports.createSection = async(req,res)=>{
    try{
        const{sectionName,courseId} = req.body;
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"please provide all the details",
            })
        }
        const newSection = await Section.create({sectionName});
        
        const updatedCourseDetails = await Course.findByIdAndUpdate     (courseId,{
            $push:{
                courseContent:newSection._id,
            }
        },{new:true}).populate({path:"courseContent"
        ,populate:{path:"subSections"},
    });

        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourseDetails,
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

// create handler function for updateSection

exports.updateSection = async(req,res)=>{
    try{
        const{sectionName,sectionId} = req.body;
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"please provide all fields",
            })
        }

        const newSectionData = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
        return res.status(200).json({
            success:true,
            message:"section updated successfully",
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

exports.deleteSection = async(req,res)=>{
    try{
        const{sectionId} = req.params;
        await Section.findByIdAndDelete(sectionId);
        return res.status(200).json({
            success:true,
            message:"section deleted successfully"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"section not created please try again"
        })
    }
}