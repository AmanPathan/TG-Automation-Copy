const mongoose = require('mongoose');

const tgGroupSchema = new mongoose.Schema({
    facultyId: {type : mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true},
    students: [{type : mongoose.Schema.Types.ObjectId, ref: 'Student'}],
});

const TeacherGuardianGroup = mongoose.model('TeacherGuardianGroup', tgGroupSchema);

module.exports = TeacherGuardianGroup;