const StudentPerformance = require("../models/StudentPerformance");
const hostPerformance = require("../models/Form");
const User = require("../models/User");
const Form = require("../models/Form");

exports.createPerformanceForm = async(req,res) => {
    try{
        const userId = req.user.id;
        if(!userId){
            return res.status(301).json({
                success:false,
                message:"User not found! Make sure you logged in with correct authority"
            })
        }
        const newPerformanceForm = await Form.create({
            form:[],
            createdAt: Date.now()
        });

        console.log("New Performance Form created:", newPerformanceForm);
        return res.status(200).json({
            success:true,
            message:"Performance form hosted successfully"
        });
    }
    catch(error){
        console.log("Error creating Performance Form:", error.message);
        return res.status(500).json({
            success:false,
            message: "Internal Server Error",
            error:error.message
        });
    }
};

exports.getAllPerformanceForms = async (req, res) => {
    try{
        const allPerformanceForms = await PerformanceForm.find();
        return res.status(200).json({
            success:true, 
            data:allPerformanceForms,
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success : false,
            message:`can't Fetch Performance Form Data`,
            error : error.message,
        });
    }
};

exports.pushPerformanceForm = async (req,res) => {
    try{
        const userId = req.user.id;
        const{formId} = req.body;

        if(!userId || !formId) {
            return res.status(400).json({
                success : false,
                message : "User ID or Form ID is missing"
            });
        }

        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({
                success: false,
                message:"User not found"
            });
        }
        user.forms.push(formId);
        await ser.save();

        return res.status(200).json({
            success:true,
            message:"Performance form pushed successfully"
        });
    }
    catch(error){
        console.error("Error pushing performance form:", error.message);
        return res,status(500).json({
            success:false,
            message:"Internal Server Error",
            error: error.message
        });
    }
};