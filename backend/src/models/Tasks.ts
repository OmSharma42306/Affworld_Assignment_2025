import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    description : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum: ['pending','completed','done'],
        default : 'pending'
    },
})

const Tasks = mongoose.model('Tasks',taskSchema);

export default Tasks;