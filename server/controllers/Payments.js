const {instance} = require("../config/razorpay");
const User = require("../models/User");
const mailSender = require("../Utils/mailSender");
const Course = require("../models/Course");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
// const { default: mongoose } = require("mongoose");

exports.capturePayment = async(req,res)=>{
    try{
        const {course_id} = req.body;
        const userId = req.user.id;

        if(!course_id){
            return res.json({
                success:false,
                message:"please provide valid course id",
            })
        }

        let course;
        try{
            course = await Course.findById(course_id);
            if(!course){
                return res.status(404).json({
                    success:false,
                    message:"course not exists",
                })
            }
            const userid = userId;
            if(course.studentsEnrolled.includes(userid)){
                return res.status(200).json({
                    success:false,
                    message:"user already enrolled in this courser"
                })
            }
        }catch(error){
            return res.status(404).json({
                success:false,
                message:"course not exists",
            })
        }

        // order create 
        const amount = course.price;
        const currency = "INR";
        const options = {
            amount:amount*100,
            currency,
            receipt:Math.random()*100,
            notes:{
                courseId:course_id,
                userId,
            }
        };
        try{
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);
            return res.status(200).json({
                success:true,
                courseName:course.courseName,
                orderId:paymentResponse.id,
                amount:paymentResponse.amount,
            })
        }
        catch(error){
            console.log(error);
            return res.json({
                success:false,
                message:"could not initiate order",
            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"payment not capture please try again",
        })
    }
}

// verify signature

exports.verifySignature = async (req,res) => {
    const webhookSecret = "123456789";
    const signature = req.headers("x-razorpay-signature");
    const shasum = crypto.createHmac("sha256",webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");
    if(signature === digest){
        console.log("payment is authorised");
        const {courseId,userId} = req.body.payload.payment.entity.notes;
        try{
            const enrolledCourse = await Course.findOneAndUpdate({_id:courseId},
                                                                {$push:{studentsEnrolled:userId}},
                                                                {new:true});

            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"course not found",
                });
            }
            console.log(enrolledCourse);
            const updateStudent = await User.findOneAndUpdate({_id:userId},
                                                            {$push:{courses:courseId}},
                                                            {new:true});

            console.log(updateStudent);
            // now we have to send confirmation mail to user
            const emailResponse = await mailSender(
                                                    updateStudent.email,
                                                    "comgrulations from study-Hub",
                                                    "congrulations you are onboarded",
            )
            return res.status(200).json({
                success:true,
                message:"signature verified and course added",
            })
        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:"course not found",
            });
        }
    }else{
        return res.status(400).json({
            success:false,
            message:"invalid signature",
        })
    }
}