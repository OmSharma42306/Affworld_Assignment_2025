import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const mongoUrl = process.env.MONGODB_URI || "";
mongoose.connect(mongoUrl).then(()=>{
    console.log("Database Connected!")
})


const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true,
    },
    email : {
        type : String,
        required:true,
        unique:true
    },
    password : {
        type : String,
        required:true
    },
    otp:{
        type:String,
    },
    otpExpiry : {
        type:Date
    }
});

const Users = mongoose.model('Users',userSchema);

export default Users;