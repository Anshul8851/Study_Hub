const Course = require("../models/Course");
const Tag = require("../models/Tag");
const User = require("../models/User");
const Section = require("../models/Section");
const {uploadImageToCloudinary} = require("../Utils/imageUploader");
require("dotenv").config();

// create course handler function 

exports.createCourse = async (req,res)=>{
    try{
        const {courseName,courseDescription,whatYouWillLearn,price,tag} = req.body;
        const thumbNail = req.files.thumbNailImage;

        if(!courseName || !courseDescription||!whatYouWillLearn||!price||!tag||!thumbNail){
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            })
        }

        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor Details Are not found"
            })
        }
        const tagDetails = await Tag.find({tagName:tag});
        if(!tagDetails){
            return res.status(404).json({
                success:false,
                message:"Tag not found"
            })
        }
        
        const thumbnailimage = await uploadImageToCloudinary(thumbNail,process.env.FOLDER_NAME);
        
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            tag:tagDetails._id,
            thumbNail:thumbnailimage.secure_url,
        })

        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true},
        )

        await Tag.findByIdAndUpdate(
            {_id:tagDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true},
        )
        return res.status(200).json({
            success:true,
            message:"course created successfully",
            data:newCourse,
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"failed to create course"
        })
    }
}

// getAllCourses handler function 

exports.showAllCourses = async(req,res)=>{
    try{
        const allCourses = await Course.find({});

        if(!allCourses){
            return res.status(500).json({
                success:false,
                message:"No courses present"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Data fetched successfully",
            allCourses:allCourses,
        })
    }
    catch(error){
        console.error(error);
        return re.status(500).json({
            success:false,
            message: "cannot fetch course data",
        })
    }
}

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
        },{new:true}).populate({path:"courseContent",populate:{path:"subSection"},});

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