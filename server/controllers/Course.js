const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const Section = require("../models/Section");
const {uploadImageToCloudinary} = require("../Utils/imageUploader");
require("dotenv").config();

// create course handler function 

exports.createCourse = async (req,res)=>{
    try{
        const {courseName,courseDescription,whatYouWillLearn,price,category} = req.body;
        const thumbNail = req.files.thumbNailImage;

        if(!courseName || !courseDescription||!whatYouWillLearn||!price||!category||!thumbNail){
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
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"category not found"
            })
        }
        
        const thumbnailimage = await uploadImageToCloudinary(thumbNail,process.env.FOLDER_NAME);
        
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            category,
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

        await Category.findByIdAndUpdate(
            {_id:categoryDetails._id},
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



exports.getCourseDetails = async(req,res)=>{
    try{
        const {courseId} = req.body;
        const courseDetails = await Course.findById(courseId)
                                        .populate({path:"instructor",populate:{path:"additionalDetails"}})
                                        .populate({path:"courseContent",populate:{path:"subSections"},})
                                        .populate("courseRating")
                                        .populate("category").populate("studentsEnrolled");

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"course not found",
            })
        }

        return res.status(200).json({
            success:true,
            message:"course details fetched successfully",
            data:courseDetails,
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