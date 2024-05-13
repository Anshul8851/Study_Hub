const Tag = require("../models/Tag");

exports.createTag = async(req,res)=>{
    try{
        const {name,description} = req.body;

        if(!name || !description){
            res.status(400).json({
                success:false,
                message:"please enter all fields"
            })
        }
        const newTag = await Tag.create({tagName:name,description:description});
        return res.status(200).json({
            success:true,
            message:"Tag created successfully"
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
// getAllTags handler function 

exports.getAllTags = async(req,res)=>{
    try{
        const allTags = await Tag.find({},{name:true,description:true});
        res.status(200).json({
            success:true,
            message:"All tags return successfully",
            allTags,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
