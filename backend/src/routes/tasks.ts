import express from "express"
import Tasks from "../models/Tasks"
import { Request,Response } from "express";
const router = express.Router();

// create a task.

router.post("/tasks",async(req:Request,res:Response)=>{
    const name = req.body.name;
    const description = req.body.description;

    const task = new Tasks({
        name:name,
        description:description
    });
    await task.save();
    res.status(200).json({task});
})

// get all tasks

router.get("/tasks",async(req:Request,res:Response)=>{
    const tasks = await Tasks.find();
    console.log(tasks)
    res.status(200).json(tasks)
});


// update tasks status

router.put("/tasks/:id",async(req:Request,res:Response)=>{
    const id = req.params.id;
    const status = req.body.status;
    //const task = await Tasks.findByIdAndUpdate(id,status,{new:true});
    const task = await Tasks.findByIdAndUpdate(id,{status:status})
    res.json(task)

})


router.delete("/tasks/:id",async(req:Request,res:Response)=>{
    const id = req.params.id;
    await Tasks.findByIdAndDelete(id);
    res.json({msg:"Task deleted!"})

})


export default router;