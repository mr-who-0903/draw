const express = require('express');
const router = express.Router();
const Task = require('../model/userSchema');

router.post("/postdata", async(req, res)=>{
    try{
        const task = await new Task(req.body).save();
        return res.status(201).json({ message: 'data added successfully' });
    }
    catch(e){
        console.log(e);
        return res.status(401).json({ post_error: e });
    }
})

router.get("/getdata", async(req, res) =>{
    try{
        const tasks = await Task.find();
        res.send(tasks);
    }
    catch(e){
        console.log(e);
    }
})

router.put("/update/:id", async(req, res) =>{
    try{
        const task = await Task.findOneAndUpdate(
            {_id: req.params.id},
            req.body
        )
        return res.status(201).json({message: "updated successfully.."});
    }
    catch(e){ 
        console.log(e); 
        return res.status(401).json({update_error: e});
       
    }
})

router.delete("/delete/:id", async(req, res) =>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        return res.status(200).json({message:"deleted successfully" });
    }
    catch(e){
        console.log(e);
        return res.status(401).json({delete_error:e});
    }
})

module.exports = router;