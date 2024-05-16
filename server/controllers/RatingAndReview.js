const Rating = require("../models/Rating");
const Course = require("../models/Course");

exports.createRating = async(req,res) =>{
    try{
        const userId = req.user.id;
        const {rating,review,courseId} = req.body;

        const courseDetails = await Course.findById(courseId);

        if(!courseDetails.studentsEnrolled.includes(userId)){
            return res.status(400).json({
                success:false,
                message:"you are not enrolled in this course "
            })
        }

        const alreadyReviewed = await Rating.find({
            user:userId,
            course:courseId
        });
        if(alreadyReviewed){
            return res.status(400).json({
                success:false,
                message:"this user already review this course",
            })
        }

        const newRating = await Rating.create({
            user:userId,
            rating,
            review,
            course:courseId,
        });
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
                                        {
                                            $push:{
                                                courseRating:newRating._id,
                                            }
                                        },{new:true});

        console.log(updatedCourseDetails);
        return res.status(200).json({
            success:true,
            message:"rating and review created successfully",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getAverageRating = async(req,res)=>{
    try{
        const courseId = req.body.courseId;
        const result = await Rating.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId)
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},
                },
            }
        ]);
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating,
            })
        }
        return res.status(200).json({
            success:true,
            averageRating: 0,
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

exports.getAllRating = async(req,res)=>{
    try{
        const allRating = await Rating.find({})
                                        .populate({
                                            path:"user",
                                            select:"firstName lastName email image",
                                        })
                                        .populate({
                                            path:"course",
                                            select:"courseName"
                                        })
                                        .exec();

        return res.status(200).json({
            success:true,
            message:"all reviews",
            allRating,
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