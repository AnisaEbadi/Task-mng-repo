const express = require('express');
const router = express.Router();
//const config = require('../config/database');
const Task = require('../models/task');

// Task list
router.get('/tasks', (req, res) => {
    console.log('Get request for all tasks');
    Task.find({})
    .exec(function(err, tasks){
        if(err){
            console.log("Error retrieving tasks");
        }else{
            res.json(tasks);
        }
    })
});

// Get Task
router.get('/tasks/:id', (req, res) => {
    console.log('Get request for a single task');
    Task.findById(req.params.id)
    .exec(function(err, task){
        if(err){
            console.log("Error retrieving tasks");
        }else{
            res.json(task);
        }
    })
});

// Insert task
router.post('/task',(req, res) => {
    console.log('Post a task ', req.body.name);
    var newTask = new Task();
    newTask.name = req.body.name;
    newTask.description = req.body.description;
    newTask.imp_tec = req.body.imp_tec;
    newTask.save((err, insertedTask) => {
        if(err){
            console.log('Error saving task!');
        }else{
            res.json(insertedTask);
        }
    });
});

// Update task
router.put('/task/:id' ,(req, res) => {
    console.log('Update a task');
    Task.findByIdAndUpdate(req.params.id,
        {
        $set:{ name: req.body.name, description: req.body.description, imp_tec: req.body.imp_tec}
        },
        { new: true} ,
        (err , updatedTask) => {
            if(err){
                res.send("Error updating task");
            }else{
                res.json(updatedTask);
            }
        }
    )
});

// Delete task
router.delete('/task/:id', (req,res) => {
    console.log('Deleting a task');
    Task.findByIdAndRemove(req.params.id, (err, deletedTask) => {
        if(err){
            res.send("Error deleting task");
        }else{
            res.json(deletedTask);
        }
    });
});

module.exports = router;