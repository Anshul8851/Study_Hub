const Category = require("../models/Category");

exports.createCategory = async(req,res)=>{
    try{
        const {name,description} = req.body;

        if(!name || !description){
            res.status(400).json({
                success:false,
                message:"please enter all fields"
            })
        }
        const newTag = await Category.create({name:name,description:description});
        return res.status(200).json({
            success:true,
            message:"Category created successfully"
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
// getAllCategory handler function 

exports.getAllCategory = async(req,res)=>{
    try{
        const allCategories = await Category.find({},{name:true,description:true});
        res.status(200).json({
            success:true,
            message:"All category return successfully",
            allCategories,
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

exports.categoryPageDetails = async(req,res)=>{
    try{
        const {categoryId} = req.body;
        const selectedCategory = await Category.findById(categoryId).populate("courses");
        if (!selectedCategory) {
            console.log("Category not found.")
            return res
              .status(404)
              .json({ success: false, message: "Category not found" })
        
            }

            const categoriesExceptSelected = await Category.find({
                _id: { $ne: categoryId },
              }).populate("courses");

              return res.status(200).json({
                success:true,
                selectedCategory,
                categoriesExceptSelected,
              })


    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
