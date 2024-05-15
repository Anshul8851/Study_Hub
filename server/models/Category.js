const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    categoryName:{
        type:String,
        trim:true,
        required:true
    },
    description:{
        type:String,
        trim:true,
        required:true
    },
    courses:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }
],
});

module.exports = mongoose.model("Category",categorySchema);