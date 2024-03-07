const Performance = require("../models/StudentPerformance");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const { mailSender, sendEmailWithAttachment } = require("../utils/mailSender");

exports.sendPerformanceEmail = async (req, res) => {
    try{
        const {email, subject} = req.body;

        const performanceData = await Performance.findOne({email});
        // console.log(performanceData);
        if(!performanceData || !performanceData.subjects) {
            return res.status(404).json({
                success:false,
                message:"Performance data not found for the specified email",
            });
        }

        const reportData = Object.keys(performanceData.subjects).map(subjectKey => ({
            subject: subjectKey,
            ...performanceData.subjects[subjectKey],
        }));

        // console.log(reportData); // debug keliye 

        const doc = new PDFDocument();
        const pdfFilePath = `performance_report_${Date.now()}.pdf`;
        doc.pipe(fs.createWriteStream(pdfFilePath));

        // Draw table headers
        doc.text('Subject', 50, 50);
        doc.text('Attendance', 150, 50);
        doc.text('Unit Tests', 250, 50);
        doc.text('Prelim', 350, 50);
        doc.text('InSem', 450, 50);

        let y = 70; // Initial Y position for the first row
        reportData.forEach(subject => {
        doc.text(subject._doc.subject || '', 50, y); // Subject name from _doc
        doc.text(subject._doc.attendance?.toString() || '', 150, y);
        doc.text(subject._doc.unitTests?.join(', ') || '', 250, y);
        doc.text(subject._doc.prelim?.toString() || '', 350, y);
        doc.text(subject._doc.inSem?.toString() || '', 450, y);

        y += 20; // Move to the next row
        });

        y = 70; // Reset Y position for the second loop
        reportData.forEach(subject => {
        doc.text(subject.subject || '', 50, y); // Subject name directly accessible
        doc.text(subject.attendance?.toString() || '', 150, y);
        doc.text(subject.unitTests?.join(', ') || '', 250, y);
        doc.text(subject.prelim?.toString() || '', 350, y);
        doc.text(subject.inSem?.toString() || '', 450, y);

        y += 20; // Move to the next row
        });


        // End the document
        doc.end();

        await sendEmailWithAttachment(email, subject, "Please Find attached Performance Report", pdfFilePath, reportData);

        fs.unlinkSync(pdfFilePath);

        return res.status(200).json({
            success:true,
            message:"Performance data sent successfully via email as PDF attachment",
        });
    } catch(error){
        console.error("Error sending performance email:", error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message,
        });
    }
};