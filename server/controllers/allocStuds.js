const { User, Student } = require('../models/User');
const TeacherGuardianGroup = require('../models/TGGroup');

exports.allocateStudentsToFaculty = async (req, res) => {
    try {
        const students = await User.find({ role: 'Student'});
        const faculties = await User.find({ role: 'Faculty'});

        const numStudentsPerFaculty = Math.ceil(students.length / faculties.length);
        
        const shuffledStudents = students.sort(() => Math.random() - 0.5);

        let studentIndex = 0;
        for (const faculty of faculties) {
            const facultyStudents = shuffledStudents.slice(studentIndex,studentIndex + numStudentsPerFaculty);
            studentIndex += numStudentsPerFaculty;

            const teacherGuardianGroup = new TeacherGuardianGroup({
                facultyId: faculty._id,
                students: facultyStudents.map(student => student._id),
            });
            await teacherGuardianGroup.save();
        }

        res.status(200).json({
            message:'Students allocated to Faculty Members successfully'
        });
    } catch (error) {
        console.error('Error allocating students to Faculty members:', error);
        res.status(500).json({
            error:"Internal server error"
        });
    }
};