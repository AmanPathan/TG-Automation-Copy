const bcrypt = require("bcrypt");
const {User, Student, Teacher} = require("../models/User");
const jwt = require("jsonwebtoken");
const {options} = require("../routes/user");
require("dotenv").config();
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");

exports.signup = async (req,res) => {
    try{
        const {name, email, password, role, otp} = req.body;
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already Exists",
            });
        }

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:"Error in hashing Password",
            });
        }

        const recentOTP = await OTP.find({ email })
            .sort({createdAt: -1})
            .limit(1);
        console.log(recentOTP);

        if(recentOTP.length === 0){
            return res.status(400).json({
                success:false,
                message:"OTP not found",
            });
        }
        else if(otp !== recentOTP[0].otp){
            return res.status(400).json({
                success:false,
                message: `OTP not matching - ${otp} ${recentOTP[0].otp}`,
            });
        }

        const user = await User.create({
            name,
            email,
            password:hashedPassword,
            role
        });

        return res.status(200).json({
            success:true,
            message:"User Created Successfully",
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered, please try again later",
        });
    }
}

exports.login = async (req,res) => {
    try{
        const {email,password} = req.body;
        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:"Please fill all the details carefully",
            });
        }

        let user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({
                success:false,
                message:"User is not registered",
            });
        }

        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,
        };
        if(await bcrypt.compare(password,user.password)){
            let token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            });
            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date( Date.now() + 3*24*60*60*1000),
                httpOnly:true,
                path: "/",
                sameSite: "None", // Only use with HTTPS
                secure: true // Only use with HTTPS
            }

            res.cookie('token', token, options).status(200).json({
                success:true,
                token,
                user,
                message:"User Logged in Successfully",
            });
        }
        else {
            return res.status(403).json({
                success:false,
                message:"Password Incorrect",
            });
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login Failure",
        });
    }
}

exports.sendotp = async(req,res) => {
    try{
        const {email} = req.body;
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });

        console.log("Generated otp:", otp);

        const otpPayLoad = {email, otp};
        const otpBody = await OTP.create(otpPayLoad);

        console.log(otpBody);

        res.status(200).json({
            success:true,
            messag:"OTP sent Sccessfully",
        });
    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            success:false,
            message:"error while generating the otp",
        });
    }
};

exports.changePassword = async (req, res) => {
    try{
        const {email, oldPassword, newPassword, confirmPassword} = req.body;

        const user = await User.findOne({ email }).populate("additionaldetails");

        if(await bcrypt.compare(oldPassword, user.password)){
            if(newPassword != confirmPassword){
                return res.status(402).json({
                    success:false,
                    message:"re-confirm the password"
                })
            };
            const hashedPsk = await bcrypt.hash(password, 10);
            user.password = hashedPsk;
            const sendM = await mailSender(email,"password changed successfully", "just random body");

            const change = await User.findOneAndUpdate({email:email},
                {
                    password: hashedPsk
                },
                {new:true},
            )

            return res.status(201).json({
                success:false,
                message:"password change successfully",
            })
        }
        else{
            return res.status(403).json({
                success: false,
                message: "enter the correct password",
            });
        }
    } catch(error) {
        console.log(error);
        return res.status(402).json({
            success: false,
            message:"something went wrong while changing the password",
        });
    }
};

exports.forgetPassword = async (req,res) => {
    try{
        const {email,otp,newpassword} = req.body;
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).jso({
                success:false,
                message:"user not found!",
            })
        }
        const recentOTP = await OTP.find({email})
        .sort({createdAt: -1})
        .limit(1);
        console.log(recentOTP);

        if(recentOTP.length == 0) {
            return res.status(400).json({
                success:false,
                message:`otp not matching - ${otp} ${recentOTP[0].otp}`,
            });
        }

        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(newPassword, 10);
        }
        catch(error){
            return res.status(400).json({
                success:false,
                message:"something went wrong while hashing the password",
            })
        }
        const change = await User.findOneAndUpdate({email:email},
            {
                password: hashedPassword,
            },
            {new:true},
        )

        return res.status(201).json({
            success: false, 
            message: "password change successfully",
        })
    }
    catch(error){
        return res.status(400).json({
            success: false,
            message:"something went wrong while sending finding user!",
            error: error
        })
    }
}