const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:String,
        default:Date.now(),
        expires:5*60,
    },
});

async function sendVerificationEmail(email, otp){
    try{
        const mailRepose = await mailSender(email,"Verification email from TG Automation", otp);
        console.log("email sent successfully");
    }
    catch(error){
        console.log(error);
        console.log("error occurred while sending the email");
        throw error;
    }
}

OTPSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email, this.otp);
    if(this.isNew){
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
})

module.exports = mongoose.model("OTP",OTPSchema);