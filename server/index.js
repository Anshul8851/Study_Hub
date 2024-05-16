const express  = require("express");
const app = express();

const userRoutes = require("./routes/User");
const paymentRoutes = require("./routes/Payment");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");

const database = require("./config/database");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const {cloudinaryConnect} = require("./config/cloudinary");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT || 4000;
// database connect 
database.connect();

// middlewares 
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true,
    })
)

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/temp/"
}))

// cloudinary connection 
cloudinaryConnect();

// routes 
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/course",courseRoutes);

// default route 

app.use("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your Server is running successfully",
    })
})

app.listen(PORT,()=>{
    console.log(`SERVER STARTED SUCCESSFULLY AT PORT : ${PORT}`);
})




