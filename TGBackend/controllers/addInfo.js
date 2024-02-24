const User = require("../models/User");

exports.addInfo = async (req,res) => {
    try{
        const userId = req.user.id;
        const {
            department,
            name, 
            designation,
            email,
            password,
            rollNumber,
            batch, 
            subjects
        } = req.body;

        // Validate input
        if(!name || !email || !password) {
            return res.status(400).json({
                success:false,
                message:"Name, email and password are mandatory fields"
            });
        }

        // Fetch User details 
        let userDetails;
        if(req.user.role === 'Student'){
            userDetails = await Student.findById(userId);
        }
        else if(req.user.role === 'Teacher') {
            userDetails = await Teacher.findByIt(userId);
        }
        else{
            userDetails = await User.findById(userId);
        }


        if(!userDetails) {
            return res.status(404).json({
                success : false,
                message:"User details not found"
            });
        }

        // If user is a Student, update student-specific information
        if(req.user.role === 'Student'){
            await userDetails.updateOne({
                rollNumber:rollNumber,
                batch : batch
            });
        }

        // If user is a Teacher, update teacher-specific information
        if(req.user.role === 'Teacher'){
            await userDetails.updateOne({
                subjects: subjects
            });
        }

        return res.status(200).json({
            success:true,
            message:"Information added successfully"
        });
    }
    catch (error){
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Failed to add Infomation",
            error:error.message
        });
    }
};