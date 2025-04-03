const mongoose  = require("mongoose")
const dbConnect = async()=>{
    await mongoose.connect("mongodb://localhost:27017/purv")
    console.log("mongo connect");
    
}



module.exports = dbConnect