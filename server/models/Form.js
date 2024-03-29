const mongoose = require("mongoose");
const Performance = require("./StudentPerformance");
const mailSender = require("../utils/mailSender");

const performanceFormSchema = new mongoose.Schema({
    forms:[
        {
            studentEmail:{type:String, required : true},
            performance:{type : mongoose.Schema.Types.ObjectId, ref:'Performance'}
        }
    ],
    createdAt:{
        type : Date,
        default: Date.now
    }
});

const performanceForm = mongoose.model('performanceForm', performanceFormSchema);

module.exports = performanceForm;