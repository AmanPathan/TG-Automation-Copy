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
        DSBDA: {type : subjectSchema, default : {}},
        CC: {type : subjectSchema, default : {}},
        CNS: {type : subjectSchema, default : {}},
        WAD: {type : subjectSchema, default : {}},
        Internship: {type : subjectSchema, default : {}}
    }
});

const Performance = mongoose.model('Performance', performanceSchema);
module.exports = Performance;