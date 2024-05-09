const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    tagName:{
        type:String,
        trim:true,
        required:true
    },
    description:{
        type:String,
        trim:true,
        required:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
});

module.exports = mongoose.model("Tag",tagSchema);