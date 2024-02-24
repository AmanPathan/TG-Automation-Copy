const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const subjectSchema = new mongoose.Schema({
    attendance:{type : Number, default : 0},
    unitTests:[{type : Number, default : 0}], // Array to store marks for unit tests i.e. ut1,ut2,ut3
    prelim:{type : Number, default : 0},
    inSem: {type : Number, default : 0}
});

const performanceSchema = new mongoose.Schema({
    email:{type : String, required : true},
    subjects:{
        sub1: {type : subjectSchema, default : {}},
        sub2: {type : subjectSchema, default : {}},
        sub3: {type : subjectSchema, default : {}},
        sub4: {type : subjectSchema, default : {}},
        sub5: {type : subjectSchema, default : {}}
    }
});

const Performance = mongoose.model('Performance', performanceSchema);
module.exports = Performance;