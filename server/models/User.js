const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    department:{
        type:String,
        trim:true,
    },
    name:{
        type:String,
        required:true,
        trim:true,
    },
    designation:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    role: {
        type: String, // Assuming role is a string
        required: true,
        enum: ['Admin', 'Faculty', 'Student'] // Example of enum for predefined roles
    },
    teacherGuardianGroups: [{type: mongoose.Schema.Types.ObjectId, ref: 'TeacherGuardianGroup'}]
});

const studentSchema = new mongoose.Schema({
    rollNumber:{
        type:String,
        required:true,
        trim:true,
    },
    division:{
        type:String,
        required:true,
        trim:true,
    },
    teacherGuardianGroup: {type: mongoose.Schema.Types.ObjectId, ref: 'TeacherGuardianGroup'}
});


const User = mongoose.model("User", userSchema);
const Student = User.discriminator("Student", studentSchema);

module.exports = {User, Student};