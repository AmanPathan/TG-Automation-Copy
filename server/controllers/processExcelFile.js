const ExcelJS = require('exceljs');
const {Student} = require('../models/User')

exports.processExcelFile = async (req,res) => {
    try {
        if (!req.file) {
            return res.status(400).json({error: 'No File Uploaded'});
        }

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(req.file.path);

        const worksheet = workbook.getWorksheet(1);

        worksheet.eachRow(async (row,rowNumber) => {
            if(rowNumber > 5) { // Skip header row
                const rowData = row.values;
                const newStudent = new Student({
                    name: rowData[5],
                    rollNumber: rowData[1],
                    division: rowData[2]
                });
                await newStudent.save();
            }
        });

        res.status(200).json({message: 'File Uploaded and processed Successfully'});
    } catch (error) {
        console.error('Error processing uploaded file:', error);
        res.status(500).json({
            success:false,
            message: 'Internal Server Error',
            error:error.message
        });
    }
};