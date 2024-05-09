const mongoose = require("mongoose");
const mailSender = require("../Utils/mailSender");

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otpValue:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60*1000
    }
});

async function sendVerificationEmail(email,otp){
    try{
        const mailResponse = await mailSender(email,"Verification email from Study-Hub",otp);
        console.log("Email send successfully",mailResponse);
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

otpSchema.pre('save',async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})

module.exports = mongoose.model("Otp",otpSchema);