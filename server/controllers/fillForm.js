const Performance = require("../models/StudentPerformance");
const Form = require("../models/Form");
const { User } = require("../models/User");

exports.fillForm = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not found! Make sure you are logged in."
            });
        }

        let formId = req.body.formId;
        let formExists = true;

        if (!formId) {
            const user = await User.findById(userId);
            if (!user || user.role !== 'Faculty') {
                return res.status(403).json({
                    success: false,
                    message: "Only Faculties can create Performance Form"
                });
            }

            const newPerformanceForm = await Form.create({
                forms: [],
                createdAt: Date.now(),
                createdBy: userId
            });

            formId = newPerformanceForm._id;
            formExists = false;
        }

        const { studentPerformance } = req.body;
        if (!studentPerformance) {
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory."
            });
        }

        const studentPerformanceData = await Performance.create(studentPerformance);
        if (!studentPerformanceData) {
            return res.status(400).json({
                success: false,
                message: "Error while creating student performance record."
            });
        }

        // Update the form with the student performance record
        await Form.findByIdAndUpdate(
            { _id: formId },
            {
                $push: {
                    forms: {
                        facultyEmail: userId.email,
                        studentPerformance: studentPerformanceData
                    }
                }
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: formExists ? "Form filled successfully." : "Performance form hosted and filled successfully",
            formId: formId
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to fill form.",
            error: error.message
        });
    }
};
