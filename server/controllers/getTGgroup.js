const TeacherGuardianGroup = require('../models/TGGroup');

exports.getStudentsForFaculty = async (req, res) => {
    try {
        const facultyId = req.user.userId; 

        const tgGroup = await TeacherGuardianGroup.findOne({ faculty: facultyId }).populate('students');

        if(!tgGroup) {
            return res.status(404).json({
                message:'TG group not found for the faculty'
            });
        }

        res.status(200).json({ students: tgGroup.students});
    } catch (error) {
        console.error('Error retrieving students for Faculty:', error);
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        });
    }
};