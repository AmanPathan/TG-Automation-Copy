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
    }
});

const teacherSchema = new mongoose.Schema({
    subjects:{
        type:String,
        required:true,
        trim:true,
    }
});

const studentSchema = new mongoose.Schema({
    rollNumber:{
        type:String,
        required:true,
        trim:true,
    },
    batch:{
        type:String,
        required:true,
        trim:true,
    }
});


const User = mongoose.model("User", userSchema);
const Student = User.discriminator("Student", studentSchema);
const Teacher = User.discriminator("Teacher", teacherSchema);

module.exports = {User, Student, Teacher};