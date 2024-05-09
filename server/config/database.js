const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = async () => {
   await mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
   })
   .then(()=>
        console.log("Db Connection Successful")
   )
   .catch((err)=>{
    console.log("DB CONNECTION IS UNSUCCESSFUL");
    console.error(err);
    process.exit(1);
   })
};