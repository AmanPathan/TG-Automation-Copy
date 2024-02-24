const StudentPerformance = require("../models/StudentPerformance");
const Form = require("../models/Form");
const {uploadFileToCloudinary} = require("../utils/cloudinary");
const fileUpload = require('express-fileupload');
const cloudinary = require("../utils/cloudinary");

exports.fillForm = async (req, res) => {
    try{
        const userId = req.user.id;

        if(!userId) {
            return res.status(401).json({
                success: false,
                message: "user not found! Make sure you are loged in." 
            });
        }

        const {formId, studentPerformance} = req.body;
        if(!formId || !studentPerformance) {
            return res.status(400).json({
                success:false,
                message:"All fields are mandatory."
            });
        }

        let uploadFileUrl;
        const docFile = req.files.docfile;

        try{
            const uploadResult = await cloudinary.uploader.upload(docFile.tempFilePath);
            uploadedFileUrl = uploadResult.url;
        } 
        catch(error){
            return res.status(300).json({
                success:false,
                message:"File ulpoad failed.",
                error:error.message
            });
        }
        const studentPerformanceData = JSON.parse(studentPerformance);

        // Update the student performance data with the uploaded file URL
        studentPerformanceData.attachments.push(uploadFileUrl);

        let newStudentPerformance;

        try{
            newStudentPerformance = await StudentPerformance.create(studentPerformanceData);
        }
        catch(error) {
            return res.status(400).json({
                success:false,
                message:"Error while creatingstudent performance record.",
                error:error.message
            });
        }

        if(!newStudentPerformance){
            return res.status(401).json({
                success: false,
                message:"Failed to create student performance record."
            });
        }

        // Update the form with the student performance record
        try{
            await Form.findByIdAndUpdate(
                { _id: formId},
                {
                    $push: {
                        forms:{
                            facultyEmail: userId.email,
                            studentPerformance: newStudentPerformance
                        }
                    }
                },
                {new : true}
            );
        }
        catch(error) {
            return res.status(500).json({
                success:false,
                message:"Error while updating form.",
                error:error.message
            });
        }

        return res.status(200).json({
            success:true,
            message:"Form filled successfully."
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to fill form.",
            error:error.message
        });
    }
};