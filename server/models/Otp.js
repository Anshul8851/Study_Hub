const mongoose = require("mongoose");
const mailSender = require("../Utils/mailSender");

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otpValue:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
});

async function sendVerificationEmail(email,otp){
    try{
        // console.log(email,otp);
        const mailResponse = await mailSender(email,"Verification email from Study-Hub",otp);
        // console.log("Email send successfully",mailResponse);
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

otpSchema.pre("save",async function(next){
    console.log("new otp saved");
    if (this.isNew) {
        // console.log(this);
		await sendVerificationEmail(this.email, this.otpValue);
	}
    next();
})

module.exports = mongoose.model("Otp",otpSchema);