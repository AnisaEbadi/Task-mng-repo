const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Task = require('../models/task');

// Register
router.post('/register', (req, res, next) =>{
   let newUser = new User({
       name: req.body.name,
       email: req.body.email,
       username: req.body.username,
       password: req.body.password
   });

   User.addUser(newUser, (err, user)=>{
       if(err){
          res.json({success: false, msg:'Failed to register user'});
       }else{
           res.json({success: true, msg:'User registered'});
       }
   });
});

// Authenticate
router.post('/authenticate', (req, res, next) =>{
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err,user) => {
        if(err) throw err;

        if(!user){
            return res.json({ success : false, msg : 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;

            if(isMatch){
                const token = jwt.sign(user.toObject(), config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user : {
                        id : user._id,
                        name : user.name,
                        email : user.email,
                        username : user.username
                    }
                });
            }
            else{
                return res.json({success: false, msg:'Wrong password'});
            }
        });
    });
 });

 // Profile
router.get('/profile', passport.authenticate('jwt',{session:false}), (req, res, next) =>{
    res.json({user: req.user})
 });

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

 

module.exports = router;