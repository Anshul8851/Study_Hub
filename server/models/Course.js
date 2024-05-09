const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        required:true,
        trim:true
    },
    courseDescription:{
        type:String,
        trim:true,
        required:true
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true 
    },
    whatYouWillLearn:{
        type:String,
        required:true,
        trim:true
    },
    courseContent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section",
    },
    courseRating:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Rating",
    },
    price:{
        type:Number,
    },
    thumbNail:{
        type:String,
    },
    tags:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tag",
    },
    studentsEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        }
    ]
});

module.exports = mongoose.model("Course",courseSchema);